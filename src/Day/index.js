import React, {useEffect, useState} from 'react'
import {View,Text, TouchableOpacity,TextInput ,AsyncStorage, Button} from 'react-native'

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

    // Salvar dados 
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

   	function showChecks(dt=data){
   		let ind=parseInt(valorMes, 10)
   		let indice=0
   		let def='dia'+dia
   		let have=false
   		let cont=null
   		// console.log(dt.mes[ind]);

   		dt.mes[ind].map((i,index)=>{
   			if(Object.keys(i)[0]==def){
				indice=index
				console.log('existe');
				have=true
			}else{
				console.log('Não existe');
			}
   		})

   		console.log('\n\n');
   		console.log(eval('dt.mes[ind][indice].'+def));
   		console.log('\n\n');

   		if(have){
   			console.log('have');
			return eval('dt.mes[ind][indice].'+def).map((i,index)=>{
				return (
						<View key={index} style={styles.listCheck}>
							<Text style={{fontSize: 24, color:'#309',marginLeft:10}}>{Object.keys(i)}</Text>
							<View></View>
						</View>
					)
			})   			
   		}else{
   			console.log('Não have');
   			return (<View></View>)
   		}
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

					<TouchableOpacity style={styles.edit} onPress={()=>{console.log('\n============\n');showChecks();console.log('\n============\n')}}>
						<Text style={styles.edTex}>[]</Text>
					</TouchableOpacity>		
			</View>
			<View>
				{
					showChecks()
				}
			</View>

			{
				addDadosSave()
			}
		</View>

)
}

export default Day