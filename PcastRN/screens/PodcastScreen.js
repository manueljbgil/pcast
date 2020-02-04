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
  Input
} from 'react-native-elements';

import Header from '../components/Header.js';
import PodcastInfo from '../components/PodcastInfo.js';
import EpisodeList from '../components/EpisodesList.js';
import { MonoText } from '../components/StyledText';

export default class PodcastScreen extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          username: '',
          podcast: '',
          episodes: [],
      }

      this._showUser = this._showUser.bind(this);

      //access API
      this._showUser();
      this._fetchEpisodes();
      
  }
  
  
  render(){
    //borderWidth:10,borderColor:'#d6d7da'

      if(this.state.username != '' && this.state.podcast != '' && this.state.episode != []){
        
        return (
        
          <>
          <ScrollView style={{backgroundColor:'#292929'}}>
            <SafeAreaView style={{flex: 1,flexDirection:'column', justifyContent:'flex-start', alignItems:'center',backgroundColor:'#292929'}} >
              
                <Header title={this.state.username}  navigation={this.props.navigation}/>
                <PodcastInfo podcast={this.state.podcast}/>
                <EpisodeList episodes={this.state.episodes} navigation={this.props.navigation}/>
              
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
        
        const userToken = await AsyncStorage.getItem('token');
        

        fetch('http://pcast.test/api/teste',{
            method: 'GET',
            headers:{
                'Authorization': "Bearer " + userToken, //meter aqui o token
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
  
      _getToken = async () => {
          try {
            const token = await AsyncStorage.getItem('token');
            
            if (token !== null) {
              this.setState({
                token: token
              });

              
            }
          } catch (error) {
            // Error retrieving data
          }
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

      _fetchEpisodes = async () =>{

        const token = await AsyncStorage.getItem('token');
        const podcast = this.props.navigation.getParam('podcast');

        fetch('http://pcast.test/api/episodes/' + podcast.id,{
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

                //traverse response (array de objectos)
                //this.state.episodes deve estar sempre vazio no momento da instrução
                const newItems = [...this.state.episodes];


                res.map((l, i) => {
                  if(l.podcast_id==podcast.id){
                    console.log(l);
                    newItems[i] = res[i];
                  }
                  
                });
                
                this.setState({ episodes:newItems , podcast: podcast });
            }));
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

PodcastScreen.navigationOptions = {
  headerStyle: {
    backgroundColor: '#292929',
  },
  headerTintColor: 'orange',
  headerTitleStyle: {
    fontFamily: 'Verdana',
  },   
}
