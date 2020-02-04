import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { 
    ListItem,
    Icon,
    Image,
} from 'react-native-elements';
import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
    text: {
      color: '#fff',
      fontSize: 15,
      fontWeight: 'bold'
    },
    wrapperStyle:{
      paddingVertical:-5,  
    },
  })
  

export default class PodcastInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categories:'',
        }        
    }

    
    /*<View style={{marginVertical:10}}>
                        <Text>{this.props.username}</Text>
                    </View>*/

    //TODO: implementar upvotes                
    render(){
        return(
            <>
                <View style={{flexGrow:0.5,alignItems:'center',justifyContent:'space-around' }}>
                    <Image source={{ uri: 'http://pcast.test/uploads/' + this.props.podcast.image}}
                                style={{  width: 100, height: 100 }}/>
                    <Text style={{color: 'white', fontFamily:'Verdana', fontSize:18,marginTop:10}}>
                       {this.props.podcast.name}
                    </Text>
                    <Text style={{color: '#A0A0A0', fontFamily:'Verdana',marginTop:10,marginBottom:20,marginHorizontal:28, fontSize:16}}>
                       {this.props.podcast.description}
                    </Text>
                </View>
            </>
        );
    }
}