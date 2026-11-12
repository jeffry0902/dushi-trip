/* Datos compartidos del viaje: lugares, guía cultural, videos y rutas por día.
   Coordenadas [lng, lat]. Las marcadas "aprox" se ubicaron a mano. */

const TT = { // IDs de videos de TikTok
  hotel:'7654207941477764373', hato:'7533370767329873183', avestruz:'7534501261123669304',
  santamartha:'7691852650492562721', chobolobo:'7683693587720146209', cabana:'7403373712218541317',
  aquafari:'7672583422870588692', mangrove:'7682175856281750791', iguana:'7572249194665217300',
  waterbike:'7702610886309006613', seabob:'7365512877849070880', goboat:'7701138613572160788',
  shete:'7619373892678782215', casabao:'7671792510678600967', kenepa:'7620971774238264597',
  piskado:'7484059762867440901', willemstad:'7513956302758956294', umbrella:'7597351595990387990',
  pietermaai:'7603896837518544148', kurahulanda:'7667331640447913224', flamencos:'7530096069175168261'
};

const PLACES = {
  bog:{n:'Aeropuerto El Dorado',ll:[-74.1469,4.7016],e:'✈️'},
  cur:{n:'Aeropuerto de Curazao',ll:[-68.9598,12.1889],e:'🛬'},
  hotel:{n:'Dreams Curaçao',ll:[-68.9657,12.1229],e:'🏨',img:'img/resort.jpg'},
  hato:{n:'Cuevas de Hato',ll:[-68.9466,12.1766],e:'🦇',img:'img/hato-cueva.jpg'},
  avestruz:{n:'Granja de avestruces',ll:[-68.8160,12.1470],e:'🦤'},
  aquafari:{n:'Aquafari · Boka Sami',ll:[-68.99908,12.14564],e:'🤿'},
  mangrove:{n:'Rif Mangrove Park',ll:[-68.9433,12.1112],e:'🛶'},
  mina:{n:'Helados de Mina',ll:[-68.9395,12.1083],e:'🍦'},
  kayakaya:{n:'Murales de Kaya Kaya',ll:[-68.935546,12.109971],e:'🎨'},
  riffort:{n:'Rif Fort',ll:[-68.9378,12.1047],e:'🏰'},
  puente:{n:'Puente Reina Emma',ll:[-68.9357,12.1058],e:'🌉'},
  handelskade:{n:'Handelskade y el cañón',ll:[-68.93467,12.10569],e:'🔒'},
  fortams:{n:'Fuerte Amsterdam',ll:[-68.9343,12.1043],e:'🟨'},
  umbrella:{n:'Umbrella Street',ll:[-68.93399,12.10528],e:'☂️'},
  cascada:{n:'Cascada Rooftop',ll:[-68.9325,12.1060],e:'🍸'},
  letras:{n:'Letras Curaçao y Dushi',ll:[-68.9313,12.1045],e:'🔤'},
  pietermaai:{n:'Pietermaai',ll:[-68.9283,12.1038],e:'✨'},
  shete:{n:'Parque Shete Boka',ll:[-69.11677,12.36761],e:'🌊'},
  piskado:{n:'Playa Piskado',ll:[-69.15369,12.36919],e:'🐢'},
  kenepa:{n:'Kenepa Grandi',ll:[-69.1527,12.3499],e:'🏝️'},
  santamartha:{n:'Mirador de Santa Martha',ll:[-69.1255,12.2745],e:'📸'},
  casabao:{n:'Cas Abao',ll:[-69.0915,12.2265],e:'🏖️'},
  flamencos:{n:'Flamencos de Sint Willibrordus',ll:[-69.0625,12.2003],e:'🦩'},
  mercado:{n:'Mercado flotante',ll:[-68.9330,12.1078],e:'🍌'},
  sinagoga:{n:'Sinagoga Mikvé Israel-Emanuel',ll:[-68.9335,12.1063],e:'🕍'},
  kurahulanda:{n:'Kura Hulanda',ll:[-68.9369,12.1076],e:'🏛️'},
  chobolobo:{n:'Destilería Chobolobo',ll:[-68.9036,12.1137],e:'🍸'},
  cabana:{n:'Cabana Beach · Mambo',ll:[-68.8966,12.0838],e:'🎉'}
};

/* Narraciones culturales del "guía" (para leer o escuchar) */
const GUIA = {
  hotel:'Bon bini, bienvenidos a Curazao. Estamos en la bahía de Piscadera, a pocos minutos de Willemstad, la capital. Esta isla de apenas 60 kilómetros de largo queda fuera de la ruta de los huracanes, por eso tiene sol casi todo el año. Aquí se hablan cuatro idiomas: papiamento, neerlandés, inglés y español. Ya escucharán por todas partes la palabra "dushi", que significa dulce, lindo o rico. Así se describe la isla misma: Dushi Kòrsou.',
  hato:'Estas cuevas eran un arrecife de coral que estuvo bajo el mar. Cuando la isla se levantó, el coral quedó en tierra y el agua de lluvia fue tallando los salones, las estalactitas y los pozos que van a ver. Tienen cientos de miles de años. Los indígenas caquetíos dejaron dibujos en las rocas de los alrededores, y siglos después personas esclavizadas que escapaban se escondían aquí. Busquen la formación que llaman la Virgen, y guarden silencio: aquí viven murciélagos de nariz larga.',
  avestruz:'Ustedes no esperaban ver avestruces en el Caribe, ¿cierto? El clima seco de Curazao se parece al de África, y por eso esta es una de las granjas de avestruces más grandes fuera de ese continente. Van a ver todo el ciclo: del huevo al pollito y al ave adulta, que puede correr a unos 70 kilómetros por hora. El cascarón es tan fuerte que una persona adulta se puede parar encima sin romperlo. ¿Quién se anima a probar?',
  aquafari:'Aquafari es un scooter submarino con una cúpula de aire sobre la cabeza: respiran normal, como en tierra, y el instructor los guía por el arrecife de Boka Sami. Curazao es uno de los mejores lugares del Caribe para ver coral, porque el agua es muy clara y casi no tiene corrientes en esta costa.',
  mangrove:'Los manglares son los riñones del mar: sus raíces filtran el agua y sirven de guardería para peces, cangrejos y aves. Este parque, cuidado por la fundación Carmabi, recuperó un manglar que estaba en medio de la ciudad y hoy es uno de los pocos parques de manglar urbanos abiertos al público en el mundo. Remen despacio y miren las raíces: ahí está la vida.',
  mina:'Esta escultura es del artista curazoleño Giovanni Abath. La frase "Emancipate yourself from mental slavery", libérate de la esclavitud mental, la hizo famosa Bob Marley en Redemption Song, inspirado en un discurso de Marcus Garvey. En Curazao tiene un peso especial: aquí la esclavitud se abolió en 1863, y en 1795 un hombre llamado Tula lideró la gran rebelión de los esclavizados. Hoy Otrobanda es un barrio de artistas, y la calle se volvió su galería.',
  kayakaya:'Estamos en Kaya Kaya. Kaya significa calle en papiamento. Desde 2019, vecinos y artistas de Otrobanda se unieron para llenar estas callecitas de murales, y así devolverle la vida y el orgullo a uno de los barrios más antiguos de Willemstad. Cada pared cuenta algo de la historia y la cultura de Curazao. Miren alrededor y escojan su mural favorito para la foto.',
  riffort:'El Rif Fort se construyó en 1828 para cerrar la entrada de la bahía de Santa Ana a los barcos enemigos. Sus muros son de piedra coralina. Hoy adentro hay tiendas y restaurantes, pero si suben a la muralla tienen la vista más famosa de la isla: al frente, las casas de colores de Handelskade.',
  puente:'Este es el puente Reina Emma, inaugurado en 1888. Es un puente flotante sobre pontones: cuando llega un barco, un motor lo hace girar y se abre de lado. Por eso le dicen "la vieja que se balancea", the Swinging Old Lady. Al principio se cobraba peaje solo a quienes llevaban zapatos; los descalzos pasaban gratis. Dicen que los pobres se ponían zapatos para que no los vieran como pobres, y los ricos se los quitaban para no pagar.',
  handelskade:'Handelskade es la postal de Curazao y parte del centro histórico que la UNESCO declaró Patrimonio de la Humanidad en 1997. Cuenta la leyenda que un gobernador del siglo XIX sufría dolores de cabeza por el reflejo del sol en las casas blancas y ordenó pintarlas de colores. Otros dicen que era dueño de la fábrica de pintura. Sea cual sea la verdad, el resultado es este arcoíris holandés en el Caribe.',
  fortams:'El Fuerte Amsterdam lo construyó la Compañía de las Indias Occidentales holandesa entre 1634 y 1635. Desde aquí se gobernaba la isla, y todavía hoy está aquí la sede del gobierno. Busquen la iglesia del fuerte: en su pared quedó incrustada una bala de cañón de un ataque británico de 1804.',
  umbrella:'Esta es Umbrella Street, la calle de las sombrillas de colores colgadas sobre Punda. Además de dar sombra, se volvió uno de los rincones más fotografiados de la ciudad. Punda fue el primer barrio de Willemstad, fundado en 1634 dentro de las murallas: su nombre viene de "de punt", la punta.',
  cascada:'Desde esta terraza en el techo del Elements Hotel se ven los tejados rojos de Punda, la bahía y el mar. A esta hora el sol se esconde sobre el Caribe: es el momento de brindar.',
  letras:'Estamos en la plaza Wilhelmina, nombrada por la reina Guillermina de Holanda. Aquí están las letras de Curaçao y de Dushi. Y esa escultura de colores es una Chichi, creada por la artista Serena Israel: chichi en papiamento significa la hermana mayor, la que cuida a todos. Representa a la mujer caribeña fuerte, orgullosa y alegre.',
  pietermaai:'Pietermaai fue el barrio de los ricos comerciantes en los siglos XVIII y XIX. Con el tiempo se abandonó y llegó a ser una zona peligrosa. Desde hace unos veinte años sus mansiones se restauraron como hoteles boutique, bares y restaurantes, y hoy es el barrio más bohemio de la ciudad. De noche, con las luces, es pura magia.',
  shete:'Shete Boka significa siete bocas en papiamento: siete ensenadas donde el mar abierto golpea la costa norte. Es parque nacional y en sus playas desovan tortugas marinas. En Boka Tabla el agua entra a una cueva con un rugido que se siente en el pecho, y en Boka Pistol sale disparada como un cañón. Aquí entienden por qué la costa norte casi no tiene playas: el mar es bravo.',
  piskado:'Playa Piskado significa playa de pescadores. Los pescadores limpian aquí su pesca y las tortugas verdes aprendieron que siempre hay comida. Por eso nadan al lado de la gente. Son animales protegidos: no las toquen ni les den de comer, solo naden con ellas y disfruten.',
  kenepa:'Kenepa Grandi toma su nombre del árbol de kenepa, el mismo que en Colombia llamamos mamoncillo. Aquí cerca, en la hacienda Knip, empezó el 17 de agosto de 1795 la rebelión de Tula, el levantamiento de esclavizados más grande de la historia de la isla. Hoy esta playa es el orgullo de los curazoleños y, para muchos, la más bonita de la isla.',
  santamartha:'Desde aquí se ve la bahía de Santa Martha, rodeada de colinas verdes, con la antigua hacienda del mismo nombre. Curazao tuvo decenas de haciendas o landhuizen; en papiamento se les dice kunuku al campo.',
  casabao:'Cas Abao toma su nombre de una casa de hacienda del siglo XVII. La revista National Geographic la incluyó entre las mejores playas del mundo: arena blanca, agua turquesa y un arrecife a pocos metros de la orilla.',
  flamencos:'En estas salinas viven flamencos silvestres. Son rosados por lo que comen: pequeños camarones de agua salada llenos de pigmentos. Hablen bajito y no se acerquen: se espantan fácil.',
  mercado:'Al mercado flotante llegaban por décadas botes desde Venezuela con frutas, verduras y pescado. Es uno de los lazos más antiguos entre la isla y Suramérica, que queda a solo 65 kilómetros.',
  sinagoga:'La sinagoga Mikvé Israel-Emanuel se consagró en 1732 y es la más antigua de las Américas que sigue en uso. Su piso es de arena: unos dicen que recuerda los cuarenta años en el desierto, otros que los judíos perseguidos en la Inquisición la usaban para apagar el sonido de sus pasos al rezar en secreto.',
  kurahulanda:'Kura Hulanda era un barrio de Otrobanda que el empresario holandés Jacob Gelt Dekker restauró completo. Allí está el museo que cuenta la historia de la trata de esclavos: Curazao fue en el siglo XVII uno de los mayores centros de esa trata en el Caribe. Es una visita fuerte, pero necesaria para entender la isla.',
  chobolobo:'Bienvenidos a la casa del licor Curaçao. La empresa Senior & Co. lo produce desde 1896, y hoy lo hace aquí, en la hacienda Chobolobo, con la cáscara de la laraha: una naranja que los españoles trajeron y que en la tierra seca de la isla se volvió amarga e incomible. Lo curioso es que el licor es transparente: el azul es solo colorante. Lo hacen azul porque así es el mar de Curazao.',
  fuerte:'Dentro del mismo hotel hay un fuerte colonial del siglo XVIII: el Fuerte Piscadera, construido para proteger esta bahía de piratas y corsarios. Búsquenlo en el mapa del hotel: es el número 23.',
  cabana:'Mambo Beach es el bulevar de la fiesta: restaurantes, bares y clubes en la arena. El miércoles es la noche de Cabana Beach, con música en vivo y después DJ. A bailar, que mañana se descansa.'
};

/* Rutas por día para el mapa animado. mode: car | foot | air */
const ROUTES = {
  dom:{title:'Domingo · Llegada', color:'#1FB5B0', stops:[
    {p:'bog',t:'7:30 a.m.',s:'Despegamos de Bogotá'},
    {p:'cur',t:'10:30 a.m.',m:'air',s:'Llegamos a Curazao'},
    {p:'hotel',t:'11:45 a.m.',m:'car',s:'Check-in y todo incluido'} ]},
  lun:{title:'Lunes · Cuevas y Willemstad', color:'#F26B5B', stops:[
    {p:'hotel',t:'8:40 a.m.',s:'Salimos en los 2 carros'},
    {p:'hato',t:'9:00 a.m.',m:'car',s:'Tour guiado · US$10'},
    {p:'avestruz',t:'11:00 a.m.',m:'car',s:'Safari · US$17'},
    {p:'hotel',t:'12:50 p.m.',m:'car',s:'Almuerzo en World Café'},
    {p:'mangrove',t:'3:00 p.m.',m:'car',s:'Kayak guiado · US$25'},
    {p:'mina',t:'4:30 p.m.',m:'foot',s:'Helado y la escultura'},
    {p:'kayakaya',t:'4:40 p.m.',m:'foot',s:'Murales y fotos'},
    {p:'riffort',t:'4:55 p.m.',m:'foot',s:'Subir a la muralla'},
    {p:'puente',t:'5:05 p.m.',m:'foot',s:'Cruzar el puente flotante'},
    {p:'handelskade',t:'5:15 p.m.',m:'foot',s:'Candado en el cañón'},
    {p:'fortams',t:'5:30 p.m.',m:'foot',s:'El patio amarillo'},
    {p:'umbrella',t:'5:45 p.m.',m:'foot',s:'Fotos bajo las sombrillas'},
    {p:'cascada',t:'6:00 p.m.',m:'foot',s:'Opcional: trago al atardecer'},
    {p:'letras',t:'6:20 p.m.',m:'foot',s:'Foto familiar'},
    {p:'pietermaai',t:'6:35 p.m.',m:'foot',s:'Luces navideñas'},
    {p:'hotel',t:'8:15 p.m.',m:'car',s:'Cena buffet'} ]},
  mar:{title:'Martes · Playas del oeste', color:'#0FA3B1', stops:[
    {p:'hotel',t:'7:40 a.m.',s:'Salimos con el tanque lleno'},
    {p:'shete',t:'8:30 a.m.',m:'car',s:'Entrada · US$15'},
    {p:'piskado',t:'9:50 a.m.',m:'car',s:'Tortugas · gratis'},
    {p:'kenepa',t:'11:50 a.m.',m:'car',s:'Playa + almuerzo'},
    {p:'santamartha',t:'1:45 p.m.',m:'car',s:'Parada de fotos'},
    {p:'casabao',t:'2:20 p.m.',m:'car',s:'US$6 por carro'},
    {p:'flamencos',t:'4:15 p.m.',m:'car',s:'Gratis desde la vía'},
    {p:'hotel',t:'5:15 p.m.',m:'car',s:'Cena Seaside Grill'} ]},
  mie:{title:'Miércoles · Historia y rumba', color:'#7C6BD0', stops:[
    {p:'hotel',t:'8:50 a.m.',s:'Salimos a Otrobanda'},
    {p:'riffort',t:'9:30 a.m.',m:'car',s:'Inicia el Free Walking Tour'},
    {p:'fortams',t:'9:55 a.m.',m:'foot',s:'Fuerte Amsterdam'},
    {p:'mercado',t:'10:10 a.m.',m:'foot',s:'Mercado flotante'},
    {p:'sinagoga',t:'10:25 a.m.',m:'foot',s:'La sinagoga más antigua'},
    {p:'puente',t:'10:45 a.m.',m:'foot',s:'De vuelta a Otrobanda'},
    {p:'kurahulanda',t:'11:00 a.m.',m:'foot',s:'Kura Hulanda'},
    {p:'hotel',t:'1:15 p.m.',m:'car',s:'Almuerzo'},
    {p:'chobolobo',t:'3:00 p.m.',m:'car',s:'Tour · US$20'},
    {p:'hotel',t:'4:20 p.m.',m:'car',s:'Siesta y cena en Oceana'},
    {p:'cabana',t:'10:00 p.m.',m:'car',s:'Cabana Nights 🎉'} ]},
  jue:{title:'Jueves · Regreso', color:'#3FB984', stops:[
    {p:'hotel',t:'3:15 p.m.',s:'Traslado al aeropuerto'},
    {p:'cur',t:'3:30 p.m.',m:'car',s:'Check-in y duty free'},
    {p:'bog',t:'7:20 p.m.',m:'air',s:'¡Bienvenidos a casa!'} ]}
};
if (typeof module !== 'undefined') module.exports = {TT, PLACES, GUIA, ROUTES};

/* Elige la voz más natural disponible en el dispositivo (Edge/Windows: "Natural"; Android: Google; iPhone: Mejorada/Premium) */
function bestVoice(){
  let vs=[];try{vs=speechSynthesis.getVoices().filter(v=>/^es/i.test(v.lang))}catch(e){return null}
  if(!vs.length)return null;
  let saved=null;try{saved=localStorage.getItem('dushi_voice')}catch(e){}
  if(saved){const v=vs.find(x=>x.name===saved);if(v)return v}
  const score=v=>{let s=0;const n=v.name;
    if(/natural|neural|online/i.test(n))s+=50; if(/premium|enhanced|mejorada|siri/i.test(n))s+=40; if(/google/i.test(n))s+=30;
    if(/CO/i.test(v.lang))s+=12; else if(/MX|US|419/i.test(v.lang))s+=8; else if(/ES/i.test(v.lang))s+=4;
    if(/salome|gonzalo|dalia|jorge|paloma|elena|paulina|m[oó]nica/i.test(n))s+=5; if(v.localService===false)s+=3; return s};
  return vs.sort((a,b)=>score(b)-score(a))[0];
}
function speakText(t,onend){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);const v=bestVoice();if(v){u.voice=v;u.lang=v.lang}else u.lang='es-CO';u.rate=0.98;u.pitch=1.02;u.onend=onend||null;u.onerror=onend||null;speechSynthesis.speak(u);return u}catch(e){if(onend)onend()}}
try{speechSynthesis.getVoices();speechSynthesis.onvoiceschanged=()=>{}}catch(e){}
