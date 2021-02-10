import React from 'react'
import {StyleSheet, Dimensions} from 'react-native'

const widthWi = Dimensions.get('window').width/2;
const heightHe = Dimensions.get('window').height*0.13;

const styles = StyleSheet.create({
	back:{
		flex: 1,
		backgroundColor:'#a0f',
		paddingTop: widthWi*0.1,
		paddingBottom:heightHe
	},
	confirm:{
		backgroundColor:'#fff',
		width:widthWi*1.2,
		height: Dimensions.get('window').height*0.25,
		position: 'absolute',
		top:Dimensions.get('window').height/2-Dimensions.get('window').height*0.25/2,
		left: widthWi-widthWi*1.2/2,
		borderRadius: 8,
		padding: widthWi/9,
		borderWidth:1
	},
	buttonsConfirm:{
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingTop:20 
	},
	tituloButton:{
		flex: 1,
	},
	buttonTop:{
		backgroundColor:'#8844ff',
		width:widthWi*2/7,
		height:widthWi*2/7,
		justifyContent:'center',
		alignItems:'center',
		borderRadius: 8
	},
	topBar:{
		flexDirection:'row',
		backgroundColor:'#b6f',	
		height:heightHe,
		alignItems:'center',
		justifyContent: 'space-between',
		paddingRight:widthWi*0.1,
		paddingLeft:widthWi*0.1


	},
	textButton:{
		color:'#fff',
		textAlign: 'center'
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