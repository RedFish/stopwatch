var formatTime = require('minutes-seconds-milliseconds');
var React = require('react-native');
var {
  Text,
  View,
  AppRegistry,
  StyleSheet,
  TouchableHighlight
} = React;

//Declare UI elements
var StopWatch = React.createClass({
  getInitialState: function() {
    return {
      timeElapsed: null,
      running : false,
      startTime : null,
      laps : []
    }
  },
  render : function() {
    return <View style={styles.container}>
      <View style={[styles.header,this.border('yellow')]}>
        <View style={[styles.timerWarpper,this.border('red')]}>
          <Text style={styles.timer}>
            {formatTime(this.state.timeElapsed)}
          </Text>
        </View>
        <View style={[styles.buttonWarpper,this.border('green')]}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>
      <View style={[styles.footer,this.border('blue')]}>
        {this.laps()}
      </View>
    </View>
  },
  startStopButton : function () {
    var style = this.state.running ? styles.stopButton : styles.startButton

    return <TouchableHighlight
      underlayColor='gray'
      onPress={this.handleStartPress}
      style={[styles.button,style]}
      >
      <Text>
        {(this.state.running) ? 'Stop' : 'Start'}
      </Text>
    </TouchableHighlight>
  },
  lapButton : function () {
    return <TouchableHighlight
      underlayColor='gray'
      onPress={this.handleLapPress}
      style={[styles.button]}
      >
      <Text>Lap</Text>
    </TouchableHighlight>
  },
  border: function(color) {
    return {
      //borderColor : color,
      //borderWidth : 4
    }
  },
  handleStartPress: function () {
    console.log('start was pressed')
    if (this.state.running) {
      clearInterval(this.interval);
      this.setState({
        running:false,
        laps:[]
      });
      return
    }

    this.setState({startTime : new Date()});

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running : true
      });
    }, 30);
  },
  handleLapPress: function () {
    var lap = this.state.timeElapsed;

    this.setState({
      startTime : new Date(),
      laps : this.state.laps.concat([lap])
    });
  },
  laps: function(){
    return this.state.laps.map(function(time, index){
      return <View style={styles.lap}>
        <Text style={styles.lapText}>
          Lap #{index + 1}
        </Text>
        <Text style={styles.lapText}>
          {formatTime(time)}
        </Text>
      </View>
    })
  }
});

//Let's make it looking good
var styles = StyleSheet.create({
  container: {
    flex : 1, //Fill the entire screen
    alignItems: 'stretch'
  },
  header : {
    flex : 1
  },
  footer :  {
    flex : 1
  },
  timerWarpper:{
    flex : 5,
    justifyContent : 'center',
    alignItems : 'center'
  },
  buttonWarpper:{
    flex : 3,
    flexDirection : 'row',
    justifyContent : 'space-around',
    alignItems : 'center'
  },
  timer: {
    fontSize : 60
  },
  button: {
    borderWidth: 2,
    height: 100,
    width : 100,
    borderRadius: 50,
    justifyContent : 'center',
    alignItems : 'center'
  },
  startButton : {
    borderColor : '#00CC00'
  },
  stopButton : {
    borderColor : '#AA0000'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  }
});

//Present element on screen
AppRegistry.registerComponent('stopwatch', () => StopWatch);
