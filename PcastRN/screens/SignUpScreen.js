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
            email:'',
            username: '',
            password: '',
            cpassword: '',
        }
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
                    <Input placeholder='Email' inputStyle={{color:"white"}} placeholderTextColor='#A0A0A0' autoCapitalize='none' onChangeText={(email)=>this.setState({email})} value={this.state.email} />
                    </View>
                    <View style={{marginVertical:10}}>
                    <Input placeholder='Username' inputStyle={{color:"white"}} placeholderTextColor='#A0A0A0' autoCapitalize='none' onChangeText={(username)=>this.setState({username})} value={this.state.username} />
                    </View>
                    <View style={{marginVertical:10}}>
                      <Input placeholder='Password' inputStyle={{color:"white"}} placeholderTextColor='#A0A0A0' onChangeText={(password)=>this.setState({password})} value={this.state.password} secureTextEntry/>
                    </View>
                    <View style={{marginVertical:10}}>
                      <Input placeholder='Confirmar Password' inputStyle={{color:"white"}} placeholderTextColor='#A0A0A0' onChangeText={(cpassword)=>this.setState({cpassword})} value={this.state.cpassword} secureTextEntry/>
                    </View>
                  </View>
                  <View style={stylesOld.buttonsCenter}>
                    <Button
                      buttonStyle={{width: 295, borderColor:'#FFA500'}}
                        titleStyle={{color:'#FFA500'}}
                        style={{width: 295}}
                        type="outline"
                        title="Registar"
                        onPress={this._register}
                      />
                  </View>
                </View>
              </SafeAreaView>
              </>
        );}

    _register = () => {

        console.log(JSON.stringify({
            email: this.state.email,
            name: this.state.username,
            password: this.state.password,
            cpassword: this.state.cpassword,
        }));
        

        fetch('http://pcast.test/api/register',{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                name: this.state.username,
                password: this.state.password,
                cpassword: this.state.cpassword,
            })
        })
            .then((response) => response.json())
            .then((res => {
                console.log(res);
                if(res.success === true){
                    //AsyncStorage.setItem('user', res.user);
                    this.props.navigation.navigate('Main');
                }
                else{
                    alert("Registo Incorreto!");
                }
            }));
        }
}


SignInScreen.navigationOptions = {
    title: 'Registo',
};


function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
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
