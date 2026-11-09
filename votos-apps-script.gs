/* Dushi Trip · recibe los votos de la página y los guarda en esta hoja.
   Pegar en script.google.com > Nuevo proyecto (o desde una hoja: Extensiones > Apps Script).
   Implementar > Nueva implementación > Aplicación web
   (Ejecutar como: Yo · Quién tiene acceso: Cualquier usuario). */
const HOJA = 'Votos';

function libro_() {
  let ss = null;
  try { ss = SpreadsheetApp.getActive(); } catch (e) {}
  if (ss) return ss;
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('SHEET_ID');
  if (id) return SpreadsheetApp.openById(id);
  ss = SpreadsheetApp.create('Votos Curazao');   // se crea sola en tu Google Drive
  props.setProperty('SHEET_ID', ss.getId());
  return ss;
}

function hoja_() {
  const ss = libro_();
  return ss.getSheetByName(HOJA) || ss.insertSheet(HOJA);
}

/* Ejecuta esta función una vez (botón ▶ Ejecutar) para crear la hoja y autorizar. */
function prepararHoja() {
  const ss = libro_();
  hoja_();
  Logger.log('Hoja lista: ' + ss.getUrl());
}

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  if (!d.n) return salida_({ ok: false });
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const s = hoja_();
    let data = s.getDataRange().getValues();
    if (data[0][0] !== 'Nombre') {
      s.clear();
      s.appendRow(['Nombre', 'Fecha', 'Plata US$', 'Datos']);
      data = s.getDataRange().getValues();
    }
    const head = data[0].slice();
    const labels = d.labels || {};
    Object.keys(labels).forEach(id => { if (head.indexOf(labels[id]) < 0) head.push(labels[id]); });
    s.getRange(1, 1, 1, head.length).setValues([head]).setFontWeight('bold');
    s.setFrozenRows(1); s.setFrozenColumns(1);

    const fila = head.map(() => '');
    fila[0] = d.n; fila[1] = new Date(); fila[2] = d.usd || ''; fila[3] = JSON.stringify(d.v || {});
    Object.keys(labels).forEach(id => {
      const c = head.indexOf(labels[id]);
      const v = (d.v || {})[id];
      fila[c] = v === 's' ? '✅ Va' : v === 'n' ? '❌ No va' : '';
    });
    const r = data.findIndex((row, i) => i > 0 && row[0] === d.n);
    if (r < 0) s.appendRow(fila); else s.getRange(r + 1, 1, 1, fila.length).setValues([fila]);
    return salida_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  const data = hoja_().getDataRange().getValues();
  const o = {};
  data.slice(1).forEach(r => {
    if (!r[0]) return;
    try { o[r[0]] = { v: JSON.parse(r[3] || '{}'), t: new Date(r[1]).getTime(), usd: r[2] }; } catch (e) {}
  });
  return salida_(o);
}

function salida_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
