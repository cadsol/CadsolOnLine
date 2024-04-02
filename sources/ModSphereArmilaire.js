import { scene,cs,Dst,oe } from './Modcolvars.js';
import * as THREE from 'three';
import * as base from '../astronomia-master/src/base.js';
            
            
            
            let ellipseEq,spherePV,ellipseEclip,horizon,meridien,tropiqueNord, tropiqueSud, polaireNord, polaireSud,axeArmilaire
		
			const curveEquateur = new THREE.EllipseCurve(
				0,  0,            // ax, aY
				Dst, Dst,           // xRadius, yRadius
				0,  2 * Math.PI,  // aStartAngle, aEndAngle
				false,            // aClockwise
				0 );                // aRotation

			const RTropique=Dst*Math.cos(base.toRad(oe))
			const curveTropique = new THREE.EllipseCurve(
				0,  0,            // ax, aY
				RTropique, RTropique,           // xRadius, yRadius
				0,  2 * Math.PI,  // aStartAngle, aEndAngle
				false,            // aClockwise
				0 );  

			const RPolaire=Dst*Math.cos(base.toRad(90-oe))
			const curvePolaire = new THREE.EllipseCurve(
				0,  0,            // ax, aY
				RPolaire, RPolaire,           // xRadius, yRadius
				0,  2 * Math.PI,  // aStartAngle, aEndAngle
				false,            // aClockwise
				0 );  

			const pointsEq = curveEquateur.getPoints( 50 );
			const pointsTropiqueNord= curveTropique.getPoints( 50 );
			const pointsTropiqueSud = curveTropique.getPoints( 50 );
			const pointsPolairesNord= curvePolaire.getPoints( 50 );
			const pointsPolairesSud= curvePolaire.getPoints( 50 );
			const geometryEq= new THREE.RingGeometry(Dst*1.002, Dst*0.998, 64, 64)
			const geometryTropiqueNord = new THREE.BufferGeometry().setFromPoints( pointsTropiqueNord );
			const geometryTropiqueSud = new THREE.BufferGeometry().setFromPoints( pointsTropiqueSud );
			const geometryPolaireNord = new THREE.BufferGeometry().setFromPoints( pointsPolairesNord );
			const geometryPolaireSud = new THREE.BufferGeometry().setFromPoints( pointsPolairesSud );
			const geometryAxeArmilairene= new THREE.CylinderGeometry(RPolaire/200,RPolaire/200,Dst*2.25)
			const materialEq = new THREE.LineBasicMaterial( { color: 0xffffff } );
			const materialEclip = new THREE.LineBasicMaterial( { color: 0xffff00 } );
			const materialHorizon= new THREE.LineBasicMaterial( { color: 0x0a0aff } );
			const materialMeridien = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
			

		function tracerEquateurCeleste() {
			if (ellipseEq != undefined) {scene.remove(ellipseEq)}
			ellipseEq = new THREE.Line( geometryEq, materialEq )
			scene.add(ellipseEq)
			ellipseEq.rotation.x = base.toRad(cs.lati);
			// const AxeArmilaire = axeMonde.clone()
			// AxeArmilaire.setLength(Dst*1.5)
			// scene.add(AxeArmilaire)
		}

		function tracerTropiques() {
			if (tropiqueNord != undefined) {scene.remove(tropiqueNord)}
			if (tropiqueSud != undefined) {scene.remove(tropiqueSud)}
			tropiqueNord = new THREE.Line( geometryTropiqueNord, materialEq );	
			tropiqueSud  = new THREE.Line( geometryTropiqueSud, materialEq );	
			tropiqueNord.rotation.x= base.toRad(cs.lati);
			tropiqueSud.rotation.x = base.toRad(cs.lati);
			tropiqueNord.translateZ (-Dst*Math.sin(oe*Math.PI/180) )
			tropiqueSud.translateZ  ( Dst*Math.sin(oe*Math.PI/180) )
			scene.add(tropiqueNord)
			scene.add(tropiqueSud)
		}

		function tracerPolaires() {
			if (polaireNord != undefined) {scene.remove(polaireNord)}
			if (polaireSud  != undefined) {scene.remove(polaireSud)}
			polaireNord = new THREE.Line( geometryPolaireNord, materialEq );	
			polaireSud  = new THREE.Line( geometryPolaireSud, materialEq );	
			polaireNord.rotation.x= base.toRad(cs.lati);
			polaireSud.rotation.x = base.toRad(cs.lati);
			polaireNord.translateZ (-Dst*Math.sin((90-oe)*Math.PI/180) )
			polaireSud.translateZ  ( Dst*Math.sin((90-oe)*Math.PI/180) )
			scene.add(polaireNord)
			scene.add(polaireSud)
		}


		function tracerHorizonEtMeridien(){
			if (horizon!= undefined) {scene.remove(horizon)}
			horizon = new THREE.Line( geometryEq, materialHorizon );
			horizon.rotation.x = Math.PI/2;
			scene.add(horizon)
			if (meridien!= undefined) {scene.remove(meridien)}
			meridien= new THREE.Line( geometryEq, materialMeridien );
			meridien.rotation.y = Math.PI/2;
			scene.add(meridien)
		}

		function tracerAxeArmilaire(){
			if (axeArmilaire != undefined) {scene.remove(axeArmilaire)}
			axeArmilaire=new THREE.Mesh(geometryAxeArmilairene,materialEq)
			axeArmilaire.rotation.x = base.toRad(-cs.lati);
			scene.add(axeArmilaire)
		}

		export function tracerEcliptique(h){
			tracerEquateurCeleste()
			let k = Dst,alpha=0,asd
			asd = TS.ascRights[cs.dayofYear - 1]
			h=base.toRad(-(h - 12) * 15)-asd
			if (spherePV != undefined) {axeMondeGroup.remove(spherePV)}
			spherePV = new THREE.Mesh(geometrySun, materialGnomon);
		    axeMondeGroup.add(spherePV);
			spherePV.parent = axeMonde;
			spherePV.position.z = k *  Math.cos(h);
			spherePV.position.x = k *  Math.sin(h);
			spherePV.position.y = 0;
			
			const axis=new THREE.Vector3(spherePV.position.x,spherePV.position.z,0)
			axis.normalize()
			if (ellipseEclip != undefined) {axeMondeGroup.remove(ellipseEclip)}
			ellipseEclip=ellipseEq.clone()
			ellipseEclip.material=materialEclip
			axeMondeGroup.add(ellipseEclip);		
			ellipseEclip.rotateOnAxis  ( axis, base.toRad(oe))			
		}

		export function effacerEcliptique(){
			cs.ecliptique=false
			scene.remove(ellipseEq);axeMondeGroup.remove(ellipseEclip);axeMondeGroup.remove(spherePV)
		}

		export function tracerSphereArmilaire(){
			cs.ecliptique=true
			PlacerLeSoleil()
			tracerHorizonEtMeridien()
			tracerEquateurCeleste()
			tracerTropiques()
			tracerPolaires()
			tracerAxeArmilaire()
			PlacerLaTerre(true)
		}

		export function effacerSphereArmilaire(){
			effacerEcliptique()
			scene.remove(horizon)
			scene.remove(meridien)
			scene.remove(tropiqueNord)
			scene.remove(tropiqueSud)
			scene.remove(polaireNord)
			scene.remove(polaireSud)
			PlacerLaTerre(false)
		}


		