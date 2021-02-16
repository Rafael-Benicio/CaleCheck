import React, {useEffect, useState} from 'react'
import {View,Text, TouchableOpacity,TextInput ,AsyncStorage, Button, ScrollView} from 'react-native'

import styles from './styles'

const Day=({navigation, route})=>{

	const valorMes=route.params.valorMes
	const nomeMes=route.params.mes
	const dia=route.params.dia

	const [data,setData]=useState(loadData())
	const [showNew,setShowNew]=useState(false)

	// Carregar dados
	async function loadData(){
		try{
		    let i=await  AsyncStorage.getItem('Key')
		    let j
		    j=JSON.parse(i)
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

    // Tela de input, sim e não
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

    // Add Novos Dados 
   	function addNewDadoSave(obj,ni){
   		let dt=obj;
   		// Aponta mes
   		let ind=parseInt(valorMes, 10)
		let have=false
		let def='dia'+dia

   		let parametros = {"1":def}
		let objeto = {"1":[]}

		let addC = {"1":ni}
		let addB = {"1":false}

		let indice=false
	
		// registra dia
		Object.keys(parametros).forEach(key => {
		   // pega o valor que será a nova chave
		    let newKey = parametros[key];
		   // cria dinamicamente a nova chave com o valor antigo
		    objeto[newKey] = objeto[key];
		    // apaga a chave antiga
		    delete objeto[key];
		});
		// conteudo do dias
		Object.keys(addC).forEach(key => {
		   // pega o valor que será a nova chave
		    let newKey = addC[key];
		   // cria dinamicamente a nova chave com o valor antigo
		    addB[newKey] = addB[key];
		    // apaga a chave antiga
		    delete addB[key];
		});

		console.log(addB);

		// dt.mes[ind].push(objeto)
		// dt.mes[ind].push({dia8:[]})

		dt.mes[ind].map((i,index)=>{
			have=(have==false)? false:true
			console.log('Array dias :')
			console.log(have);
			

			if(Object.keys(i)[0]==def){
				indice=index
				console.log('existe');
		   		have=true;
			}
		})

		console.log('Passou Map\n');

		console.log(indice+'\n');

		if(have){
			console.log('Have');
			eval('dt.mes[ind][indice].'+def).push(addB);		
			// console.log(dt.mes[ind]);
		}else{
			console.log('Não Have');
			dt.mes[ind].push(objeto)
			console.log('!-!-!');

			dt.mes[ind].map((i,index)=>{
			if(Object.keys(i)[0]==def){
				indice=index
			}})

			console.log(dt.mes[ind]);
			eval('dt.mes[ind][indice].'+def).push(addB);		
		}

		console.log('\nLast Lag ---\n');	

		// console.log(eval('dt.mes[ind][indice].'+def));		

		console.log('kdjd');

		saveData(dt)

		console.log('\n__________________________________');
   	}

   	// Configura ListChecks para True e False
   	function setToTF(ind,dt,name,TF){
   		let dtt=dt
   		let def='dia'+dia
   		let indice=0
   		let TrFa=eval('TF.'+name)

   		dt.mes[ind].map((i,index)=>{
	   			if(Object.keys(i)[0]==def){
					indice=index
					// console.log('existe');
				}else{
					// console.log('Não existe');
				}
	   	})
   		
   		
	   	if(TrFa){
	   		eval('dtt.mes[valorMes][indice].'+def+'[ind].'+name+'=false')
	   	}else{
	   		eval('dtt.mes[valorMes][indice].'+def+'[ind].'+name+'=true')
	   	}
		
		// console.log(eval('dtt.mes[valorMes][indice].'+def+'[ind].'+name));
		saveData(dtt)
   	}


   	//Cria Lista de Checks
   	function showChecks(dt=data){
   		let ind=parseInt(valorMes, 10)
   		let indice=0
   		let def='dia'+dia
   		let have=false
   		let cont=null
   		  
   		// console.log('146: ---------------');
   		// console.log(data.mes);c
   		
   		try{
	   		dt.mes[ind].map((i,index)=>{
	   			if(Object.keys(i)[0]==def){
					indice=index
					// console.log('existe');
					have=true
				}else{
					// console.log('Não existe');
				}
	   		})

	   		
	   		if(have){
	   			// console.log('have');
				return eval('dt.mes[ind][indice].'+def).map((i,index)=>{
					let cor=(eval('i.'+Object.keys(i)[0])==false) ?'#d00':'#0d0'
					// console.log(eval('i.'+Object.keys(i)[0]));
					let nome=Object.keys(i)[0]

					return (
							<View key={index} style={styles.listCheck}>
								<TouchableOpacity style={{flex:1,flexDirection:'row',alignItems:'center'}} onPress={()=>setToTF(index,dt,nome,i)} >
									<Text style={[styles.listTxt]}>{Object.keys(i)[0]}</Text>
									<View style={[styles.listTF,{backgroundColor:cor}]}></View>
								</TouchableOpacity>
							</View>
						)
				})   			
	   		}else{
	   			console.log('Não have');
	   			return (<View></View>)
	   		}
	   	}catch(err){
	   		console.log('nada');
	   	}
   	}

   	const log=(dt)=>{
   		// console.log(dt.mes[valorMes]);
   	}

	return(
		<View style={styles.back}>
			<View style={styles.topBar}>
					<TouchableOpacity style={styles.warpMesDia} onPress={()=>navigation.navigate('Mes',{mes:nomeMes})}>
						<Text style={styles.mesDia}>{'Dia '+dia+' de '+nomeMes}</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.edit} onPress={()=>((showNew==false)?setShowNew(true):setShowNew(false))}>
						<Text style={styles.edTex}>+</Text>
					</TouchableOpacity>	

					<TouchableOpacity style={styles.edit} onPress={()=>{console.log('\n============\n');console.log(data.mes[parseInt(valorMes, 10)]);console.log('\n============\n')}}>
						<Text style={styles.edTex}>[]</Text>
					</TouchableOpacity>		
			</View>
			<ScrollView>
				{
					// log(data)
					showChecks()
				}
			</ScrollView>

			{
				addDadosSave()
			}
			</View>
			)
}

export default Day