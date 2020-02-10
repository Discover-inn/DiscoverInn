import React, { Fragment } from 'react';
import { View, ScrollView, Text, Dimensions, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import styles from './TripPinList.style';
import Header from './../../../components/header/header';
import Feather from 'react-native-vector-icons/Feather';
import Dialog, { FadeAnimation, DialogContent } from 'react-native-popup-dialog';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mapActions from './../../../actions/mapActions';

class TripPinList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDeletePinModal: false,
      tripName: '',
      pinList: [],
      isPinListFetching: true
    }
  }

  changeTripName(tripName) {
    console.log("trip name => ", tripName);
    const { params } = this.props.navigation.state;
    this.props.mapAction.updateFavouriteList({ user_id: this.props.userData.id, name: tripName, favorite_id: params.trip.id }).then((data) => {
      console.log("trip updated");
    }).catch((err) => {
      console.log("err => ", err)
    })
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.props.mapAction.singleFavouritePinList({ user_id: this.props.userData.id, favorite_id: params.trip.id, page: 1 }).then((data) => {
      this.setState({ pinList: data.favorite_pin || [], isPinListFetching: false })
      console.log("trip data ", data);
    }).catch((err) => {
      this.setState({ pinList: [], isPinListFetching: false })
      console.log("err => ", err)
    })
  }

  deletePin() {
    let { deletePin } = this.state;

    console.log(this.props);
    // let { params } = this.props.navigation.state;
    // if (params && params.mapID && params.pinID && tripID) {
    //   this.props.mapAction.addRemoveToTrip({ map_id: params.mapID, pin_id: params.pinID, favorite_id: tripID, user_id: this.props.userData.id }).then((data) => {
    //     console.log("data => ", data);
    //     let listToAdded = [...this.state.listToAdded];

    //     let isAdded = listToAdded.indexOf(tripID);
    //     if (isAdded >= 0) {
    //       listToAdded.splice(isAdded, 1);
    //     } else {
    //       listToAdded.push(tripID);
    //     }
    //     this.setState({ listToAdded })
    //   }).catch((err) => {
    //     console.log("err => ", err);
    //   })
    // }

    this.setState({ saveToListModal: false });
  }

  render() {
    const { params } = this.props.navigation.state;
    console.log("params => ", params)

    if (this.state.isPinListFetching) {
      return (
        <Fragment style={styles.homePage}>
          <Header
            showBack={true}
            title={params.trip.name}
            {...this.props}
            style={{ backgroundColor: '#F3F4F6' }}
            rightEmpty={true}
            showRightButton={false}
            headerEditable={true}
            onHeaderEditSubmit={(tripName) => this.changeTripName(tripName)}
          />
          <View style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1, marginBottom: 50 }}>
              <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 18, color: '#aaa', marginRight: 10 }}>Fetching Pins</Text>
              <ActivityIndicator size={'small'} color={'#aaa'} />
            </View>
          </View>
        </Fragment>
      )
    }

    return (
      <Fragment style={styles.homePage}>
        <Header
          showBack={true}
          title={params.trip.name}
          {...this.props}
          style={{ backgroundColor: '#F3F4F6' }}
          rightEmpty={true}
          showRightButton={false}
          headerEditable={true}
          onHeaderEditSubmit={(tripName) => this.changeTripName(tripName)}
        />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15, }}>

            {
              this.state.pinList && this.state.pinList.length <= 0 ?
                <View style={styles.container}>
                  <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1, marginBottom: 50 }}>
                    <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 18, color: '#aaa', marginRight: 10 }}>No Pins in this list</Text>
                    <ActivityIndicator size={'small'} color={'#aaa'} />
                  </View>
                </View>
                :
                this.state.pinList.map((pin) => {
                  return (
                    <View style={{ elevation: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', marginBottom: 20, borderRadius: 10, paddingHorizontal: 15, paddingVertical: 10, width: DEVICE_WIDTH - 30, }}>

                      <View style={[styles.mymapsAction, { paddingHorizontal: 10, width: DEVICE_WIDTH - 30, }]}>

                        <Text style={{ fontFamily: 'Montserrat-Regular' }}>{pin.name}</Text>
                        <TouchableOpacity onPress={() => this.setState({ deletePin: pin, showDeletePinModal: true })} style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(235, 87, 87, 0.1)', borderRadius: 5 }}>
                          <Feather name={'trash-2'} color={'#EB5757'} size={14} />
                        </TouchableOpacity>
                      </View>

                      <Image
                        source={require('./../../../Images/map.png')}
                        style={{ height: 150, width: DEVICE_WIDTH - 50, borderRadius: 5, marginTop: 10 }}
                      />
                      <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: '#828282', marginTop: 10 }} numberOfLines={3} ellipsizeMode={'tail'}>{pin.description}</Text>
                    </View>
                  )
                })
            }

          </View>

          <Dialog
            rounded={false}
            visible={this.state.showDeletePinModal}
            hasOverlay={true}
            animationDuration={1}
            onTouchOutside={() => {
              this.setState({ showDeletePinModal: false });
            }}
            dialogAnimation={
              new FadeAnimation({
                initialValue: 0, // optional
                animationDuration: 150, // optional
                useNativeDriver: true, // optional
              })
            }
            onHardwareBackPress={() => {
              this.setState({ showDeletePinModal: false });
              return true;
            }}
            dialogStyle={styles.customPopup}>
            <DialogContent style={styles.customPopupContent}>
              <View style={styles.customPopupHeader}>
                <Text style={styles.customPopupHeaderTitle}>Trip Pin Delete</Text>
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() => this.setState({ showDeletePinModal: false })}>
                  <Feather name={'x'} style={styles.buttonCloseIcon} />
                </TouchableOpacity>
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { fontSize: 18, fontWeight: '600', color: '#333', textAlign: 'center' }]}>Are you sure you want to remove this pin ?</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 20
                }}>

                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                    marginTop: 5,
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: (DEVICE_WIDTH / 2) - 30,
                    alignSelf: 'center',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#BDBDBD',
                    borderRadius: 5
                  }}
                  onPress={() => this.setState({ showDeletePinModal: false })}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 12,
                      color: '#333',
                    }}>
                    Decline
                                </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                    marginTop: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: (DEVICE_WIDTH / 2) - 30,
                    alignSelf: 'center',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#EB5757',
                    backgroundColor: '#EB5757'
                  }}
                  onPress={() => this.deletePin()}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 12,
                      color: '#fff',
                    }}>
                    Yes Sure
                                </Text>
                </TouchableOpacity>
              </View>
            </DialogContent>
          </Dialog>
        </ScrollView>
      </Fragment >
    );
  }
}

function mapStateToProps(state) {
  console.log(state.maps);
  return {
    userData: state.user.userData,
    tripList: state.maps.tripList,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    mapAction: bindActionCreators(mapActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TripPinList);
