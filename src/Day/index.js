import React, {useEffect, useState} from 'react'
import {View,Text, TouchableOpacity,TextInput ,AsyncStorage, Button} from 'react-native'

import styles from './styles'

const Day=({navigation, route})=>{
	const valorMes=route.params.valorMes
	const nomeMes=route.params.mes
	const dia=route.params.dia

	const [data,setData]=useState(loadData())
	const [showNew,setShowNew]=useState(false)

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

    function addDadosSave(){
    	const [tmp,setTmp]=useState('')
    	if(showNew){
    	    	return (
    	    		<View style={styles.showAdd}>
    	    			<Text  style={styles.textoNova} >Nova Tarefa:</Text>
    	    			<TextInput style={styles.inputAdd} value={tmp} onChangeText={tmp => setTmp(tmp)} multiline={false} maxLength={20} autoFocus={true} />
    	    			<View style={styles.buttonsOr}>
    	    				<Button color='#84f' title="Sim" onPress={()=>{let t=tmp;setTmp('');setShowNew(false); return addNewDadoSave(data,t);}} /> 
							<Button color='#84f' title="Não" onPress={()=>{setTmp(''); return setShowNew(false)}} />
    	    			</View>
    	    		</View>
    )}}

   	function addNewDadoSave(obj,ni){
   		let dt=obj;
   		let ind=parseInt(valorMes, 10)

   		let parametros = {"1":dia}
		let objeto = {"1":[]}

		Object.keys(parametros).forEach(key => {
		   // pega o valor que será a nova chave
		    let newKey = parametros[key];
		   // cria dinamicamente a nova chave com o valor antigo
		    objeto[newKey] = objeto[key];
		    // apaga a chave antiga
		    delete objeto[key];
		});

		try{
			dt.mes[ind].push(objeto)

			console.log(Object.keys(dt.mes[ind]));

		}catch(err){
			
		
			// console.log(objeto);
		
			dt.mes[ind].push(objeto)
		
		}

		// console.log(dt.mes[ind]);

		console.log('=========================');
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

					<TouchableOpacity style={styles.edit} onPress={()=>(console.log(data.mes))}>
						<Text style={styles.edTex}>[]</Text>
					</TouchableOpacity>		
			</View>

			{
				addDadosSave()
			}
		</View>

)
}

export default Day