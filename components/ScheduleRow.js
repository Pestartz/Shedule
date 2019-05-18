import React,{Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:15,
    height: 80,
    margin: 13,
    maxHeight: "100%",
    maxWidth: "100%",
    flexDirection: 'row',
    backgroundColor:"#fff",
    alignItems:"center",
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 7,
    marginBottom: 10,
    elevation: 4,
  },
  text: {
    width: '80%',
    // backgroundColor:"#bd6caf",
    fontSize: 14,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    alignItems:"flex-start",
  },
  time: {
    flex: 1,
    alignItems:"center",
    minWidth: '15%',
    flexDirection: "column",
    color: '#1faee9'
  },
  wrapper:{
    margin:20
  }
});
  
const ScheduleRow = (props) => (
  <View style={styles.container}>
    <View style={styles.time}>
      {/* <Text style={(correct_date)? {color:'#000000'}:{color:'#000000'}}>{props.data.time.start}</Text> */}
      <Text style={{color:'#1faee9'}}>{props.data.time.start}</Text>
      <Text style={{color:'#1faee9'}}>{props.data.time.finish}</Text>
    </View>
    <Text style={styles.text}>
      {props.data.value}
    </Text>
  </View>
);

export default ScheduleRow;
 {/* {`${props.data.time.start} - ${props.data.time.finish}`} */}