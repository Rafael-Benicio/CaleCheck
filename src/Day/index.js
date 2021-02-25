import React, {useEffect, useState} from 'react'
import {View,Text, TouchableOpacity,TouchableHighlight,TextInput ,AsyncStorage, Button, ScrollView} from 'react-native'

import styles from './styles'

const Day=({navigation, route})=>{

	const valorMes=route.params.valorMes
	const nomeMes=route.params.mes
	const dia=route.params.dia

	const [data,setData]=useState([])
	const [showNew,setShowNew]=useState(false)
	const [conf,setConf]=useState(false)

	loadData()

	// Carregar dados
	async function loadData(){
		try{			
		    let i=await  AsyncStorage.getItem('Key')
		    let j=JSON.parse(i)		    
	    	setData(j)
		
		}catch(error){
			console.log('Erro ao Obter dados');
		}
	}

	// Salva dados
    async function saveData(n=data){
        try {
            await AsyncStorage.setItem('Key',JSON.stringify(n))
            console.log('====================================');
            console.log('Dados Salvos');
            console.log('====================================');
        } catch (error) {
            console.log('Erro');
        }
	}

	// //Descrobre indice
	function Indice(dt){		
		let def='dia'+dia
		let have=false
		let indice=0
		
	  	// console.log('sim');
		data.mes[valorMes].map((i,index)=>{
	   		if(Object.keys(i)[0]==def){
				indice=index
				have=true
			}
	  	})

  		return [have,indice]
	}

	// Carregar Listas padrões 
	async function loadDataDef(j){
		try{
 			let i=await  AsyncStorage.getItem('defa')
		    let j=JSON.parse(i)		    
	    	return j
		}catch(err){
			console.log('Oop!');
		}		
	}

	// Usa lista padão retornada de "loadDataDef(j)"
	function UseDef(dt,dd){
		let dados=dd
		let defa=dt
		let def='dia'+dia
		
		if(Indice(dados)[0]){
			console.log('Não UseDef========');
		}else{

			let objeto = switchObj('dia'+dia,defa.dia)
			dados.mes[valorMes].push(objeto)
			let indice=Indice(dados)
			console.log(dados.mes[valorMes]);

			// if(indice[0]){
			// 	eval('dados.mes[valorMes][indice[1]].'+def).push(defa.dia[0])
			// 	console.log(dados.mes[valorMes]);
			// 	// saveData(dados)
			// 	// 
			// }
						

			// dados.mes[valorMes].push(objeto)
			saveData(dados)
			// console.log(data.mes[valorMes]);
		}
	}

	// cria objeto dinamicamente
	function switchObj(chave,cont){
		let parametros = {"1":chave}
		let objeto = {"1":cont}

		Object.keys(parametros).forEach(key => {
		    let newKey = parametros[key];
		    objeto[newKey] = objeto[key];
		    delete objeto[key];
		});

		return objeto
	}

    // Tela de input, sim e não
    function addDadosSave(){
    	const [tmp,setTmp]=useState('')
    	if(showNew){
    	    	return (
    	    		<View style={styles.showAdd}>
    	    			<Text  style={styles.textoNova} >Nova Tarefa:</Text>
    	    			<TextInput style={styles.inputAdd} value={tmp} onChangeText={tmp => setTmp(tmp)} multiline={false} maxLength={20} autoFocus={true} />
    	    			<View style={styles.buttonsOr}>
    	    				<Button color='#84f' title="Sim" onPress={()=>{let t=tmp.trim();setTmp('');setShowNew(false); if(t) return addNewDadoSave(data,t);else alert('Sem conteudo')}} /> 
							<Button color='#84f' title="Não" onPress={()=>{setTmp(''); return setShowNew(false)}} />
    	    			</View>
    	    		</View>
    )}}

    // Add Novos Dados 
   	function addNewDadoSave(obj,ni){
   		let dt=obj;
   		// Aponta mes
   		let ind=parseInt(valorMes, 10)
		let have=false
		let def='dia'+dia
		let indice=false

		let objeto = switchObj(def,[])

		let addB = switchObj(ni,false)
	
		console.log(objeto);
		console.log(addB);

		dt.mes[ind].map((i,index)=>{
			have=(have==false)? false:true
			console.log('Array dias :')
			console.log(have);
			

			if(Object.keys(i)[0]==def){
				indice=index
				console.log('existe');
		   		have=true;
			}
		})

		console.log('Passou Map\n');

		console.log(indice+'\n');

		if(have){
			console.log('Have');
			eval('dt.mes[ind][indice].'+def).push(addB);		
			// console.log(dt.mes[ind]);
		}else{
			console.log('Não Have');
			dt.mes[ind].push(objeto)
			console.log('!-!-!');

			dt.mes[ind].map((i,index)=>{
			if(Object.keys(i)[0]==def){
				indice=index
			}})

			console.log(dt.mes[ind]);
			eval('dt.mes[ind][indice].'+def).push(addB);		
		}

		console.log('\nLast Lag ---\n');	

		// console.log(eval('dt.mes[ind][indice].'+def));		

		console.log('kdjd');

		saveData(dt)

		console.log('\n__________________________________');
   	}

   	// Configura ListChecks para True e False
   	function setToTF(ind,dt,name,TF){
   		console.log('ind : '+ind+'\n');
   		// console.log('dt : '+dt+'\n');
   		// console.log('name : '+name+'\n');
   		// console.log('TF : '+TF+'\n')

   		let dtt=dt
   		let def='dia'+dia
   		let indice=0
   		let TrFa=eval('TF.'+name)

   		dt.mes[ind].map((i,index)=>{
	   			if(Object.keys(i)[0]==def){
					indice=index
					// console.log('existe');
				}else{
					// console.log('Não existe');
				}
	   	})
   		
   		console.log(eval('dtt.mes[valorMes][indice].'+def+'[ind].'+name));
   		
	   	if(TrFa){
	   		eval('dtt.mes[valorMes][indice].'+def+'[ind].'+name+'=false')
	   	}else{
	   		eval('dtt.mes[valorMes][indice].'+def+'[ind].'+name+'=true')
	   	}
		
		saveData(dtt)
   	}


   	//Cria Lista de Checks
   	function showChecks(dt=data){
   		let ind=parseInt(valorMes, 10)
   		let indice=0
   		let def='dia'+dia
   		let have=false
   		let cont=null

   		
   		try{
	   		dt.mes[ind].map((i,index)=>{
	   			if(Object.keys(i)[0]==def){
					indice=index
					// console.log('existe');
					have=true
				}else{
					// console.log('Não existe');
				}
	   		})

	   		if(have){
				return eval('dt.mes[ind][indice].'+def).map((i,index)=>{
					let cor=(eval('i.'+Object.keys(i)[0])==false) ?'#d00':'#0d0'
					// console.log(eval('i.'+Object.keys(i)[0]));
					let nome=Object.keys(i)[0]
					// console.log(nome);
					return (
							<View key={index} style={styles.listCheck}>
								<TouchableOpacity 
									style={{flex:1,flexDirection:'row',alignItems:'center'}} 
									onPress={()=>setToTF(index,dt,nome,i)} 
									>								
									<Text style={[styles.listTxt]}>{Object.keys(i)[0]}</Text>									
									<View style={[styles.listTF,{backgroundColor:cor}]}></View>
								</TouchableOpacity>								
							</View>							
							)
				})
	   		}else{
	   			console.log('Não have');
	   	
	   		}
	   	}catch(err){
	   		console.log('nada');

	   	}
   	}

   	function confirmDef(){
   		if(conf){
   			return(
	   			<View style={[styles.showAdd,{alignItems:'center',flex:1}]}>
	   				<Text style={{fontWeight:'bold'}}>Quer carregar os dados padrões?</Text>
	   				<View style={styles.confirmDeff}>
	   					<Button color='#84f' title="Não" onPress={()=>setConf(false)}/>
	   					<Button color='#84f' title="Sim" onPress={()=>{setConf(false);loadDataDef().then((j)=>UseDef(j,data))}}/>
	   				</View>	
	   			</View>
   			)
   		}
   	}

	return(
		<View style={styles.back}>
			<View style={styles.topBar}>
					<TouchableOpacity style={styles.warpMesDia} onPress={()=>navigation.navigate('Mes',{mes:nomeMes})}>
						<Text style={styles.mesDia}>{'Dia '+dia+' de '+nomeMes}</Text>
					</TouchableOpacity>

					<TouchableHighlight underlayColor='#aa66ff'  style={styles.edit} onPress={()=>((showNew==false)?setShowNew(true):setShowNew(false))}>
						<Text style={styles.edTex}>+</Text>
					</TouchableHighlight>	

					<TouchableHighlight 
						underlayColor='#aa66ff'
						style={styles.edit} 
						onPress={()=>{
							console.log('\n============\n');
							
							(conf==false) ? setConf(true):setConf(false);
							console.log('\n============\n')}}
						>

						<Text style={styles.edTex}>ħ</Text>
					</TouchableHighlight>		
			</View>
			<ScrollView>
				{
					// log(data)
					showChecks()
				}
			</ScrollView>

			{
				addDadosSave()
			}
			{
				confirmDef()
			}
			</View>
			)
}

export default Day
