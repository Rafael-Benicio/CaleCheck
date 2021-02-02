import React from 'react'
import {StyleSheet, Dimensions} from 'react-native'

const widthWi = Dimensions.get('window').width/2;
const heightHe = Dimensions.get('window').height*0.13;

console.log(heightHe);

const styles = StyleSheet.create({
	back:{
		flex: 1,
		backgroundColor:'#a0f',
	},
	topBar:{
		backgroundColor:'#b6f',	
		height:heightHe,
	},
	mesN:{
		color: '#fff',
		fontSize: 30,
		fontWeight:700,
		flex: 1,
		marginLeft: widthWi*0.1
	}

})

export default styles