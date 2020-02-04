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
  Alert
} from 'react-native';

import {
  Button,
  Input,
} from 'react-native-elements';

import Header from '../components/Header.js';
import CategorySlider from '../components/CategorySlider.js';
import ContentList from '../components/ContentList.js';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component{
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
      this._fetchImage = this._fetchImage.bind(this);
      this._fetchCategories = this._fetchCategories.bind(this);

      //access API
      this._showUser();
      this._fetchImage();
      this._fetchCategories();
      
  }
  
  componentDidMount(){
    
  }


  render(){
    //borderWidth:10,borderColor:'#d6d7da'
    
    
      if(this.state.categories != '' &&  this.state.podcasts != '' && this.state.username != '' &&  this.state.user_id != ''){

        
        
        return (
        
          <>
          <ScrollView style={{backgroundColor:'#292929'}}>
            <SafeAreaView style={{flexDirection:'column', justifyContent:'flex-start', alignItems:'center', backgroundColor:'#292929'}} >
              <Header navigation={this.props.navigation}/>
              <CategorySlider username={this.state.username} token={this.props.token} setCategory={this.selectCategory} categories={this.state.categories}/>
              <ContentList podcasts={this.state.podcasts} category={this.state.category_id} username={this.state.username} user_id={this.state.user_id}  navigation={this.props.navigation}/> 
            </SafeAreaView>
            </ScrollView>
          </>
        );
      } 
      else{
        return (<></>)
      }
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
                   username: res.name, user_id: res.id }
                )
            }));
      }
  
      _getToken = async () => {
          try {
            const token = await AsyncStorage.getItem('token');
            console.log("token here: " + token);
            
            if (token !== null) {
              this.setState({
                token: token
              });

              
            }
          } catch (error) {
            // Error retrieving data
          }
      }

      _fetchImage = async () => {
        
        const token = await AsyncStorage.getItem('token');
        fetch('http://pcast.test/api/podcasts',{
            method: 'GET',
            headers:{
                'Authorization': "Bearer " + token, //meter aqui o token
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((res => {
                
                console.log(res);
                

                this.setState({ 
                   podcasts: res }
                )
            }));
      }

      _fetchCategories = async () => {

        const token = await AsyncStorage.getItem('token');
        fetch('http://pcast.test/api/categories',{
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
                   categories: res }
                )
            }));
      }
}

HomeScreen.navigationOptions = {
  headerStyle: {
    backgroundColor: '#292929',
  },
  headerTintColor: 'orange',
  headerTitleStyle: {
    fontFamily: 'Verdana',
  },   
}
