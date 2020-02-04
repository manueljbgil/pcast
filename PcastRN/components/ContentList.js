import React from 'react';
import {
    AsyncStorage,
    View,
    Text,
    Image,
} from 'react-native';

import { Rating } from 'react-native-ratings';
import StarRating from 'react-native-star-rating';
import { 
    ListItem,
    Icon,
} from 'react-native-elements';
import { string, checkPropTypes, elementType } from 'prop-types';


export default class ContentList extends React.Component{
    constructor(props){
        super(props);
        
        //arr: this.state.arr.concat('new value')
        this.state = {
            starCount: [],
        };

        //this.changeData = this.changeData.bind(this);
        this._getSubscriptionStatus = this._getSubscriptionStatus.bind(this);

        //fetch API subscription status
        this._getSubscriptionStatus();
        
    }

    changeData(subs){
        
        const newState = []


        if(this.props.navigation.state.routeName=='MyHome'){
            subs.map((pod,i) => (
                newState[i] = {podcast: pod, count:1}    
            ));
        }
        else{
            
            this.props.podcasts.map((pod,i) => (
                newState[i] = {podcast: pod, count:0}    
            ));
            
            count = 0;
            //checking starCount on the database
            for (let index = 0; index < newState.length; index++) {
                subs.forEach((sub,i) => {
    
                    console.log("DDD: " + JSON.stringify(sub));
                    
                    if(sub.id == newState[index].podcast.id){
                        
                        newState[index].count = 1;    
                    }
                });                
            }
        }
        


        this.setState({
            starCount: newState
        })
        this.forceUpdate();

    }

    //on podcast press
    onPodcastPress(podcast) {


        if(this.props.navigation.state.routeName=='MyHome'){
            this.props.navigation.navigate('MyPodcast',{
                podcast: podcast,
                token: this.props.navigation.getParam('token'),
            })
        }else{
            //props to PodcastScreen
            
            this.props.navigation.navigate('Podcast',{
                podcast: podcast,
                token: this.props.navigation.getParam('token'),
            })
        }

        
    }
    

    onStarRatingPress(l,i) {
        if(l.count == 1){
            const newItems = [...this.state.starCount];
            newItems[i] = {podcast: l.podcast, count:0};
            this.setState({ starCount:newItems });

            //fetch api subscritption destroy!!!
            this._destroySubscription(newItems[i].podcast);

        }
        else{
            const newItems = [...this.state.starCount];
            newItems[i] = {podcast: l.podcast, count:1};
            this.setState({ starCount:newItems });

            //fetch api subscription store
            this._storeSubscription(newItems[i].podcast);
        }
    }

    _getSubscriptionStatus = async () => {

        const userToken = await AsyncStorage.getItem('token');
        
        fetch('http://pcast.test/api/subscriptions',{
            method: 'GET',
            headers:{
                'Authorization': "Bearer " + userToken, //meter aqui o token
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((res => {
                
                const newres = res;
                
                console.log(newres);
                
                

                //const aux = newres;
                //console.log("auxxx:" +JSON.stringify(aux));                

                this.changeData(newres);

            })
        );
    }

    _storeSubscription = async (podcast) => {

        const userToken = await AsyncStorage.getItem('token');
        

        fetch('http://pcast.test/api/subscriptions',{
            method: 'POST',
            headers:{
                'Authorization': "Bearer " + userToken, //meter aqui o token
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                user_id: this.props.user_id,
                podcast_id: podcast.id,
            })
        })
            .then((response) => response.json)
            .then((res => {
                console.log(res);
                
                alert(" Subscreveu " + podcast.name);
        }));
    }

    _destroySubscription = async (podcast) => {

        const userToken = await AsyncStorage.getItem('token');
        console.log("podcast_id" + podcast.id);
        

        fetch('http://pcast.test/api/subscriptions/' + podcast.id,{
            method: 'DELETE',
            headers:{
                'Authorization': "Bearer " + userToken, //meter aqui o token
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((res => {
                alert("Subscrição removida");
        }));
    }

    render(){

         //implementar switch aqui para as diferentes formas de ordenação 
         //console.log("a tentar entrar");
         
        if(this.state.starCount != []){
            //console.log("entreii :" + JSON.stringify(this.state.starCount));
            
            return(
                <>
                <View style={{alignSelf:'stretch',justifyContent:'space-between',flexGrow:4, marginVertical:0,marginHorizontal:0}}>
                    <View>
                        {   
                            this.state.starCount.map((l, i) => (
                            <ListItem
                                containerStyle={{backgroundColor:'#292929'}}
                                key={i}
                                title={l.podcast.name}
                                titleStyle={{ color: 'white', fontFamily:'Verdana', fontSize:16 }}
                                subtitleStyle={{ color: '#A0A0A0', fontFamily:'Verdana' , fontSize:14}}
                                subtitle={l.podcast.description}
                                leftElement={ <Image source={{ uri: 'http://pcast.test/uploads/' + l.podcast.image}}
                                style={{  width: 60, height: 60 }}/>}
                                rightElement={<StarRating
                                    rating={l.count}
                                    disabled={false}
                                    maxStars={1}
                                    emptyStarColor={'orange'}
                                    fullStarColor={'orange'}
                                    selectedStar={(rating) => this.onStarRatingPress(l,i)}
                                  />}
                                bottomDivider
                                onPress={() => this.onPodcastPress(l.podcast)}
                            />
                            ))
                        }
                    </View>
                </View> 
                </>
            );
        } 
        else{
            return (<></>)
        } 
    }
}