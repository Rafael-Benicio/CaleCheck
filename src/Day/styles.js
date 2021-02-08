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
		flexDirection:'row',
		backgroundColor:'#b6f',	
		height:heightHe,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	mesDia:{
		color: '#fff',
		fontSize: 30,
		fontWeight:700,
		flex: 1,
	},
	warpMesDia:{
		marginLeft: widthWi*0.03
	},
	edit:{
		backgroundColor:'#a0f',
		borderRadius: 8,
		height: heightHe*0.5,
		width: heightHe*0.5,
		alignItems: 'center',
		justifyContent:'center',
		paddingBottom: 4 ,
		marginRight: widthWi*0.03

	},
	edTex:{
		color:'#FFF',
		fontWeight:30,
		fontSize: 30
	}
})

export default styles