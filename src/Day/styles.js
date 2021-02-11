import React from 'react'
import {StyleSheet, Dimensions} from 'react-native'

const widthWi = Dimensions.get('window').width;
const heightHe = Dimensions.get('window').height*0.13;


const styles = StyleSheet.create({
	back:{
		flex: 1,
		backgroundColor:'#a0f'
	},
	topBar:{
		backgroundColor:'#b6f',	
		height:heightHe,
		flexDirection:'row',
		paddingTop: heightHe/5
	},
	mesDia:{
		color: '#fff',
		fontSize: 25,
		fontWeight:"bold",
		flex: 1,
	},
	buttonsOr:{
		flexDirection:'row',
		justifyContent:'space-around',
		paddingTop: widthWi*0.03
	},
	showAdd:{
		backgroundColor:'#fff',
		borderWidth: 1,
		width:widthWi*0.7,
		height:Dimensions.get('window').height*0.2,
		// alignItems:  'center'
		padding: widthWi*0.03,
		borderRadius: 8,
		position: 'absolute',
		top:Dimensions.get('window').height/2-Dimensions.get('window').height*0.2/2,
		left: widthWi/2-widthWi*0.7/2
		
	},
	inputAdd:{
		backgroundColor:'#ddd',
		borderRadius:8
	},
	warpMesDia:{
		marginLeft: widthWi*0.03,
		flex:1
	},
	warpEdit:{
		flexDirection:'row',
		paddingTop: heightHe/10
	},
	edit:{
		backgroundColor:'#a0f',
		borderRadius: 8,
		height: heightHe*0.4,
		width: heightHe*0.4,
		alignItems: 'center',
		justifyContent:'center',
		paddingBottom: 4 ,
		marginRight: widthWi*0.03

	},
	edTex:{
		color:'#FFF',
		fontWeight:'bold',
		fontSize: 25
	},
	textoNova:{
		fontWeight:'bold',
		fontSize:16
	},
})

export default styles