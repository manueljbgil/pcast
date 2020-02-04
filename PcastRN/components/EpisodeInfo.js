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



export default class EpisodeInfo extends React.Component{
    constructor(props){
        super(props);
           
    }

    //TODO: implementar upvotes                
    render(){
        return(
            <>
                <View style={{flexGrow:0.1, marginBottom:20}}>
                    <View style={{flexDirection:'row',marginBottom:20}}>
                        <View style={{marginLeft:20}}>
                            <Image source={{ uri: 'http://pcast.test/uploads/' + this.props.podcastImage.image}}
                                style={{  width: 110, height:110 }}/>
                        </View>
                        <View>
                            <View style={{flexDirection:'column', alignItems:'flex-start'}}>
                                <Text style={{marginBottom:20,marginHorizontal:30, width:220, fontSize:18, color: 'white',fontFamily:'Verdana'}}>
                                    {this.props.podcastImage.name}
                                </Text>
                                <Text style={{marginBottom:21,marginHorizontal:30, width:220,fontSize:16, color: '#A0A0A0', fontFamily:'Verdana'}}>
                                    {this.props.episode.name}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection:'column', alignItems:'flex-start', marginHorizontal:20}} >
                        <Text style={{fontSize:16, marginBottom:10, color: 'white',fontFamily:'Verdana'}}>
                            Sobre
                        </Text>
                        <Text style={{fontSize:14, color:'#BEBEBE',fontFamily:'Verdana'}}>
                            {this.props.episode.description}
                        </Text>
                    </View>            
                </View>
                
            </>
        );
    }
}