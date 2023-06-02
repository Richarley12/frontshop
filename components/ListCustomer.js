import { StyleSheet,View,Text,FlatList } from "react-native";
import {styles} from '../assets/styles/styles.js'
import  axios  from 'axios';
import { useState, useEffect } from "react";

export default function ListCustomer() {
    const [dataCustomer, setDataCustomers]= useState([])
    const  getCustomers= async()=>{
    const customers= await axios.get(`http://127.0.0.1:3000/api/clientes`)
    setDataCustomers(customers.data)
}

useEffect(()=>{
    getCustomers();
    
},[dataCustomer])


return(
<View style={styles.container}>
    <Text style={{color:'blue',fontSize:35,marginBottom:10}}>Listado de clientes</Text> 
    <FlatList
        data={dataCustomer}
        renderItem={({item}) => (<Text> {item._id} - {item.nombre} {item.apellidos} </Text>) }
      />

</View>

)
    
}