import React, { Component, useReducer } from 'react';
import {
  Alert, FlatList, Platform, Image, ImageBackground, StyleSheet,
  Text, Dimensions, StatusBar, Keyboard, TouchableOpacity, TextInput, Button, KeyboardAvoidingView, ActivityIndicator, ScrollView, View,
  Animated
} from 'react-native';
import { Header } from 'react-navigation-stack';
import * as SecureStore from 'expo-secure-store';
import Loader from './../loader/Loader';
import ModalUpdatePostReply from './../modals/ModalUpdatePostReply';
import RNPickerSelect from 'react-native-picker-select';
import Modal from 'react-native-modal';
import * as global from "./../common/global.js";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
const BEHAVIOR = Platform.OS === 'ios' ? "padding" : "height"
import { SvgXml } from 'react-native-svg';
//import { RadioButton } from 'react-native-paper';
const headerback = require('../../images/image-8.png');
const menuImg = require('../../assets/menu.png');
const tickets = require('../../assets/downarrow.png');
const downarrow = require('../../assets/downarrow.png');
const gallaryblack = require('../../assets/gallaryblack.png');
const nextgray = require('../../assets/nextgray.png');
const backarrow = require('../../assets/backarrow.png');
const profile = require('../../images/image-9.png');
const dagger = require('../../images/dager.png');
const hands_blue = require('../../images/handsblue.png');
const hands_white = require('../../images/hand.png');
const flag = require('../../images/flag.png');
const comment = require('../../images/comment.png');
const commentblue = require('../../images/commentblue.png');
const messageopenblack = require('../../assets/messageopenblack.png');
const crossarrow = require('./../../images/close.png');
const editblack = require('./../../assets/editblack.png');
const binblack = require('./../../assets/bin.png');
const unlike = require('../../images/unlike.png');
const like = require('../../images/like.png');
const flags = require('../../images/flag.png');
const comments = require('../../images/comment.png');

const image12 = require('../../images/image-12.png');
const userImage = require('../../images/image-11.png');
const image14 = require('../../images/image-14.png');
const image16 = require('../../images/image-16.png');
const sahre = require('../../assets/sahre.png');
const listimg = require('../../images/image-18.png');
const checkblue = require('../../assets/checkblue.png');
const flagblack = require('../../assets/flagblack.png');

const boxIcon = require('../../images/high-five-bar.png');
const handsBlack = require('../../images/hand-blck.png');
const handsBlue = require('../../images/hand-blue.png');
const comments1 = require('../../images/comments.png');

import { SwipeListView } from 'react-native-swipe-list-view';
import Toast from "react-native-easy-toast";
import Emoji from "react-native-emoji";
const getAccessToken = async () => {
  return await SecureStore.getItemAsync('token');
};

const getUserId = async () => {
  return await SecureStore.getItemAsync('id');
};

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default class AddReply extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data_list: [].fill('')
        .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
      ,

      checked: true,

      listViewData: Array(2)
        .fill('')
        .map((_, i) => ({ key: `${i}`, text: `item #${i}` })),

      accessToken: '',
      // challengeId:this.props.navigation.state.params.challengeID,
      itemCount: 0,
      feature_name: this.props.navigation.state.params.feature_array.feature_name,
      commentID: this.props.navigation.state.params.commentID,
      challengeId: "172",
      itemCount: 0,
      // feature_name: "WAll OF GRATITUDE",
      highCount: 0,
      total_count: 0,
      linkFeatureIdReply: 0,
      commentIndexMain: 0,
      flagIndexReply: '',
      editType: '',
      reportcommentText: '',
      userLiked: false,
      data_load: false,
      placeholderTextValue: 'Comment here...',
      spamVal: null,
      // profilePic: "",
      profilePic: this.props.navigation.state.params.profile_pic,
      // basic_array: this.props.navigation.state.params.basic_array,
      commentText: '',
      featureId: 2,
      editIndex: '',
      focusedData: [],
      focusIndex: 0,
      focusCmtIndex: 0,
      typeComment: 'comment',
      replyCommentText: '',
      editPost: {},
      linkedfeatureId: this.props.navigation.state.params.DATA.shout_out.id,
     
      week: 1,
      day: 1,
      offSet: 10, offSetLoader: false,
      Alldata: [],
      Primary_color: "",
      Secondary_color: "",
      Button_color: "",
      Text_color: "",
      Button_TEXT_color: "",
      BannerTextColor: "",
      cDetails: [],
      challenge_ID: "",
      us_Details: [],
      usa: "",
      ch_ID: "",
      LOGIN_DETAILS: [],
      PROFILE_PIC: "",
      mynewComment: "",
      scrollIndex: 0


    }
    this.renderRow = this.renderRow.bind(this);
    this.editmodalVisible = this.editmodalVisible.bind(this);
    this.editUpdateData = this.editUpdateData.bind(this);
    this.flagmodalVisible = this.flagmodalVisible.bind(this);
    this.rowSwipeAnimatedValues = {};
    Array(20)
      .fill('')
      .forEach((_, i) => {
        this.rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
      });
  }


  async componentDidMount() {

    var c_Details = await SecureStore.getItemAsync('CH_DETAILS');

    var lDetails = await SecureStore.getItemAsync('LOGIN_DETAILS');
    var cID = await SecureStore.getItemAsync('CHALLENGE_ID');
    if (cID !== null) {
      this.setState({ challenge_ID: cID })
    }
    if (lDetails !== null) {
      var login_DETAILS = JSON.parse(lDetails);
     
      this.setState({ PROFILE_PIC: login_DETAILS.user.profile_image, usa: login_DETAILS.user.id, })
     
      this.setState({ LOGIN_DETAILS: login_DETAILS });

    }

    if (c_Details !== null) {
      var ch_details = JSON.parse(c_Details);
      this.setState({ cDetails: ch_details });
      this.setState({
        Primary_color: ch_details.primary_color,
        Secondary_color: ch_details.secondary_color,

        Button_color: ch_details.button_color,
        Text_color: ch_details.text_color,
        Button_TEXT_color: ch_details.button_text_color,
        BannerTextColor: ch_details.banner_text_color,
        day: ch_details.day,
        week: ch_details.week
      })
    }

    var challenge_color = this.props.navigation.state.params.challenge_color;
   
    if (challenge_color !== undefined) {
      this.setState({
        Primary_color: challenge_color.primary_color,
        Secondary_color: challenge_color.secondary_color,
        Button_color: challenge_color.button_color,
        Text_color: challenge_color.text_color,
        Button_TEXT_color: challenge_color.button_text_color,
        BannerTextColor: challenge_color.banner_text_color,
        week:challenge_color.week,
        day:challenge_color.day
      })

    }
  
 

    this.setState({ Alldata: this.props.navigation.state.params.DATA });
    var full_string = this.state.Alldata.shout_out.comment;
    var value = this.state.Alldata.shout_out.comment;

    this.setState({ scrollIndex: this.state.Alldata.shout_out.comment_level })
    console.log("ALLDATA_SHOUT_OUT", this.state.Alldata)
    var tmp = value.split(" ");
    if (tmp !== undefined) {

      tmp.map((val, index) => {
        if (/^[@]/.test(val)) {
          var dd = val.replace(/[@]/g, " ")
          var name = dd + ' ' + tmp[index + 1];
          if (tmp[index + 1] !== undefined) {
            tmp[index] = '';
            tmp[index + 1] = '';
            tmp[index] = <Text style={{ fontFamily: 'PoppinsBold', fontSize: 13, color: this.state.Primary_color }}>{name}</Text>;




          } else {
            tmp[index] = " @";
          }


        }
        else {
          tmp[index] = " " + val;
        }
        tmp.toString();
    
        full_string = tmp;
      });


    }

    this.setState({ mynewComment: full_string });
    
    this.getDataObject();
  

  }

  async componentWillReceiveProps() {

    

  }
  flagmodalVisible() {
    this.setState({ flagModal: !this.state.flagModal })
  }


  getDataObject(dataObject) {

    setTimeout(() => {

      if (this.state.linkedfeatureId != undefined) {
        this.getDailyInspirationApiData(this.state.challenge_ID, this.state.featureId);
      }

    }, 1000);
  }
  //function to get data from API 
  async getDailyInspirationApiData(challangeId, featureId) {
   
    this.setState({ offSetLoader: true });
    const token_ = await SecureStore.getItemAsync('token');

    const url = global.base_URL + "shout-outs/" + this.state.linkedfeatureId + "?challenge_id=" + this.state.challenge_ID + "&uid=" + this.state.usa + "&week=" + this.state.week + "&page_size=40";

    console.log("SHOUT_OUT_URL", url)

    
    var TOKEN = JSON.parse(token_)
    fetch(url,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': TOKEN,
        }),
      })
      .then(async (response) => response.text())
      .then(async (responseText) => {

        var dataobject = JSON.parse(responseText);
     

        if (dataobject.status == true) {
          this.setState({ data_load: true });
          this.setState({ itemCount: dataobject.count_records });

          this.setState({ total_count: dataobject.total_replies });

          this.setState({ highCount: dataobject.total_high_fives });

          this.setState({ userLiked: dataobject.if_you_high_fived });

          if (dataobject.count_records == 0) {
            this.setState({ offSetLoader: false });
          };
          this.setState({ offSetLoader: false });
          this.InheritedData(dataobject);
        } else {
          this.setState({ offSetLoader: false });
        }


      }
      )
      .catch((error) => {
       
        this.setState({ offSetLoader: false });
      })
  }

//function to store data to state 
  setDataList(text) {
    this.setState({ data_list: this.state.data_list.concat(text) });

   

  }


  InheritedData(data) {
    if (data.status == true) {
      if (data.content.length > 0) {
        this.setDataList(data.content);
      }
    }
  }
//function to load more data on Scroll
  handeLoadMoreItem = () => {
    if (this.state.itemCount !== 0) {
      var offset = this.state.offSet;
      var addoffset = parseInt(offset + 10);
      this.setState({ offSet: addoffset });
      this.getDailyInspirationApiData(this.state.challenge_ID, this.state.featureId);
    }
  }
//function to show footer component for pagination
  footerComponent = () => {
    

    if (this.state.offSetLoader) {
      return (
        <View style={{ height: 10 }}></View>
      )
    }
    return (<View style={{ height: 10 }}></View>);

  }
//function to show empty container 
  renderEmptyContainer = () => {
    if ((!this.state.offSetLoader && this.state.data_load)) {
      return (
        <View style={{
          flex: 1,
          backgroundColor: 'transparent',
          marginTop: 50,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ fontFamily: 'PoppinsLight' }}></Text>
        </View>
      )
    }
    else {
      return (
        <View></View>
      )
    }
  }

//function to submit High-Five 
  async messageHighFive() {
    
    const token_ = await SecureStore.getItemAsync('token');

    

    const url = global.base_URL + 'shout-outs';
    
    var formdata = new FormData();
    formdata.append("challenge_id", this.state.challenge_ID);
    formdata.append("uid", this.state.usa);
    formdata.append("week", this.state.week);
    formdata.append("type", "l");
    formdata.append("day", this.state.day);
    formdata.append("linked_comment_id", this.state.Alldata.shout_out.id);
    console.log("FORM", formdata);
    var TOKEN = JSON.parse(token_)
    fetch(url,
      {
        method: 'POST',
        headers: new Headers({
          // 'Content-Type': 'application/json',
          'Authorization': TOKEN,
        }), body: formdata
      })
      .then(async (response) => response.text())
      .then(async (responseText) => {
        console.log("HIGH_FIVEV-shout-out", responseText);
        var dataobject = JSON.parse(responseText);
        if (dataobject.status == true) {
          this.setState({ userLiked: true });
          var count = parseInt(parseInt(this.state.highCount) + 1);
          this.setState({ highCount: count });
          this.refs.toast.show(
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 12 }}>Yes! </Text>
              <Emoji name="clap" style={{ fontSize: 12, color: 'White', backgroundColor: 'transparent' }}
              />

            </View>)
        }
        else {
         
        }
      }
      )
      .catch((error) => {
       
      })
  }
//function to render header component 
  headerComponent = () => {

    const mycomment = `<svg id="Capa_1" enable-background="new 0 0 511.096 511.096" height="15" width="15" viewBox="0 0 511.096 511.096" xmlns="http://www.w3.org/2000/svg"><g id="Speech_Bubble_48_"><g>
        <path  fill=`+ this.state.Button_color + ` d="m74.414 480.548h-36.214l25.607-25.607c13.807-13.807 22.429-31.765 24.747-51.246-59.127-38.802-88.554-95.014-88.554-153.944 0-108.719 99.923-219.203 256.414-219.203 165.785 0 254.682 101.666 254.682 209.678 0 108.724-89.836 210.322-254.682 210.322-28.877 0-59.01-3.855-85.913-10.928-25.467 26.121-59.973 40.928-96.087 40.928z"/></g></g></svg>`

    const myHand = `<?xml version="1.0" encoding="utf-8"?>
        <!-- Generator: Adobe Illustrator 25.2.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" height="15" width="15" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve">
        <style type="text/css">
          .st0{stroke:#FFFFFF;stroke-width:3;stroke-miterlimit:10;}
        </style>
        <path 
        fill=`+ this.state.Button_color + ` d="M483.3,297.2l-5.7-8c-6.3-10.1-16.6-17.1-28.3-19.4c-12-2.3-24.3,0.5-34.1,7.7l-11.1,7.9l39.7-148.4
          c4.8-18.1-5.3-36.5-22.4-41.1c-6.7-1.8-13.1-1.1-19.8,1.2l3.1-11.4c4.8-18.1-4.9-36.3-22-40.9l-0.6-0.2
          c-15.6-4.2-31.7,4.4-38.2,19.6c-4.1-5.5-10-9.5-16.7-11.3c-17.1-4.6-34.9,6.4-39.8,24.4l-8,29.9L288,119l1.1,4.4l11.4-42.5
          c2.9-10.9,13.2-17.7,23.2-15c9.9,2.7,15.5,13.7,12.6,24.6l-28.8,107.5l6.7,27.2L355,72.5c2.9-10.9,13.6-17.4,23.5-14.7l0.6,0.2
          c9.9,2.7,15.7,13.6,12.8,24.5l-9.9,37.1c-0.1,0.3-0.2,0.6-0.3,1c0,0.1-0.1,0.3-0.1,0.4c-4.4,16.5-9.2,34.3-13.8,51.3
          c-10.6,39.4-19.7,73.5-20.6,76.8c-0.9,3.6,1.2,7.3,4.8,8.2c3.6,0.9,7.3-1.2,8.2-4.8c0.9-3.3,10-37.3,20.6-76.7
          c4.7-17.4,9.6-35.7,14.1-52.5c3.2-10.4,13.4-16.8,23.1-14.2c9.9,2.7,15.6,13.7,12.7,25.6l-44.5,166.5c-0.7,1.7,0.3,4.7,2.7,6.3
          c2.3,1.6,5.4,1.6,7.7-0.1l26.4-18.9c6.8-5,15.4-7,23.7-5.4c8.1,1.6,15.2,6.5,19.6,13.6c0.1,0.1,0.1,0.2,0.2,0.3l2.6,3.7L365.2,413.9
          c-6,6.5-13,11.7-20.6,15.2l-4.5,16.2c13-4,25.2-11.6,35-22.3l107.6-117.4C484.9,303.3,485.1,299.8,483.3,297.2z"/>
        <path fill=`+ this.state.Button_color + ` class="st0" d="M366.9,361.4c-23.4-87.7-49.6-185.6-64.6-241.1c-3.6-13.4-16.5-21.4-28.9-18.1l-0.6,0.2
          c-12.3,3.3-19.8,16.6-16.2,30.1l27.2,101.6c1,3.7-1.2,7.6-4.9,8.6c-3.7,1-7.6-1.2-8.6-4.9L224.2,65.3c-3.6-13.5-16.4-21.8-28.8-18.5
          c-12.3,3.3-19.2,16.9-15.6,30.4l46.2,172.4c1,3.7-1.2,7.6-4.9,8.6c-3.7,1-7.6-1.2-8.6-4.9l-53.1-198c-3.6-13.5-16.8-21.5-29.1-18.2
          l-0.7,0.2c-12.3,3.3-19.5,16.9-15.9,30.4c3.3,12.4,7.4,27.6,11.8,44.1c0.1,0.4,0.2,0.7,0.3,1.1c0,0.2,0.1,0.3,0.1,0.5
          c5.3,19.6,10.9,40.8,16.4,61c12.6,46.8,23.4,87.2,24.4,91.2c0.5,1.8,0.2,3.7-0.7,5.3c-0.9,1.6-2.5,2.8-4.3,3.2l0,0
          c-1.8,0.5-3.7,0.2-5.3-0.7c-1.6-0.9-2.8-2.5-3.2-4.2c-1-3.9-11.9-44.3-24.4-91.2c-5.6-20.7-11.4-42.5-16.7-62.4
          c-4-12.9-16.6-20.8-28.7-17.5c-12.3,3.3-19.4,17-15.8,30.5l52.9,197.9c0.8,2.9-0.3,5.9-2.8,7.6c-2.4,1.7-5.7,1.7-8.1-0.1l-31.3-22.4
          c-8.3-6.1-18.8-8.5-29-6.6c-9.9,2-18.6,8-23.9,16.6c-0.1,0.1-0.1,0.2-0.2,0.3l-3.6,5l124,135.3c19.6,21.4,48.1,30.2,74.6,23.1
          l94.7-25.4C355.1,448.8,378.5,404.8,366.9,361.4z"/>
        </svg>
        `

    // if (this.state.Alldata.shout_out.image.path !== ""){
    //   const ratio = deviceWidth/this.state.Alldata.shout_out.image.width;
    //   const height = this.state.Alldata.shout_out.image.height * ratio;
    // }
    // else {
    const ratio = deviceWidth / 10;
    const height = 5 * ratio;
    // }


    return (
      <View>

        {this.state.Alldata.length !== 0 &&

          <View style={{
            flex: 0,
            marginTop: 8,
            backgroundColor: 'transparent',
            borderBottomWidth: 0.3,
            borderBottomColor: '#CACACA',
            paddingHorizontal: 15,
            paddingVertical: 15,
            // elevation: 3,
            // shadowColor: "gray",
            // shadowOpacity: 0.8,borderRadius:4,
            // shadowRadius: 2,
            // paddingHorizontal:10,
            // paddingVertical:10,
            // shadowOffset: {
            //     height: 1,
            //     width: 1
            // }

          }}>




            <View style={{ backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'flex-start' }}>
              <TouchableOpacity

                onPress={() => {
                  this.onShowProfilePic(this.state.Alldata.user_details.profile_pic)
                }}

                style={{ flex: 0.15 }}>
                <Image source={{ uri: this.state.Alldata.user_details.profile_pic }} style={{ height: 50, marginLeft: 0, width: 50, borderRadius: 50 / 2 }} />
              </TouchableOpacity>
              <View style={{ flex: 0.85, backgroundColor: "transparent", marginLeft: 10 }}>

                <View style={{ backgroundColor: 'transparent', alignItems: "flex-start" }}>
                  <Text style={{ fontFamily: 'PoppinsBold' }} >{this.state.Alldata.user_details.name}</Text>
                </View>
                <View style={{ backgroundColor: 'transparent' }}>
                  <Text style={{ fontFamily: 'PoppinsRegular', color: 'gray', fontSize: 10 }} >{this.state.Alldata.shout_out.time}</Text>
                </View>
              </View>
            </View>

            <View style={{ backgroundColor: 'transparent', flex: 0, justifyContent: 'flex-start', marginTop: 0, alignItems: 'flex-start' }}>

              <View style={{ backgroundColor: 'transparent', paddingLeft: 5, marginTop: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 13, fontFamily: 'PoppinsRegular', color: 'black', marginTop: 0 }}>{this.state.mynewComment}</Text>
              </View>

              {this.state.Alldata.shout_out.image.path !== '' &&
                <View style={{ flex: 0, marginTop: 0 }}>
                  <Image source={{ uri: this.state.Alldata.shout_out.image.path }} style={{ height: 250, width: deviceWidth - 30, borderRadius: 3, resizeMode: "contain" }} />
                </View>
              }
              {this.state.Alldata.shout_out.image.path == '' &&
                <View style={{ flex: 0, height: 0, backgroundColor: 'transparent' }}>
                </View>
              }

            </View>

            {/*start hive five and cmment sction from  here*/}
            <View style={{
              flex: 1,
              flexDirection: 'row',
              paddingBottom: 15,
              marginTop: 10,
              backgroundColor: 'transparent',
              paddingVertical: 5,
              paddingHorizontal: 10
            }}>
              <View style={{
                flex: 0.50,
                flexDirection: 'row',
                backgroundColor: 'transparent',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}>

                {/*if high five has done then return view*/}
                {this.state.userLiked &&
                  <View style={{
                    backgroundColor: this.state.Button_color,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 15
                  }}>
                    <Text style={{ fontSize: 10, fontFamily: 'PoppinsRegular', color: this.state.Button_TEXT_color }}>High
                                      Five</Text>
                  </View>
                }

                {/*  if high five not done then return toucahble opacity */}
                {!this.state.userLiked &&
                  <TouchableOpacity onPress={() => {
                    this.messageHighFive()
                  }}>
                    <View style={{
                      backgroundColor: "#626E77",
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 15
                    }}><Text style={{ fontSize: 10, fontFamily: 'PoppinsRegular', color: '#fff' }}>High
                                      Five</Text>

                    </View>
                  </TouchableOpacity>
                }
                <View style={{ backgroundColor: 'transparent', marginLeft: 6 }}>
                  <ImageBackground source={boxIcon} resizeMode='contain' style={{ width: 70, height: 30 }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                      <View style={{
                        flex: 0.5,
                        backgroundColor: 'transparent',
                        justifyContent: 'center',
                        marginLeft: 10
                      }}>
                        {this.state.userLiked &&
                          <SvgXml xml={myHand} />
                          // <Image source={handsBlue} style={{ height: 15, width: 15 }}>
                          // </Image>
                        }
                        {!this.state.userLiked &&
                          <Image source={handsBlack} style={{ height: 15, width: 15 }}>
                          </Image>
                        }
                      </View>

                      <View style={{
                        flex: 0.5,
                        backgroundColor: 'transparent',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        marginRight: 8
                      }}>

                        <Text style={{
                          color: this.state.userLiked ? this.state.Button_color : 'gray',
                          fontSize: 13, marginLeft: 0, fontFamily: 'PoppinsMedium'
                        }}>{this.state.highCount}</Text>

                      </View>
                    </View>
                  </ImageBackground>
                </View>
              </View>

              <View style={{
                flex: 0.50,
                flexDirection: 'row',
                backgroundColor: 'transparent',
                justifyContent: 'flex-end',
                alignItems: 'center', marginLeft: 0
              }}>
                <TouchableOpacity style={{ flexDirection: 'row' }}>
                  {/* <Image source={comments1} style={{ width: 15, height: 15 }}>
                  </Image> */}

                  <SvgXml
                    style={{ alignSelf: "center" }}

                    xml={mycomment} />
                  <Text style={{
                    color: 'gray',
                    fontSize: 12, marginLeft: 5, fontFamily: 'PoppinsMedium',
                  }}>Comments ({this.state.total_count})</Text>
                </TouchableOpacity>

              </View>


            </View>
          </View>
        }

      </View>
    )
  }


  renderHiddenItems(data, rowMap) {
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[
          styles.backRightBtn,
          styles.backRightBtnRight,
        ]}
        onPress={() =>
          this.deleteRow(rowMap, data.item.key)
        }
      >
        <Animated.View
          style={[
            styles.trash,
            {
              transform: [
                {
                  scale: this.rowSwipeAnimatedValues[
                    data.item.key
                  ].interpolate({
                    inputRange: [
                      45,
                      90,
                    ],
                    outputRange: [0, 1],
                    extrapolate:
                      'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          <Image
            source={hands}
            style={styles.trash}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  }
//function to edit comment 
  editUpdateData(dataGet) {
    var type = this.state.editType;

    if (type == 'comments') {
      this.state.data_list[this.state.editIndex] = dataGet;
      this.setState({ data_list: this.state.data_list });
    }
    else {
      this.state.data_list[this.state.commentIndexMain].nested_replies[this.state.editIndex] = dataGet;
      this.setState({ data_list: this.state.data_list });
    }

  }

  onedit(data, index, type, commentIndex) {
    if (commentIndex !== undefined) {
      this.setState({ commentIndexMain: commentIndex })
    }
    this.setState({ editType: type });
    this.setState({ editPost: data });
    this.setState({ editIndex: index });
    this.editmodalVisible();
  }
//function to delete comment 
  async deleteConfirm(data, index, mainIndex) {

    

    const url = global.base_URL + 'shout-outs/' + data.shout_out.id
    const token_ = await SecureStore.getItemAsync('token');
    var TOKEN = JSON.parse(token_)
   
    var parameters = {

      "challenge_id": this.state.challenge_ID,
      "uid": data.user_details.uid,
      "week": this.state.week,
      "day": this.state.day

    }
   
    var that = this;
    fetch(url,
      {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': TOKEN,
        }), body: JSON.stringify(parameters),
      })
      .then(async (response) => response.text())
      .then(async (responseText) => {
        var dataobject = JSON.parse(responseText);
       
        if (dataobject.status == true) {
         
          if (mainIndex == undefined) {
            that.state.data_list.splice(index, 1);
            that.setState({ data_list: that.state.data_list });
          }
          else {
            that.state.data_list[mainIndex].nested_replies.splice(index, 1);
            that.setState({ data_list: that.state.data_list });
          }

          var cnt = parseInt(that.state.total_count) - 1;
          that.setState({ total_count: cnt });

          that.refs.toast.show(
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 12 }}>Deleted! </Text>
              <Emoji name="clap" style={{ fontSize: 12, color: 'White', backgroundColor: 'transparent' }}
              />

            </View>)
        }
        else {
         
        }
      }
      )
      .catch((error) => {
       
      })
  }
//function to confirm delete commment 
  ondelete(data, index, mainIndex) {

    Alert.alert(
      "Delete Comment",
      "Are you sure you want to delete your comment?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.deleteConfirm(data, index, mainIndex) }
      ],
      { cancelable: false }
    );

  }

  editmodalVisible() {
    this.setState({ editModal: !this.state.editModal })
  }
//function to refresh the current page
  refresh = (data) => {
    //alert('Here');
    // if(data.from_page == 'ReplyGratitude') {
    //    // console.log('data.comment_count', data.comment_count);
    //    // console.log('data.index', data.index);
    //    // console.log('data.data', data.data);
    //  if(data.comment_count > 0) {
    //    var user_details = data.data.user_details;
    //    var shout_out = data.data.shout_out;
    //    var total_replies = data.comment_count;
    //    var nested_replies = {'user_details': user_details, 'shout_out': shout_out, 'total_replies': total_replies};
    //    var nested_rep_obj = {'nested_replies': [nested_replies]};
    //    this.state.data_list[data.index].nested_replies = [nested_replies];
    //    this.setState({data_list: this.state.data_list});
    //  }
    //  else {
    //
    //  }
    // }
  }
//function to select flag a comment 
  onflag(id, index, commentIndex) {
    if (commentIndex !== undefined) {
      this.setState({ commentIndexMain: commentIndex })
    }
    this.setState({ linkFeatureIdReply: id });
    this.setState({ flagIndexReply: index });
    this.flagmodalVisible();
  }
//function to reply particular comment 
  replyOnComment(data, index) {
    const { navigate } = this.props.navigation;
    navigate('ReplyGratitude', {
      'DATA': data,
      'feature_array': this.props.navigation.state.params.feature_array,
      'basic_array': this.state.basic_array,
      'profile_pic': this.state.PROFILE_PIC,
      'onGoBack': this.refresh,
      'challengeID': this.state.challenge_ID,
      'comment_id': index,
    });
  }
//function to flag commet 
  flagOnComment() {
    alert('Here we have flag');
  }
// function to render nested comment 
  nestedReplies(data, mainIndex) {
   
    return data.map((dataholder, index) => {
      return (
        <View>

          <View style={{ flex: 1, backgroundColor: 'transparent', marginTop: 12, flexDirection: 'row', alignItems: 'flex-start' }}>
            <Image source={{ uri: dataholder.user_details.profile_pic }} style={{ height: 25, width: 25, marginLeft: 6, borderRadius: 25 / 2 }} />
            <View style={{ backgroundColor: "transparent", flex: 1, marginLeft: 8, marginRight: 0, padding: 1 }}>


              <View style={{ backgroundColor: 'transparent', alignItems: "flex-start", justifyContent: 'flex-start', flexDirection: 'row', flex: 1 }}>
                <View style={{ flex: 0.90, backgroundColor: 'transparent', alignItems: "flex-start" }}>
                  <Text style={{ fontFamily: 'PoppinsBold' }} >{dataholder.user_details.name}</Text>
                </View>
                <View style={{ flex: 0.10, backgroundColor: 'transparent', alignItems: "flex-end" }}>
                  {this.state.usa == dataholder.user_details.uid ?
                    <Menu>
                      <MenuTrigger>
                        <View style={{ backgroundColor: 'transparent', paddingLeft: 10, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 10 }}>
                          <Image source={dagger} style={{ width: 6, height: 22 }}>
                          </Image>
                        </View>
                      </MenuTrigger>
                      <MenuOptions>
                        <MenuOption onSelect={() => this.onedit(dataholder, index, 'replies', mainIndex)}>
                          <View style={{ paddingTop: 8, backgroundColor: 'transparent', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5, flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'PoppinsMedium' }}>Edit</Text>
                            <Image source={editblack} style={{ height: 12, width: 10, marginTop: 0 }} />
                          </View>
                        </MenuOption>

                        <MenuOption onSelect={() => this.ondelete(dataholder, index, mainIndex)}>
                          <View style={{ paddingTop: 8, borderTopWidth: 0.5, borderTopColor: 'lightgray', backgroundColor: 'transparent', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5, flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'PoppinsMedium' }}>Delete</Text>
                            <Image source={binblack} style={{ height: 14, width: 14, marginTop: 0 }} />
                          </View>
                        </MenuOption>

                      </MenuOptions>
                    </Menu> :
                    <Menu>
                      <MenuTrigger>
                        <View style={{ backgroundColor: 'transparent', paddingLeft: 10, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 10 }}>
                          <Image source={dagger} style={{ width: 6, height: 22 }}>
                          </Image>
                        </View>
                      </MenuTrigger>
                      <MenuOptions>
                        <MenuOption onSelect={() => this.onflag(dataholder.shout_out.id, index, mainIndex)}>
                          <View style={{ paddingTop: 8, backgroundColor: 'transparent', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5, flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'PoppinsMedium' }}>Flag</Text>
                            <Image source={flagblack} style={{ height: 12, width: 10, marginTop: 0 }} />
                          </View>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  }

                  {/* {this.state.usa !== dataholder.user_details.uid &&
                    <Menu>
                      <MenuTrigger>                        <View style={{ backgroundColor: 'transparent', paddingLeft: 10, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 10 }}>
                          <Image source={dagger} style={{ width: 6, height: 22 }}>
                          </Image>
                        </View>
                      </MenuTrigger>
                      <MenuOptions>
                        <MenuOption onSelect={() => this.onflag(dataholder.shout_out.id, index, mainIndex)}>
                          <View style={{ paddingTop: 8, backgroundColor: 'transparent', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5, flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'PoppinsMedium' }}>Flag</Text>
                            <Image source={flagblack} style={{ height: 12, width: 10, marginTop: 0 }} />
                          </View>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  } */}
                </View>
              </View>

              <View style={{ backgroundColor: 'transparent', alignItems: "flex-start", justifyContent: 'center', flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: "flex-start" }}>
                  <Text style={{ fontFamily: 'PoppinsRegular', color: 'gray', fontSize: 10, marginLeft: 0 }} >{dataholder.shout_out.time}</Text>
                </View>
                <View style={{ flex: 1, height: '100%', marginLeft: 0, backgroundColor: 'transparent', padding: 0 }}>
                  <Text style={{ fontSize: 11, fontFamily: 'PoppinsRegular', color: '#000', marginTop: 0 }}>{dataholder.shout_out.comment}
                  </Text>
                </View>
              </View>
            </View>
          </View>



        </View>

      )
    })
  }

  onBlurReply() {
    
  }

  onBlurComment() {
    this.setState({ placeholderTextValue: 'Comment here...' });
    this.setState({ focusedData: [] });
    this.setState({ focusIndex: 0 });
    this.setState({ typeComment: 'comment' });
  }

  onFocusReply(data, ind) {

    this.setState({ focusedData: data });
    this.setState({ focusIndex: ind });
    this.setState({ typeComment: 'reply' });

    this.setState({ placeholderTextValue: 'Write a reply...' });
    //this.textInputComment.focus();
    setTimeout(() => { this.textInputComment.focus() }, 10)
    this.textInputCommentReply.bind(this).focus();

  }




  async submitFlag() {
    var flagcmtIndex = this.state.flagIndexReply;
    var commentIndex = this.state.commentIndexMain;
    if (this.state.spamVal == null) {
      alert('Please select reason.');
      return false;
    }
    else if (this.state.reportcommentText == '') {
      alert('Please add comment.');
      return false;
    }
    else {

      this.setState({ offSetLoader1: true });
      const token_ = await SecureStore.getItemAsync('token');
      // const url = global.base_URL + 'v1/api/app-insert-high-five';
      const url = global.base_URL + 'shout-outs';
      const formData = new FormData();

      // formData.append('token', JSON.parse(token_));
      // formData.append('type', 'f');
      // formData.append('challenge_id', this.state.challengeId);
      // formData.append('uid', this.state.id);
      // formData.append('day', this.state.day);
      // formData.append('week', this.state.week);
      // formData.append('feature_value', this.state.reportcommentText);
      // formData.append('linked_feature_id', this.state.linkFeatureIdReply);
      // formData.append('flag_drop', this.state.spamVal);



      formData.append('type', 'f');
      formData.append('challenge_id', this.state.challenge_ID);
      formData.append('uid', this.state.usa);
      formData.append('day', this.state.day);
      formData.append('week', this.state.week);
      formData.append('linked_comment_id', this.state.linkFeatureIdReply);
      formData.append('comment', this.state.reportcommentText);
      formData.append('flag_drop', this.state.spamVal);
      // var token = `Bearer ${JSON.parse(token_)}`;
      var TOKEN = JSON.parse(token_)
      var object = {
        method: 'POST',
        body: formData,
        headers: new Headers({
          //'Content-Type': 'application/json'
          'Authorization': TOKEN,
        })
      };

      fetch(url, object)
        .then(async (response) => response.text())
        .then(async (responseText) => {
          var dataobject = JSON.parse(responseText);

          if (dataobject.status == true) {
            this.setState({ offSetLoader1: false });
            this.setState({ spamVal: null });
            this.setState({ reportcommentText: '' });

            if (commentIndex == undefined) {
              this.state.data_list.splice(flagcmtIndex, 1);
              this.setState({ data_list: this.state.data_list });
            }
            else {
              this.state.data_list[commentIndex].nested_replies.splice(flagcmtIndex, 1);
              this.setState({ data_list: this.state.data_list });
            }


            var count = parseInt(this.state.total_count - 1);
            this.setState({ total_count: count });
            this.flagmodalVisible();
            alert('Report submitted successfully.');
          }
          else {
            this.setState({ offSetLoader1: false });
            alert(dataobject.error_messages.linked_comment_id);
          }

        }
        )
        .catch((error) => {
          this.setState({ offSetLoader1: false });
        })
    }

  }

  addMessage() {
    // this.flatListRef.scrollToIndex({ animated: true, index: 6 });
    // return false;
    var type_comment = this.state.typeComment;
    if (type_comment == 'reply') {
      this.replyMessageReply(this.state.focusedData, this.state.focusIndex)
    }
    else {
      this.replyMessage(this.state.Alldata);
    }
    //alert(type_comment);
  }

  async replyMessageReply(data, index) {

    // console.log("MUKUOL", data)
    this.setState({ offSetLoader: true });
    if (this.state.commentText != '') {

      const token_ = await SecureStore.getItemAsync('token');
      // const url = global.base_url_live + 'v1/api/app-insert-high-five';
      const url = global.base_URL + 'shout-outs';
      this.textInputComment.clear();
      Keyboard.dismiss();
      const formData = new FormData();

      // formData.append('token', JSON.parse(token_));
      // formData.append('type', 'r');
      // formData.append('feature_value', this.state.commentText);
      // formData.append('uid', this.state.id);
      // formData.append('day', this.state.day);
      // formData.append('week', this.state.week);
      // formData.append('challenge_id', this.state.challengeId);
      // formData.append('linked_feature_id', data.shout_out.id);
      // formData.append('feature_id', this.state.featureId);

      formData.append('type', 'r');
      formData.append('comment', this.state.commentText);
      formData.append('uid', this.state.usa);
      formData.append('day', this.state.day);
      formData.append('week', this.state.week);
      formData.append('challenge_id', this.state.challenge_ID);
      formData.append('linked_comment_id', data.shout_out.id);
      formData.append('comment_level', "0");

      // var token1 = "8LHvXrsVpwmBUkz8wZtY8j7sq0CmykSQkFPrRDMY8RQ5AhzXGsT7xa99hxuDUrhL9BwWkPFZU7SFPjjhj3qjxOxWGNRsdD8mALXmcLU0CBLx0ThKFZZoJwlzuiXrID69msUiGn1Y36f4BN8CBfVOtZBoEIiBvYEgZIIsoHZLSrx5C1VI9cymdWwNzvgvZJpWnESUKuc3xPiXv4oiw6xuWUuyq13JeUBkmE5l2665cQrBeH77MLfWKNXIB4akZSC"
      // var token = `Bearer ${JSON.parse(token_)}`;
      var TOKEN = JSON.parse(token_);
      var object = {
        method: 'POST',
        body: formData,
        headers: new Headers({
          //'Content-Type': 'application/json'
          'Authorization': TOKEN,
        })
      };

      fetch(url, object)
        .then(async (response) => response.text())
        .then(async (responseText) => {

          var dataobject = JSON.parse(responseText);
          // console.log("REPLII", dataobject)
          if (dataobject.status == true) {

            var cnt = parseInt(this.state.total_count) + 1;
            this.setState({ total_count: cnt });
            this.state.data_list[index].nested_replies.push(dataobject.saved_comment_obj);
            this.setState({ offSetLoader: false });
            this.textInputComment.clear();
            this.setState({ commentText: '' });
            if (this.state.Alldata.shout_out.shout_image !== '') {
              //const ratio = deviceWidth/this.state.Alldata.shout_out.shout_image_width;
              //const height = this.state.Alldata.shout_out.shout_image_height * ratio;
              //this.flatListRef.scrollToOffset({ animated: true, offset: height});
              //this.flatListRef.scrollToEnd({ animated: true });
              this.refs.toast.show(
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 12 }}>Keep It Up! </Text>
                  <Emoji name="smile" style={{ fontSize: 12, color: 'White', backgroundColor: 'transparent' }}
                  />

                </View>)
            }
            else {
              this.refs.toast.show(
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 12 }}>Keep It Up! </Text>
                  <Emoji name="smile" style={{ fontSize: 12, color: 'White', backgroundColor: 'transparent' }}
                  />

                </View>)
              //this.flatListRef.scrollToOffset({ animated: true, offset: 0 });

            }
            //this.flatListRef.scrollToEnd({ animated: true });
          }
          else {
            this.setState({ offSetLoader: false });
            Alert.alert(
              "Delete Comment",
              dataobject.message,
              [
                { text: "OK", onPress: () => console.log("Ok Pressed") }
              ],
              { cancelable: false }
            );
            //alert(dataobject.message);

          }

        }
        )
        .catch((error) => {
          // console.log("REPLAY", error)
        })


    } else {
      this.setState({ offSetLoader: false });
      alert('Please add Comment.')
    }
  }

  async replyMessage(data) {
    this.setState({ offSetLoader: true });
    if (this.state.commentText != '') {
      const token_ = await SecureStore.getItemAsync('token');
      var TOKEN = JSON.parse(token_)
      // const url = global.base_url_live + 'v1/api/app-insert-high-five';
      this.textInputComment.clear();
      Keyboard.dismiss();
      const formData = new FormData();

      // formData.append('token', JSON.parse(token_));
      // formData.append('type', 'r');
      // formData.append('feature_value', this.state.commentText);
      // formData.append('uid', this.state.id);
      // formData.append('day', this.state.day);
      // formData.append('week', this.state.week);
      // formData.append('challenge_id', this.state.challengeId);
      // formData.append('linked_feature_id', this.state.linkedfeatureId);
      // formData.append('feature_id', this.state.featureId);

      // var token = `Bearer ${JSON.parse(token_)}`;
      const url = global.base_URL + 'shout-outs';
      formData.append('type', 'r');
      formData.append('comment', this.state.commentText);
      formData.append('uid', this.state.usa);
      formData.append('day', this.state.day);
      formData.append('week', this.state.week);
      formData.append('challenge_id', this.state.challenge_ID);
      formData.append('linked_comment_id', data.shout_out.id);
      formData.append('comment_level', "0");
      var object = {
        method: 'POST',
        body: formData,
        headers: new Headers({
          //'Content-Type': 'application/json'
          'Authorization': TOKEN,
        })
      };

      fetch(url, object)
        .then(async (response) => response.text())
        .then(async (responseText) => {
          Keyboard.dismiss();
          var dataobject = JSON.parse(responseText);
          // console.log("COMMENT", dataobject);
          if (dataobject.status == true) {

            var cnt = parseInt(this.state.total_count) + 1;
            this.setState({ total_count: cnt });
            this.state.data_list.push(dataobject.saved_comment_obj);
            this.setState({ offSetLoader: false });
            this.textInputComment.clear();
            this.setState({ commentText: '' });
            if (this.state.Alldata.shout_out.image.path !== '') {
              //const ratio = deviceWidth/this.state.Alldata.shout_out.shout_image_width;
              //const height = this.state.Alldata.shout_out.shout_image_height * ratio;
              //this.flatListRef.scrollToOffset({ animated: true, offset: height});
              //this.flatListRef.scrollToEnd({ animated: true });
              this.refs.toast.show(
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 12 }}>Keep It Up! </Text>
                  <Emoji name="smile" style={{ fontSize: 12, color: 'White', backgroundColor: 'transparent' }}
                  />

                </View>)
            }
            else {
              this.refs.toast.show(
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 12 }}>Keep It Up! </Text>
                  <Emoji name="smile" style={{ fontSize: 12, color: 'White', backgroundColor: 'transparent' }}
                  />

                </View>)
              //this.flatListRef.scrollToOffset({ animated: true, offset: 0 });

            }
            //this.flatListRef.scrollToEnd({ animated: true });
          }
          else {
            this.setState({ offSetLoader: false });
            // alert(dataobject.error_message);
          }

        }
        )
        .catch((error) => {
          this.setState({ offSetLoader: false });
          // console.log("ErrorComment", error);
        })


    } else {
      alert('Please add Comment.')
      this.setState({ offSetLoader: false });
    }
  }


  shiftBack() {
    var length = this.state.total_count;
    var obj = { 'comment_count': length, 'from_page': 'AddReply', 'high_five_status': this.state.userLiked, 'high_five_count': this.state.highCount }
    this.props.navigation.state.params.onGoBack(obj);
    this.props.navigation.goBack();
  }

  textInputFocused() {
    //this.flatListRef.scrollToEnd({ animated: true });
    //this.flatListRef.scrollToOffset({ animated: true, offset: 360});
  }

//function to render comments 
  renderRow(dataHolder, rowmap) {

    return (

      <View style={{
        marginRight: 0, marginBottom: 0,
        flexDirection: 'row',
        marginTop: 0,
        backgroundColor: 'transparent',
        borderBottomWidth: 0.3,
        borderBottomColor: '#CACACA',
        paddingLeft: 20,
        paddingRight: 15,
        paddingVertical: 10,
       
      }}>




        <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'flex-start' }}>
          <TouchableOpacity
            onPress={() => {
              this.onShowProfilePic(dataHolder.user_details.profile_pic)
            }}

          >



            <Image source={{ uri: dataHolder.user_details.profile_pic }} style={{ height: 50, width: 50, marginLeft: 6, borderRadius: 50 / 2 }} />
          </TouchableOpacity>


          <View style={{ backgroundColor: "transparent", flex: 1, marginLeft: 12, marginRight: 0, padding: 1 }}>

            <View style={{ backgroundColor: 'transparent', alignItems: "flex-start", justifyContent: 'flex-start', flexDirection: 'row', flex: 1 }}>
              <View style={{ flex: 0.90, backgroundColor: 'transparent', alignItems: "flex-start" }}>
                <Text style={{ fontFamily: 'PoppinsBold' }} >{dataHolder.user_details.name}</Text>
              </View>
              <View style={{ flex: 0.10, backgroundColor: 'transparent', alignItems: "flex-end" }}>
                {this.state.usa == dataHolder.user_details.uid ?
                  <Menu>
                    <MenuTrigger>
                      <View style={{ backgroundColor: 'transparent', paddingLeft: 10, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 10 }}>
                        <Image source={dagger} style={{ width: 6, height: 22 }}>
                        </Image>
                      </View>
                    </MenuTrigger>
                    <MenuOptions>
                      <MenuOption onSelect={() => this.onedit(dataHolder, rowmap, 'comments')}>
                        <View style={{ paddingTop: 8, backgroundColor: 'transparent', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5, flexDirection: 'row' }}>
                          <Text style={{ fontFamily: 'PoppinsMedium' }}>Edit</Text>
                          <Image source={editblack} style={{ height: 12, width: 10, marginTop: 0 }} />
                        </View>
                      </MenuOption>

                      <MenuOption onSelect={() => this.ondelete(dataHolder, rowmap)}>
                        <View style={{ paddingTop: 8, borderTopWidth: 0.5, borderTopColor: 'lightgray', backgroundColor: 'transparent', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5, flexDirection: 'row' }}>
                          <Text style={{ fontFamily: 'PoppinsMedium' }}>Delete</Text>
                          <Image source={binblack} style={{ height: 14, width: 14, marginTop: 0 }} />
                        </View>
                      </MenuOption>

                    </MenuOptions>
                  </Menu> : <Menu>
                    <MenuTrigger>
                      <View style={{ backgroundColor: 'transparent', paddingLeft: 10, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 10 }}>
                        <Image source={dagger} style={{ width: 6, height: 22 }}>
                        </Image>
                      </View>
                    </MenuTrigger>
                    <MenuOptions>
                      <MenuOption onSelect={() => this.onflag(dataHolder.shout_out.id, rowmap)}>
                        <View style={{ paddingTop: 8, backgroundColor: 'transparent', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5, flexDirection: 'row' }}>
                          <Text style={{ fontFamily: 'PoppinsMedium' }}>Flag</Text>
                          <Image source={flagblack} style={{ height: 12, width: 10, marginTop: 0 }} />
                        </View>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                }
                {/* {this.state.usa!== dataHolder.user_details.uid &&
                 
                } */}
              </View>
            </View>

            <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: "flex-start" }}>
              <Text style={{ fontFamily: 'PoppinsRegular', color: 'gray', fontSize: 10, marginLeft: 0 }} >{dataHolder.shout_out.time}</Text>
            </View>
            <View style={{ flex: 1, height: '100%', backgroundColor: 'transparent', padding: 0 }}>
              <Text style={{ fontSize: 12, fontFamily: 'PoppinsRegular', color: '#000', marginTop: 5 }}>{dataHolder.shout_out.comment}</Text>
            </View>
            <View style={{ flex: 1, height: '100%', backgroundColor: 'transparent', padding: 0, flexDirection: 'row' }}>
              {/*<TouchableOpacity onPress={() => this.replyOnComment(dataHolder, rowmap)}>
                                     <View>
                                       <Text  style={{fontSize:13,fontFamily:'PoppinsSemiBold',color:'gray',marginTop:5}}>Reply</Text>
                                     </View>
                               </TouchableOpacity>*/}
              {/*<TouchableOpacity onPress={() => this.flagOnComment()}>
                                     <View>
                                       <Text  style={{fontSize:12,fontFamily:'PoppinsRegular',marginLeft: 15, color:'gray',marginTop:5}}>Flag</Text>
                                     </View>
                               </TouchableOpacity>*/}
            </View>
            {dataHolder.nested_replies !== 0 &&
              <View>
                {this.nestedReplies(dataHolder.nested_replies, rowmap)}

               



              </View>


            }

            <View style={{ zIndex: 99, height: 40, backgroundColor: 'transparent', bottom: 0, marginHorizontal: 10, marginTop: 10, marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.onShowProfilePic(this.state.PROFILE_PIC)
                  }}
                  style={{ flex: 0.13, height: 30, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                  {this.state.profilePic == null &&
                    <Image
                      source={profile}
                      style={{ width: 25, height: 25, borderRadius: 25 / 2 }}>
                    </Image>
                  }
                  {this.state.profilePic != null &&
                    <Image
                      source={{ uri: this.state.PROFILE_PIC }}
                      style={{ width: 25, height: 25, borderRadius: 25 / 2 }}>
                    </Image>
                  }
                </TouchableOpacity>
                <View style={{ flex: 0.87 }}>
                  <TouchableOpacity onPress={() => this.onFocusReply(dataHolder, rowmap)}>
                    <View pointerEvents='none'>
                      <TextInput
                        style={{
                          width: '100%', minHeight: 30, backgroundColor: '#F0F0F6', paddingHorizontal: 10,
                          elevation: 3,
                          textAlignVertical: "center",
                          shadowColor: "#000000",
                          shadowOpacity: 0.3,
                          shadowRadius: 2,
                          shadowOffset: {
                            height: 1,
                            width: 1
                          },
                          paddingVertical: 3, borderRadius: 20,
                        }}
                        onBlur={() => this.onBlurReply()}
                        //onFocus={ () => this.onFocusReply(dataHolder, rowmap) }
                        //onFocus={this.textInputFocused.bind(this)}
                        placeholder="Write a reply..."
                        placeholderTextColor="grey"
                        ref={input => { this.textInputCommentReply = input }}
                        onChangeText={text => this.setState({ ReplycommentText: text })}
                        underlineColorAndroid='transparent'
                      />
                    </View>
                  </TouchableOpacity>
                </View>
             
              </View>

            </View>

          </View>

        </View>

      </View>
    )

  }
  //function to navigate profile screen 
  onShowProfilePic(pic) {
    this.props.navigation.navigate("ProfilePicShow", { "PIC": pic })
  }

  render() {
    const backArrowBlack = `
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  height="25" width="25" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 511.999 511.999" style="enable-background:new 0 0 511.999 511.999;" xml:space="preserve">
<path fill="#000000" d="M172.548,256.005L388.82,39.729c9.089-9.089,9.089-23.824,0-32.912s-23.824-9.089-32.912,0.002
   L123.18,239.551c-4.366,4.363-6.817,10.282-6.817,16.454c0,6.173,2.453,12.093,6.817,16.457l232.727,232.721
   c4.543,4.544,10.499,6.816,16.455,6.816s11.913-2.271,16.457-6.817c9.089-9.089,9.089-23.824,0-32.912L172.548,256.005z"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>

`
    const backArrowWhite = `<svg version="1.1" id="Layer_1" height="25" width="25" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 511.999 511.999" style="enable-background:new 0 0 511.999 511.999;" xml:space="preserve">
<path fill="#ffffff" d="M172.548,256.005L388.82,39.729c9.089-9.089,9.089-23.824,0-32.912s-23.824-9.089-32.912,0.002
L123.18,239.551c-4.366,4.363-6.817,10.282-6.817,16.454c0,6.173,2.453,12.093,6.817,16.457l232.727,232.721
c4.543,4.544,10.499,6.816,16.455,6.816s11.913-2.271,16.457-6.817c9.089-9.089,9.089-23.824,0-32.912L172.548,256.005z"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>

`
    const placeholder = {
      label: 'Select Reason...',
      value: null,
      color: '#000',
    };
    return (
      <View style={styles.container}>
        <Toast
          ref="toast"
          style={{ backgroundColor: this.state.Primary_color, borderRadius: 90 }}
          position='top'
          positionValue={240}
          fadeInDuration={700}
          fadeOutDuration={900}
          opacity={0.8}
          textStyle={{ color: '#fff' }}
        />
        <Modal style={{ marginLeft: 10, marginRight: 10, marginTop: StatusBar.currentHeight }} transparent={true}
          hasBackdrop={true} isVisible={this.state.editModal} >
          <KeyboardAvoidingView
            enabled
            behavior={BEHAVIOR}
          // keyboardVerticalOffset = {StatusBar.currentHeight+10}
          // keyboardVerticalOffset={deviceHeight / 12}
          >
            <View style={{ backgroundColor: '#fff', paddingBottom: 20, margin: 0 }}>
              <View style={{ padding: 0 }}>
                <TouchableOpacity onPress={this.editmodalVisible}>
                  <View style={{ justifyContent: 'flex-end', paddingTop: 10, paddingRight: 15, backgroundColor: 'transparent', alignItems: 'flex-end' }}>
                    <Image source={crossarrow} style={{ width: 12, height: 12, marginLeft: 0 }} />
                  </View>
                </TouchableOpacity>
                <Text style={{ fontFamily: 'PoppinsRegular', fontSize: 17, textAlign: 'center', borderBottomWidth: 1, borderBottomColor: 'lightgray', paddingBottom: 7 }}>Edit COMMENT</Text>
                <ScrollView keyboardShouldPersistTaps={'handled'}>
                  <ModalUpdatePostReply
                    updateContent={this.state.editPost}
                    userID={this.state.usa}
                    challengeId={this.state.challenge_ID}
                    onGoBack={this.editUpdateData}
                    onPopUp={this.editmodalVisible}
                    nav={this.props.nav} />
                </ScrollView>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>


        <Modal style={{ marginLeft: 10, marginRight: 10, marginTop: StatusBar.currentHeight }} transparent={true}
          hasBackdrop={true} isVisible={this.state.flagModal} >


          <KeyboardAvoidingView
            enabled
            behavior={BEHAVIOR}
          // keyboardVerticalOffset={deviceHeight / 12}
          >
            <View style={{ backgroundColor: '#fff', paddingBottom: 20, margin: 0 }}>
              <View style={{ padding: 0 }}>
                <TouchableOpacity onPress={this.flagmodalVisible}>
                  <View style={{ justifyContent: 'flex-end', paddingTop: 10, paddingRight: 15, backgroundColor: 'transparent', alignItems: 'flex-end' }}>
                    <Image source={crossarrow} style={{ width: 12, height: 12, marginLeft: 0 }} />
                  </View>
                </TouchableOpacity>
                <Text style={{ fontFamily: 'PoppinsRegular', fontSize: 17, textAlign: 'center', borderBottomWidth: 1, borderBottomColor: 'lightgray', paddingBottom: 7 }}>REPORT COMMENT</Text>
                <ScrollView keyboardShouldPersistTaps={'handled'}>
                  <View style={{ padding: 15 }}>
                    <Text style={{ fontFamily: 'PoppinsSemiBold' }}>Why was this comment flagged ?</Text>
                  </View>
                  <View style={{ paddingHorizontal: 15 }}>
                    <RNPickerSelect
                      onValueChange={value => {
                        this.setState({
                          spamVal: value,
                        });
                      }}
                      useNativeAndroidPickerStyle={false}
                      style={{
                        inputAndroid: {
                          color: '#000000',
                          backgroundColor: 'transparent',
                          borderWidth: 1,
                          paddingVertical: 4,
                          paddingHorizontal: 5,
                          borderColor: 'lightgray'
                        },
                        inputIOS: {
                          color: '#000000',
                          backgroundColor: 'transparent',
                          borderWidth: 1,
                          paddingVertical: 4,
                          paddingHorizontal: 5,
                          borderColor: 'lightgray'
                        },
                        iconContainer: {
                          top: 0,
                          right: 0,
                        },
                      }}
                      placeholder={placeholder}
                      items={[
                        { label: 'Inappropriate language', value: 0 },
                        { label: 'Inappropriate Image', value: 1 },
                        { label: 'Spam', value: 2 },
                        { label: 'Bullying', value: 3 },
                        { label: 'Other', value: 4 },
                      ]}
                    />
                  </View>

                  <View style={{ paddingHorizontal: 15 }}>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      width: '100%',
                      marginHorizontal: 0,
                      backgroundColor: 'white',
                      borderColor: 'lightgray',
                      borderWidth: 1,
                      marginTop: 8
                    }}>
                      <TextInput
                        multiline={true}
                        numberOfLines={8}
                        placeholder="Report the comment"
                        value={this.state.reportcommentText}
                        onChangeText={(text) => this.setState({ reportcommentText: text })}
                        style={{ width: '100%', height: 120, textAlignVertical: "top", paddingHorizontal: 5, marginTop: 12 }}
                      >
                      </TextInput>
                    </View>
                  </View>

                  <View style={{ marginTop: 20, backgroundColor: 'tranparent', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: this.state.Button_color,
                          borderWidth: 1, paddingVertical: 8,
                          borderColor: 'lightgray', marginHorizontal: 0,
                          borderRadius: 25, marginBottom: 0, marginTop: 0
                        }}
                        onPress={() =>
                          this.submitFlag()}
                      >
                        <Text
                          style={{ fontSize: 13, color: 'white', fontFamily: 'PoppinsSemiBold', paddingVertical: 0, paddingHorizontal: 35 }}>
                          Submit</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>

        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }} enabled behavior={BEHAVIOR} keyboardVerticalOffset={20}>
          {this.state.offSetLoader &&
            <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" />
            </View>
          }
          {/* Header View */}
          <View style={styles.header_view}>
           
            <View style={{ backgroundColor: this.state.Primary_color }}>
              <View style={styles.header_items}>
                <TouchableOpacity onPress={() => this.shiftBack()}>
                
                  {this.state.BannerTextColor == '#000000' &&
                    <SvgXml
                      style={{ marginLeft: 10 }}
                      xml={backArrowBlack} />

                  }
                  {this.state.BannerTextColor == '#ffffff' &&
                    <SvgXml
                      style={{ marginLeft: 10 }}
                      xml={backArrowWhite} />

                  }
                </TouchableOpacity>
                <View style={{
                  flexDirection: 'row',
                  marginLeft: 0,
                  alignContent: 'center',
                  justifyContent: 'center', backgroundColor: 'transparent',
                  flex: 1
                }}>
                  <Text style={{ fontFamily: 'PoppinsBold', fontSize: 18, color: this.state.BannerTextColor }}>{this.state.feature_name.toUpperCase()}
                  </Text>
                </View>
              </View>
             
            </View>
          </View>
         
          <View style={{ flex: 1 }}>
            <FlatList
              ref={(ref) => { this.flatListRef = ref; }}
              keyboardShouldPersistTaps='handled'
              //onContentSizeChange={() => this.flatListRef.scrollToEnd({animated: true})}
              //onLayout={() => this.flatListRef.scrollToEnd({animated: true})}
              style={{ backgroundColor: 'transparent', marginTop: 10, backgroundColor: 'transparent', paddingHorizontal: 0 }}
              data={this.state.data_list}
              renderItem={({ item, index }) => this.renderRow(item, index)}
              keyExtractor={(item, index) => index.toString()}
              //  onEndReached={this.handeLoadMoreItem}
              //  onEndReachedThreshold={0.2}
              ListHeaderComponent={this.headerComponent}
              ListEmptyComponent={this.renderEmptyContainer}
            //ListFooterComponent={this.footerComponent}
            />
          </View>

          <View style={{ zIndex: 99, height: 40, backgroundColor: 'transparent', bottom: 0, marginHorizontal: 10, marginTop: 10, marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  this.onShowProfilePic(this.state.PROFILE_PIC)
                }}


                style={{ flex: 0.13, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'flex-start' }}>
                {this.state.PROFILE_PIC == null &&
                  <Image
                    source={profile}
                    style={{ width: 40, height: 40, borderRadius: 40 / 2 }}>
                  </Image>
                }
                {this.state.PROFILE_PIC != null &&
                  <Image
                    source={{ uri: this.state.PROFILE_PIC }}
                    style={{ width: 40, height: 40, borderRadius: 40 / 2 }}>
                  </Image>
                }
              </TouchableOpacity>
              <View style={{ flex: 0.68 }}>
                <TextInput
                  style={{
                    width: '100%', minHeight: 40, backgroundColor: '#F0F0F6', paddingHorizontal: 10,
                    elevation: 3,
                    textAlignVertical: "center",
                    shadowColor: "#000000",
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    shadowOffset: {
                      height: 1,
                      width: 1
                    },
                    paddingVertical: 5, borderRadius: 20, color: "#000"
                  }}
                  onFocus={this.textInputFocused.bind(this)}
                  onBlur={() => this.onBlurComment()}
                  placeholder={this.state.placeholderTextValue}
                  placeholderTextColor="grey"
                  ref={input => { this.textInputComment = input }}
                  onChangeText={text => this.setState({ commentText: text })}
                  underlineColorAndroid='transparent'
                />
              </View>
              <View style={{ flex: 0.02 }}>
              </View>
              <View style={{ flex: 0.17, backgroundColor: "white", borderRadius: 25 }}>
                <TouchableOpacity onPress={() => this.addMessage()} style={{ backgroundColor: this.state.Button_color, borderRadius: 25 }}>
                  <View style={{ height: 40, borderRadius: 25, justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'PoppinsBold', fontSize: 11, color: this.state.Button_TEXT_color, textAlign: 'center' }}>SEND</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }



  onRowDidOpen = rowKey => {
    // console.log('This row opened', rowKey);
  };

  onCheckBoxPressed() {

    if (this.state.checked) {
      this.setState({ checked: false })
    } else {
      this.setState({ checked: true })
    }
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header_view: {
    height: 90,

  },
  backTextWhite: {
    color: '#FFF', fontSize: 10, fontFamily: 'PoppinsSemiBold'
  },
  header_items: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 35,
    marginBottom: 10
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75, borderBottomLeftRadius: 5, borderTopLeftRadius: 5
  },
  backRightBtn222: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 65,
  },
  column: {
    flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
  },
  trash: {
    height: 65,
    width: 65, backgroundColor: 'yellow'
  },

  backRightBtnLeft: {
    backgroundColor: '#fcce85',
    right: 130,
  },

  backRightBtnRight: {
    backgroundColor: '#5cc9bd',
    right: 70,
  }, backRightBtnRightnew: {
    backgroundColor: '#eb6c63',
    right: 5,
  },
  header_image: {
    flex: 1,
    height: 90
  },
  rowBack: {
    marginTop: 13, marginBottom: 4,
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',


  },

  menu: {
    width: 25,
    height: 25,
    marginLeft: 15,


  }, hiddenImages: {
    width: 18,
    height: 18,
  },
  menuSEC: {
    width: 5,
    height: 18, marginRight: 15

  },
  login_button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45, flexDirection: 'row',
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5, marginBottom: 5, marginTop: 20
  },


  profile: {
    width: 60,
    height: 60,
  },

  name_view: {

    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    height: 50,
    width: '92%',
    marginHorizontal: 15,
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderWidth: 1
  },

  email_view: {

    flexDirection: 'row',
    alignItems: 'center',

    height: 50,
    width: '92%',
    marginHorizontal: 15,
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderWidth: 1,
    marginTop: 8
  },

  image_continer: {
    marginLeft: 8,
    width: 11,
    height: 14
  },
  passwordimage_continer: {
    marginLeft: 12,
    width: 18,
    height: 13
  },
  loader: {
    marginTop: 5, alignItems: 'center', height: 60,
  }
});
