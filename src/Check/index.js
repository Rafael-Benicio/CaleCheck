import React, {useState} from 'react';
import {Text, View, Dimensions, Button, TouchableHighlight, TouchableOpacity, ScrollView, StatusBar, AsyncStorage, TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import styles from './styles'

const Check=function({navigation, route}){
	const cal=[['Janeiro','Fervereiro'],['Março','Abril'],['Maio','Junho'],['Julho','Agosto'],['Setembro','Outubro'],['Novembro','Dezembro']]
	const [cor,setCor]=useState('#fff')
	const [reset,setReset]=useState(false)
	const [cd,setCD]=useState(false)
	const [newD,setNewD]=useState(false)
	const [data, setData]=useState([])

	// Checar se já existe dados no App ou se tem que criar uma nova base
	async function loadData (){
		try{
		    let i=await  AsyncStorage.getItem('Key')
		    if (i==null){
		    	throw new Error('dados são Null')
		    }
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

	// Carregar Listas padrões 
	async function loadDataDef(){
		try{
		    let i=await  AsyncStorage.getItem('defa')
			let j
		    j=JSON.parse(i)
		    if(j==null || j==undefined) 
		    	saveDataDefault({dia:[{check:[],tf:[],dia:''}]}) 
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

	// Para confirmar se realmente quer apagar os dados salvos
	function ResetDados(){
		if(reset){
				return(
					<View style={styles.confirm}>
						<Text>Você tem certeza que quer </Text>
						<Text>APAGAR os dados do App?</Text>
						<View style={styles.buttonsConfirm}>
							<Button color='#84f' title="Sim" onPress={()=>{RDados();saveDataDefault({dia:[{check:[],tf:[],dia:''}]}) }}/> 
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
						{/*<Button title='-' onPress={()=>saveDataDefault({dia:[{check:[],tf:[],dia:''}]}) }/>*/}
						<Button title="+" color='#84f' onPress={()=>(newD==false) ? setNewD(true): setNewD(false)} />
					</View>
					<ScrollView style={styles.scrll}>
					{
						data.dia[0].check.map((i,index)=>{
							return(
								<View key={index} style={styles.lis}>
									<Text style={{fontSize:16}}>{i}</Text>
										<TouchableOpacity onPress={()=>delDef(data,index)}>
											<Icon name="trash" size={16} color="#84f" />
										</TouchableOpacity>
									</View>
								)
						})
					}
					</ScrollView>
					<View style={styles.buttonsConfirm}>
						<Button color='#84f' title="Fechar" onPress={()=>setCD(false)}/>

					</View>
				</View>					
			)
		}
	}

	// Novo defs
	function NovosDadosDef(){
		const [tpm,setTpm]=useState('')

		if(cd && newD){

			return(
				<View style={styles.allEsc}>
					<View style={[styles.confirmT,{alignItems:'center'}]}>
						<Text style={{fontWeight:'bold',fontSize:20}}>Adicionar Padrão</Text>
						<TextInput 
							style={styles.inputAdd} 
							value={tpm} 
							onChangeText={tpm => setTpm(tpm)} 
							multiline={false} 
							maxLength={20} 
							autoFocus={true} 
							/>
						<View style={[styles.gridWar,styles.Tam]}>
							<Button 
								title="Cancelar" 
								color='#84f' 
								onPress={()=>setNewD(false)}
							/>
							<Button 
								title="Salvar" 
								color='#84f' 
								onPress={()=>
									{
										let t=tpm.trim();
										setTpm('');
										setNewD(false);
										if(t) return addDefs(data,t);
										else alert('Sem conteudo')
									}}/>
						</View>
						
					</View>
				</View>
			)
		}
	}

	// Adicionar novos elementos padrões
	function addDefs(dt,ni){
		var dados=dt
		dados.dia[0].check.push(ni)
		dados.dia[0].tf.push(false)
		saveDataDefault(dados)
	}
	// deletar def
	function delDef(dt,ni){
		let dados={dia:[{check:[],tf:[]}]}
		let arr=[]

		dt.dia[0].check.map((i,index)=>{
			if(ni!=index){
				arr.push(index)
			}
		})
		
		for (let i=0;i<arr.length;i++){
			dados.dia[0].check.push(dt.dia[0].check[arr[i]])
			dados.dia[0].tf.push(dt.dia[0].tf[arr[i]])
		}

		saveDataDefault(dados)
			
		
	}

	loadData()
	loadDataDef()

	return(
		<View>
			<StatusBar backgroundColor="#000"/>

			<View style={styles.topBar}>
					<TouchableOpacity  style={styles.tituloButton} onPress={()=>{(cor=='#fff') ? setCor('#0f0'): setCor('#fff')}}>
						<Text style={{	fontSize: 40,fontWeight: 'bold',fontStyle:'italic',color:cor}}>Mubei</Text>
					</TouchableOpacity>

					<TouchableOpacity style={[styles.buttonTop,{marginRight:10}]} onPress={()=>{(cd==true)? setCD(false):setCD(true); setReset(false)}}>
						<Text style={styles.textButton}>Checks Padrão</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.buttonTop} onPress={()=>{(reset==true)? setReset(false):setReset(true); setCD(false);}}>
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
				// Janela para perguntar se quer rezetar os dados do app
				ResetDados()
			}
			{
				// Janela para ver os checks Padrões registrados
				ChecksDefault()
			}
			{
				// Janela para criar novos checks Padrões
				NovosDadosDef()
			}
		</View>			
		)
}

export default Check;