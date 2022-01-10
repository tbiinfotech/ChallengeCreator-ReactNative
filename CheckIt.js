import React, { Component } from 'react';
import {
    FlatList,
    Image,
    ImageBackground,
    Keyboard,
    StyleSheet,
    Text,
    ActivityIndicator,
    KeyboardAvoidingView,
    TextInput, ScrollView,
    TouchableOpacity,
    View
} from 'react-native';
import * as global from "./../common/global.js";
import * as SecureStore from 'expo-secure-store';
import { Dropdown } from 'react-native-material-dropdown';
import { Video } from "expo-av";
import HTML from "react-native-render-html";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-easy-toast";
import Emoji from "react-native-emoji";

const headerback = require('../../images/image-8.png');
const menuImg = require('../../assets/menu.png');
const whitecheck = require('../../assets/checkwhite.png');

const checkyellow = require('../../images/checkblue.png');
const checkgray = require('../../images/disable-check-1.png');
const tickets = require('../../assets/downarrow.png');
const downarrow = require('../../assets/downarrow.png');
const gallaryblack = require('../../assets/gallaryblack.png');
const nextgray = require('../../assets/nextgray.png');
const backarrow = require('../../assets/backarrow.png');
const profile = require('../../images/image-9.png');
const messageopenblack = require('../../images/injoycirclelogo.png');
const down = require('./../../assets/down2.png');
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];
import { SvgXml } from 'react-native-svg';
const getAccessToken = async () => {
    return await SecureStore.getItemAsync('token');
};

const getUserId = async () => {
    return await SecureStore.getItemAsync('id');
};


const timeArray = [
    {

        value: 'User',
    }, {

        value: 'Admin',
    }, {

        value: 'Teacher'
    },
];

export default class CheckIt extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: true,
            loader: false,
            accessToken: '',
            challengeId: this.props.navigation.state.params.challenge_details.challenge_id,
            categoryId: this.props.navigation.state.params.challenge_details.feature_category_id,
            content_Id: this.props.navigation.state.params.API_CONTENT_ID,
            creatorImage: "",
            featureId: 7,
            dropDowntext: '',
            offSetLoader: true,
            day: 1,
            points: this.props.navigation.state.params.points,

            data_list: [],
            uid: '',
            week: 1,
            hederTitle: this.props.navigation.state.params.challenge_details.feature_name,
            countRecords: 0,
            contentData: [],
            question: '',
            profilePic: null,
            userName: '',
            textInoutHint: '',
            buttonHint: '',
            radioImageFirst: false,
            radioSecondbutton: false,
            countTodayCheckIn: 0
            , commentText: '',
            selectedItemId: null,
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
            LOGO_ICON: "",
            isDrop: false,
            dropList: [],
            startDropText: "",
            enableButton: false


        }
        this.renderRow = this.renderRow.bind(this);
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
                BannerTextColor: ch_details.banner_text_color,
                day: ch_details.day,
                week: ch_details.week,
                LOGO_ICON: ch_details.logo_icon
            })
        }

        getAccessToken().then(token =>
            this.setState({ accessToken: token }),
          
        );


        getUserId().then(id =>
            this.setState({ id: id }),
        );
 
        this.getDataObject();
    }
    async componentWillReceiveProps() {
        
    }

    async getDataObject(dataObject) {

  

        setTimeout(() => {


          
            this.getDailyInspirationApiData();
           
        }, 100);
    }
//function to get data from API
    async getDailyInspirationApiData() {
        const token_ = await SecureStore.getItemAsync('token');
        var TOKEN = JSON.parse(token_);
       
        var URL = global.base_URL + "check-in/" + this.state.content_Id + "?challenge_id=" + this.state.challenge_ID + "&feature_id=" + 7 + "&day=" + this.state.day + "&category_id=" + 1 + "&uid=" + this.state.usa + "&week=" + this.state.week + "&show_today=" + 1
      
        fetch(URL,
            {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': TOKEN,
                })
            })
            .then(async (response) => response.text())
            .then(async (responseText) => {

                var dataobject = JSON.parse(responseText);

                if (dataobject.status == true) {
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

    
//function to save the data from API to state
    InheritedData(data) {
        
        if (data.status == true) {
            
            this.setState({ question: '' });
            this.setState({ creatorImage: data.client_details.profile_pic.cropped })
            this.setState({ contentData: data.checkin_yourself_current.checkin_content_all_record })
            this.setDataList(data.checkin_yourself_current.checkin_content.labels);
         
            this.setState({ countTodayCheckIn: data.checkin_yourself_current.count_today_checkins });
            this.setState({ question: data.checkin_yourself_current.checkin_content.question });
            this.setState({ textInoutHint: data.checkin_yourself_current.checkin_content.placeholder_text });
            this.setState({ buttonHint: data.checkin_yourself_current.button_text });
            this.setState({ dropDowntext: data.checkin_yourself_current.checkin_content.drop_down_text });
            this.setState({ startDropText: data.checkin_yourself_current.checkin_content.drop_down_text });
            this.setState({ userName: data.user_details[0].first_name });
          
            this.checkIn(this.state.countTodayCheckIn)


        }
    }
//function to check count of daily submit
    checkIn(checkInCount) {
        if (checkInCount == 1) {
            this.setState({ radioImageFirst: true });
        } else if (checkInCount == 2) {
            this.setState({ radioImageFirst: true, radioSecondbutton: true });
        }
    }
//function to set data 
    setDataList(text) {
    
        this.setState({ data_list: text });

    }
//function to submit daily 
    async submitData() {

        if (this.state.selectedItemId == null) {
            alert('Please select any lable...');
        }
        else if (this.state.commentText == '') {
            alert('Please fill the comment..')
        } else {
            this.setState({ enableButton: true })
            const token_ = await SecureStore.getItemAsync('token');
            var TOKEN = JSON.parse(token_);
            
            const url = global.base_URL + 'check-in';
            var parameters = {
                "challenge_id": this.state.challenge_ID,
                "feature_id": 7,
                "uid": this.state.usa,
                "week": this.state.week,
                "day": this.state.day,
                "comment": this.state.commentText,
                "label_id": this.state.selectedItemId

            }
           


            fetch(url,
                {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': TOKEN,
                    }), body: JSON.stringify(parameters),
                })
                .then(async (response) => response.text())
                .then(async (responseText) => {
                    var dataobject = JSON.parse(responseText);
                   
                    this.setState({ commentText: '', selectedItemId: null });
                    this.setState({ dropDowntext: "" });

                    this.checkSuccessOrNot(dataobject);


                }
                )
                .catch((error) => {
                    this.setState({ enableButton: false })
                })
        }

    }
    //function to add action to local storage
    async addAction() {
        var C = this.state.challenge_ID;

        var P_ARRAY = await SecureStore.getItemAsync("ARRAY_ACTION")
      
        var PARSED_ARRAY = JSON.parse(P_ARRAY);

        P_ARRAY_INDEX = PARSED_ARRAY.findIndex((obj => obj.cid == C))

        if (P_ARRAY_INDEX >= 0) {




            PARSED_ARRAY[P_ARRAY_INDEX].actions += 1;
            await SecureStore.setItemAsync("ARRAY_ACTION", JSON.stringify(PARSED_ARRAY))
            var P_ARRAY = await SecureStore.getItemAsync("ARRAY_ACTION")
      
            var PARSED_ARRAY = JSON.parse(P_ARRAY);
         

        } else {

        }


    }
    async addUserAction() {
        var C = this.state.challenge_ID;

        var P_ARRAY = await SecureStore.getItemAsync("USER_ARRAY_ACTION")

        var PARSED_ARRAY = JSON.parse(P_ARRAY);

        P_ARRAY_INDEX = PARSED_ARRAY.findIndex((obj => obj.cid == C))

        if (P_ARRAY_INDEX >= 0) {

 


            PARSED_ARRAY[P_ARRAY_INDEX].actions += 1;
            await SecureStore.setItemAsync("USER_ARRAY_ACTION", JSON.stringify(PARSED_ARRAY))
            var P_ARRAY = await SecureStore.getItemAsync("USER_ARRAY_ACTION")
 
            var PARSED_ARRAY = JSON.parse(P_ARRAY);
        

        } else {

        }


    }
    //function to check Success status 
    async checkSuccessOrNot(dataObject) {
     
        if (dataObject.status) {

            this.addPoints(dataObject.points)
            this.addAction();
            this.addUserAction();
        
            this.setState({ commentText: '', selectedItemId: null });
            this.setState({ dropDowntext: '' });
         
            this.state.contentData.push(dataObject.data);

            this.setState({ countTodayCheckIn: dataObject.count_today_records })
            this.setState({enableButton:false})
          
            this.refs.toast.show(
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 12 }}>Yes!  </Text>
                    <Emoji name="muscle" style={{ fontSize: 12, color: 'White', backgroundColor: 'transparent' }}
                    />

                </View>)


        } else {
            this.setState({enableButton:false})
           
        }


    }
    //function to add points to local storage
    async addPoints(points) {
        var C = this.state.challenge_ID;

        var P_ARRAY = await SecureStore.getItemAsync("POINTS_ARRAY")
     
        var PARSED_ARRAY = JSON.parse(P_ARRAY);
    
        P_ARRAY_INDEX = PARSED_ARRAY.findIndex((obj => obj.cid == C))

        if (P_ARRAY_INDEX >= 0) {

   


            PARSED_ARRAY[P_ARRAY_INDEX].points += points;
            await SecureStore.setItemAsync("POINTS_ARRAY", JSON.stringify(PARSED_ARRAY))
            var P_ARRAY = await SecureStore.getItemAsync("POINTS_ARRAY")
            console.log("AYSNC_ARRAYA++++++++", P_ARRAY)
            var PARSED_ARRAY = JSON.parse(P_ARRAY);
            
        } else {

        }


    }
    async dropPress() {
        if (this.state.isDrop == true) {
            this.setState({ isDrop: false })
        }
        else if (this.state.isDrop == false) {
            this.setState({ isDrop: true })
        }
    }
    async dropSelect(data) {
        this.setState({ isDrop: false });
        this.setState({ selectedItemId: data.id });
        this.setState({ dropDowntext: data.value })
      
    }
    onNavigateALl() {

    }
    //function to render data
    renderRow(dataHolder, index) {

        if ((dataHolder.header_month == false && dataHolder.header_date == false)) {
         
            var newDate = dataHolder.content.time.split(',');
            var label = dataHolder.content.label;
            var comment = dataHolder.content.comment;
            var name = this.state.userName;
            var profPic = this.state.PROFILE_PIC;
            return (
                <View
                    key={index}
                    style={{ marginTop: 8, backgroundColor: 'white', flex: 1, padding: 12, flexDirection: 'row', borderRadius: 6 }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.onShowProfilePic(profPic)
                        }}

                        style={{ flex: 0.18, backgroundColor: 'transparent', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        {profPic == null &&
                            <Image
                                source={profile}
                                style={{ width: 50, height: 50, borderRadius: 50 / 2 }}>
                            </Image>
                        }
                        {profPic != null &&
                            <Image
                                source={{ uri: profPic }}
                                style={{ width: 50, height: 50, borderRadius: 50 / 2 }}>
                            </Image>
                        }
                    </TouchableOpacity>
                    <View style={{ flex: 0.60 }}>
                        <Text style={{ fontSize: 13, color: 'black', fontFamily: 'PoppinsBold', marginRight: 5 }}>{name}</Text>
                        <Text style={{ fontSize: 12, color: 'black', fontFamily: 'PoppinsSemiBold', marginRight: 5 }}>{label}</Text>
                        <Text style={{ fontSize: 13, color: 'gray', fontFamily: 'PoppinsLight', marginTop: 3, marginRight: 5 }}>{comment}</Text>
                    </View>
                    <View style={{ flex: 0.22, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 12, color: 'gray', fontFamily: 'PoppinsLight', marginTop: 0 }}>{newDate[0]}</Text>
                    </View>


                </View>
            )
        }
        else {
            return (
                <View></View>
            )
        }

    }
    //function to navigat ProflePic Screen
    onShowProfilePic(pic) {
        this.props.navigation.navigate("ProfilePicShow", { "PIC": pic })
    }
    //function to  navigate back screen
    shiftBack() {
        var obj = { 'day': this.state.day, 'week': this.state.week, 'challengeId': this.state.challengeId, 'uid': this.state.id }
        this.props.navigation.state.params.onGoBack(obj);
        this.props.navigation.goBack();
    }
//function to navigate SeeAll screen
    navigateToAll(challangeId, categoryId, featureId, week, uid, day) {
        Keyboard.dismiss();
      
        var parameters = {
         
            challenge_id: challangeId,
            category_id: categoryId,
            feature_id: featureId,
            week: week,
            day: day,
            uid: uid
        };

        this.props.navigation.navigate('CheckItSeeAll', { DATA: parameters });
        this.setState({ isDrop: false })
    }

    textInputFocused() {
        this.scrollView.scrollTo(50);
    }



    render() {
        const myTICK = `<svg height="18" viewBox="0 0 512 512" width="18" xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="white"/><path d="m385.75 201.75-138.667969 138.664062c-4.160156 4.160157-9.621093 6.253907-15.082031 6.253907s-10.921875-2.09375-15.082031-6.253907l-69.332031-69.332031c-8.34375-8.339843-8.34375-21.824219 0-30.164062 8.339843-8.34375 21.820312-8.34375 30.164062 0l54.25 54.25 123.585938-123.582031c8.339843-8.34375 21.820312-8.34375 30.164062 0 8.339844 8.339843 8.339844 21.820312 0 30.164062zm0 0" fill=` + this.state.Button_color + `/></svg>`
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



        return (
            <View style={styles.container}>
                <Spinner visible={this.state.offSetLoader} textContent={''} color={'black'} />
               
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
                                marginLeft: 10,
                                alignContent: 'center',
                                justifyContent: 'center',
                                width: '70%'
                            }}>
                                <Text style={{ fontFamily: 'PoppinsBold', color: this.state.BannerTextColor, fontSize: 18 }}
                                    numberOfLines={1}> {this.state.hederTitle == "" ? '-' : this.state.hederTitle.toUpperCase()}
                                </Text>
                            </View>

                        </View>
                    </View>


                </View>
           
                <Toast
                    ref="toast"
                    style={{ backgroundColor: this.state.Primary_color, borderRadius: 90 }}
                    position='top'
                    positionValue={130}
                    fadeInDuration={700}
                    fadeOutDuration={900}
                    opacity={0.8}
                    textStyle={{ color: '#fff' }}
                />
                <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }} behavior='height' enabled keyboardVerticalOffset={0}>
                    <ScrollView keyboardShouldPersistTaps={'handled'} ref={ref => { this.scrollView = ref }} style={{ flex: 1, paddingHorizontal: 15, backgroundColor: 'transparent' }}>
                        <View style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginLeft: 0,
                            marginTop: 20,

                            flexDirection: 'row',
                            backgroundColor: 'transparent'
                        }}>
                           
                            <View style={{ flex: 0.86 }}>
                                <Text style={{ fontFamily: 'PoppinsRegular', marginLeft: 10, marginRight: 0 }}
                                >{this.state.question}</Text>
                            </View>

                        </View>

                    


                        <TouchableOpacity

                            onPress={() => { this.dropPress() }}
                            style={{
                                backgroundColor: 'white',

                                height: 45,
                                borderRadius: 3, marginTop: 10

                            }}>
                            <View
                                style={{ height: 45, width: "100%", borderRadius: 3, flexDirection: "row", flex: 1, alignItems: "center", paddingLeft: 5 }}
                            >
                                <View style={{ flex: 0.9, flexDirection: "row" }}>
                                    <Text
                                        numberOfLines={2}
                                        style={{ fontFamily: 'PoppinsRegular', }}
                                    >
                                        {this.state.dropDowntext == "" ? "Today I..." : this.state.dropDowntext}
                                    </Text>
                                </View>
                                <TouchableOpacity

                                    onPress={() => { this.dropPress() }}
                                    style={{ justifyContent: "center", alignItems: "center", flex: 0.1 }}
                                >
                                    <Image
                                        resizeMode={"contain"}

                                        source={down} style={{ height: 16, width: 16 }} />
                                </TouchableOpacity>
                            </View>



                        </TouchableOpacity>

                        {this.state.isDrop &&
                            <View style={{ width: "100%", backgroundColor: "white", marginTop: 2, borderBottomEndRadius: 3, borderBottomStartRadius: 3, paddingBottom: 5 }}>
                                <FlatList
                                    data={this.state.data_list}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity
                                            onPress={() => this.dropSelect(item)}
                                            style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>

                                            <Text

                                                style={{ flex: 1, textAlign: "left", justifyContent: "center", marginLeft: 15, fontSize: 14, margin: 5, fontFamily: 'PoppinsRegular', }}>{item.value}</Text>
                                        </TouchableOpacity>

                                    }
                                
                                />
                            </View>
                        }
                        {!this.state.isDrop &&
                            <View style={styles.email_view}>
                                <TextInput
                                    placeholder={this.state.textInoutHint == "" ? '-' : this.state.textInoutHint}
                                    value={this.state.commentText}
                                    onFocus={this.textInputFocused.bind(this)}
                                    onChangeText={(text) => this.setState({ commentText: text })}
                                    style={{ width: "100%", paddingHorizontal: 10, textAlignVertical: 'top', backgroundColor: 'transparent', height: '100%', paddingVertical: 10 }}
                                    numberOfLines={8}
                                    multiline={true}>

                                </TextInput>
                            </View>

                        }
                        <View style={{ justifyContent: 'center', backgroundColor: 'transparent', flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 0.2, backgroundColor: 'transparent' }}>
                            </View>
                            <View style={{ flex: 0.6, justifyContent: 'center', backgroundColor: 'transparent', alignItems: 'center' }}>
                                <TouchableOpacity

                                    disabled={this.state.enableButton}
                                    style={{
                                        backgroundColor: this.state.Button_color,
                                        paddingVertical: 8,
                                        paddingHorizontal: 25,
                                        marginTop: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 25,
                                        flexDirection: 'row'
                                    }}
                                    onPress={() => [Keyboard.dismiss(),
                                    this.submitData()]}
                                >
                                    {this.state.countTodayCheckIn == 0 &&
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={checkgray}
                                                style={{ width: 18, height: 18 }}>
                                            </Image>
                                            <Image source={checkgray}
                                                style={{ width: 18, height: 18, marginLeft: 3 }}>
                                            </Image>
                                        </View>
                                    }
                                    {this.state.countTodayCheckIn == 1 &&
                                        <View style={{ flexDirection: 'row' }}>
                                            {/* <Image source={checkyellow}
                                                style={{ width: 18, height: 18 }}>
                                            </Image> */}
                                            <SvgXml
                                                style={{ marginRight: 1 }}
                                                xml={myTICK} />
                                            <Image source={checkgray}
                                                style={{ width: 18, height: 18, marginLeft: 3 }}>
                                            </Image>
                                        </View>
                                    }
                                    {this.state.countTodayCheckIn >= 2 &&
                                        <View style={{ flexDirection: 'row' }}>
                                            <SvgXml
                                                style={{ marginRight: 3 }}
                                                xml={myTICK} />
                                            <SvgXml
                                                style={{ marginRight: 3 }}
                                                xml={myTICK} />




                                        </View>
                                    }

                                    <Text style={{
                                        marginLeft: 10,
                                        fontFamily: 'PoppinsBold',
                                        fontSize: 12,
                                        color: this.state.Button_TEXT_color
                                    }}>
                                      
                                        SUBMIT {this.state.points} POINTS
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transparent' }}>
                                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                                    <TouchableOpacity
                                        style={{
                                            borderRadius: 5,
                                            alignItems: 'center',
                                            width: '100%',
                                            justifyContent: 'center'
                                        }}
                                        onPress={() => this.navigateToAll(this.state.challenge_Id, this.state.categoryId, this.state.featureId, this.state.week, this.state.usa, this.state.day)}>
                                        <Text style={{ fontSize: 15, color: 'black', borderBottomWidth: 1, fontFamily: 'PoppinsRegular', marginLeft: 5 }}>{"See All >"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                        <View style={{ backgroundColor: 'transparent', flex: 1, marginTop: 15 }}>

                         
                            <FlatList
                                style={styles.flatlist}
                                //keyExtractor={this._keyExtractor}
                                //showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                data={this.state.contentData}
                                //  ListFooterComponent={this.footerComponent}
                                //  onEndReached={this.handeLoadMoreItem}
                                // onEndReachedThreshold={0}
                                // pagingEnabled={false}
                                //  extraData={this.state}
                                renderItem={({ item, index }) => this.renderRow(item, index)}
                                keyExtractor={(item, index) => index.toString()} />

                            {/* } */}

                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>

        );

    }

}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f0f0f0'
    },
    flatlist: {
        flex: 1, backgroundColor: 'transparent'
        , paddingHorizontal: 0, paddingVertical: 15
    },
    radiobuttonContainer: {
        height: 20, width: 20, borderRadius: 20 / 2, marginLeft: 10,
        backgroundColor: 'black', borderColor: 'white', borderWidth: 1, justifyContent: 'center', alignItems: 'center'
    }, radiobuttonImageContainer: {
        height: 20, width: 20, alignItems: 'center', justifyContent: 'center'
    },
    header_view: {
        height: 90,

    },

    header_items: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',

        marginTop: 40,
    },
    header_image: {
        flex: 1,
        height: 90
    },

    menu: {
        width: 25,
        height: 25,
        marginLeft: 15,


    },

    profile: {
        width: 60,
        height: 60,
    },

    name_view: {

        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        height: 42,
        width: '100%',
        marginHorizontal: 0,
        backgroundColor: 'white',
        borderColor: 'lightgray',
        borderWidth: 1
    },

    email_view: {

        flexDirection: 'row',
        height: 180, alignItems: 'flex-start',
        width: '100%',
        marginHorizontal: 0,
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
});
