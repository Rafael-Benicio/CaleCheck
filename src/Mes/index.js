import React from 'react';
import {Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';

import styles from './styles'

const Mes=({navigation, route})=>{
	// Obtem o mes que será exibido na pagina
	const nomeMes=route.params.mes
	// Identificar possiveis meses
	const cale=['Janeiro','Fervereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
	// Descobrir mes
	const captureMonth=()=>{for(let i=0;i<cale.length;i++){if(nomeMes==cale[i]){return i}}}
	// Passar ou voutar os meses
	const goBack=(vai=true, fun=captureMonth())=>{
		if(vai && fun<11) return (fun+1)
		else if(vai && fun==11) return 0;
		else if(vai==false && fun==0) return 11;
		else return (fun-1)}
	// Para gerar os dias
	const daysGenesis=(dias=30)=>{
		let build=[];
		for(let g=1;g!=(dias+1);g++){
			build.push(g)
		}
		return build
	}
	// Para gerar as semanas
	const semanaGenesis=()=>{
		let sem=[['Dom','Seg','Ter','Qua','Qui','Sex','Sab']]
		for(let i=0;i<5;i++){
			sem.push([1,2,3,4,5,6,7])
		}
		return sem
	}

	

	return(
		<View style={styles.back}>
			<View style={styles.topBar}>
				<TouchableOpacity onPress={()=>navigation.navigate('Mes',{mes:cale[goBack(false)]})}>
					<Text style={styles.backC}>{'<'}</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={()=>navigation.navigate('Check')}>
					<Text style={styles.mesN}>{nomeMes}</Text>
				</TouchableOpacity>
				
				<TouchableOpacity onPress={()=>navigation.navigate('Mes',{mes:cale[goBack(true)]})}>
					<Text style={styles.goC}>{'>'}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.listDay}>	
				{
					semanaGenesis().map((i,j)=>(
						<View style={styles.warpView} key={j}>{
							i.map((o,u)=>{
				
							return (
								<TouchableOpacity style={styles.viewDay} key={u}>
									<Text >{o}</Text>
								</TouchableOpacity>	
						)})
						}</View>
						))
				}
			</View>
		</View>
		);
}

export default Mes;
