import React,{Component} from "react";
import { Text, View, StyleSheet} from "react-native";

export default class IssLocationScreen extends React.Component{
  render(){
    return(
      <View style={style.conteiner}>

        <Text>Tela de Localização  EEI</Text>
      </View>
    )
  }
}

const style = StyleSheet.create({
   conteiner:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
})