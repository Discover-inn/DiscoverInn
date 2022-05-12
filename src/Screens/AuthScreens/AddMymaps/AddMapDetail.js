import React, {Fragment} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  Platform,
  Keyboard,
} from 'react-native';
import {Textarea} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Header from './../../../components/header/header';
import styles from './AddMapDetail.style';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import fontelloConfig from './../../../selection.json';
import Dialog, {FadeAnimation, DialogContent} from 'react-native-popup-dialog';
import ImagePicker from 'react-native-image-crop-picker';
import Spinner from './../../../components/Loader';
import AutoCompleteLocation from '../../../components/AutoCompleteLocation';
const IconMoon = createIconSetFromIcoMoon(fontelloConfig);
import axios from 'axios';
import RNLocation from 'react-native-location';
//REDUX
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as mapActions from './../../../actions/mapActions';

const convertDMSToDD = function(degrees, minutes, seconds, direction) {
  var dd = degrees + minutes / 60 + seconds / 3600;

  if (direction == 'S' || direction == 'W') {
    dd = dd * -1;
  }
  return dd;
};

const LocationCheckbox = ({
  selected,
  onPress,
  style,
  textStyle,
  size = 22,
  text = '',
  ...props
}) => (
  <TouchableOpacity
    style={styles.useLoaction}
    disabled={false}
    onPress={onPress}
    {...props}>
    <Feather
      size={size}
      color={selected ? '#2F80ED' : '#BDBDBD'}
      name={selected ? 'check-square' : 'square'}
    />
    <Text style={styles.useLoactionText}> {text} </Text>
  </TouchableOpacity>
);

class AddMapDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinTitle: '',
      pinDescription: '',
      isLocationSelected: false,
      pinDetailInProgress: true,
      placeName: '',
      locationName: '',
      pinImages: [],
      imageSelected: false,
      locationAccepted: false,
      listViewDisplayed: false,
      addPinInProgress: false,
      addingPin: false,
      locationFromImage: true,
      selectedCategory: 7,
      currentLocation: false,
      hasCameraImage: false,
    };
  }

  async componentDidMount() {
    let location = await RNLocation.getLatestLocation({timeout: 60000});
    if (location && location.latitude && location.longitude) {
      if (!this.state.selectedLocation || !this.state.selectedLocation.lat) {
        this.setState({
          currentLocation: {
            lat: location.latitude,
            lng: location.longitude,
          },
        });
      }
    }
  }

  handleCheckBox = () => {
    if (this.state.pinImages.length == 0) {
      return alert('Please select image first');
    }
    this.setState(
      {
        locationAccepted: !this.state.locationAccepted,
      },
      () => {
        if (this.state.locationAccepted) {
          this.getLocationFromSelectedImages();
        }
      },
    );
  };

  showPicker(type) {
    if (type == 'gallery') {
      ImagePicker.openPicker({
        multiple: true,
        waitAnimationEnd: false,
        includeExif: true,
        forceJpg: true,
        compressImageQuality: 0.7,
      })
        .then(response => {
          if (response && response.length) {
            let tempArray = [];
            response.forEach(item => {
              let image = {
                uri: item.path,
                name: item.path.split('/').slice(-1)[0] || `${+new Date()}.jpg`,
                type: item.mime,
                exif: item.exif,
              };
              tempArray.push(image);
            });
            this.setState(
              {pinImages: [...this.state.pinImages, ...tempArray]},
              () => {
                this.getLocationFromSelectedImages();
              },
            );
          }
        })
        .catch(e => console.log(e));
    } else {
      ImagePicker.openCamera({
        avoidEmptySpaceAroundImage: true,
        mediaType: 'photo',
        cropping: true,
        compressImageQuality: 0.5,
        includeExif: true,
      }).then(item => {
        if (item) {
          let image = {
            uri: item.path,
            name: item.path.split('/').slice(-1)[0] || `${+new Date()}.jpg`,
            type: item.mime,
            exif: item.exif,
          };
          this.setState(
            {pinImages: [...this.state.pinImages, image], hasCameraImage: true},
            () => {
              this.getLocationFromSelectedImages();
            },
          );
        }
      });
    }
  }

  convertGPSToIOS = (lat, latitudeDirection, lng, longitudeDirection) => {
    if (Platform.OS == 'ios') {
      if (latitudeDirection && latitudeDirection == 'S') {
        lat = -lat;
      }
      if (longitudeDirection && longitudeDirection == 'W') {
        lng = -lng;
      }
    }
    return {lat, lng};
  };

  async getLocationFromSelectedImages() {
    if (!this.state.isLocationSelected && this.state.locationAccepted) {
      let imageLocation = false;

      for (var i = 0; i < this.state.pinImages.length; i++) {
        let item = this.state.pinImages[i];

        if (item.exif) {
          let latitudeDirection =
            item.exif['{GPS}'] && item.exif['{GPS}'].LatitudeRef;
          let latitude =
            item.exif.GPSLatitude ||
            (item.exif['{GPS}'] && item.exif['{GPS}'].Latitude);
          let longitudeDirection =
            item.exif['{GPS}'] && item.exif['{GPS}'].LongitudeRef;
          let longitude =
            item.exif.GPSLongitude ||
            (item.exif['{GPS}'] && item.exif['{GPS}'].Longitude);

          if (latitude && longitude) {
            if (
              latitude.toString().includes('/') ||
              latitude.toString().includes(',')
            ) {
              let splittedLatitude = latitude.split(',').map(d => eval(d));
              let splittedLongitude = longitude.split(',').map(d => eval(d));

              if (
                splittedLatitude &&
                splittedLatitude.length &&
                splittedLongitude &&
                splittedLongitude.length
              ) {
                let finalLatitude = convertDMSToDD(
                  ...splittedLatitude,
                  item.exif.GPSLatitudeRef,
                );
                let finalLongitude = convertDMSToDD(
                  ...splittedLongitude,
                  item.exif.GPSLongitudeRef,
                );
                if (finalLatitude && finalLongitude) {
                  let selectedLocation = this.convertGPSToIOS(
                    finalLatitude,
                    latitudeDirection,
                    finalLongitude,
                    longitudeDirection,
                  );
                  imageLocation = selectedLocation;
                  this.setState({selectedLocation, locationFromImage: true});
                  break;
                }
              }
            } else {
              imageLocation = this.convertGPSToIOS(
                latitude,
                latitudeDirection,
                longitude,
                longitudeDirection,
              );

              this.setState({
                selectedLocation: imageLocation,
                locationFromImage: true,
              });
            }
          }
        }
      }
      if (imageLocation && imageLocation.lat && imageLocation.lng) {
        this.getPlaceNameFromLocation({
          latitude: imageLocation.lat,
          longitude: imageLocation.lng,
        });
      } else if (!!this.state.hasCameraImage) {
        if (Platform.OS == 'ios') {
          if (
            !this.state.selectedLocation ||
            !this.state.selectedLocation.latitude
          ) {
            if (this.state.currentLocation && this.state.currentLocation.lat) {
              this.setState({
                selectedLocation: {...this.state.currentLocation},
              });
              this.getPlaceNameFromLocation({
                latitude: this.state.currentLocation.lat,
                longitude: this.state.currentLocation.lng,
              });
            }
          }
        }
      } else {
        this.setState({
          locationFromImage: false,
          locationName: '',
          gotTrueLocation: false,
        });
      }
    }
  }

  async getPlaceNameFromLocation({latitude, longitude}) {
    let latlng = `${latitude},${longitude}`;
    try {
      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=AIzaSyDVk4w7Wo8sefykoGcdjxk7aot3vPsRNxU`;
      let result = await axios.get(url);
      let results = result.data.results || [];
      let addressRes = results.find(
        r =>
          r.types &&
          (r.types.includes('locality') ||
            r.types.includes('administrative_area_level_2') ||
            r.types.includes('administrative_area_level_1')),
      );
      let placeName =
        (result.data.plus_code && result.data.plus_code.compound_code) || '';
      if (addressRes && addressRes.formatted_address) {
        placeName = addressRes.formatted_address;
      }
      this.setState({locationName: placeName});
    } catch (err) {
      this.setState({locationName: ''});
    }
  }

  removeSelectedImage(imageData) {
    let images = [...this.state.pinImages];
    let removeIndex = images.findIndex(image => image.uri == imageData.uri);
    images.splice(removeIndex, 1);
    this.setState({pinImages: images});
  }

  addPin() {
    const {
      pinImages,
      selectedLocation,
      selectedCategory,
      pinTitle,
      pinDescription,
    } = this.state;
    const {params} = this.props.navigation.state;

    // if (!pinDescription) return alert('Pin description is required');
    if (!pinTitle) return alert('Pin title is required');
    if (!selectedCategory) return alert('Category is required');

    this.setState({addingPin: true});

    let apiData = {
      map_id: params.mapID,
      user_id: this.props.userData.id,
      pin_title: pinTitle,
      category: selectedCategory,
    };

    if (pinDescription) {
      apiData['pin_description'] = pinDescription;
    }
    if (pinImages) {
      apiData['pin_images'] = pinImages;
    }
    if (selectedLocation && selectedLocation.lat && selectedLocation.lng) {
      apiData['latitude'] = selectedLocation.lat;
      apiData['longitude'] = selectedLocation.lng;
    }

    this.props.mapAction
      .addMapPin(apiData)
      .then(data => {
        this.setState({addingPin: false}, () => {
          this.props.navigation.goBack();
          // this.props.navigation.navigate('MapView', { mapID: params.mapID, mapName: params.mapName });
        });
      })
      .catch(err => {
        this.setState({addingPin: false});
        try {
          alert(err.err ? err.err : err);
        } catch (e) {
          alert(err);
          return false;
        }
      });
  }

  async getGeocodeFromPlace(placeID, description) {
    const APIKey = 'AIzaSyAWb4AJLePv_NjMW00JHNWp6TS_g1x3h60';
    let url = `https://maps.googleapis.com/maps/api/place/details/json?key=${APIKey}&placeid=${placeID}&fields=geometry`;
    try {
      let result = await axios.get(url);
      let res = result.data.result || {};
      if (res && res.geometry && res.geometry.location) {
        this.setState({
          selectedLocation: res.geometry.location,
          locationFromImage: false,
          locationName: description,
        });
      }
    } catch (err) {
      this.setState({selectedLocation: false});
    }
  }

  render() {
    const {pinImages} = this.state;
    const {params} = this.props.navigation.state;
    return (
      <Fragment>
        <ImageBackground
          source={require('../../../Images/map-bg.png')}
          style={{width: '100%', height: '100%'}}>
          <Header
            showBack={true}
            title={params.mapName}
            {...this.props}
            rightEmpty={true}
            showRightButton={false}
            style={styles.bgTransfrent}
          />
          <Spinner
            visible={this.state.addingPin}
            textContent={'Adding Pin...'}
            textStyle={{color: '#fff'}}
            onClose={() => {
              this.setState({addingPin: false});
            }}
          />
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.pageContent}>
              <ScrollView
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}
                ref={'_scrollView'}>
                {pinImages && pinImages.length ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}>
                    {pinImages.map(image => {
                      return (
                        <View style={{marginRight: 13, marginBottom: 15}}>
                          <Image
                            style={{height: 80, width: 80, borderRadius: 5}}
                            source={{uri: image.uri}}
                          />
                          <TouchableOpacity
                            onPress={() => this.removeSelectedImage(image)}
                            style={{
                              backgroundColor: 'white',
                              height: 20,
                              width: 20,
                              position: 'absolute',
                              top: -5,
                              right: -5,
                              borderRadius: 10,
                              justifyContent: 'center',
                              alignItems: 'center',
                              elevation: 5,
                              shadowColor: '#000000',
                              shadowOpacity: 0.05,
                              shadowOffset: {width: 0, height: 4},
                              shadowRadius: 10,
                            }}>
                            <Feather name={'x'} color={'red'} />
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                    <TouchableOpacity
                      onPress={() => this.setState({showPickerDialog: true})}
                      style={{
                        marginRight: 13,
                        marginBottom: 15,
                        borderWidth: 1,
                        borderColor: '#2F80ED',
                        borderStyle: 'dashed',
                        height: 80,
                        width: 80,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Feather name={'plus'} color={'#2F80ED'} size={18} />
                      <Text
                        style={{
                          color: '#828282',
                          fontSize: 8,
                          fontFamily: 'Montserrat-Regular',
                          textAlign: 'center',
                          marginRight: 0,
                        }}>
                        Choose Files
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => this.setState({showPickerDialog: true})}
                    style={[styles.uploadCoverCard]}>
                    <AntDesign
                      name={'pluscircleo'}
                      size={36}
                      color={'#2F80ED'}
                    />
                    <Text style={[styles.uploadCoverCardText]}>Add Photos</Text>
                  </TouchableOpacity>
                )}

                <View>
                  <LocationCheckbox
                    selected={this.state.locationAccepted}
                    onPress={this.handleCheckBox}
                    text="Use photo location"
                  />
                </View>
                <View style={styles.ckaiush} />
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>
                    Location Name{' '}
                    {this.state.locationAccepted
                      ? !this.state.locationFromImage && (
                          <Feather
                            size={14}
                            name="alert-triangle"
                            color={'#F2994A'}
                          />
                        )
                      : null}
                  </Text>

                  <AutoCompleteLocation
                    onValueSelected={(placeID, description) =>
                      this.getGeocodeFromPlace(placeID, description)
                    }
                    onValueChange={name => this.setState({locationName: name})}
                    locationFromImage={
                      this.state.locationFromImage &&
                      this.state.locationAccepted
                    }
                    value={this.state.locationName}
                    scroll={() =>
                      this.refs._scrollView.scrollTo({
                        x: 0,
                        y: 200,
                        animated: true,
                      })
                    }
                  />
                </View>

                <View style={styles.mapPins}>
                  {this.props.categories &&
                    this.props.categories.map(category => {
                      let isCategorySelected =
                        this.state.selectedCategory == category.id;
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({selectedCategory: category.id});
                          }}
                          style={[
                            styles.singlePin,
                            {
                              backgroundColor: isCategorySelected
                                ? '#2F80ED'
                                : 'rgba(47, 128, 237, 0.1)',
                            },
                          ]}>
                          <IconMoon
                            size={14}
                            name={category.name.toLowerCase()}
                            color={isCategorySelected ? 'white' : '#2F80ED'}
                          />
                        </TouchableOpacity>
                      );
                    })}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Pin Title</Text>
                  <TextInput
                    style={styles.formControl}
                    placeholderTextColor={'#828894'}
                    onChangeText={pinTitle => this.setState({pinTitle})}
                    returnKeyType="done"
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Description:</Text>
                  <Textarea
                    numberOfLines={4}
                    style={[styles.formControlTextarea]}
                    textAlignVertical={'top'}
                    placeholderTextColor={'#828894'}
                    onChangeText={pinDescription =>
                      this.setState({pinDescription})
                    }
                    onFocus={() => {
                      this.refs._scrollView.scrollTo({
                        x: 0,
                        y: 500,
                        animated: true,
                      });
                    }}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    returnKeyType="done"
                  />
                </View>
              </ScrollView>
            </View>
            <View style={styles.footerButton}>
              <TouchableOpacity
                style={[styles.button, styles.buttonPrimary, {flex: 1}]}
                onPress={() => {
                  this.addPin();
                }}>
                <Text style={styles.buttonText}>Add Pin</Text>
                {/* {
                  this.state.addingPin ?
                    <ActivityIndicator color={'#fff'} size={'small'} />
                    :
                    <Text style={styles.buttonText}>Add Pin</Text>
                } */}
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>

          {/* image picker modal */}
          <Dialog
            rounded={false}
            visible={this.state.showPickerDialog}
            hasOverlay={true}
            animationDuration={1}
            onTouchOutside={() => {
              this.setState({showPickerDialog: false});
            }}
            dialogAnimation={
              new FadeAnimation({
                initialValue: 0, // optional
                animationDuration: 150, // optional
                useNativeDriver: true, // optional
              })
            }
            onHardwareBackPress={() => {
              this.setState({showPickerDialog: false});
              return true;
            }}
            dialogStyle={styles.customPopup}>
            <DialogContent style={styles.customPopupContent}>
              <View style={styles.customPopupHeader}>
                <Text style={styles.customPopupHeaderTitle}>
                  Share Your Map
                </Text>
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() => this.setState({showPickerDialog: false})}>
                  <Feather name={'x'} style={styles.buttonCloseIcon} />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.formLabel}>Select From:</Text>
                <View style={styles.shareSocial}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonCamera]}
                    onPress={() =>
                      this.setState({showPickerDialog: false}, () => {
                        this.showPicker('gallery');
                      })
                    }>
                    <AntDesign name={'picture'} color={'#fff'} size={16} />
                    <Text style={[styles.buttonText]}>Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonCamera]}
                    onPress={() =>
                      this.setState({showPickerDialog: false}, () => {
                        this.showPicker('camera');
                      })
                    }>
                    <AntDesign name={'camerao'} color={'#fff'} size={16} />
                    <Text style={[styles.buttonText]}>Camera</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </DialogContent>
          </Dialog>
        </ImageBackground>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.maps.categories,
    userData: state.user.userData,
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
)(AddMapDetail);
