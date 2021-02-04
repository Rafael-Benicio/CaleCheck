import React from 'react';
import {Text, View, TouchableOpacity, TouchableNativeFeedback, } from 'react-native';

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
		return build}

	// Preencheer os dias da semana
	const iniciaDiaMes=(array,init=5,dias)=>{
		let day=daysGenesis(dias)
		let print=false
		let passDay=0
		let arr=array

		for(let i=0;i<arr.length;i++){
			for(let j=0;j<arr[i].length;j++){
				if(i!=0){
					if(1==i && init==j || print ){
						arr[i][j]=day[passDay]
						passDay++
						print=true
						if(passDay==dias){
							print=false
						}
					}else arr[i][j]=" "
		}}}
		console.log(arr);
		return arr
	}

	// Para gerar as semanas
	const semanaGenesis=()=>{
		let sem=[['Dom','Seg','Ter','Qua','Qui','Sex','Sab']]
		for(let i=0;i<6;i++){
			sem.push([1,2,3,4,5,6,7])
		}


		if(nomeMes=='Janeiro'){ //          Janeiro
				sem=iniciaDiaMes(sem,5,31)
		}else if(nomeMes=='Fervereiro'){ // Fervereiro
				sem=iniciaDiaMes(sem,1,28)
		}else if(nomeMes=='Março'){ //      Março
				sem=iniciaDiaMes(sem,1,31)
		}else if(nomeMes=='Abril'){//       Abril
				sem=iniciaDiaMes(sem,4,30)
		}else if(nomeMes=='Maio'){//        Maio
				sem=iniciaDiaMes(sem,6,31)
		}else if(nomeMes=='Junho'){//       Junho
				sem=iniciaDiaMes(sem,2,30)
		}else if(nomeMes=='Julho'){//       Julho
				sem=iniciaDiaMes(sem,4,31)
		}else if(nomeMes=='Agosto'){//      Agosto
				sem=iniciaDiaMes(sem,0,31)
		}else if(nomeMes=='Setembro'){//    Setembro
				sem=iniciaDiaMes(sem,3,30)
		}else if(nomeMes=='Outubro'){//     Outubro
				sem=iniciaDiaMes(sem,5,31)
		}else if(nomeMes=='Novembro'){//    Novembro
				sem=iniciaDiaMes(sem,1,30)
		}else if(nomeMes=='Dezembro'){//    Dezembro
				sem=iniciaDiaMes(sem,3,31)
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
							if(!i.indexOf('Dom')){
								return (
									<TouchableNativeFeedback style={styles.viewDay} key={u}>
										<Text style={styles.textDay} >{o}</Text>
									</TouchableNativeFeedback>	
								)
							}else if(o==" "){										
								return (
									<TouchableOpacity style={styles.bloDay} key={u}>
										<Text style={styles.textDay}></Text>
									</TouchableOpacity>	
								)
							}else{										
								return (
									<TouchableOpacity style={styles.viewDay} key={u}>
										<Text style={styles.textDay} >{o}</Text>
									</TouchableOpacity>	
								)
							}
						}
						)}</View>
						))
				}
			</View>
		</View>
		);
}

export default Mes;
