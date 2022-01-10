import React, { Component, createRef } from 'react';
import {
    Alert,
    Animated,
    AsyncStorage,
    FlatList,
    Dimensions,
    Share,
    Image,
    ImageBackground,
    RefreshControl,
    StyleSheet,
    StatusBar,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    View
} from 'react-native';
import * as global from "./../common/global.js";
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
///import * as emoticons from 'react-native-emoticons';
import Emoji from 'react-native-emoji';
import { SvgXml } from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import SideMenu from 'react-native-side-menu';
import Spinner from 'react-native-loading-spinner-overlay';
import * as SecureStore from 'expo-secure-store';
import Modal from 'react-native-modal';
import ModalPremium from './../modals/ModalPremium';
const apiUrl = global.base_url_live + 'v1/api/get-current-user-basic-and-active-challenge-details-temp';
const checkyellow = require('./../../images/checkorange1.png');
const checkgray = require('./../../images/checkgray.png');
const nextarrow = require('./../../assets/nextarrow.png');
const backg = require('./../../images/bg_popup.png');
import * as Sharing from 'expo-sharing'
import * as FileSystem from 'expo-file-system';
import AnimatedLoader from "react-native-animated-loader";
import Toast, { DURATION } from 'react-native-easy-toast';
const unlockblack = require('./../../assets/unlockblack.png');
const unlockgray = require('./../../assets/unlockgray.png');
const crossarrow = require('./../../images/close.png');
const dailyInsp = require('./../../images/dailyInsp/daily4.png');
console.disableYellowBox = true;
const HEADER_MAX_HEIGHT = 125;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 92 : 92;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
//const emoji = emoticons.parse('This is source emoji [GRIMACING FACE]');
const getUserId = async () => {
    return await SecureStore.getItemAsync('id');
};

import ShowToast from '../Toast/Toast'
import Loader from "../loader/Loader";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default class Feature1 extends Component {
    constructor(props) {
        super(props);


        this.state = {
            scrollY: new Animated.Value(
                // iOS has negative initial scroll value because content inset...
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
            ),
            offSetLoader: false,
            UID: 0,
            accessToken: '',
            inspData: [],
            premiumModal: false,
            challenge_id: this.props.challenge_id,
            category_id: 0,
            view2LayoutProps: {
                left: 0,
                top: 0,
                width: 100,
                height: 100,
            },




            challengeArray: this.props.dataFromParent,
            basicArray: this.props.basicData,
            day: 1,
            feature_category_id: 0,
            week: 1,
            featureType: 0,
           
            submitButtonColor: false,
            Primary_color: "",
            Seco0ndary_color: "",
            Button_color: "",
            Text_color: "",
            Button_TEXT_color: "",
            cDetails: [],
            challenge_ID: "",
            us_Details: [],
            usa: "",
            ch_ID: "",
            LOGIN_DETAILS: [],
            PROFILE_PIC: "",
            temp: 0,
            challengeSTATUS: 0,
            showSubmit: true,
            newLoader: false,
            shimmerVisible: false
        };
        
    }


    async componentDidMount() {
      

        var c_Details = await SecureStore.getItemAsync('CH_DETAILS');

        var lDetails = await SecureStore.getItemAsync('LOGIN_DETAILS');
        var cID = await SecureStore.getItemAsync('CHALLENGE_ID');
        var cSTATUS = await SecureStore.getItemAsync('CHALLENGE_STATUS');
        if (cSTATUS !== "") {
            this.setState({ challengeSTATUS: cSTATUS });
        }
      
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
                day: ch_details.day,
                week: ch_details.week
            })
        }
       
        getUserId().then(id =>
            this.setState({ UID: id }),
        );
        this.getAccessToken();
    }


    async componentWillReceiveProps() {
       
    }
    //function call API function 
    async getAccessToken() {
        var token = await SecureStore.getItemAsync('token');
        this.setState({ accessToken: JSON.parse(token) });
       
        this.getInspiration();
        
    }
//function to get data from APi 
    async getInspiration() {
        const { challengeArray } = this.state;

        const token_ = await SecureStore.getItemAsync('token');
        var TOKEN = JSON.parse(token_)
        var URL = global.base_URL + 'daily-inspiration/' + challengeArray.content_id + '?challenge_id=' + this.state.challenge_ID + '&uid=' + this.state.usa + '&week=' + this.state.week + '&category_id=' + 5 + '&day=' + this.state.day
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

                if (dataobject.status) {
                  
                    this.setState({ showSubmit: dataobject.content.user_actions.action_status })
                    this.setState({ inspData: dataobject });
                    this.setState({ shimmerVisible: true })
                }
                else {

                }
            }
            )
            .catch((error) => {

            })
    }
    //function  to add Action 
    async addAction() {
        var C = this.state.challenge_ID;

        var P_ARRAY = await SecureStore.getItemAsync("ARRAY_ACTION")
     
        var PARSED_ARRAY = JSON.parse(P_ARRAY);
     
        P_ARRAY_INDEX = PARSED_ARRAY.findIndex((obj => obj.cid == C))

        if (P_ARRAY_INDEX >= 0) {

        


            PARSED_ARRAY[P_ARRAY_INDEX].actions += 1;
            await SecureStore.setItemAsync("ARRAY_ACTION", JSON.stringify(PARSED_ARRAY))
            var P_ARRAY = await SecureStore.getItemAsync("ARRAY_ACTION");
            this.props.getActions();
      
            var PARSED_ARRAY = JSON.parse(P_ARRAY);
    

        } else {

        }


    }
    //function to add action to local storage 
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
    //function to submit point 
    async submitPoints(dataholder) {

        const token_ = await SecureStore.getItemAsync('token');
        var TOKEN = JSON.parse(token_)
        var URL = global.base_URL + 'daily-inspiration'

        var params = {
            "challenge_id": this.state.challenge_ID,
            "uid": this.state.usa,
            "week": this.state.week,
            "day": this.state.day
        }



        fetch(URL,
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': TOKEN,
                }), body: JSON.stringify(params),
            })
            .then(async (response) => response.text())
            .then(async (responseText) => {
              
                var dataobject = JSON.parse(responseText);
                if (dataobject.status) {

                    this.addPoints(dataobject.points);
                    this.addAction();
                    this.addUserAction();
                    
                    this.state.inspData.content.user_actions.action_status = true;
                    this.setState({ showSubmit: true })
                    this.setState({ inspData: this.state.inspData });
                    this.props._handeleDayChange();

                    this.refs.toast.show(
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 12 }}>Woohoooo!  </Text>
                            <Emoji name="smile" style={{ fontSize: 12, color: 'White', backgroundColor: 'transparent' }}

                            />
                        </View>
                    )
                }
            }
            )
            .catch((error) => {
            })


    }
    //function to add Points
    async addPoints(points) {
        var C = this.state.challenge_ID;

        var P_ARRAY = await SecureStore.getItemAsync("POINTS_ARRAY")
        
        var PARSED_ARRAY = JSON.parse(P_ARRAY);
       
        P_ARRAY_INDEX = PARSED_ARRAY.findIndex((obj => obj.cid == C))

        if (P_ARRAY_INDEX >= 0) {

           


            PARSED_ARRAY[P_ARRAY_INDEX].points += points;
            await SecureStore.setItemAsync("POINTS_ARRAY", JSON.stringify(PARSED_ARRAY))
            var P_ARRAY = await SecureStore.getItemAsync("POINTS_ARRAY")
            this.props.getPoints();
            
            var PARSED_ARRAY = JSON.parse(P_ARRAY);

        

        } else {

        }


    }
    //function to share pic 
    async onShare(data) {
       


        if (data.content.image !== undefined) {

            this.setState({ offSetLoader: true });
            this.setState({ newLoader: true });

            var image_source = data.content.image;
            var imgName = image_source.substring(image_source.lastIndexOf("/") + 1, image_source.length);
            FileSystem.downloadAsync(
                image_source,
                FileSystem.documentDirectory + imgName
            )
                .then(async ({ uri }) => {

                    this.setState({ offSetLoader: false });
                    this.setState({ newLoader: false });

                    try {
                        const result = await Share.share({
                           
                            url: uri,
                        });
                        if (result.action === Share.sharedAction) {
                            if (result.activityType) {
                                console.log("IF")
                            } else {
                                console.log("ELSE")
                            }
                        } else if (result.action === Share.dismissedAction) {
                            console.log('Dismissed');
                        }
                    } catch (error) {
                        this.setState({ newLoader: false });
                        alert(error);
                    }


                })
                .catch(error => {
                    this.setState({ newLoader: false });
                    console.error(error);
                });
        }
        else {
            alert('Image not loaded. Please check Image.');
            this.setState({ newLoader: false });
        }
    };
//function to refresh data 
    refresh = (data) => {
        this.setState({ UID: data.uid });
        this.setState({ challenge_id: data.challenge_id });
        this.setState({ category_id: data.category_id });
        this.setState({ day: data.day });
        this.setState({ week: data.week });
        this.getInspiration();

        this.props._handeleDayChange();
    }
//function to show daily insipiration image
    onLayout(event) {
        const { x, y, height, width } = event.nativeEvent.layout;
        const newHeight = this.state.view2LayoutProps.height + 1;
        const newLayout = {
            height: newHeight,
            width: width,
            left: x,
            top: y,
        };
        this.setState({ view2LayoutProps: newLayout });
    }

    _handelePaymentUpdate = () => {
        this.props._handelePaymentUpdate();
    }
    //function to navigate See All page
    _onNavigateSeeAll = (dataholder, chlObject) => {
       
        var object = Object.keys(chlObject).length;
        const { navigate } = this.props.nav;
        if (object !== 0) {

            navigate('DailyInspiration', { "DATA": dataholder, "challenge_details": chlObject, "onGoBack": this.refresh })
        }


    }

    render() {
        const myCHECKgray = `<svg version="1.1" id="Capa_1"  width="18" height="18" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 408.576 408.576" style="enable-background:new 0 0 408.576 408.576;" xml:space="preserve">
        <g>
        <g>
           <path   fill=`+ "lightgrey" + `   d="M204.288,0C91.648,0,0,91.648,0,204.288s91.648,204.288,204.288,204.288s204.288-91.648,204.288-204.288
               S316.928,0,204.288,0z M318.464,150.528l-130.56,129.536c-7.68,7.68-19.968,8.192-28.16,0.512L90.624,217.6
               c-8.192-7.68-8.704-20.48-1.536-28.672c7.68-8.192,20.48-8.704,28.672-1.024l54.784,50.176L289.28,121.344
               c8.192-8.192,20.992-8.192,29.184,0C326.656,129.536,326.656,142.336,318.464,150.528z"/>
        </g>
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
        <g>
        </g>
        </svg>`
        const myCHECK = `<svg version="1.1" id="Capa_1"  width="18" height="18" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 408.576 408.576" style="enable-background:new 0 0 408.576 408.576;" xml:space="preserve">
        <g>
        <g>
           <path   fill=`+ this.state.Text_color + `   d="M204.288,0C91.648,0,0,91.648,0,204.288s91.648,204.288,204.288,204.288s204.288-91.648,204.288-204.288
               S316.928,0,204.288,0z M318.464,150.528l-130.56,129.536c-7.68,7.68-19.968,8.192-28.16,0.512L90.624,217.6
               c-8.192-7.68-8.704-20.48-1.536-28.672c7.68-8.192,20.48-8.704,28.672-1.024l54.784,50.176L289.28,121.344
               c8.192-8.192,20.992-8.192,29.184,0C326.656,129.536,326.656,142.336,318.464,150.528z"/>
        </g>
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
        <g>
        </g>
        </svg>`

        const backArrow = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" height="30" width="30" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 256 256" style="enable-background:new 0 0 256 256;" xml:space="preserve">
   <g>
       <g>
           <polygon fill=`+ this.state.Primary_color + ` points="207.093,30.187 176.907,0 48.907,128 176.907,256 207.093,225.813 109.28,128 		"/>
       </g>
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
   <g>
   </g>
   </svg>
   `
        const check = `<svg height="417pt" viewBox="0 -46 417.81333 417" width="417pt" xmlns="http://www.w3.org/2000/svg"><path d="m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0"/></svg>`
        const inspDetails = this.state.inspData;
       
        if (inspDetails.length !== 0) {
            var imageUri = inspDetails.content.image;
            var normalisedSource = imageUri && typeof imageUri === 'string' && (imageUri.split('https://')[1] || imageUri.split('http://')[1]) ? imageUri : null;


            var checkStatus = inspDetails.content.user_actions.action_status;
            var chlObject = { 'challenge_id': this.state.challenge_ID, 'feature_category_id': this.state.feature_category_id, 'day': this.state.day, 'week': this.state.week, "feature_name": this.state.challengeArray.feature_name };

            const ratio = this.state.view2LayoutProps.width / inspDetails.content.dimensions.width;
            if (inspDetails.content.dimensions.height == null) {
                var ViewHeight = 280;
                var ViewWidth = deviceWidth - 30;
            } else {
                var ViewHeight = inspDetails.content.dimensions.height * ratio;
                var ViewWidth = deviceWidth - 30;
            }

        }
        else {
            var ViewHeight = 280;
            var ViewWidth = deviceWidth - 30;
            var chlObject = {};
            var checkStatus = false;
            var imageUri = "m.jpg"
        }
        const { navigate } = this.props.nav;
        var dataholder = this.state.challengeArray;
        return (
            <View style={styles.challenge_view}>



                <Modal style={{ marginLeft: 10, marginRight: 10, marginBottom: 0, marginTop: StatusBar.currentHeight }} transparent={true} deviceWidth={deviceWidth}
                    deviceHeight={deviceHeight} coverScreen={true} hasBackdrop={false} isVisible={this.state.premiumModal} >

                    <View style={{ flex: 1, height: '100%', width: '100%', backgroundColor: 'white', padding: 0, margin: 0 }}>
                        <TouchableOpacity
                            style={{ zIndex: 99, backgroundColor: 'transparent', width: 20, height: 25, left: -15, right: 0, bottom: 0, top: 30, alignItems: 'center', alignSelf: 'flex-end' }}


                        >
                            <View style={{ justifyContent: 'flex-end', paddingTop: 10, paddingRight: 15, backgroundColor: 'transparent', alignItems: 'flex-end' }}>
                                <Image source={crossarrow} style={{ width: 12, height: 12, marginLeft: 0 }} />
                            </View>
                        </TouchableOpacity>
                        <ImageBackground resizeMode='contain' source={backg} style={{ flex: 1, height: '100%', width: '100%' }}>

                        </ImageBackground>
                    </View>
                </Modal>


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


                <TouchableOpacity
                    onPress={() => {
                        this._onNavigateSeeAll(dataholder, chlObject)
                    }}
                >
                    <View onLayout={(event) => this.onLayout(event)}>
                        <ShimmerPlaceHolder

                            width={ViewWidth}
                            height={ViewHeight}
                            style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, }}
                            LinearGradient={LinearGradient}
                            shimmerWidthPercent={1.0}
                            visible={this.state.shimmerVisible}>


                            <FastImage
                                resizeMode={FastImage.resizeMode.contain}
                                style={{ flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10, height: ViewHeight, width: ViewWidth }}
                                source={{
                                    uri: normalisedSource,
                                    priority: FastImage.priority.high,
                                }}
                            />
                        </ShimmerPlaceHolder>
                    </View>
                </TouchableOpacity>

                <View
                    style={{
                        flexDirection: 'row', borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        borderBottomColor: this.state.Secondary_color,
                        borderBottomWidth: 3,
                        borderRightColor: this.state.Secondary_color,
                        borderRightWidth: 3,
                        borderLeftColor: this.state.Secondary_color,
                        borderLeftWidth: 3,
                    }}>
                    <View style={{ width: '100%', backgroundColor: 'transparent', paddingVertical: 12 }}>

                        <View>

                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                backgroundColor: 'transparent',
                                marginBottom: 10,
                                alignItems: 'center',
                            }}
                                onPress={() => {
                                    this._onNavigateSeeAll(dataholder, chlObject)
                                }}
                            >
                                <ShimmerPlaceHolder
                                    height={18}
                                    width={18}
                                    style={{ borderRadius: 100, marginLeft: 10 }}
                                 
                                    LinearGradient={LinearGradient}
                                    shimmerWidthPercent={1.0}
                                    visible={this.state.shimmerVisible}>


                                    {checkStatus &&
                                        <SvgXml

                                            style={{ marginLeft: 10 }}
                                            xml={myCHECK} />

                                    }
                                    {!checkStatus &&

                                        <SvgXml

                                            style={{ marginLeft: 10 }}
                                            xml={myCHECKgray} />

                                    }
                                </ShimmerPlaceHolder>
                                <ShimmerPlaceHolder
                                    height={14}
                                    style={{ marginLeft: 5 }}
                                    // style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, }}
                                    LinearGradient={LinearGradient}
                                    shimmerWidthPercent={1.0}
                                    visible={this.state.shimmerVisible}>
                                    <Text style={{
                                        marginTop: 0, marginLeft: 5, fontSize: 14,
                                        fontFamily: 'PoppinsRegular', color: this.state.Text_color,
                                    }}>{dataholder.feature_name.toUpperCase()}</Text>
                                </ShimmerPlaceHolder>
                                <View style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: 'transparent',
                                    justifyContent: 'flex-end'
                                }}>

                                    {!this.state.shimmerVisible &&
                                        <ShimmerPlaceHolder
                                            width={15}
                                            height={20}
                                            style={{
                                                marginRight: 15, marginTop: 0
                                            }}
                                            LinearGradient={LinearGradient}
                                            shimmerWidthPercent={1.0}
                                            visible={this.state.shimmerVisible}>

                                        </ShimmerPlaceHolder>
                                    }

                                    {(this.state.featureType == 0 && this.state.shimmerVisible) &&
                                        <Image source={nextarrow}
                                            style={{ width: 12, height: 20, marginRight: 15, marginTop: 0 }}>
                                        </Image>
                                    }
                                </View>
                            </TouchableOpacity>

                            <View style={{
                                flexDirection: 'row',
                                flex: 1,
                                width: '100%',
                                backgroundColor: 'transparent',
                                alignItems: 'center',
                                marginTop: 12
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    flex: 1, backgroundColor: 'transparent',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-end', paddingRight: 15

                                }}>
                                    <View style={{ flex: 0.50, paddingLeft: 15 }}>
                                    <ShimmerPlaceHolder
                                            height={12}
                                            width={50}
                                           
                                            LinearGradient={LinearGradient}
                                            shimmerWidthPercent={1.0}
                                            visible={this.state.shimmerVisible}>
                                            {dataholder.points !== null &&
                                                <Text style={{
                                                  
                                                    color: '#000',
                                                    alignItems: 'center',
                                                    fontFamily: 'PoppinsBold',
                                                    fontSize: 12
                                                }}>  {dataholder.points + " Points"} </Text>
                                            }
                                        </ShimmerPlaceHolder>

                                    </View>

                                    <View style={{ flex: 0.25, backgroundColor: 'transparent' }}>
                                        {!this.state.showSubmit &&



                                            <TouchableOpacity style={{
                                                backgroundColor: this.state.Button_color,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                paddingVertical: 5,
                                                paddingHorizontal: 8,
                                                borderRadius: 25
                                            }}
                                                onPress={() => {
                                                    if (this.state.featureType == 0) {
                                                        this.submitPoints(dataholder)
                                                    }
                                                    else {
                                                        // this.premium();
                                                    }
                                                }}
                                            >
                                                {checkStatus &&
                                                    <Image source={checkyellow}
                                                        style={{ width: 15, height: 15, marginRight: 2, marginTop: 0 }}>
                                                    </Image>}



                                                <Text style={{
                                                    color: this.state.Button_TEXT_color,
                                                    fontSize: 11,
                                                    flexWrap: 'wrap',
                                                    fontFamily: 'PoppinsBold',
                                                    marginTop: 0
                                                }}> Submit</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                    <ShimmerPlaceHolder
                                        height={30}
                                        style={{ flex:0.22,borderRadius: 25,}}
                                        LinearGradient={LinearGradient}
                                        shimmerWidthPercent={1.0}
                                        visible={this.state.shimmerVisible}>

                                      
                                    <View style={{ flex: 0.25, backgroundColor: 'transparent' }}>
                                        <TouchableOpacity style={{
                                            backgroundColor: this.state.Button_color,
                                            marginLeft: 8,
                                            paddingVertical: 5,
                                            flexDirection: 'row',
                                            paddingHorizontal: 8,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 25
                                        }}
                                            onPress={() => {
                                                if (this.state.featureType == 0) {
                                                    this.onShare(inspDetails)
                                                }
                                                else {
                                                    // this.premium();
                                                }
                                            }}
                                        >

                                            {this.state.newLoader &&
                                                <ActivityIndicator
                                                    animating={this.state.newLoader}
                                                    size={"small"}
                                                    color={this.state.Button_TEXT_color}
                                                />


                                            }
                                            {!this.state.newLoader &&
                                                <Text style={{
                                                    color: this.state.Button_TEXT_color,
                                                    fontSize: 11,
                                                    fontFamily: 'PoppinsBold',
                                                    marginTop: 0
                                                }}> Share</Text>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    </ShimmerPlaceHolder>
                                </View>
                                

                            </View>

                        </View>
                    </View>


                </View>
            </View>

        );
    }


}

const styles = StyleSheet.create({
    fill: {
        flex: 1,
        backgroundColor: 'white'

    },
    content: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        // backgroundColor: 'orange',
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    bar: {
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'ios' ? 28 : 38,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    title: {
        color: 'white',
        fontSize: 18,
    },
    scrollViewContent: {
        // iOS uses content inset, which acts like padding.
        paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0, flexDirection: 'column', backgroundColor: 'white'
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    //   Header Items
    container: {
        flex: 1,
        backgroundColor: 'red'
    },

    header_view: {
        height: 125,
        flex: 1,
    },

    header_items: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginBottom: 20,
    },

    header_image: {
        flex: 1,
        height: 125,

    },

    menu: {
        width: 38,
        height: 28,
        marginLeft: 20,

    },

    profile: {
        width: 55,
        height: 55, marginRight: -14, marginTop: 3,
        borderRadius: 55 / 2
    },


    //Challenges Items
    challenge_view: {
        flex: 1,
        marginHorizontal: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        marginTop: 10,
        elevation: 3,
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }

    },

    chalenge_profile: {
        flex: 1,
        height: 250,
        width: deviceWidth - 30,
        resizeMode: 'cover',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },


    //Appreciation team member items
    appreciatio_view: {
        flex: 1,
        height: 380,
        marginHorizontal: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        marginTop: 15,
        marginBottom: 0,

        elevation: 3,
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }

    },

    appreciation_title: {
        marginLeft: 12,
        fontFamily: 'PoppinsSemiBold',
        fontSize: 12,
        lineHeight: 20
    },

    appreciation_desc: {
        marginLeft: 12,
        fontFamily: 'PoppinsRegular',
        lineHeight: 15,
        fontSize: 11,
        marginTop: 5

    },


    //Weekly Video items
    weekly_view: {
        flex: 1, height: 110,
        marginHorizontal: 15, padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 0, marginTop: 15,
        elevation: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    LeaderShipCorner: {
        flex: 1, height: 100,
        marginHorizontal: 15, padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 0, marginTop: 15,
        elevation: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    //Weekly Video items
    win_view: {
        flex: 1,
        marginHorizontal: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 15, marginTop: 15,
        height: 245
    },


    //Top user items
    leaderboard_view: {
        height: 190,
        marginHorizontal: 15,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10

    },

    //Top user items
    topstreaks_view: {
        height: 190,
        marginHorizontal: 15,
        borderRadius: 10,
        marginBottom: 30,

    },

    topuser_itemsview: {
        width: 110,
        height: 130,
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 5,
        marginTop: 5,
        marginRight: 10,
        backgroundColor: 'white',

        elevation: 3,
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1,
        }
    },

    win_user_itemsview: {
        width: 250,
        height: 145,
        borderRadius: 10,
        marginLeft: 5,
        marginTop: 5,
        marginRight: 10,
        backgroundColor: 'white',

        elevation: 3,
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1,
        }
    },

    tabbar_view: {

        flexDirection: 'row', justifyContent: 'space-around', height: 65,
        elevation: 3,
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1,
        }
    },

    tabbar_inner_view: {

        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'baseline',
        justifyContent: 'space-around',
        height: 63,
        marginTop: 1,
        flex: 1,
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1,
        }
    },

    tabbar_inner_view2: {

        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'baseline',
        justifyContent: 'space-around',
        height: 62,
        marginTop: 0.5,
        flex: 1,
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1,
        }
    }

});
