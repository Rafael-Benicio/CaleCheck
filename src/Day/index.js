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
		    j=JSON.parse(i).mes
		    setData(j)
		}catch(error){
			console.log('Erro ao Obter dados');
		}
	}

    async function saveData(n){
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
    	if(showNew){
    	    	return (
    	    		<View style={styles.showAdd}>
    	    			<Text  style={styles.textoNova} >Nova Tarefa:</Text>
    	    			<TextInput style={styles.inputAdd} />
    	    			<View style={styles.buttonsOr}>
    	    				<Button color='#84f' title="Sim" /> 
							<Button color='#84f' title="Não" onPress={()=>setShowNew(false)} />
    	    			</View>
    	    		</View>
    )}}

	return(
		<View style={styles.back}>
			<View style={styles.topBar}>
					<TouchableOpacity style={styles.warpMesDia} onPress={()=>navigation.navigate('Mes',{mes:nomeMes})}>
						<Text style={styles.mesDia}>{'Dia '+dia+' de '+nomeMes}</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.edit} onPress={()=>((showNew==false)?setShowNew(true):setShowNew(false))}>
						<Text style={styles.edTex}>+</Text>
					</TouchableOpacity>	

					<TouchableOpacity style={styles.edit} onPress={()=>(console.log(data))}>
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
