import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { 
  AsyncStorage,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {
  Button,
  Input
} from 'react-native-elements';

import { MonoText } from '../components/StyledText';



export default class SignInScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    
    _SignUpHandler = () => {
        this.props.navigation.push('SignUp');
    } 
    
    render(){
        return (
          <>
              <SafeAreaView style={{flex: 1, backgroundColor:'#292929'}} >
              
                <View style={stylesOld.layout}>
                  <View style={stylesOld.inputsCenter}>
                    <Image source={require('../assets/images/PCAST1.png')} style={stylesOld.ImageCenter}/>   
                  </View> 
                  <View style={stylesOld.inputsCenter}>
                    <View style={{marginVertical:10}}>
                      <Input placeholder='Username' inputStyle={{color:"white"}} placeholderTextColor='#A0A0A0' autoCapitalize='none' onChangeText={(username)=>this.setState({username})} value={this.state.username} />
                    </View>
                    <View style={{marginVertical:10}}>
                      <Input placeholder='Password'  inputStyle={{color:"white"}} placeholderTextColor='#A0A0A0' autoCapitalize='none' onChangeText={(password)=>this.setState({password})} value={this.state.password} secureTextEntry/>
                    </View>
                  </View>
                  <View style={stylesOld.buttonsCenter}>
                    <Button
                        buttonStyle={{width: 295, borderColor:'#FFA500'}}
                        titleStyle={{color:'#FFA500'}}
                        type="outline"
                        title="Login"
                        onPress={this._login}
                      />
                  </View>
                  <View style={stylesOld.buttonsCenter}>
                  <Button
                        titleStyle={{color:'#FFA500'}}
                        type="clear"
                        title="Criar Conta"
                        onPress={this._SignUpHandler}
                      />
                  </View>
                </View>
              </SafeAreaView>
              </>
        );}

    _login = () => {
        console.log(this.state.username);
        console.log(this.state.password);

        fetch('http://pcast.test/api/login',{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
            .then((response) => response.json())
            .then((res => {
                console.log(res);
                if(res.success === true){
                    this._setToken(res.token);
                    this.props.navigation.navigate('Main'); 
                }
                else{
                    alert("Username ou Password Incorreto!");
                }
            }));
        }

        _setToken = async (token) =>{
            try{
                await AsyncStorage.setItem('token', token);    
            }
            catch(e){

            }     
        }
}

const stylesOld = StyleSheet.create({

  layout:{
    flex:1,
    flexDirection:'column',
    justifyContent: 'center'
  },
  buttonsCenter:{
    marginTop:45,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-evenly' 
  },
  inputsCenter:{
    marginHorizontal:50,
    flexDirection:'column',
  },
  ImageCenter:{
    width:220,
    height:200,
    marginBottom:50,
    alignSelf:'center'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  registerText: {
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'space-evenly' 
  },
});

SignInScreen.navigationOptions = {
  headerStyle: {
    backgroundColor: '#292929',
  },
  headerTintColor: 'orange',
  headerTitleStyle: {
    fontFamily: 'Verdana',
  },   
}

