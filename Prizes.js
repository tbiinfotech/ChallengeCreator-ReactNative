
import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity, ScrollView, Alert, Dimensions, FlatList } from 'react-native';

import SideMenu from 'react-native-side-menu';
import ContentView from './ContentView';
import HTML from 'react-native-render-html';
import * as global from "./common/global.js";
import { WebView } from 'react-native-webview';
const profile = require('./../images/image-9.png');
const headerback = require('./../images/image-8.png')
const tickets = require('./../assets/tickets.png')
const backarrow = require('./../assets/backarrow.png')
const menuImg = require('./../assets/menu.png')
import Spinner from 'react-native-loading-spinner-overlay';
import * as SecureStore from "expo-secure-store";
import { SvgXml } from 'react-native-svg';
const getUserName = async () => {
    return await SecureStore.getItemAsync('USERNAME');
};
export default class Prizes extends Component {


    constructor(props) {
        super(props)

        this.state = {
            htmlContent: '',
            profilePic: null,
            isOpen: false,
            feature_url: global.base_URL + 'termscondition',
            contentarray: [],
            Primary_color: "",
            Secondary_color: "",
            Button_color: "",
            BannerTextColor: "",
            Text_color: "",
            cDetails: [],
            challenge_ID: "",
            us_Details: [],
            usa: "",
            ch_ID: "",
            LOGIN_DETAILS: [],
            PROFILE_PIC: "",
            prizesList: [],
            CID: this.props.navigation.state.params.CID
        }
        this.toggle = this.toggle.bind(this);
        this.goBackDashboard = this.goBackDashboard.bind(this);
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
    
            this.setState({ userName: login_DETAILS.user.first_name })
            this.setState({ PROFILE_PIC: login_DETAILS.user.profile_image, usa: login_DETAILS.user.id, })
        
            this.setState({ LOGIN_DETAILS: login_DETAILS });
            this.setState({ userName: login_DETAILS.user.first_name });

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
                week: ch_details.week,
                LOGO_ICON: ch_details.logo_icon
            })
        }
      
        this.getApiData();
    }

    goBackDashboard() {
        if (this.props.navigation.state.params.route !== undefined && this.props.navigation.state.params.route == 'signup') {

            this.props.navigation.navigate('SignUp');
        }
        else {

            this.props.navigation.navigate('DashBoard', { image_url: this.state.PROFILE_PIC, user_name: this.state.userName });
        }
      
    }
//open close menu from sidebar
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }
//logout user without token
    async logOutWithToken() {
        await SecureStore.setItemAsync('loggedin', JSON.stringify(false));
      
    }
    //function to get data from API
    async getApiData() {
     
        this.setState({ showloader: true })

    
        const URL = global.base_URL + "challenge/" + this.state.CID + "/prize?uid=" + this.state.usa

        console.log("URL", URL)
        var token = await SecureStore.getItemAsync('token');
        
        var TOKEN = JSON.parse(token);
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
                console.log('PRIZES', dataobject)
               

                if (dataobject.status) {
                    this.setState({ showloader: false })
                    this.setState({ prizesList: dataobject.content })
                } else {
                    this.setState({ showloader: false })
                  
                }
            }
            )
            .catch((error) => {
                this.setState({ showloader: false })
               
            })
    }

//function to logout
    onMenuItemSelected = item =>
        this.setState({
            isOpen: false,
            selectedItem: item == 'logout' ? this.logOutWithToken() : this.props.navigation.navigate(item, { profilePic: this.state.PROFILE_PIC }),
        });
//loader component
    ActivityIndicatorLoadingView() {
       
        return (
            <Spinner visible={true} textContent={''} color={'black'} />
        );
    }

//render data from API
    renderRow(data, rowMap) {
      
        return (
            <View style={{ flex: 1, marginBottom: 20 }}>
                <Text style={{ fontSize: 16, color: "black", textAlign: "center", fontFamily: "PoppinsBold" }}>{data.item.title}</Text>
                {data.item.image.original !=="" &&
                 <Image 
               
                 resizeMode="contain"
                 
                 style={{ width: "100%", height: 200 }} source={{ uri: data.item.image.original }} />
                
                }

              
               
                <Text style={{ textAlign: "center", marginTop: 12 }}>{data.item.description}</Text>
            </View>
        )

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



        const menu = <ContentView
            onItemSelected={this.onMenuItemSelected}
            userProfile={this.state.PROFILE_PIC}
            userName={this.state.userName}
        />;

        return (

            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={isOpen => this.updateMenuState(isOpen)}>

                <View style={styles.container}>
                  
                    <View style={styles.header_view} >
                      
                        <View style={{ backgroundColor: this.state.Primary_color, flex: 1 }}>
                          
                            <View style={styles.header_items}>
                                <View style={{ width: '18%', backgroundColor: 'transparent' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                     
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
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 0,
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'transparent',
                                    width: '64%'
                                }}>
                                    <Text style={{ fontFamily: 'PoppinsBold', fontSize: 18, color: this.state.BannerTextColor }}> PRIZES
                                </Text>
                                </View>
                               
                            </View>
                        </View>
                       

                    </View>
                    <FlatList
                        keyboardShouldPersistTaps={'handled'}
                        contentContainerStyle={{ flexGrow: 1 }}
                        style={{ backgroundColor: 'transparent', marginTop: 20, backgroundColor: 'transparent', paddingHorizontal: 0 }}
                        data={this.state.prizesList}
                        renderItem={(data, rowMap) => this.renderRow(data, rowMap)}
                        keyExtractor={(data, rowMap) => rowMap.toString()}
                    //onEndReached={this.handeLoadMoreItem}
                    //  onEndReachedThreshold={10}
                    //   ListFooterComponent={this.footerComponent}
                    />

                    <Spinner visible={this.state.showloader} textContent={''} color={'black'} />
                </View>
            </SideMenu>
        );

    }


}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header_view: {
        height: 100,

    },
    profile: {
        width: 55,
        height: 55, marginRight: 15, marginTop: 0,
        borderRadius: 55 / 2
    },

    header_items: {
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',

        marginTop: 35,
    },
    header_image: {
        flex: 1,
        height: 100
    },
    menu: {
        width: 38,
        height: 28,
        marginLeft: 20,

    },


    menu: {
        width: 38,
        height: 28,
        marginLeft: 20,

    },
})
