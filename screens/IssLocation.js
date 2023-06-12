import axios from "axios";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const bgImage = require("../assets/iss_bg.jpg");
const IssIcon = require("../assets/iss_icon.png");
const MeteorIcon = require("../assets/meteor_icon.png");

export default class IssLocationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
    };
  }

  componentDidMount() {
    this.getIssLocation();
  }

  //obtendo os dados da API
  getIssLocation = () => {
    axios
      .get("https://api.wheretheiss.at/v1/satellites/25544")
      .then((response) => {
        this.setState({ location: response.data });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  render() {
    if (Object.keys(this.state.location).length === 0) {
      return (
        <View style={styles.loading}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.conteiner}>
          <SafeAreaView style={styles.droidSafeArea} />
          <ImageBackground source={bgImage} style={styles.backgroundImage}>
            <View style={styles.titleBar}>
              <Text style={styles.titleText}>ISS Tracker</Text>
            </View>
            {/* Exibindo o mapa na tela */}
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                region={{
                  latitude: this.state.location.latitude,
                  longitude: this.state.location.longitude,
                  latitudeDelta: 100,
                  longitudeDelta: 100,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: this.state.location.latitude,
                    longitude: this.state.location.longitude,
                  }}
                >
                  <Image source={IssIcon} style={styles.iconImage} />
                </Marker>
              </MapView>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                Latitude: {this.state.location.latitude}
              </Text>
              <Text style={styles.infoText}>
                Longitude: {this.state.location.longitude}
              </Text>
              <Text style={styles.infoText}>
                Altitude (KM): {this.state.location.altitude}
              </Text>
              <Text style={styles.infoText}>
                Velocity (KM/H): {this.state.location.velocity}
              </Text>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  titleBar: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
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
    flex: 0.6,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "center",
  },
  infoText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    paddingTop: 10,
  },
});
