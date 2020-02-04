import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  AsyncStorage,
  SafeAreaView,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  Alert,
  TouchableHighlight,
} from 'react-native';

import {
  Button,
  Input,
  Avatar
} from 'react-native-elements';

import Header from '../components/Header.js';
import CategorySlider from '../components/CategorySlider.js';
import ContentList from '../components/ContentList.js';
import { MonoText } from '../components/StyledText';

export default class ProfileScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            podcasts: '',
            categories:'',
            category_id:'',
            user_id:'',
        }
  
        this._showUser = this._showUser.bind(this);
  
        //access API
        this._showUser();
        
    }


    _LogoutHandler = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
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
                this.setState({ 
                   username: res.name, user_id: res.id 
                })
            }));
    }

    render(){
        //borderWidth:10,borderColor:'#d6d7da'
        
          if(this.state.username != '' &&  this.state.user_id != ''){
            
            return (
            
              <>
                <SafeAreaView style={{flex: 1,flexDirection:'column', justifyContent:'flex-start', alignItems:'center', backgroundColor:'#292929'}} >
                  <Header title={this.state.username} navigation={this.props.navigation} />
                  <View style={{flex: 3,flexDirection:'column', alignItems:'center',justifyContent:'flex-start'}}>
                    <Avatar size={250} containerStyle={{marginTop:30}} rounded title={this.state.username.charAt(0)} activeOpacity={0.7}/>
                    <Text style={{marginTop:30, fontSize:20, fontFamily:"Verdana", color:'#ACACAC'}}>{this.state.username}</Text>
                  </View>
                  <View style={{flex: 1,flexDirection:'column', alignItems:'center',justifyContent:'flex-end'}}>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('Main')}>
                    <Image
                      source={require('../assets/images/keyboard-backspace.png')}
                    />
                    </TouchableHighlight>
                    <Button 
                          titleStyle={{color:'#FFA500'}}
                          type="clear"
                          title="Terminar Sessão"
                          onPress={this._LogoutHandler}
                        />
                  </View>
                  
                </SafeAreaView>
              </>
            );
          } 
          else{
            return (<></>)
          }
    }
} 
const styles = StyleSheet.create({

    layout:{
      flex:1,
      flexDirection:'column',
      justifyContent: 'center'
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
});

  ProfileScreen.navigationOptions = {
    headerStyle: {
      backgroundColor: '#292929',
    },
    headerTintColor: 'orange',
    headerTitleStyle: {
      fontFamily: 'Verdana',
    },   
  }
  