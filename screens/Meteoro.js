import axios from "axios";
import React from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Platform, ImageBackground, Image, Alert } from "react-native";
import { styleProps } from "react-native-web/dist/cjs/modules/forwardedProps";

const bgImage = require("../assets/meteor_bg.jpg")
const MeteorIcon = require("../assets/meteor_icon.png")

// UEG79o7VuN1AvC2nm6N7ze0clLmLOUaAHrKej06i
//https://api.nasa.gov/neo/rest/v1/feed?api_key=DEMO_KEY

export default class MeteorScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meteors: {}
    }
  }

  componentDidMount() {
    this.getMeteors()
  }

  getMeteors = () => {
    axios
      .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=UEG79o7VuN1AvC2nm6N7ze0clLmLOUaAHrKej06i")
      .then(response => {
        this.setState({
          meteors: response.data.near_earth_objects
        })
      })
      .catch(error => {
        Alert.alert(error.message)
      })
  }

  render() {
    if (Object.keys(this.state.meteors).length === 0) {
      return (
        <View style={styles.loading}>
          <Text>
            Loading...
          </Text>
        </View>
      )
    } else {
      let meteor_arr = Object.keys(this.state.meteors).map(meteor_date =>{
        return this.state.meteors[meteor_date]
      })
      let meteor = [].concat.apply([],meteor_arr)

      meteor.forEach(element => {
        let diameter = (element.estimated_diameter.kilometers.estimated_diameter_mim + 
          element.estimated_diameter.kilometers.estimated_diameter_max)/2
        let threatScore = (diameter/element.close_approach_data[0].miss_distance.kilometers)*1000000000
        element.threat_score = threatScore
      });
      return (
        <View style={styles.conteiner}>

          <Text>Tela Meteoro</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover"
  },
  titleBar: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
  },
  iconImage: {
    height: 50,
    width: 50,
  },
  mapContainer: {
    flex: 0.6
  },
  map: {
    width: "100%",
    height: "100%"
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  infoContainer: {
    flex: 0.2,
    backgroundColor: "white",
    marginTop: -10,
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    padding: 30,
    borderRadius: 30,
    // alignItems:"center",
    justifyContent: "center"
  },
  infoText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    paddingTop: 10
  }
})
