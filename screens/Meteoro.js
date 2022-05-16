import React,{Component} from "react";
import { Text, View, StyleSheet} from "react-native";

export default class MeteorScreen extends React.Component{
  render(){
    return(
      <View style={style.conteiner}>

        <Text>Tela Meteoro</Text>
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