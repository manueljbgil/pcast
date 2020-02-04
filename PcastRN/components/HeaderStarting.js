import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage
  } from 'react-native';
import { Avatar } from "react-native-elements";

export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
        }

        this._showUser();
        
    }

    //on podcast press
    onProfilePress() {
        //props to PodcastScreen
        this.props.navigation.navigate('Profile',{
            token: this.props.navigation.getParam('token'),
        })
    }

    render(){
        if(this.state.user_id != '' &&  this.state.username != ''){
            return(
                <>
                <View style={{flexDirection:'row', alignSelf:'stretch',justifyContent:'flex-end', marginHorizontal:30, marginTop:20}}>
                    <Avatar size={60} rounded title={this.state.username.charAt(0)} onPress={() => this.onProfilePress()} activeOpacity={0.7}/>
                </View>
                </>
            );
        }
        else{
            return (<></>)
        }
       
    }

    _showUser = async () => {

        const token = await AsyncStorage.getItem('token');
        console.log("token: " + token);
        
        
        fetch('http://pcast.test/api/teste',{
            method: 'GET',
            headers:{
                'Authorization': "Bearer " + token, //meter aqui o token
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((res => {
                

                this.setState({ 
                   username: res.name }
                )
            }));
      }
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 20,
    }
})
