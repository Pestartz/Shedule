import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  BackHandler,
  ListView,
  FlatList,
  ToolbarAndroid,
  StatusBar,
  Button
} from 'react-native';

import { Toolbar } from 'react-native-material-ui';
import ScheduleRow from './ScheduleRow'
import { ListItem } from 'react-native-elements';
import {getStatusBarHeight} from "react-native-status-bar-height";

const FAIL_GROUP = "5-О-1";
let CURRENT_HEIGHT_STATUS_BAR = getStatusBarHeight();

export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {    };
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  back(){
    this.props.back()
  }

  componentWillMount=()=>{
    BackHandler.addEventListener('hardwareBackPress',  this.handleBackButton)
  }
  
  componentWillUnmount=()=>{
    BackHandler.removeEventListener('hardwareBackPress',  this.handleBackButton)
  }

  handleBackButton() {
    this.props.back()
    return true;
  }

  getTdContent=(TDElement)=>{
    return TDElement.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].data
  }



  getSchedule=()=>{
    let CTable = Number(this.props.currentGroup[0])-1;
    if(this.props.currentGroup==FAIL_GROUP){
      CTable=Number(this.props.currentGroup[0])-2;
    }
    let doc = this.props.doc
    CTable = Array.from(doc.getElementsByTagName('table'))[CTable];
    let lessons = Array.from(CTable.childNodes).filter((item)=>item.localName == "tr")
    let group = Array.from(lessons.slice()[0].childNodes).filter((item)=>item.localName == "td");
    lessons.splice(0,1)
    group.splice()
  
    
    // console.log("ggroup="+group)
    // console.log("l="+lessons[0].childNodes.innerTex


    let name = this.props.currentGroup;
    let FailsOfTables = [];
    let currentIndex = 0;
    let firstLesson = Array.from(lessons.slice()[0].childNodes).filter((item)=>item.localName == "td");
    // firstLesson.splice()
  
    let gCount=0;
    if(this.props.currentGroup[0]==5){
      for(let i=0;i<this.props.groups.length;i++){
        if(this.props.groups[i][0]==4)
        gCount++;
      }
      gCount++;
    }else{
      for(let i=0;i<this.props.groups.length;i++){
        if(this.props.groups[i][0]==this.props.currentGroup[0])
        gCount++;
      }
    }
    if(this.props.currentGroup[0]){
      // for(let i=0;i<this.props.groups.length+1;i++){
      //   gCount++;
      // }
    }
    
    console.log("gCount="+gCount)
    console.log(firstLesson.length)

    for(let i=0;i<gCount;i++){
      if(firstLesson[i].textContent.includes("ПРАКТИКА") || firstLesson[i].textContent.includes("Каникулы") 
      || firstLesson[i].textContent.includes("КАНИКУЛЫ")
      || firstLesson[i].textContent.includes("Эказмен")
      || firstLesson[i].textContent.includes("ЭКЗАМЕН")){
        FailsOfTables.push(i);
      }
      
      if(group[i].textContent.includes(name)){
        currentIndex = i;
      }
    }
  
    let raspisanie = {};
    let nowLesss;
    lessons.forEach((item,i)=>{
      nowLesss = Array.from(item.childNodes).filter((o)=>o.localName == "td")
      if(FailsOfTables.indexOf(currentIndex)==-1 && i!=0){
        let count=0;
        FailsOfTables.forEach((it,j)=>{
          if(currentIndex>it) count++;
        })
        raspisanie[i] = nowLesss[currentIndex-count].textContent;
      }else{
        raspisanie[i] = firstLesson[currentIndex].textContent;
      }
    })
    console.log()
    // this.setState({schedule: raspisanie});
    return raspisanie;
  }


  render() {
    const schedule = this.getSchedule();
    let doc = this.props.doc;
    let forToolbar;
    let test = doc.getElementsByTagName("p")['0'].textContent;
    let arr = test.split(', ');
    if(/[0-9]/.test(arr[0])){
      forToolbar="("+arr[0]+")";
    }else{
      forToolbar="";
    }
    

    const times={
      0:{start: "08:30",finish:"10:00"},
      1:{start: "10:10",finish:"11:40"},
      2:{start: "12:10",finish:"13:40"},
      3:{start: "13:50",finish:"15:20"},
      4:{start: "15:30",finish:"17:00"},
      5:{start: "17:10",finish:"18:40"}
    }
    let key=0;
    let cards=[];
    let exp = /[абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ]/;

    for(i in schedule){
      if(exp.test(schedule[i]) && i<6){
        let a = schedule[i].split("")
        a = a.filter((item)=>item!='\n')
        a = a.join("")
        cards.push({value: a, time: times[i], key: i})
      }
    }
    
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource= ds.cloneWithRows(cards)
  
    return (
      <View style={styles.container}>          
        <View style={{backgroundColor: '#1faee9', height: CURRENT_HEIGHT_STATUS_BAR}}>
          <StatusBar
            barStyle = "default" 
            hidden = {false} 
            translucent = {true}
          />
        </View>

        <Toolbar
          style={{container: {backgroundColor: '#1faee9'}}}
          centerElement={this.props.currentGroup+"  "+forToolbar}
          leftElement="arrow-back"
          onLeftElementPress={()=>this.back()}
        />
   
        <ListView
          style={styles.list_view}
          dataSource={dataSource}
          renderRow={(data) => <ScheduleRow data={data}/>}
        />    

      </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#dfe5ec",
    width:"100%"
  },
  wrapper:{
    flex: 1,
    justifyContent: 'center',
    borderRadius: 20
  },
  separator: {
   flex: 1,
   height: StyleSheet.hairlineWidth,
   backgroundColor: '#8E8E8E',
 },
  cardText:{
    fontSize: 14
  },
  list_view:{
    flex:1, 
    height:"100%",
    padding:"2%"
  }
});
