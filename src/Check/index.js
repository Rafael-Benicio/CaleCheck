import React, {useState} from 'react';
import {Text, View, Dimensions, Button, TouchableHighlight, TouchableOpacity, ScrollView, StatusBar, AsyncStorage} from 'react-native'

import styles from './styles'

const Check=function({navigation, route}){
	const cal=[['Janeiro','Fervereiro'],['Março','Abril'],['Maio','Junho'],['Julho','Agosto'],['Setembro','Outubro'],['Novembro','Dezembro']]
	const [cor,setCor]=useState('#fff')
	const [reset,setReset]=useState(false)

	async function loadData(){
		try{
		    let i=await  AsyncStorage.getItem('Key')
			return JSON.parse(i)
		}catch(err){
            await AsyncStorage.setItem('Key',JSON.stringify({mes:[[],[],[],[],[],[],[],[],[],[],[],[]]}))
            console.log('Novos dados');
		}
	}

	const ResetDados=()=>{
		if(reset){
				return(
					<View style={styles.confirm}>
						<Text>Você tem certeza que quer </Text>
						<Text>APAGAR os dados do App?</Text>
						<View style={styles.buttonsConfirm}>
							<Button color='#84f' title="Sim"/> 
							<Button color='#84f' title="Não" onPress={()=>(setReset(false))}/>
						</View>
					</View>
					)
				}
	}

	return(
		<View>
			<StatusBar backgroundColor="#000"/>

			<View style={styles.topBar}>
					<TouchableOpacity  style={styles.tituloButton} onPress={()=>{(cor=='#fff') ? setCor('#0f0'): setCor('#fff')}}>
						<Text style={
							{	fontSize: 40,
							  	fontWeight: 'bold',
							  	fontStyle:'italic',
							  	color:cor
							}		}>Mubei</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.buttonTop} onPress={()=>{(reset==true)? setReset(false):setReset(true)}}>
						<Text style={styles.textButton}>Reset Dados</Text>
					</TouchableOpacity>
			</View>	

			<ScrollView>
				<View style={styles.back}>
					{
					cal.map((i,ind)=>(
						<View key={ind} style={styles.gridWar}>
						{
							i.map((j,end)=>(				
								<TouchableHighlight 
									key={end} 
									underlayColor="#9f9"  
									style={styles.warpTex} 
									onPress={()=>navigation.navigate('Mes',{mes:j})}>
										<Text style={styles.textCal}>{j}</Text>
								</TouchableHighlight>
							))}
						</View>
					))
					}
				</View>
			</ScrollView>
			{
				ResetDados()
			}
			
		</View>			
		)
}

export default Check;