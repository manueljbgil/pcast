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
import EpisodeInfo from '../components/EpisodeInfo.js';
import Player from '../components/Player.js';
import { MonoText } from '../components/StyledText';

export default class PodcastScreen extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          username: '',
          podcast: '',
          episode: '',
          episodes:'',
          eps:[]
      }

      this._showUser = this._showUser.bind(this);
      this.updateInfoOnNewEpisode = this.updateInfoOnNewEpisode.bind(this);
      this.setState = this.setState.bind(this);

      //access API
      this._showUser();
      this._fetchAudioFile();
      
  }
  
  updateInfoOnNewEpisode(ep){
    console.log(ep);
    
    this.setState({ 
      episode: ep 
    });
  }
  
  render(){
    //borderWidth:10,borderColor:'#d6d7da'
    //<Header title={this.state.username} />
    //<EpisodeInfo podcastImage={this.state.podcast} episode={this.state.episode} />

    //console.log(this.state);
    
      if(this.state.username != '' && this.state.podcast != '' && this.state.episode != ''){
        
        return (
        
          <>
            <SafeAreaView style={{flex: 1,flexDirection:'column',justifyContent:'flex-start', alignItems:'center',backgroundColor:'#292929'}} >
                <Header title={this.state.username} navigation={this.props.navigation}/>
                <EpisodeInfo podcastImage={this.state.podcast} episode={this.state.episode} />
                <Player episode={this.state.episode} episodes={this.state.episodes} update={this.updateInfoOnNewEpisode}/>
            </SafeAreaView>
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
      
      _fetchOtherEpisodes = async () => {

      }

      _fetchAudioFile = async () =>{

        const podcast = this.props.navigation.getParam('podcast');
        console.log("podcast: " + JSON.stringify(podcast));
        
        const episode = this.props.navigation.getParam('episode');
        console.log("episode: "+ JSON.stringify(episode));
        
        //esta chamada está mal, retorna todos os eps de todos os podcast(lógica é feita em baixo)
        fetch('http://pcast.test/api/episodes/' + podcast.id,{
            method: 'GET',
            headers:{
                'Authorization': "Bearer " + this.props.navigation.getParam('token'), //meter aqui o token
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((res => {
                
                //aqui
                console.log("dasdadadadada: " +JSON.stringify(res[episode.id-1]));
                

                const newItems = [...this.state.eps]
                var countPodEp = 0
                //todos os eps do podcast pretendido
                res.map((l, i) => {

                  if(l.podcast_id==podcast.id){
                    console.log("eyyyyyh : " +JSON.stringify(res[i]));
                    newItems[countPodEp] = res[i];
                    countPodEp = countPodEp+1
                  }
                });
                console.log("new items: " + newItems);
                
                
                this.setState({ episode: res[episode.id-1], episodes:newItems , podcast: podcast });
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
