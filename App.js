import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler} from 'react-native';
import { MaterialCommunityIcons as Icon} from 'react-native-vector-icons'
import styles from './Styles.js';
import {getWinner} from './GetWinner';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import Styles from './Styles.js';
import {Button, SocialIcon, CheckBox} from 'react-native-elements'
import { BorderlessButton } from 'react-native-gesture-handler';

class HomeScreen extends React.Component {

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        {text: 'No'},
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ],
      { cancelable: false });
      return true;
  }

  render() {
    return (
      <View style = {{ flex: 1, alignItems: 'center', paddingTop: 50}}>
        <Text style = {Styles.titleText}>Tic Tac Toe</Text>

        <View style = {{paddingTop: 100, width: "40%"}}>
          <Button
            buttonStyle = {{borderRadius: 5}}
            raised
            title="Play"
            onPress={() => {
              this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                paddingTop: 300,
                actions: [
                  NavigationActions.navigate({ routeName: 'Game' })
                ],
              }))
            }}
          />
        </View>

        <View style = {Styles.button}>
          <Button
            buttonStyle = {{borderRadius: 5}}
            raised
            title='Exit'
            fontFamily='Comic Sans MS' 
            onPress = {() => this.backPressed()}
          />
        </View>

      </View>
    );
  }  
}

class GameScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ] ,
      currentPlayer: 1,
    }
  }

  componentDidMount(){
    this.initializeGame();
  }

  onNewGamePress = () => {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({gameState:
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1 
    })
  }

  onTilePress = (row, col) => {
    // Prevent repeat play on non empty spot
    var value = this.state.gameState[row][col];
    if (value != 0) return;

    // Set the correct tile
    var currentPlayer = this.state.currentPlayer;
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});

    // Switch to other player
    var nextPlayer = (currentPlayer == 1) ? -1: 1;
    this.setState({currentPlayer: nextPlayer});

    //Check Winner
    var winner = getWinner(this.state.gameState);
    if (winner == 1){
      Alert.alert("Player 1 is the winner!")
      this.initializeGame();
    }
    else if (winner == -1){
      Alert.alert("Player 2 is the winner!")
      this.initializeGame();
    }
  }

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    if (value == 1) return <Icon name = "close" style = {styles.tileX} />
    else if (value == -1) return <Icon name = "circle-outline" style = {styles.tileO} />
    else return <View/>
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {{flexDirection: "row"}}>
          <TouchableOpacity onPress = {() => this.onTilePress(0, 0)} style = {styles.tile}> 
            {this.renderIcon(0, 0)}
          </TouchableOpacity> 
          <TouchableOpacity onPress = {() => this.onTilePress(0, 1)} style = {styles.tile}> 
            {this.renderIcon(0, 1)}
          </TouchableOpacity> 
          <TouchableOpacity onPress = {() => this.onTilePress(0, 2)} style = {styles.tile}> 
            {this.renderIcon(0, 2)}
          </TouchableOpacity> 
        </View>

        <View style = {{flexDirection: "row"}}>
          <TouchableOpacity onPress = {() => this.onTilePress(1, 0)} style = {styles.tile}> 
            {this.renderIcon(1, 0)}
          </TouchableOpacity> 
          <TouchableOpacity onPress = {() => this.onTilePress(1, 1)} style = {styles.tile}> 
            {this.renderIcon(1, 1)}
          </TouchableOpacity> 
          <TouchableOpacity onPress = {() => this.onTilePress(1, 2)} style = {styles.tile}> 
            {this.renderIcon(1, 2)}
          </TouchableOpacity> 
        </View>

        <View style = {{flexDirection: "row"}}>
          <TouchableOpacity onPress = {() => this.onTilePress(2, 0)} style = {styles.tile}> 
            {this.renderIcon(2, 0)}
          </TouchableOpacity> 
          <TouchableOpacity onPress = {() => this.onTilePress(2, 1)} style = {styles.tile}> 
            {this.renderIcon(2, 1)}
          </TouchableOpacity> 
          <TouchableOpacity onPress = {() => this.onTilePress(2, 2)} style = {styles.tile}> 
            {this.renderIcon(2, 2)}
          </TouchableOpacity> 
        </View>
        <View style = {{paddingTop: 20, width: '40%'}}>
          <Button title = "New Game" onPress = {this.onNewGamePress}/>
        </View>
        <View style = {Styles.button}>
          <Button
            title="Home"
            onPress={() => {
              this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'Home' })
                ],
              }))
            }}
          />
        </View>

      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
    Home: {
      screen: HomeScreen,
    },
    Game: {
      screen: GameScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);