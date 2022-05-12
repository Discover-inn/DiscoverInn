import React, {Fragment} from 'react';
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import styles from './MyTripList.style';
import Header from './../../../components/header/header';
import Feather from 'react-native-vector-icons/Feather';
import Dialog, {FadeAnimation, DialogContent} from 'react-native-popup-dialog';
import Spinner from './../../../components/Loader';
import {NavigationEvents} from 'react-navigation';
const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;
import {editing, eye, deleteIcon} from '../../../Images';

//REDUX
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as mapActions from './../../../actions/mapActions';
import {Button} from 'native-base';

class MyTripList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTripListModal: false,
      tripName: '',
      fetchingTripList: false,
      deleteTripId: 0,
    };
  }

  fetchTripList() {
    this.props.mapAction
      .fetchTripList()
      .then(d => this.setState({fetchingTripList: false}))
      .catch(d => this.setState({fetchingTripList: false}));
  }

  componentDidMount() {
    if (!this.props.tripList || this.props.tripList.length == 0) {
      this.setState({fetchingTripList: true});
    }
    this.fetchTripList();
  }

  deleteFavouriteList() {
    this.setState({pinDeleteInProgress: true});
    this.props.mapAction
      .deleteFavouriteList({
        user_id: this.props.userData.id,
        favorite_id: this.state.deleteTripId,
      })
      .then(data => {
        this.setState({pinDeleteInProgress: false, deleteTripId: 0});
      })
      .catch(err => {
        this.setState({pinDeleteInProgress: false, deleteTripId: 0});
      });
  }

  createTripList() {
    this.setState({createListInProgress: true});
    this.props.mapAction
      .createFavouriteList({
        user_id: this.props.userData.id,
        name: this.state.tripName,
      })
      .then(data => {
        this.setState({createListInProgress: false, newTripListModal: false});
        this.props.mapAction.fetchTripList();
      })
      .catch(err => {
        this.setState({createListInProgress: false});
      });
  }

  viewPinsOnMap(tripID, tripName) {
    this.props.navigation.navigate('FavouritePinMap', {tripID, tripName});
  }

  render() {
    return (
      <Fragment style={styles.homePage}>
        <NavigationEvents
          onWillFocus={() => {
            this.fetchTripList();
          }}
        />
        <Header
          showBack={false}
          title={'Trip List'}
          {...this.props}
          style={{backgroundColor: '#F3F4F6'}}
          rightEmpty={true}
          showRightButton={false}
        />
        <ScrollView
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}>
          <Spinner
            visible={this.state.pinDeleteInProgress}
            textContent={'Deleting favourite list...'}
            textStyle={{color: '#fff'}}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: DEVICE_WIDTH - 30,
                paddingHorizontal: 10,
                marginBottom: 10,
              }}>
              <Text style={{fontFamily: 'Montserrat-Regular'}}>
                My Trip List
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Feather name={'edit'} color={'#2F80ED'} size={14} />
                <TouchableOpacity
                  onPress={() => this.setState({newTripListModal: true})}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 12,
                      marginLeft: 5,
                    }}>
                    Create List
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {this.props.tripList && this.props.tripList.length > 0 ? (
              this.props.tripList &&
              this.props.tripList.map((trip, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      elevation: 5,
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 20,
                    }}>
                    <View
                      style={[
                        styles.mymapsAction,
                        {
                          width: DEVICE_WIDTH - 30,
                          backgroundColor: '#fff',
                          paddingVertical: 8,
                          paddingHorizontal: 10,
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                        },
                      ]}>
                      <Text style={{fontFamily: 'Montserrat-Regular'}}>
                        {trip.name}
                      </Text>
                      <View
                        style={{
                          height: 25,
                          width: 25,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'rgba(47, 128, 237, 0.1)',
                          borderRadius: 5,
                        }}>
                        <Text>{trip.pins}</Text>
                      </View>
                    </View>

                    <View style={styles.myTravelAction}>
                      {/* <View style={styles.myTravelActionLeft}>
                          <TouchableOpacity
                            style={[styles.buttonIcon, styles.buttonIconPrimary]}>
                            <Feather style={styles.buttonIconText} name="download-cloud" />
                          </TouchableOpacity>
                        </View> */}
                      <View />
                      <View style={styles.myTravelActionRight}>
                        <TouchableOpacity
                          style={styles.button1}
                          onPress={() => {
                            this.viewPinsOnMap(trip.id, trip.name);
                          }}>
                          <Image source={eye} style={styles.buttonIcon1} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.button1}
                          onPress={() =>
                            this.props.navigation.navigate('TripPinList', {
                              trip,
                            })
                          }>
                          <Image source={editing} style={styles.buttonIcon1} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.button1}
                          onPress={() => {
                            this.setState({deleteTripId: trip.id});
                            // this.deleteFavouriteList(trip.id);
                          }}>
                          <Image
                            source={deleteIcon}
                            style={styles.buttonIcon1}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  color: '#aaa',
                  fontSize: 16,
                  marginTop: 30,
                }}>
                {this.state.fetchingTripList
                  ? 'Fetching Trip list...'
                  : 'No Trip list found'}
              </Text>
            )}
          </View>
          <Dialog
            rounded={false}
            visible={this.state.deleteTripId}
            hasOverlay={true}
            animationDuration={1}
            onTouchOutside={() => {
              this.setState({deleteTripId: 0});
            }}
            dialogAnimation={
              new FadeAnimation({
                initialValue: 0, // optional
                animationDuration: 150, // optional
                useNativeDriver: true, // optional
              })
            }
            onHardwareBackPress={() => {
              this.setState({deleteTripId: 0});
              return true;
            }}
            dialogStyle={styles.customPopup}>
            <DialogContent style={styles.customPopupContent}>
              <View style={styles.customPopupHeader}>
                <Text style={styles.customPopupHeaderTitle}>Delete Trip</Text>
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() => this.setState({deleteTripId: 0})}>
                  <Feather name={'x'} style={styles.buttonCloseIcon} />
                </TouchableOpacity>
              </View>

              <View style={styles.deleteModalBody}>
                <Text style={styles.deleteModalBodyText}>
                  Are you sure you want to remove this trip?
                </Text>
              </View>

              <View style={[styles.footerButton]}>
                <Button
                  style={[
                    styles.button,
                    styles.buttonOutline,
                    styles.buttonOutlineGray,
                    styles.buttonDecline,
                  ]}
                  onPress={() => {
                    this.setState({deleteTripId: 0});
                  }}>
                  <Text style={[styles.buttonText, styles.buttonTextGray]}>
                    Decline
                  </Text>
                </Button>
                <Button
                  style={[
                    styles.button,
                    styles.buttonDanger,
                    styles.buttonSave,
                  ]}
                  onPress={() => {
                    // this.deleteMap();
                    this.deleteFavouriteList();
                  }}>
                  {this.state.deleteInProgrss ? (
                    <ActivityIndicator size={'small'} color={'white'} />
                  ) : (
                    <Text style={styles.buttonText}>Yes Sure</Text>
                  )}
                </Button>
              </View>
            </DialogContent>
          </Dialog>
          <Dialog
            rounded={false}
            visible={this.state.newTripListModal}
            hasOverlay={true}
            animationDuration={1}
            onTouchOutside={() => {
              this.setState({newTripListModal: false});
            }}
            dialogAnimation={
              new FadeAnimation({
                initialValue: 0, // optional
                animationDuration: 150, // optional
                useNativeDriver: true, // optional
              })
            }
            onHardwareBackPress={() => {
              this.setState({newTripListModal: false});
              return true;
            }}
            dialogStyle={styles.customPopup}>
            <DialogContent style={styles.customPopupContent}>
              <View style={styles.customPopupHeader}>
                <Text style={styles.customPopupHeaderTitle}>
                  Add New Trip List
                </Text>
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() => this.setState({newTripListModal: false})}>
                  <Feather name={'x'} style={styles.buttonCloseIcon} />
                </TouchableOpacity>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}> Name</Text>
                <TextInput
                  style={styles.formControl}
                  placeholder={'Enter trip list name'}
                  placeholderTextColor={'#828894'}
                  onChangeText={tripName => this.setState({tripName})}
                  value={this.state.tripName}
                />
              </View>

              <View style={styles.customPopupFooter}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonPrimary]}
                  onPress={() => this.createTripList()}>
                  {this.state.createListInProgress ? (
                    <ActivityIndicator color={'white'} size={'small'} />
                  ) : (
                    <Text style={styles.buttonText}>Create List</Text>
                  )}
                </TouchableOpacity>
              </View>
            </DialogContent>
          </Dialog>
        </ScrollView>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyTripList);
