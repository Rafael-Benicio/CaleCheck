import React from 'react'
import {StyleSheet, Dimensions} from 'react-native'

const widthWi = Dimensions.get('window').width;
const heightHe = Dimensions.get('window').height*0.13;

console.log(heightHe);

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
	mesN:{
		color: '#fff',
		fontSize: 30,
		fontWeight:700,
		flex: 1,
	},
	backC:{
		color: '#fff',
		fontSize: 50,
		fontWeight:700,
		flex: 1,
		marginLeft: widthWi*0.03
	},
	goC:{
		color: '#fff',
		fontSize: 50,
		fontWeight:700,
		flex: 1,
		marginRight: widthWi*0.03

	}

})

export default styles