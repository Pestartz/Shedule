import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  ToolbarAndroid,
  StatusBar
} from 'react-native';

import Row from './GroupChoose/Row';
import Schedule from './components/Schedule';

import { Toolbar } from 'react-native-material-ui';
import {getStatusBarHeight} from "react-native-status-bar-height";

let CURRENT_HEIGHT_STATUS_BAR = getStatusBarHeight();

export default class GroupChoose extends Component{
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      currentGroup: ""
    };
  }

  render() {
    let groups = this.props.groups.slice();
    groups = groups.filter((item)=>item.indexOf(this.state.input)!=-1 || this.state.input.length == 0);   
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource = ds.cloneWithRows(groups)
    
    return (  
      (this.state.currentGroup.length == 0)? 
       
      <View style={styles.container}>              
        <View style={styles.statusbar}>
          <StatusBar
            barStyle = "default" 
            hidden = {false} 
            backgroundColor="#007cad"
            translucent = {true}
          />
        </View>

        <Toolbar
          style={{container: {backgroundColor: '#1faee9'}}}
          centerElement="Группы"
          searchable={{
            autoFocus: true,
            placeholder: 'Поиск...',
            onChangeText: function(text){this.setState({input:text})}.bind(this)
          }}
        />

        <ListView
          style={styles.container}
          dataSource={dataSource}
          renderRow={(data, index) => <Row index={index} name={data} 
          onPress={(text)=>{this.setState({currentGroup: text})}}/>}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />                
      </View>
      :
      <Schedule 
        doc={this.props.doc} 
        groups={this.props.groups}
        currentGroup={this.state.currentGroup} 
        back={()=>this.setState({currentGroup: ""})}
      />    
    );
  }
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
    },
    toolbar: {
      backgroundColor: '#1faee9',
    },
    statusbar: {   
      height: CURRENT_HEIGHT_STATUS_BAR,
      backgroundColor: '#1faee9',
    },
    separator: {
     flex: 1,
     height: StyleSheet.hairlineWidth,
     backgroundColor: '#8E8E8E',
   }
});
