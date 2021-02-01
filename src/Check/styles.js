import React from 'react'
import {StyleSheet, Dimensions} from 'react-native'

const widthWi = Dimensions.get('window').width/2;

const styles = StyleSheet.create({
	back:{
		flex: 1,
		backgroundColor:'#a0f',
		paddingTop: widthWi*0.1
	},
	textCal:{
		color:'#444',
		fontSize: 24,
		marginTop:widthWi*0.35
	},
	warpTex:{
		backgroundColor:'#00ff00',
		width:widthWi*0.85,
		height: widthWi*0.85,
		marginBottom: widthWi*0.1,
		justifyContent:'space-between' ,
		alignItems:'center',
		borderRadius: 8,
	},
	gridWar:{
		flexDirection:'row',
		justifyContent:'space-around',		
	},

})

export default styles