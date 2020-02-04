import React from 'react';
import {
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
import { ExpoLinksView } from '@expo/samples';

export default function LinksScreen() {
  return (
    <>
        <SafeAreaView style={{flex: 1, top:150}} >
          <View style={stylesOld.layout}>
            <View style={stylesOld.inputsCenter}>
            <View style={{marginVertical:10}}>
                <Input placeholder='Email'/>
              </View>
              <View style={{marginVertical:10}}>
                <Input placeholder='Username'/>
              </View>
              <View style={{marginVertical:10}}>
                <Input placeholder='Password'/>
              </View>
            </View>
            <View style={stylesOld.buttonsCenter}>
              <Button
                  style={{width: 120}}
                  type="outline"
                  title="Register"
                />
            </View>
          </View>
        </SafeAreaView>
        </>
  );
}

LinksScreen.navigationOptions = {
  title: 'Links',
};

const stylesOld = StyleSheet.create({

  layout:{
    flex:1,
    flexDirection:'column',
    justifyContent: 'center'
  },
  buttonsCenter:{
    marginTop:50,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-evenly' 
  },
  inputsCenter:{
    marginHorizontal:50,
    flexDirection:'column',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});
