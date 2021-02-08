import React from 'react'
import {StyleSheet, Dimensions} from 'react-native'

const widthWi = Dimensions.get('window').width;
const heightHe = Dimensions.get('window').height*0.13;


const styles = StyleSheet.create({
	back:{
		flex: 1,
		backgroundColor:'#a0f',
	},
	topBar:{
		flexDirection:'row',
		backgroundColor:'#b6f',	
		height:heightHe,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	mesNome:{
		alignItems:'flex-start'
		
	},
	backC:{
		color: '#fff',
		fontSize: 50,
		fontWeight:"bold",
		flex: 1,
		marginLeft: widthWi*0.03
	},
	mesN:{
		color: '#fff',
		fontSize: 50,
		fontWeight:"bold",
		flex: 1,
	},
	goC:{
		color: '#fff',
		fontSize: 50,
		fontWeight:"bold",
		flex: 1,
		marginRight: widthWi*0.03

	},
	listDay:{
	},
	warpView:{
		flexDirection: 'row',
		backgroundColor:'#0f0',
		alignItems: 'center'
	},
	viewDay:{
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor:'#8844ff',
		width:widthWi/7,
		height:widthWi/7,
		borderColor: '#000000',
		borderWidth: 1
	},
	textDay:{
		color:'#fff',
		fontSize: 20
	},
	bloDay:{
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor:'#442288',
		width:widthWi/7,
		height:widthWi/7,
		borderColor: '#000000',
		borderWidth: 1
	}


})

export default styles