import React from 'react';
import {Text, View, Dimensions, TouchableHighlight} from 'react-native'

import styles from './styles'

const Check=function({navigation, route}){
	const cal=[['Janeiro','Fervereiro'],['Março','Abril'],['Maio','Junho'],['Julho','Agosto'],['Setembro','Outubro'],['Novembro','Dezembro']]
	return(
			<View style={styles.back}>
			{
			cal.map((i,ind)=>(
				<View key={ind} style={styles.gridWar}>
				{
					i.map((j,end)=>(				
						<TouchableHighlight 
							key={end} 
							underlayColor="#0f0"  
							style={styles.warpTex} 
							onPress={()=>navigation.navigate('Mes',{mes:j})}>
								<Text style={styles.textCal}>{j}</Text>
						</TouchableHighlight>
					))}
				</View>
			))	
			}
			</View>

			
		)
}

export default Check;