import * as EQTIME from '../astronomia-master/src/eqtime.js';
import * as JULIAN from '../astronomia-master/src/julian.js';
import { apparentEquatorial } from '../astronomia-master/src/solar.js';
import {
	march,
	june,
	september,
	december
} from '../astronomia-master/src/solstice.js';

//export const SP = "Polar or straight style", BF = "Bifilar (vertical)", BFG = 'Bifilar generalised', ANL = 'Analemmatic';///+++
export const SP = "Polar or straight style", BF = "Bifilar (vertical)", BFG = 'Bifilar generalised', ANL = 'Analemmatic', RTS='Ray tracing sundial';///+++


 
export let cs = {
	version: "",
	hsol: 13,
	dayofYear: 105,
	year: 2022,

	//geometry 
	typeCadran: SP,// {value:SP,comment:"Sundial type"},
	typeForme:"box",
	largeur: 600,
	hauteur: 400,
	epaisseur: 30,
	decli: 0,
	incli: 90,
	rot: 0,

	hgnomon: 50,
	egnomon: 1,
	xgnomon: 0,
	ygnomon: 100,
	zgnomon: 70,
	vgnomon: true,
	vstyle: true,
	vsousstyle: true,
	angleStyleSousstylaire: 0,
	xPole: 0,
	yPole: 0,
	///++++
	xdirect: 0,			// Direction en ° /centre de projection cadran analemmatique, positif à droite du cadran
	ydirect: 0,			// Directionen ° /centre de projection cadran analemmatique, positif en haut du cadran
	//zdirect:50,			// Direction/centre de projection cadran analemmatique, positif au dessus du cadran
	Hanalem: 200,			// Hauteur du gnomon pour cadran analemmatique
	Ranalem: 200,		// Rayon du cercle équatorial pour cadran analemmatique
	//DatesAlalem: [],     // dates sur l'axe des dates
	colorAnalem: "rgb(100,10,100)",
	Canalem: false,	// Cadran analemmatique à projection centale   Non utilisé
	textSizeANL: 1,
	dateAnalem: 21,
	///++++

	hfilHorizontal: 30,
	hfilVertical: 50,
	anglefilHorizontal: 0,
	anglefilVertical: 90,

	hA1: 30, xA1: -300, yA1: 100, //support1 du fil A
	hA2: 30, xA2: 300, yA2: 100, //support2 du fil A
	hB1: 50, xB1: 0, yB1: -200,  //support1 du fil B	
	hB2: 50, xB2: 0, yB2: 200,  //support2 du fil B

	//colors sundial
	colorCS: "rgb(250,250,250)",
	emissiveCS: "rgb(150,150,150)",
	specularCS: "rgb(0,0,0)",
	metalness: 0.5,
	opaciteCS: 0.8,
	//texture:'acier',

	//geolocation
	lati: 43.6,
	longi: 0,
	adresse: "",
	urlOpenStreet: "",
	timezone: "",
	offset_sec: 0,
	offset_string: "",
	now_in_dst: 0,
	dst: 0,
	autoLocation: false,

	// hours
	heuresSolaires: true,
	heuresLegalesSummerAutums: false,
	heuresLegalesWinterSpring: false,
	heuresAntiques: false,
	heuresBabyloniques: false,
	heuresItaliques: false,
	heuresSideralesWS: false,
	heuresSideralesSA: false,
	colorHS: "rgb(200,0,0)",
	colorHLSummerAutums: "rgb(0,200,5)",
	colorHLWinterSpring: "rgb(0,0,200)",
	colorHeuresAntiques: "rgb(200,0,200)",
	colorHeuresBabyloniques: "rgb(0,150,200)",
	colorHeuresItaliques: "rgb(0,150,100)",
	colorHeuresSDSA: "rgb(100,100,10)",
	colorHeuresSDWS: "rgb(102,16,10)",
	textSizeHS: 1,
	textSizeSA: 1,
	textSizeWS: 1,
	textSizeHA: 1,
	textSizeHB: 1,
	textSizeHI: 1,
	textSizeSDSA: 1,
	textSizeSDWS: 1,
	hoursTextSize: 1,
	subDivisions: 1,
	precisionHours: 5,   // un point tous les 5 jours, tous les jours au voisinage des solstices 

	//arcs diurnes
	equinoxeAndSolstices: false,
	colorequinoxeAndSolstice: "rgb(152,0,0)",
	datesArcsDiurnes: [],  // [[date, dec en rad]]  tableau à deux dimensions
	precisionArcs: 15,   // un point toutes les 15 minutes

	//display
	devise: "Carpe Diem",
	positionDevisex: -280,
	positionDevisey: -180,
	deviseSize: 1,
	axesESZ: true,
	axesXYZ: true,
	voirTerre: true,
	vrotscene: 0,
	vrotSun: 0,
	linkMedia: "",
	autoCloseMenu: false,
	//comments:"http://",
	//backgroundColor
	background: "rgb(0,0,0)",
	//export
	unitSVG: 'auto',
	separateurCSV: ";",
	nameFile: "mySundial",
	export: "Sundial(JSON)"
};

// ----------------------------------------------------------------------------------------------------
export function HTLM(cs) {
	let htmlText = `
<!DOCTYPE html>
<html lang="en">
  <head>					
  <meta charset="utf-8" />
  <title> ${cs.nameFile}</title>
</head>
<body>
    <H1>Sundial :  ${cs.nameFile}</H3>
	<H2>CadsolOnLine</H2> 
	Licence CECILL <br>
	<br>
	Version of CadsolOnLine:  ${cs.version}<br>
	Ephemeris for the year:  ${cs.year}<br>
	<H3>Sundial type:  ${cs.typeCadran}</H3>
	
	<H5>Geolocation</H5> 
	latitude : ${cs.lati.toFixed(6)}° (decimal degrees, positive to the north, negative to the south) <br>
	longitude : ${cs.longi.toFixed(6)}° (decimal degrees, positive to east, negative to the west) <br>
	adress : ${cs.adresse}<br>
	time zone : ${cs.timezone}<br>
	offset : ${cs.offset_sec} (seconds)<br>
	offset +/-HHMM : ${cs.offset_string} (hours:minuts)<br>

	<H5>Geometry</H5> 
	width: ${cs.largeur} (arbitrary unit)<br>
    height: ${cs.hauteur} (arbitrary unit)<br>
	thickness: ${cs.epaisseur} (arbitrary unit)<br>
	
	declination	: ${cs.decli}° (decimal degrees, positive to the east, negative to the west)<br>
	inclination	: ${cs.incli}° (decimal degrees,  0°:horizontal  90°:vertical ) <br><br>
`

	if (cs.typeCadran == SP) {
		htmlText += `
	diameter of the style : ${cs.egnomon}  (arbitrary unit)<br>
	length of the straight style : ${cs.hgnomon}  (arbitrary unit)<br>
	coordinates of the foot of the straight style  : (${cs.xgnomon.toFixed(2)} , ${cs.ygnomon.toFixed(2)})  (origin: center of the rectangle)<br>
	coordinates of the pole of the sundial : (${cs.xPole.toFixed(2)} , ${cs.yPole.toFixed(2)})  (origin: center of the rectangle)<br>
	angle between style and substyle : ${cs.angleStyleSousstylaire.toFixed(1)}° (decimal degrees)<br>
	`
	}
	if (cs.typeCadran == BF) {
		htmlText += `
	diameter of the wires : ${cs.egnomon}  (arbitrary unit)<br>
	Horizontal wire height : ${cs.hfilHorizontal}  (arbitrary unit)<br>
    Vertical wire height : ${cs.hfilVertical}  (arbitrary unit)<br>
	wire A angle with horizontal : ${cs.anglefilHorizontal}° (decimal degrees, positive clockwise)<br>
    wire B angle with horizontal : ${cs.anglefilVertical}° (decimal degrees, positive clockwise)<br>
	wire crossing coordinates: (${cs.xgnomon.toFixed(2)} , ${cs.ygnomon.toFixed(2)})  (origin: center of the rectangle)<br>
	coordinates of pillar A1: (${cs.xA1.toFixed(2)} , ${cs.yA1.toFixed(2)})  (origin: center of the rectangle)<br>
	coordinates of pillar A2: (${cs.xA2.toFixed(2)} , ${cs.yA2.toFixed(2)}) <br>
	coordinates of pillar B1: (${cs.xB1.toFixed(2)} , ${cs.yB1.toFixed(2)}) <br>
	coordinates of pillar A2: (${cs.xB2.toFixed(2)} , ${cs.yB2.toFixed(2)})	<br>	
	`
	}
	if (cs.typeCadran == BFG) {
		htmlText += `
	diameter of the wires : ${cs.egnomon}  (arbitrary unit)<br>
	wire A angle with horizontal : ${cs.anglefilHorizontal}° (decimal degrees, positive clockwise)<br>
    wire B angle with horizontal : ${cs.anglefilVertical}° (decimal degrees, positive clockwise)<br>
	wire crossing coordinates: (${cs.xgnomon.toFixed(2)} , ${cs.ygnomon.toFixed(2)})  (origin: center of the rectangle)<br>
	height of pillar A1 : ${cs.hA1}<br>
	height of pillar A2 : ${cs.hA2}<br>
	height of pillar B1 : ${cs.hB1}<br>
	height of pillar B2 : ${cs.hB2}<br>
	coordinates of pillar A1: (${cs.xA1.toFixed(2)} , ${cs.yA1.toFixed(2)})  (origin: center of the rectangle)<br>
	coordinates of pillar A2: (${cs.xA2.toFixed(2)} , ${cs.yA2.toFixed(2)}) <br>
	coordinates of pillar B1: (${cs.xB1.toFixed(2)} , ${cs.yB1.toFixed(2)}) <br>
	coordinates of pillar A2: (${cs.xB2.toFixed(2)} , ${cs.yB2.toFixed(2)})	<br>	
	`
	}
	if (cs.typeCadran == ANL) {
		htmlText += `
	righ or left  tilt of the  style : ${cs.xdirect}° (decimal degrees)<br>
	up or down  tilt of the style : ${cs.ydirect}° (decimal degrees)<br>
	Height of the gnomon : ${cs.Hanalem}<br> (arbitrary unit)
	Radius of the equatorial circle : ${cs.Ranalem}<br>
	Dates on the date axis :  ${cs.dateAnalem} (for each month)<br>
	Center of the line of dates (equinox): (${cs.xgnomon.toFixed(2)} , ${cs.ygnomon.toFixed(2)})  (origin: center of the rectangle)<br>
		`
	}
	
	htmlText += `<br><br><br>
	Motto : ${cs.devise}<br>
	Link web : ${cs.linkMedia}<br>
	<br>
	
End
</body>
</html>
`
	return htmlText

}

//TableSol------------------------
export function TableSol(year) {
	let jde, ae, dec, eqt, jdes, eqts, decs;
	let decSunMin = 0, decSunMax = 0, jdecSunMin = 0, jdecSunMax = 0, j = 0;
	jdes = []; eqts = []; decs = []
	jde = JULIAN.CalendarGregorianToJD(year, 1, 1.5);  //Premier Janvier à 12h
	while (jde <= JULIAN.CalendarGregorianToJD(year, 12, 31.5))//31 decembre à 12h
	{
		ae = apparentEquatorial(jde);
		dec = ae.dec;
		if (dec > decSunMax) { decSunMax = dec; jdecSunMax = j };
		if (dec < decSunMin) { decSunMin = dec; jdecSunMin = j };
		eqt = EQTIME.eSmart(jde);
		jdes.push(jde); eqts.push(eqt); decs.push(dec)
		jde += 1; j += 1
	};
	// console.log(jdecSunMin,jdecSunMax);
	return {//Tableaux à 365 ou 366 elements, valeurs calculées à 12h, index: 0...364 ou 0...365
		decSuns: decs,  //radians
		eqtimes: eqts,  //equation of time as an hour angle in radians.
		jdates: jdes,    //jourjulien
		//jours des solstices
		jdecSunMin,
		jdecSunMax,
		eqMars: march(cs.year),
		eqSeptembre: september(cs.year),
		solDecembre: december(cs.year),
		solJuin: june(cs.year)
	}

}

//--------------------------------------------------------------------------------------------------------
export function RechercheParAdresse(v) {
	//  adrAPIOpenStreet :=
	//       'http://api.opencagedata.com/geocode/v1/json?key=a110b502b29f4de9a47d95bc3b6c5e98&q='
	//       + adresse + '&limit=1';
	//  OpenStreetURL: String = 'https://www.openstreetmap.org/#map=15/%s/%s';

	// Create an XMLHttpRequest object
	const xhttp = new XMLHttpRequest();

	// Define a callback function
	xhttp.onload = function () {
		// Here you can use the Data
		let myObj = JSON.parse(this.responseText);
		//console.log(JSON.stringify(myObj,null,2));
		if (myObj.total_results > 0) {
			cs.adresse = myObj.results[0].formatted;
			cs.lati = myObj.results[0].geometry.lat;
			cs.longi = myObj.results[0].geometry.lng;
			cs.urlOpenStreet = myObj.results[0].annotations.OSM.url;
			cs.timezone = myObj.results[0].annotations.timezone.name;
			cs.offset_sec = myObj.results[0].annotations.timezone.offset_sec;
			cs.offset_string = myObj.results[0].annotations.timezone.offset_string;
			cs.now_in_dst = myObj.results[0].annotations.timezone.now_in_dst;

			//window.open(cs.urlOpenStreet, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=100,width=400,height=400")
		} else { alert('no result for ' + v) }
		// console.log(cs.urlOpenStreet);
	}
	xhttp.onerror = function () { // ne se déclenche que si la demande n'a pas pu être faite du tout
		alert(`Network Error`);
	};

	xhttp.onprogress = function (event) { // se déclenche périodiquement
		// event.loaded - combien d'octets téléchargés
		// event.lengthComputable = true si le serveur a envoyé l'en-tête Content-Length
		// event.total - nombre total d'octets (si lengthComputable)
		alert(`Received ${event.loaded} of ${event.total}`);
	};
	// Send a request
	try {
		xhttp.open("GET", "https://api.opencagedata.com/geocode/v1/json?key=a110b502b29f4de9a47d95bc3b6c5e98&q=" + v + "&limit=1", false);
		xhttp.send();

	} catch (error) {
		alert('no connection')
	}

}

//----------------------------------------------------------------------------------------------------
function showPosition(position) {
	cs.lati = position.coords.latitude;
	cs.longi = position.coords.longitude;
}
export function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		alert("Geolocation is not supported by this browser.");
	}
}

// --------------------------------------------------------------------------------------------------------
export function eclair() {
	var la = cs.lati * Math.PI / 180, ic = cs.incli * Math.PI / 180, dc = -cs.decli * Math.PI / 180;
	var amn, a1 = 5, a2, amx, ob = .4091;

	function alev(la, lo) {
		// Angle horaire local minimum au lever du soleil
		// à la latitude la et différence de longitude lo
		var al = -Math.acos(-Math.abs(Math.tan(la)) * Math.tan(ob)) + lo;
		if (al < -Math.PI) al += 2 * Math.PI;
		return al;
	}

	function acou(la, lo) {
		// Angle horaire local maximum au coucher du soleil
		// à la latitude la et différence de longitude lo
		var ac = Math.acos(-Math.abs(Math.tan(la)) * Math.tan(ob)) + lo;
		if (ac > Math.PI) ac -= 2 * Math.PI;
		return ac;
	}

	// Latitude du cadran horizontal équivalent (CHE)
	var lae = Math.asin(Math.sin(la) * Math.cos(ic) - Math.cos(la) * Math.cos(dc) * Math.sin(ic));
	// Différence de longitude du CHE (positive si le CHE est à l’ouest)
	var loe = Math.atan2(Math.sin(dc) * Math.sin(ic), Math.cos(la) * Math.cos(ic) + Math.sin(la) * Math.cos(dc) * Math.sin(ic));

	if (Math.abs(Math.cos(la) * Math.sin(dc)) >= Math.sin(ob)) {
		// Sur la sphère céleste les intersections des grands cercles
		// de l’horizon et du cadran (I1 et I2) sont hors des tropiques.
		// On se situe donc entre les cercles polaires, le CHE aussi.
		if (loe > 0) {
			// Le CHE est à l’ouest,
			// le cadran n’est pas éclairé le matin
			amn = alev(lae, loe); amx = acou(la, 0);
		} else {
			// Le CHE est à l’est,
			// le cadran n’est pas éclairé le soir
			amn = alev(la, 0); amx = acou(lae, loe);
		}
	} else {
		// Les points I1 et I2 sont entre les tropiques.
		if (la * lae < 0) {
			// Le CHE est situé dans l’autre hémisphère,
			// les points I1 et I2 marquent généralement les heures extrêmes.
			amn = Math.atan2(-Math.cos(dc) / Math.sin(la), Math.sin(dc));
			amx = Math.atan2(Math.cos(dc) / Math.sin(la), -Math.sin(dc));
			if (Math.cos(la) > Math.sin(ob) && Math.cos(lae) > Math.sin(ob) && Math.cos(loe) < 0) {
				// Quand on se situe entre les cercles polaires, le CHE aussi
				// et que la différence de longitude est importante.
				// Le cadran n’est pas éclairé une partie de la journée.
				if (Math.abs(la) > Math.abs(lae)) {
					// Les points I1 et I2 marquent la période sans éclairement
					// et le cadran peut être éclairé le reste de la journée.
					a1 = amx; a2 = amn;
					amn = alev(la, 0); amx = acou(la, 0);
				} else {
					// Les heures sans éclairement proviennent de la position du cadran
					a1 = acou(lae, loe); a2 = alev(lae, loe);
				}
			}
		} else {
			// Le CHE est dans le même hémisphère
			if (Math.cos(la) <= Math.sin(ob) && Math.cos(lae) <= Math.sin(ob)) {
				// On se situe dans la zone polaire, le CHE aussi.
				// Le cadran peut être éclairé toute la journée.
				amn = -Math.PI; amx = Math.PI;
			} else {
				if (Math.cos(la) > Math.sin(ob) && Math.cos(lae) > Math.sin(ob) && Math.cos(loe) < 0) {
					// On se situe entre les cercles polaires, le CHE aussi
					// et la différence de longitude est importante.
					// Le cadran n’est pas éclairé une partie de la journée.
					amn = alev(la, 0); a1 = acou(lae, loe);
					a2 = alev(lae, loe); amx = acou(la, 0);
				} else {
					if (Math.abs(la) <= Math.abs(lae)) {
						// Dans le cas où la latitude la est plus petite que lae,
						// c’est l’horizon qui limite l’éclairement.
						amn = alev(la, 0); amx = acou(la, 0);
					} else {
						// Sinon c’est le cadran qui limite son éclairement.
						amn = alev(lae, loe); amx = acou(lae, loe);
					}
				}
			}
		}
	}

	if (a1 == 5) { a1 = 0; a2 = 0; }
	if (amn > amx) amx += 2 * Math.PI;
	return [amn, a1, a2, amx];
}

// Import

// var form = document.createElement( 'form' );
// form.style.display = 'none';
// document.body.appendChild( form );

// var fileInput = document.createElement( 'input' );
// fileInput.multiple = true;
// fileInput.type = 'file';
// fileInput.addEventListener( 'change', function () {

// 	editor.loader.loadFiles( fileInput.files );
// 	form.reset();

// } );
// form.appendChild( fileInput );

// var option = new UIRow();
// option.setClass( 'option' );
// option.setTextContent( strings.getKey( 'menubar/file/import' ) );
//option.onClick( function () {

//	fileInput.click();

//} );
//options.add( option );

//





