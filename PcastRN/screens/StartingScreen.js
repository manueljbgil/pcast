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
  TouchableHighlight,
  View,
  Alert
} from 'react-native';

import {
  Button,
  Input,
  Icon,
} from 'react-native-elements';

import HeaderStarting from '../components/HeaderStarting.js';
import CategorySlider from '../components/CategorySlider.js';
import ContentList from '../components/ContentList.js';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          username: '',
          podcasts: '',
          user_id:'',
      }

      this._showUser = this._showUser.bind(this);

      //access API
      this._showUser();
      
  }

  
  render(){
    //borderWidth:10,borderColor:'#d6d7da'

    console.log("routeeeeeee: " + this.props.navigation.state.route);
    
    
      if(this.state.user_id != '' &&  this.state.username != ''){
        
        return (
        
          <>
            <SafeAreaView style={{flex: 1,flexDirection:'column', justifyContent:'flex-start', alignItems:'center', backgroundColor:"#292929" }} >
                <HeaderStarting title={this.state.username}  navigation={this.props.navigation}/>
                <View style={{flexGrow: 1, flexDirection:'column', justifyContent:'space-around', marginBottom:75}}>
                    <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('MyHome',{token:this.props.navigation.getParam('token'),username:this.state.username,navigation:this.props.navigation})} style={{flexDirection:'column', marginBottom:10}}>
                        <Icon
                            size={150}
                            name='home'
                            type='material'
                            color='orange'
                            />
                        </TouchableHighlight>
                        <Text style={{flexDirection:'column', color:'#ACACAC', fontSize:18, fontFamily:'Verdana'}} >Os Meus Podcasts</Text>
                    </View>
                    <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home',{token:this.props.navigation.getParam('token')})} style={{flexDirection:'column', marginBottom:10}}>
                        <Icon
                            size={150}
                            name='earth'
                            type='material-community'
                            color='orange'
                            />
                        </TouchableOpacity>
                        <Text style={{color:'#ACACAC',flexDirection:'column', fontSize:18, fontFamily:'Verdana'}}>Todos os Podcasts</Text>
                    </View>
                </View>
            </SafeAreaView>
          </>
        );
      } 
      else{
        return (<></>)
      }
    }
      
      _showUser = async () => {
        
        fetch('http://pcast.test/api/teste',{
            method: 'GET',
            headers:{
                'Authorization': "Bearer " + this.props.navigation.getParam('token'), //meter aqui o token
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((res => {
                

                this.setState({ 
                   username: res.name, user_id: res.id }
                )
            }));
      }
  
}

HomeScreen.navigationOptions = {
    headerStyle: {
      backgroundColor: '#292929',
    },
    headerTintColor: 'orange' 
  }
  