import React from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  View
} from 'react-native';

export default class BackgroundImage extends React.Component {

  render(){
    return(
      <ImageBackground source={require("../resources/background.jpeg")}
             style={styles.backgroundImage}
            >
            {this.props.children}
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  backgroundImage:{
    flex: 1,
    width: null,
    height: null,
  }
});
