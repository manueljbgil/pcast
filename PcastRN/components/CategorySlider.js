import React from 'react';
import {
    Button,
    View,
    Text,
    StyleSheet,
    
} from 'react-native';

import {
    Icon,
} from 'react-native-elements';
import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
    wrapper: {
        height:50
    },
    slide1: {
      height:50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'orange'
    },
    text: {
        fontFamily:'Verdana',
        color: 'black',
        fontSize: 18,
    },
    wrapperStyle:{
        height:50,
        paddingVertical:0,  
    },
    buttonText:{
        color:'#292929',
        fontSize:48
    }
  })
  

export default class CategorySlider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categories:'',
            category: 0,
        }   
        
        this._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this);
    }


    _onMomentumScrollEnd(e, state, context){
        console.log(state.index);

        //call method on parent
        //calledTwice - not working
        //this.props.setCategory(state.index);

    }
    
    render(){
        console.log(this.state.category);

        return(
            <>
                <View style={{alignSelf:'stretch',justifyContent:'space-between', marginVertical:40}}>
                    <Swiper ref="swiper" style={styles.wrapper} showsButtons={true} showsPagination={false} onMomentumScrollEnd ={this._onMomentumScrollEnd} 
                            prevButton={<Text style={styles.buttonText}>‹</Text>} 
                            nextButton={<Text style={styles.buttonText}>›</Text>} 
                            buttonWrapperStyle={styles.wrapperStyle} >
                    {
                        this.props.categories.map((l, i) => (
                            <View style={styles.slide1}>
                                <Text style={styles.text}>{l.name}</Text>
                            </View>
                        ))
                    }
                    </Swiper>
                </View>
            </>
        );
    }
}