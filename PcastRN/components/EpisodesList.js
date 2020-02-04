import React from 'react';
import {
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

export default class EpisodesList extends React.Component{
    constructor(props){
        super(props);
        
        //arr: this.state.arr.concat('new value')
        this.state = {
            episodes: [],
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        
    }

    componentDidMount(){
        
        /* const newState = []
        
        this.props.podcasts.map((pod,i) => (
            //check starCount na base de dados!!!

            newState[i] = 0    
        ));

        this.setState({
            starCount: [...this.state.starCount, newState]
        }) */

    }

    //on episode press
    onEpisodePress(episode) {
        if(this.props.navigation.state.routeName=='MyPodcast'){
            this.props.navigation.navigate('MyReproduction',{
                episodes: this.props.episodes,
                podcast: this.props.navigation.getParam('podcast'),
                episode: episode,
                token: this.props.navigation.getParam('token'),
            })
        }else{
            //props to ReproductionScreen
        this.props.navigation.navigate('Reproduction',{
            podcast: this.props.navigation.getParam('podcast'),
            episode: episode,
            token: this.props.navigation.getParam('token'),
        })
        }
    }
    

    onStarRatingPress(i) {
        if(this.state.starCount[i] == 1){
            const newItems = [...this.state.starCount];
            newItems[i] = 0;
            this.setState({ starCount:newItems });

            //fetch api subscription store
        }
        else{
            const newItems = [...this.state.starCount];
            newItems[i] = 1;
            this.setState({ starCount:newItems });

            //fetch api subscription destroy
        }
    }

    render(){

         //implementar switch aqui para as diferentes formas de ordenação 
         
         //terá de ser o botão play!!
         //leftElement={ <Image source={{ uri: 'http://pcast.test/uploads/' + l.image}} style={{  width: 40, height: 40 }}/>}

        //if(this.state.episodes != null){
            
            return(
                <>
                <View style={{alignSelf:'stretch',justifyContent:'space-between',flexGrow:4, marginHorizontal:15}}>
                    <View>
                        {   
                            this.props.episodes.map((l, i) => (
                            <ListItem
                                containerStyle={{backgroundColor:'#292929'}}   
                                key={i}
                                title={l.name}
                                subtitle={l.description}
                                titleStyle={{ color: 'white', fontFamily:'Verdana', fontSize:16 }}
                                subtitleStyle={{ color: '#A0A0A0', fontFamily:'Verdana' , fontSize:14}}
                                rightElement={<Icon
                                    size={40}
                                    name='play'
                                    type='material-community'
                                    color='orange'
                                    />
                                    }
                                bottomDivider
                                onPress={() => this.onEpisodePress(l)}
                            />
                            ))
                        }
                    </View>
                </View> 
                </>
            );
        } 
        //else{
            //return (<></>)
        //} 
    //}
}