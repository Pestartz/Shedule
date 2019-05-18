import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ProgressBarAndroid, 
  WebView,
  StatusBar
}from 'react-native';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import GroupChoose from './GroupChoose'

var DomParser = require('react-native-html-parser').DOMParser

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: null, 
      groups: [], 
      load: 0
    };
  }

  componentWillMount(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://www.novkrp.ru/raspisanie.htm', true);
    xhr.send();
    xhr.onreadystatechange = function() { 
      if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
          this.setState({
            load:2
          })
        } else {
          let doc = new DomParser().parseFromString(xhr.responseText,'text/html')
          let tables = Array.from(doc.getElementsByTagName('table'));   
          let groupsNames=[];
          let array = [];
          let groups=[];

            tables.forEach((table)=>{
              array= Array.from(table.childNodes)
              groups = array.filter((item)=>item.localName == 'tr')[0].childNodes;
              groups =  Array.from(groups).filter((item)=>item.localName == "td");
              groups.forEach((item)=>{
                groupsNames.push(item.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].data)
              })
            })
            // groupsNames = groupsNames.filter((item)=>item!=" ");
            groupsNames = groupsNames.filter(function(x) {
              return x !== undefined && x !== null && x!=" "; 
            });
            console.log(groupsNames)
            this.setState({
              doc, groups: groupsNames, load:1
            })
          }    
      }.bind(this)
    }     

  render() {
    return (   
      <View style={styles.container}>              
        {(this.state.load==0) ?
          <View style={styles.welcome}>     
            <ProgressBarAndroid color="#29B6F6"/>
          </View>
            :  
          <View style={styles.container}>
            <GroupChoose groups={this.state.groups} doc={this.state.doc}/>
          </View>
        }      
      </View>        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  welcome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
  },
});


