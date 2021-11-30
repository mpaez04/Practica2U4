import React, {useState} from 'react';
import {StyleSheet, Text, View,Button} from 'react-native';
import {SearchBar} from 'react-native-elements';

const HomeScreen = ({navigation}) => {
    const [lugarTemp, setLugarTemp] = useState("");
    const [tempActual,setTempActual]=useState("")
    const [tempMax, setTempMax]= useState("");
    const [tempMin, setTempMin]= useState("");
    const [encontrado, setEncontrado] = useState(false);
    const [lat,setLat]=useState('');
    const [lon,setLon]=useState('');
    const titulo=lugarTemp.toUpperCase();

    async function buscar (city) {
        const key ="16d3374be7d74982724102c96d08327a";
        const api_url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

        const json= await fetch(api_url)
        const resultado= await json.json()
        if(json.status!==200){
            console.log('No se encuentra la ciudad')
            setEncontrado(false);
            setTempMax("");
            setTempMin("");
            setTempActual("");
            setLon("");
            setLat("");
        }else{
            try{
                setTempActual(resultado.main.feels_like);
                setTempMax(resultado.main.temp_max);
                setTempMin(resultado.main.temp_min);
                setLat(resultado.coord.lat);
                setLon(resultado.coord.lon); 
                setEncontrado(true);
  
            }catch(e){
                console.log(e);
                setEncontrado(false);
                setTempMax("");
                setTempMin("");
                setTempActual("");
                setLon("");
                setLat("");
            }
        }
    }

    return (
    <View style={styles.container}>

        <SearchBar
            round
            containerStyle={{
                backgroundColor:'transparent',
                borderTopWidth:0,
                borderBottomWidth:0,
            }}
            inputStyle={{backgroundColor:'#fcfcfc'}}
            onChangeText={(texto)=>{
                setLugarTemp(texto);
                buscar(texto);
            }}
            onClear={()=>{
                setLugarTemp("");
                setEncontrado(false);
            }}
            value={lugarTemp}
            placeholder="Escribe aqui..."
        />

        <View style={{margin:10, fontSize:20}}>
            {
                lugarTemp.length>0 
                ?
                    encontrado ?
                    <View style={[{ width: "100%", margin: 10, justifyContent:'center', alignItems:'center'}]}>
                        <Text style={styles.texto}>
                            Temperatura Actual: {tempActual}°C 
                            Temperatura Maxima: {tempMax}°C 
                            Temperatura Minima: {tempMin}°C
                        </Text>
                        <Button
                        title="Mirar el pronostico semanal"
                        onPress={() => navigation.navigate('DetailScreen',{lat,lon,titulo})}
                        />
                    </View>
                    :
                    <Text style={styles.texto}>
                        Ciudad no encontrada
                    </Text>
                :
                <Text style={styles.texto}>
                    Realiza una busqueda
                </Text>
            }

        </View>

    </View>);
}
 
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    texto:{
      color: 'black', 
      textAlign: 'center', 
      fontSize: 20,
      margin: 10,
      fontWeight: 'bold',
    }
});
  