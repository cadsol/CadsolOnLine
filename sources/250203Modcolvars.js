import * as EQTIME from 'astronomia/eqtime.js';
import * as JULIAN from 'astronomia/julian.js';
import * as SEXA from 'astronomia/sexagesimal.js';
import { apparentEquatorial,apparentEquatorialVSOP87,apparentLongitude } from 'astronomia/solar.js';
import {
	march2,
	june2,
	september2,
	december2,
} from 'astronomia/solstice.js';
import { base, planetposition} from "../astronomia-master/src/index.js"
import data from '../astronomia-master/data/index.js'



export const SP = "Polar or straight style", BF = "Bifilar (vertical)", BFG = 'Bifilar generalised', 
             ANL = 'Analemmatic', RTS='Ray tracing sundial',STP = "Profiled style";
			

export const Dst=1500 // distance terre soleil
export const oe=23.4392911  // obliquite de l'Ecliptique, equinoxe de reference 2000.0
let CSVephemerid = ""

export let cs = {
	version: "",
	hsol: 13,
	dayofYear: 105,
	year: 2000,

	//geometry 
	typeCadran: SP,// {value:SP,comment:"Sundial type"},
	typeForme:"parallelepiped",
	largeur: 600,
	hauteur: 400,
	epaisseur: 30,
	decli: 0,
	incli: 90,
	rot: 0,

	//cadran à style profilé
	a: 5, Rmax: 20, sais: true, appx: false, reb: false,support:false,//saisSA:true,saisWS:false,

	//Cadran parametrique
	zfxy:"",
	gParam_xText:"u",
	gParam_yText:"v",
	gParam_zText:"D*sin(A*sqrt(u*u+v*v))",
	gParam_uMin :-1,
	gParam_uMax :1,
	gParam_vMin :-1,
	gParam_vMax : 1,
	gParam_segments : 50,
	gParam_a :25,
	gParam_b :1,
	gParam_c :1,
	gParam_d :1,

	// cadran a style polaire
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
	hgnomonBord:0,

	///Cadran analemmatique++++
	xdirect: 0,			// Direction en ° /centre de projection cadran analemmatique, positif à droite du cadran
	ydirect: 0,			// Direction en ° /centre de projection cadran analemmatique, positif en haut du cadran
	zdirect: 60,		// Distance relative du centre de projection cadran analemmatique, positif au dessus du cadran
	Hanalem: 200,		// Hauteur du gnomon pour cadran analemmatique
	Ranalem: 200,		// Rayon du cercle équatorial pour cadran analemmatique
	colorAnalem: "rgb(100,10,100)",
	Canalem: false,	// Cadran analemmatique à projection centale   
	textSizeANL: 1,
	dateAnalem: 21,     // dates sur l'axe des dates
	subAnalem: 1,

	///CadranBifilaire++++
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
	emissiveCS: "rgb(55,55,55)",
	specularCS: "rgb(0,0,0)",
	metalness: 0.5,
	roughness:0.5,
	opaciteCS: 1,
	wireframe:false,
	nameTexture:"steel",
	dataURL:"",  //fichier 3D du cadran
	typedataURL:"", // obj, ply, gltf
	dataURLtexture:"",  // image : fond du cadran en jpg ou png
	dataSVG:"", // fond du cadran en svg

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
	autoLocation:false,

	// hours
	heuresSolaires:true,
	heuresLegalesSummerAutums: false,
	heuresLegalesWinterSpring: false,
	heuresAntiques: false,
	heuresBabyloniques: false,
	heuresItaliques: false,
	heuresSideralesWS: false,
	heuresSideralesSA: false,
	heuresPlanetairesWS: false,
	heuresPlanetairesSA: false,
	
	colorHS: "rgb(200,0,0)",
	colorHLSummerAutums: "rgb(0,200,5)",
	colorHLWinterSpring: "rgb(0,0,200)",
	colorHeuresAntiques: "rgb(200,0,200)",
	colorHeuresBabyloniques: "rgb(0,150,200)",
	colorHeuresItaliques: "rgb(0,150,100)",
	colorHeuresSDSA: "rgb(100,100,10)",
	colorHeuresSDWS: "rgb(102,16,10)",
	colorHeuresHPSA: "rgb(250,250,10)",
	colorHeuresHPWS: "rgb(1,250,10)",
	textSizeHS: 1,
	textSizeSA: 1,
	textSizeWS: 1,
	textSizeHA: 1,
	textSizeHB: 1,
	textSizeHI: 1,
	textSizeSDSA: 1,
	textSizeSDWS: 1,
	textSizeHPSA: 1,
	textSizeHPWS: 1,
	hoursTextSize: 1,
	subDivisions: 1,
	precisionHours: 5,   // un point tous les 5 jours, tous les jours au voisinage des solstices 

	//arcs diurnes
	equinoxeAndSolstices: false,
	arcsZodiaque:false,
	colorequinoxeAndSolstice: "rgb(50,100,250)",
	datesArcsDiurnes: [[]],  // [[date, dec en rad]]  tableau à deux dimensions
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
	autoCloseMenu: true,
	background: "rgb(10,30,50)",
	milkyWay:false,
	dampingFactor: 10,	
	vrotClouds:1,
	posCamera:[2000,2000,1500],
	sphereArmilaire:false,
	ecliptique:false,

	//export
	unitSVG: 'auto',
	separateurCSV: ";",
	nameFile: "mySundial",
	export: "Sundial(.JSON)",

	// polyedres
	typePolyedre:"Dodecahedron", // par defaut
	rayonPolyedre:200,
	conicity:2,
	uniform:true,
	
	polyGx:[],
	polyGy:[],
	polyGz:[], // sommet du style droit en coord.locales		
	polyheuresSolaires: [],
	polyheuresLegalesSummerAutums: [],
	polyheuresLegalesWinterSpring: [],
	polyheuresAntiques: [],
	polyheuresBabyloniques: [],
	polyheuresItaliques: [],
	polyheuresSideralesWS: [],
	polyheuresSideralesSA: [],
	polyheuresPlanetairesWS: [],
	polyheuresPlanetairesSA: [],
	polyequinoxeAndSolstices: [],
	polyarcsZodiaque: [],
	polydatesArcsDiurnes: [[]], // [[date, dec en rad]]  tableau à deux dimensions
	polyDev:[],
	polyDevx:[],
	polyDevy:[],
	polysubDivisions:[],
	polyDevTextsize:1
}

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
		if (cs.hgnomonBord>0){
		htmlText += `length of the style on the border : ${cs.hgnomonBord.toFixed(2)}  (arbitrary unit)<br>
		`
		}
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


//--------------------------------------------------------------------------------------------------------
/**
 * RechercheParAdresse - Fetches address details from the OpenCageData API and updates the `cs` object with the results.
 *
 * @param {string} v - The address to search for.
 *
 * This function sends a GET request to the OpenCageData API with the provided address.
 * On successful response, it parses the JSON data and updates the `cs` object with the address details,
 * including formatted address, latitude, longitude, OpenStreetMap URL, timezone information, and DST status.
 *
 * If no results are found, it alerts the user with a message.
 * In case of a network error, it alerts the user with a "Network Error" message.
 *
 * The function also includes a progress event handler to monitor the download progress.
 *
 * @throws Will alert 'no connection' if there is an error sending the request.
 */
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
		//alert(`Received ${event.loaded} of ${event.total}`);
	};
	// Send a request
	try {
		xhttp.open("GET", "https://api.opencagedata.com/geocode/v1/json?key=a110b502b29f4de9a47d95bc3b6c5e98&q=" + v + "&limit=1", []);
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
//TableSol------------------------
/**
 * Calculates various solar parameters for each day of a given year.
 *
 * @param {number} year - The year for which to calculate the solar parameters.
 * @param {boolean} [ephemerid=false] - If true, use VSOP87 for calculations
 * @returns {Object} An object containing arrays of calculated values and solstice days:
 * @returns {number[]} decSuns - Array of solar declinations in radians.
 * @returns {number[]} ascRights - Array of right ascensions in radians.
 * @returns {number[]} eqtimes - Array of equation of time values as hour angles in radians.
 * @returns {number[]} apLongs - Array of apparent longitudes of the sun if ephemerid=true
 * @returns {number[]} jdates - Array of Julian dates.
 * @returns {number} jdecSunMin - Julian date of the minimum solar declination (winter solstice).
 * @returns {number} jdecSunMax - Julian date of the maximum solar declination (summer solstice).
 */
export function TableSol(year,ephemerid=false) {
	let jde, ae, dec,ra, eqt, jdes, eqts, decs,rasc,apLong,apLongs;
	let decSunMin = 0, decSunMax = 0, jdecSunMin = 0, jdecSunMax = 0, j = 0;
	jdes = []; eqts = []; decs = [] ;rasc=[];apLong=[];
	jde = JULIAN.CalendarGregorianToJD(year, 1, 1.5);  //Premier Janvier à 12h
	const planet = new planetposition.Planet(data.vsop87Dearth)
	while (jde <= JULIAN.CalendarGregorianToJD(year, 12, 31.5))//31 decembre à 12h
	{	if (ephemerid){                           //ephemerid = true pour calculs avec VSOP87
			const T = base.J2000Century(jde)		
			ae = apparentEquatorialVSOP87(planet, jde);
			eqt = EQTIME.e(jde,planet)
			const res = apparentLongitude(T)
			apLong.push(res)
			}
		else{			//ephemerid = false pour calculs avec eSmart
			ae = apparentEquatorial(jde)
			eqt = EQTIME.eSmart(jde)		
			}
		dec = ae.dec;ra=ae.ra
		if (dec > decSunMax) { decSunMax = dec; jdecSunMax = j };
		if (dec < decSunMin) { decSunMin = dec; jdecSunMin = j };

		jdes.push(jde); eqts.push(eqt); decs.push(dec);rasc.push(ra)
		jde += 1; j += 1
	};
	
	return {//Tableaux à 365 ou 366 elements, valeurs calculées à 12h, index: 0...364 ou 0...365
		decSuns: decs,  //radians
		ascRights: rasc, //radians
		eqtimes: eqts,  //equation of time as an hour angle in radians.
		apLongs: apLong,  //apparent longitude of the sun
		jdates: jdes,    //jourjulien
		//jours des solstices
		jdecSunMin,
		jdecSunMax
		// eqMars: march2(cs.year,planet),
		// eqSeptembre: september2(cs.year,planet),
		// solDecembre: december2(cs.year,planet),
		// solJuin: june2(cs.year,planet)
	}

}

/**
 * Formats a number to a specified number of decimal places and pads it with spaces to a specified length.
 *
 * @param {number} x - The number to format.
 * @param {number} nd - The number of decimal places to format the number to. If 0, the number is floored.
 * @param {number} nb - The total length of the resulting string, padded with spaces if necessary.
 * @returns {string} The formatted number as a string.
 */
function Formater (x,nd,nb){
	if(nd==0){x=Math.round(x)}
	let s = x.toFixed(nd)	
	while (s.length <nb) { s = " " + s }
	return s
}





//-----------------------------------------------------------------------------------------------------
//Système de coordonnées (ICRS) : Héliocentre – Équateur – Apparent de la date – Sphériques
//https://ssp.imcce.fr/forms/ephemeris


/**
 * Generates the ephemerides of the sun for a given year in CSV format.
 *
 * @param {number} year - The year for which to generate the ephemerides.
 * @returns {string} The ephemerides of the sun in CSV format.
 */
export function Ephemerid(year) {
	let d, s,sp;

	function EcrireDegMin(s){
		//while(s>180){s-=360}
		const T = SEXA.degToDMS(s)
		if (T[0]==true){CSVephemerid +='  -'}else{CSVephemerid +='   '}
		CSVephemerid += Formater(T[1],0,3) + "° " + Formater(T[2],0,2) + "'  (" +Formater( s,3,7) + "°)" + '                 ' + cs.separateurCSV;
		// +Formater( Math.round(T[3]),0,2) + "'' "     
	}

	CSVephemerid = " DATE" + cs.separateurCSV + "TIME EQUATION (s) " + cs.separateurCSV + "SUN DECLINATION (°) " + cs.separateurCSV + "RIGHT ASCENSION (°) "
				  + cs.separateurCSV + "ECLIPTIC LONGITUDE" + cs.separateurCSV + "JULIAN DAY"  + "\n"
	CSVephemerid += " \n";
	CSVephemerid += "Ephemerids of the sun \n" + "year  :  " + year + "   (12h TU) \n\n";
	CSVephemerid += "CadsolOnLine  Version:" + cs.version + "\n\n";
	CSVephemerid += "Planetary Theory VSOP87 D\n"
	CSVephemerid += "(c) Jean Meeus \n* Chapter 28 Equation of time \n* Chapter 25  Solar Coordinates ...\n\n";
	CSVephemerid += " \n";
	const TS=TableSol(year,true);
	//console.log ("Ephemerides ", year )
	for (let i = 0; i < TS.decSuns.length; i++) {
		d = JULIAN.JDToCalendarGregorian(TS.jdates[i]);
		CSVephemerid += Formater(d.day,1,5) + " / " + Formater(d.month,0,2) + " / " + Formater(d.year,0,4) + cs.separateurCSV;  //date JJ/MM/YYYY

		s = Math.round(SEXA.secFromHourAngle(TS.eqtimes[i]));	// equation du temps en secondes
		if (s < 0) { CSVephemerid += " - "; sp=Math.abs(s)} else { CSVephemerid += "   " ; sp=s }
		CSVephemerid +=Formater(Math.floor(sp/60),0,2)+" min  "+ Formater(sp%60,0,2)+" sec " + cs.separateurCSV;

		EcrireDegMin(base.toDeg(TS.decSuns[i]));    //dec soleil en degres	
		EcrireDegMin(base.toDeg(TS.ascRights[i]));  //asc. droite soleil en degres	
		EcrireDegMin(base.toDeg(TS.apLongs[i]));    //longitude ecliptique soleil en degres
		CSVephemerid += TS.jdates[i]          //jpur julien
		CSVephemerid += cs.separateurCSV

		if (i == TS.jdecSunMin) { CSVephemerid += "  Winter Solstice " }
		if (i == TS.jdecSunMax) { CSVephemerid += "  Summer Solstice " }
			
		CSVephemerid += "\n"	
	}
	CSVephemerid += "\n"	
	CSVephemerid += "\n"	
	CSVephemerid += "\n"	
	CSVephemerid += "Système de coordonnées (ICRS) \n Héliocentre – Équateur – Apparent de la date – Sphériques" + "\n"
	CSVephemerid += "Site de référence             \n  https://ssp.imcce.fr/forms/ephemeris" + "\n"
	CSVephemerid += "\n"
	
	// let hsec = Math.round((juin.day-Math.trunc(juin.day))*3600*24)
	// const h= de(hsec,3600).q;const rs = de(hsec,3600).r;
	// const min= de(rs,60).q;const sec= de(rs,60).r;
	// CSVephemerid += "  Summer Solstice " + Math.trunc(juin.day) + " / " + juin.month + " / " + juin.year + "   "+h+"h"+min+"min"+sec+"s  TU \n"

	return CSVephemerid
}
