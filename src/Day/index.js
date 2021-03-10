import React, {useEffect, useState} from 'react'
import {View,Text, TouchableOpacity,TouchableHighlight,TextInput ,AsyncStorage, Button, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import styles from './styles'

const Day=({navigation, route})=>{

	const valorMes=route.params.valorMes
	const nomeMes=route.params.mes
	const dia=route.params.dia

	const [data,setData]=useState([])
	const [showNew,setShowNew]=useState(false)
	const [conf,setConf]=useState(false)
	const [del,setDel]=useState(false)

	loadData()

	// Carregar dados
	async function loadData(){
		try{			
		    let i=await  AsyncStorage.getItem('Key')
		    let j=JSON.parse(i)		    
	    	setData(j)
		
		}catch(error){
			console.log('Erro ao Obter dados');
		}
	}

	// Salva dados
    async function saveData(n=data){
        try {
            await AsyncStorage.setItem('Key',JSON.stringify(n))
            console.log('====================================');
            console.log('Dados Salvos');
            console.log('====================================');
        } catch (error) {
            console.log('Erro');
        }
	}

	// Carregar Listas padrões 
	async function loadDataDef(j){
		try{
 			let i=await  AsyncStorage.getItem('defa')
		    let j=JSON.parse(i)		    
	    	return j
		}catch(err){
			console.log('Oop!');
		}		
	}

	// Usa lista padão retornada de "loadDataDef(j)"
	function UseDef(dt,dd){
		dt.dia[0].dia='dia'+dia
		dd.mes[valorMes].push(dt.dia[0])
		saveData(dd)
	}

    // Tela de input, sim e não para novos dados
    function addDadosSave(){
    	const [tmp,setTmp]=useState('')
    	if(showNew){
    	    	return (
    	    		<View style={styles.showAdd}>
    	    			<Text  style={styles.textoNova} >Nova Tarefa:</Text>
    	    			<TextInput style={styles.inputAdd} value={tmp} onChangeText={tmp => setTmp(tmp)} multiline={false} maxLength={20} autoFocus={true} />
    	    			<View style={styles.buttonsOr}>
    	    				<Button color='#84f' title="Sim" onPress={()=>{let t=tmp.trim();setTmp('');setShowNew(false); if(t) return addNewDadoSave(data,t);else alert('Sem conteudo')}} /> 
							<Button color='#84f' title="Não" onPress={()=>{setTmp(''); return setShowNew(false)}} />
    	    			</View>
    	    		</View>
    )}}

    // Recebe dados de "addDadosSave()" para fazer registros
   	function addNewDadoSave(obj,ni){
   		let ind=null

   		obj.mes[valorMes].map((i,index)=>{
   			if(i.dia=="dia"+dia)
   				ind=index
   		})

   		if(ind!=null){
   			obj.mes[valorMes][ind].check.push(ni)
   			obj.mes[valorMes][ind].tf.push(false)
   		}else if(ind==null){
   			obj.mes[valorMes].push({check:[ni],tf:[false],dia:'dia'+dia})
		}
		
		console.log(obj.mes[valorMes]);
		saveData(obj)
   	}

   	// Configura ListChecks para True e False
   	function setToTF(dt,ind,index){
		dt.mes[valorMes][ind].tf[index]=(dt.mes[valorMes][ind].tf[index]) ? false : true
		saveData(dt)
   	}

   	function deletarChecks(dt,i,index){
   		// console.log(dt);
   		console.log(i);
   		console.log(index);
   		let arr=[]
   		let ind=null

   		dt.mes[valorMes].map((i,endex)=>{
   			if(i.dia=='dia'+dia){
   				ind=endex
   			}
   		})

   		dt.mes[valorMes][ind].check.map((i,endex)=>{
   			console.log(i);
   			if(index!=)
   		})

   		console.log(dt.mes[valorMes][ind]);
   	}

   	// deletar chacks
   	function checksDelet(i,index){
   		if(del){
	   		return(
				<TouchableOpacity style={styles.Warp} onPress={()=>deletarChecks(data,i,index)}>
					<Icon name="trash" size={20} color="#fff" style={styles.trash} />
				</TouchableOpacity>
	   		)
	   	}
   	}

   	//Cria Lista de Checks
   	function showChecks(dt=data){
   		let ind=null

   		try{
	   		dt.mes[valorMes].map((i,index)=>{
	   			if(i.dia=='dia'+dia){
	   				ind=index
	   			}
	   		})
	
		   	if(ind!=null){
				return(
					dt.mes[valorMes][ind].check.map((i,index)=>{
						let cor=(dt.mes[valorMes][ind].tf[index]) ? '#0d0': '#d00'

						return(
							<View key={index} style={styles.listCheck}>
								{
									checksDelet(i,index)
								}
								<TouchableOpacity 
									style={[styles.buttonCheck,]} 
				 					onPress={()=>setToTF(dt,ind,index)} >								
					 				<Text style={[styles.listTxt]}>{i}</Text>									
					 				<View style={[styles.listTF,{backgroundColor:cor}]}></View>
					 			</TouchableOpacity>		
							</View>
						)
					})

				)
		   	}else{
				console.log('Não have');  	
		   	}
	   	}catch(err){
	   		console.log('nada');
	   	}
   	}

   	function confirmDef(){
   		if(conf){
   			return(
	   			<View style={[styles.showAdd,{alignItems:'center',flex:1}]}>
	   				<Text style={{fontWeight:'bold'}}>Quer carregar os dados padrões?</Text>
	   				<View style={styles.confirmDeff}>
	   					<Button color='#84f' title="Não" onPress={()=>setConf(false)}/>
	   					<Button color='#84f' title="Sim" onPress={()=>{setConf(false);loadDataDef().then((j)=>UseDef(j,data))}}/>
	   				</View>	
	   			</View>
   			)
   		}
   	}

	return(
		<View style={styles.back}>
			<View style={styles.topBar}>
					<TouchableOpacity style={styles.warpMesDia} onPress={()=>navigation.navigate('Mes',{mes:nomeMes})}>
						<Text style={styles.mesDia}>{'Dia '+dia+' de '+nomeMes}</Text>
					</TouchableOpacity>

					<TouchableHighlight underlayColor='#aa66ff'  style={styles.edit} onPress={()=>((del==false)? setDel(true):setDel(false))}>
						<Text style={styles.edTex}>-</Text>
					</TouchableHighlight>

					<TouchableHighlight underlayColor='#aa66ff'  style={styles.edit} onPress={()=>((showNew==false)?setShowNew(true):setShowNew(false))}>
						<Text style={styles.edTex}>+</Text>
					</TouchableHighlight>	

					<TouchableHighlight 
						underlayColor='#aa66ff'
						style={styles.edit} 
						onPress={()=>{
							console.log('\n============\n');
							
							(conf==false) ? setConf(true):setConf(false);
							console.log('\n============\n')}}
						>

						<Text style={styles.edTex}>ħ</Text>
					</TouchableHighlight>		
			</View>
			<ScrollView>
				{
					// Lista de checks 
					showChecks()
				}
			</ScrollView>
			{
				// Janela de incerção de dados
				addDadosSave()
			}
			
			{
				// Janela para carregar os dados padões 
				confirmDef()
			}
			</View>
			)
}

export default Day
