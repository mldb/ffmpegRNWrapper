/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  NativeModules,
  NativeEventEmitter
} from "react-native";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});
const emitter=new NativeEventEmitter(NativeModules.FfmpegModule);
emitter.addListener(
  'onFailure',
  val=>console.log('jsssss receive: ',val)
)
emitter.addListener(
  'onSuccess',
  val=>console.log('jsssss receive: ',val)
)
emitter.addListener(
  'onProgress',
  val=>console.log('jsssss receive: ',val)
)
emitter.addListener(
  'onStart',
  val=>console.log('jsssss receive: ',val)
)
emitter.addListener(
  'onFinish',
  val=>console.log('jsssss receive: ',val)
)
export default class App extends Component {
  render() {
    NativeModules.FfmpegModule.getMpin(
      "-y -i /sdcard/sample_3.avi /sdcard/sample_3.mp4"
    );
    this.emitter.addListener(
      'MyEvent',
      name => callback( null, name )
  );

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
