import React, {useEffect, useState} from 'react'
import {View,Text, TouchableOpacity, Image, AsyncStorage} from 'react-native'

import styles from './styles'


const Day=({navigation, route})=>{
	const valorMes=route.params.valorMes
	const nomeMes=route.params.mes
	const dia=route.params.dia

	const [data,setData]=useState([])

	useEffect(() => {
    	setData(loadData())
    	console.log(data);
  	});

	async function loadData(){
		try{
		    let i=await  AsyncStorage.getItem('Key')
		    return JSON.parse(i)
		}catch(error){
			console.log('Erro :'+error);
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

    console.log(loadData());

	return(
		<View style={styles.back}>
			<View style={styles.topBar}>
					<TouchableOpacity style={styles.warpMesDia} onPress={()=>navigation.navigate('Mes',{mes:nomeMes})}>
						<Text style={styles.mesDia}>{'Dia '+dia+' de '+nomeMes}</Text>
					</TouchableOpacity>

					<View style={styles.warpEdit}>
						<TouchableOpacity style={styles.edit}>
							<Text style={styles.edTex}>+</Text>
						</TouchableOpacity>	

						<TouchableOpacity style={styles.edit}>
							<Text style={styles.edTex}>[]</Text>
						</TouchableOpacity>	
					</View>
			</View>
		</View>

)}

export default Day
