import React,{Component} from "react";
import { Text, View, StyleSheet} from "react-native";

export default class HomeScreen extends React.Component{
  render(){
    return(
      <View style={style.conteiner}>

        <Text>Tela Inicial</Text>
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