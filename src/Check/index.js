import React, {useState} from 'react';
import {Text, View, Dimensions, Button, TouchableHighlight, TouchableOpacity, ScrollView, StatusBar, AsyncStorage} from 'react-native'

import styles from './styles'

const Check=function({navigation, route}){
	const cal=[['Janeiro','Fervereiro'],['Março','Abril'],['Maio','Junho'],['Julho','Agosto'],['Setembro','Outubro'],['Novembro','Dezembro']]
	const [cor,setCor]=useState('#fff')
	const [reset,setReset]=useState(false)
	const [cd,setCD]=useState(false)
	const [newD,setNewD]=useState(false)
	const [data, setData]=useState(loadDataDef())

	// Checar se já existe dados no App ou se tem que criar uma nova base
	async function loadData (){
		try{
		    let i=await  AsyncStorage.getItem('Key')
			// return console.log('Sucesso: check '+JSON.parse(i))
		}catch(err){
			console.log('Erro: Check');
            RDados()
		}
	}

		// Salva dados
    async function saveDataDefault(n){
        try {
            await AsyncStorage.setItem('defa',JSON.stringify(n))
            console.log('====================================');
            console.log('Dados Salvos');
            console.log('====================================');
        } catch (error) {
            console.log('Erro');
        }
	}

	async function loadDataDef(){
		try{
		    let i=await  AsyncStorage.getItem('defa')
			let j
		    j=JSON.parse(i)
		    if(j==null) 
		    	saveDataDefault({dia:[]}) 
		    else{
		    	setData(j)
		    } 
		}catch(err){
			console.log('Erro: Check');
            // RDados()
		}
	}

	// Configurar os dados para o estado inicial
	async function RDados (){
		await AsyncStorage.setItem('Key',JSON.stringify({mes:[[],[],[],[],[],[],[],[],[],[],[],[]]}))
        alert("Dados Resetados")
        setReset(false)
	} 

	loadData()

	// Para confirmar se realmente quer apagar os dados salvos
	function ResetDados(){
		if(reset){
				return(
					<View style={styles.confirm}>
						<Text>Você tem certeza que quer </Text>
						<Text>APAGAR os dados do App?</Text>
						<View style={styles.buttonsConfirm}>
							<Button color='#84f' title="Sim" onPress={RDados}/> 
							<Button color='#84f' title="Não" onPress={()=>(setReset(false))}/>
						</View>
					</View>
					)
				}
	}

	// Para alterar os Checks Padrões 
	function ChecksDefault(){
		if(cd){
			return(
				<View style={styles.checkD}>
					<View style={{flexDirection:'row', justifyContent:"space-between"}}>
						<Text style={styles.cDText}>Checks Padrões</Text>
						<Button title="+" color='#84f' onPress={()=>(newD==false) ? setNewD(true): setNewD(false)} />
					</View>
					<ScrollView style={styles.scrll}>
					{
						data.dia.map((i,index)=>{
							console.log(i);
						})
					}
					</ScrollView>
					<View style={styles.buttonsConfirm}>
						<Button color='#84f' title="Cancelar" onPress={()=>setCD(false)}/>
						<Button color='#84f' title="Aplicar"/>
					</View>
				</View>
			)
		}
	}
	
	// Novo defs
	function NovosDadosDef(){
		if(cd && newD){
			// console.log('ndd');

			return(
				<View style={styles.allEsc}>
					<View style={styles.confirm}>

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
						<Text style={{	fontSize: 40,fontWeight: 'bold',fontStyle:'italic',color:cor}}>Mubei</Text>
					</TouchableOpacity>

					<Button title="Log Data" onPress={()=>console.log(data.dia)}/>

					<TouchableOpacity style={[styles.buttonTop,{marginRight:10}]} onPress={()=>{(cd==true)? setCD(false):setCD(true); setReset(false)}}>
						<Text style={styles.textButton}>Checks Padrão</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.buttonTop} onPress={()=>{(reset==true)? setReset(false):setReset(true); setCD(false)}}>
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
			{
				ChecksDefault()
			}
			{
				NovosDadosDef()
			}
		</View>			
		)
}

export default Check;