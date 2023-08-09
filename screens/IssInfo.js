import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert
} from "react-native";
import axios from "axios";

export default class IssLocationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {}
        };
    }


getISSLocation = ()=>{
    axios
    .get("https://api.wheretheiss.at/v1/satellites/25544")
    .then(response=>{
        this.setState({location:response.data})
    })
    .catch(error=>{alert (error.message)})
}

componentDidMount(){
    this.getISSLocation();
    try {
        setInterval(async()=>{
            this.getISSLocation()},5000);
        
    } catch (error) {
      console.log(error)  
    }
}


render() {
    if (Object.keys(this.state.location).length === 0) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Text>Loading</Text>
            </View>
        )
    } else {
        return (
        <View>
            <Text> Latitude: {this.state.location.latitude}</Text>
            <Text>Longitude: {this.state.location.longitude}</Text>
            <Text>Altitude(KM): {this.state.location.altitude}</Text>
            <Text>Velocity(KM/h): {this.state.location.velocity}</Text>
        </View>    
        );
    }
}
}

const styles = StyleSheet.create({
    
});