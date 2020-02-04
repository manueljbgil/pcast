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

        this.state = {
            username:'',
            label:''
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
        return(
            <>
            <View style={{flexDirection:'row', alignSelf:'stretch',justifyContent:'space-between',flexGrow:0.1, marginHorizontal:15, marginTop:20}}>
                <View style={{marginVertical:15}}>
                    <Text style={styles.titleText}>{this.state.label}</Text>
                </View>
                <Avatar size={60} rounded title={this.state.username.charAt(0)} onPress={() => this.onProfilePress()} activeOpacity={0.7}/>
            </View>
            </>
        );
    }
    
    _showUser = async () => {

        const token = await AsyncStorage.getItem('token');
        
        
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
                
                
                if(this.props.navigation.state.routeName=='MyHome'){
                    this.setState({ 
                        username: res.name, label:'Os Meus Podcasts' }
                     )
                }else{
                    this.setState({ 
                        username: res.name, label:'Todos os Podcasts' }
                     )
                }
            }));
      }
}

const styles = StyleSheet.create({
    titleText: {
        color:'#ACACAC',
        fontFamily:'Verdana',
        fontSize: 18,
    }
})
