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

})

export default styles