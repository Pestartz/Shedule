import React from 'react';
import { View, Text, StyleSheet,  TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    fontSize: 26,
    color:`#fff`,
    textAlign:'center',
    backgroundColor: "#d6d6d6",
    borderRadius: 20,
    // backgroundColor: getColor()
  },
});

  function getColor(i){
    let colors = ["rgba(52,152,219 ,0.6)","rgba(142,68,173 ,0.6)","rgba(192,57,43 ,0.6)","rgba(46,204,113 ,0.6)",
    "rgba(39,174,96 ,0.5)"];
    
    return colors[i];
  }



{/* <TouchableOpacity  onPress={() => props.onPress(props.name)}  underlayColor="white">
    <View style={styles.container}>
    
      <Text style={{height: 40,
    width: 40,
    fontSize: 26,
    color:`#fff`,
    textAlign:'center',
    backgroundColor: "#d6d6d6",
    borderRadius: 20,
    backgroundColor:  getColor()
    }} >
        {props.name[2]}
      </Text>
      <Text style={styles.text}>
        {props.name}
      </Text>
    </View>
  </TouchableOpacity> */}


class Row extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props.index)
    return (   
    <TouchableOpacity  onPress={() => this.props.onPress(this.props.name)}  underlayColor="white">
      <View style={styles.container}> 
      
        <Text style={{height: 40,
          width: 40,
          fontSize: 26,
          color:`#fff`,
          textAlign:'center',
          backgroundColor: "#d6d6d6",
          borderRadius: 20,
          backgroundColor:  getColor(this.props.name[0]-1)
          // backgroundColor: "rgba"
          // rgba(85,172,238 ,1 )
          }} >
            {this.props.name[2]}
          </Text>
            
        <Text style={styles.text}>
          {this.props.name}
        </Text>
      </View>
  </TouchableOpacity> 
    );
  }
}

export default Row