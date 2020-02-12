import React, { Fragment } from 'react';
import {
    View,
    Text,
    Dimensions,
    ActivityIndicator,
    TextInput,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Image,
} from 'react-native';
import { ListItem, CheckBox, Picker, Textarea } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Header from './../../../components/header/header';
import styles from './AddMapDetail.style';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import fontelloConfig from './../../../selection.json';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Dialog, { FadeAnimation, DialogContent } from 'react-native-popup-dialog';
import ImagePicker from 'react-native-image-crop-picker';
import Spinner from './../../../components/Loader';
import ImageBlurLoading from './../../../components/ImageLoader'

const IconMoon = createIconSetFromIcoMoon(fontelloConfig);
const DEVICE_WIDTH = Dimensions.get('window').width;

//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mapActions from './../../../actions/mapActions';

const LocationCheckbox = ({
    selected,
    onPress,
    style,
    textStyle,
    size = 22,
    text = '',
    ...props
}) => (
        <TouchableOpacity style={styles.useLoaction} disabled={true} onPress={onPress} {...props}>
            <Feather
                size={size}
                color={selected ? '#BDBDBD' : '#2F80ED'}
                name={selected ? 'square' : 'check-square'}
            />
            <Text style={styles.useLoactionText}> {text} </Text>
        </TouchableOpacity>
    );

class EditMapDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pinImages: [],
            imageSelected: false,
            locationAccepted: true,
            listViewDisplayed: false,
            addPinInProgress: false,
            addingPin: false,
            pinTitle: '',
            pinDescription: '',
            isLocationSelected: true,
            pinDetailInProgress: true
        };
    }

    handleCheckBox = () => {
        this.setState({ locationAccepted: !this.state.locationAccepted });
    };

    showPicker(type) {
        if (type == 'gallery') {
            ImagePicker.openPicker({
                multiple: true,
                waitAnimationEnd: false,
                includeExif: false,
                forceJpg: true,
                compressImageQuality: 0.7,
            })
                .then(response => {
                    let tempArray = [];
                    console.log('responseimage-------', response);
                    response.forEach(item => {
                        let image = {
                            uri: item.path,
                            name: item.path.split('/').slice(-1)[0] || `${+new Date()}.jpg`,
                            type: item.mime,
                        };
                        tempArray.push(image);
                    });
                    this.setState({ pinImages: [...this.state.pinImages, ...tempArray] });
                })
                .catch(e => alert(e));
        } else {
            ImagePicker.openCamera({
                avoidEmptySpaceAroundImage: true,
                mediaType: 'photo',
                cropping: true,
                compressImageQuality: 0.5
            }).then(item => {
                let image = {
                    uri: item.path,
                    name: item.path.split('/').slice(-1)[0] || `${+new Date()}.jpg`,
                    type: item.mime,
                };
                this.setState({ pinImages: [...this.state.pinImages, image] });
            });
        }
    }

    removeSelectedImage(imageData) {
        let images = [...this.state.pinImages];
        let removeIndex = images.findIndex(
            image => image.uri == imageData.uri,
        );
        images.splice(removeIndex, 1);
        this.setState({ pinImages: images });
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        let pinID = params.pinID;
        if (pinID) {
            this.setState({ pinDetailInProgress: true })
            this.props.mapAction.getSinglePinData({ pin_id: pinID, user_id: this.props.userData.id, map_id: params.mapID }).then((data) => {
                let pinData = data.pin_data;
                let isLocationSelected = pinData.latitude && pinData.longitude;
                let pinImages = (pinData.images && pinData.images.length >= 0) ? pinData.images : [];
                this.setState({ pinTitle: pinData.name, pinDescription: pinData.description, selectedCategory: pinData.categories, isLocationSelected, webImages: pinImages, pinDetailInProgress: false });
                console.log("pin data => ", data);
            }).catch((err) => {
                this.setState({ pinDetailInProgress: false })
                console.log("err => ", err)
            })
        }
    }

    updatePin() {
        const {
            pinImages,
            selectedLocation,
            selectedCategory,
            pinTitle,
            pinDescription,
        } = this.state;
        const { params } = this.props.navigation.state;

        if (!pinDescription) return alert("Pin description is required")
        if (!pinTitle) return alert("Pin title is required")
        if (!selectedCategory) return alert("Category is required")

        this.setState({ pinUpdateInProgress: true })

        let apiData = {
            map_id: params.mapID,
            user_id: this.props.userData.id,
            pin_title: pinTitle,
            category: selectedCategory,
            pin_id: params.pinID
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
        this.props.mapAction.updateMapPin(apiData).then((data) => {
            this.setState({ pinUpdateInProgress: false }, () => {
                this.props.navigation.goBack();
            })
        }).catch((err) => {
            this.setState({ pinUpdateInProgress: false })
            alert(err);
        });
    }

    removeWebImage(imageID) {
        const { params } = this.props.navigation.state;
        let pinID = params.pinID;
        if (pinID) {
            this.props.mapAction.removeSinglePinImage({ map_id: params.mapID, user_id: this.props.userData.id, pin_id: pinID, img_id: imageID }).then((data) => {
                let webImages = [...this.state.webImages];
                let filteredImage = webImages.filter((image) => image.id != imageID);
                this.setState({ webImages: filteredImage });
            }).catch((err) => {
                console.log("err => ", err);
                alert("Can not delete image, Please try again later.")
            })
        }
    }

    render() {
        const { pinImages, webImages } = this.state;
        const { params } = this.props.navigation.state;
        console.log("params => ", params)
        return (
            <Fragment>
                <ImageBackground
                    source={require('../../../Images/map-bg.png')}
                    style={{ width: '100%', height: '100%' }}>
                    <Header
                        showBack={true}
                        title={params.mapName}
                        {...this.props}
                        rightEmpty={true}
                        showRightButton={false}
                        style={styles.bgTransfrent}
                    />
                    <Spinner
                        visible={this.state.pinDetailInProgress}
                        textContent={'Fetching Pin Details...'}
                        textStyle={{ color: '#fff' }}
                    />
                    <Spinner
                        visible={this.state.pinUpdateInProgress}
                        textContent={'Updating Pin Details...'}
                        textStyle={{ color: '#fff' }}
                    />
                    <View style={styles.container}>
                        <View style={styles.pageContent}>
                            <ScrollView keyboardShouldPersistTaps={'always'} showsVerticalScrollIndicator={false}>
                                {
                                    ((pinImages && pinImages.length) || (webImages && webImages.length)) ?
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 10 }}>
                                            {
                                                webImages.map((image) => {
                                                    return (
                                                        <View style={{ marginRight: 13, marginBottom: 15 }}>
                                                            <ImageBlurLoading
                                                                withIndicator
                                                                style={{ height: 80, width: 80, borderRadius: 5 }}
                                                                source={{ uri: image.image }}
                                                                thumbnailSource={{ uri: 'https://picsum.photos/id/1/50/50' }}
                                                            />
                                                            <TouchableOpacity onPress={() => this.removeWebImage(image.id)} style={{ backgroundColor: 'white', height: 20, width: 20, position: 'absolute', top: -5, right: -5, borderRadius: 10, justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#000000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 4 }, shadowRadius: 10 }}>
                                                                <Feather name={'x'} color={'red'} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    )
                                                })
                                            }
                                            {
                                                pinImages.map((image) => {
                                                    return (
                                                        <View style={{ marginRight: 13, marginBottom: 15 }}>
                                                            <Image
                                                                style={{ height: 80, width: 80, borderRadius: 5 }}
                                                                source={{ uri: image.uri }}
                                                            />
                                                            <TouchableOpacity onPress={() => this.removeSelectedImage(image)} style={{ backgroundColor: 'white', height: 20, width: 20, position: 'absolute', top: -5, right: -5, borderRadius: 10, justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#000000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 4 }, shadowRadius: 10 }}>
                                                                <Feather name={'x'} color={'red'} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    )
                                                })
                                            }
                                            <TouchableOpacity onPress={() => this.setState({ showPickerDialog: true })} style={{ marginRight: 13, marginBottom: 15, borderWidth: 1, borderColor: '#2F80ED', borderStyle: 'dashed', height: 80, width: 80, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Feather name={'plus'} color={'#2F80ED'} size={18} />
                                                <Text style={{ color: '#828282', fontSize: 8, fontFamily: 'Montserrat-Regular', textAlign: 'center', marginRight: 0, }}>Choose Files</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <TouchableOpacity onPress={() => this.setState({ showPickerDialog: true })} style={[styles.uploadCoverCard]}>
                                            <AntDesign name={'pluscircleo'} size={36} color={'#2F80ED'} />
                                            <Text style={[styles.uploadCoverCardText]}>
                                                Add Cover Image
                                            </Text>
                                        </TouchableOpacity>
                                }

                                {
                                    this.state.isLocationSelected ?
                                        <View style={{ marginBottom: 15, backgroundColor: 'white', height: 100, justifyContent: 'center' }}>
                                            <Text style={styles.useLoactionText}>Location imported from Google MyMaps </Text>
                                        </View>
                                        :
                                        <>
                                            <View>
                                                <LocationCheckbox
                                                    selected={this.state.locationAccepted}
                                                    onPress={this.handleCheckBox}
                                                    text="Use photo location"
                                                />
                                            </View>
                                            <View style={styles.ckaiush}></View>
                                            <View style={styles.formGroup}>
                                                <Text style={styles.formLabel}>
                                                    Location Name{' '}
                                                    <Feather
                                                        size={14}
                                                        name="alert-triangle"
                                                        color={'#F2994A'}
                                                    />
                                                </Text>

                                                <GooglePlacesAutocomplete
                                                    query={{
                                                        // available options: https://developers.google.com/places/web-service/autocomplete
                                                        key: 'AIzaSyBEd0rJ6DYhNEPKAkKHQG-jEBIrFKDQsRs',
                                                        language: 'en', // language of the results
                                                        types: 'geocode', // default: 'geocode'
                                                    }}
                                                    placeholder="Enter Location"
                                                    minLength={2}
                                                    autoFocus={false}
                                                    returnKeyType={'default'}
                                                    fetchDetails={true}
                                                    enablePoweredByContainer={false}
                                                    listViewDisplayed={this.state.listViewDisplayed}
                                                    styles={{
                                                        textInputContainer: {
                                                            borderWidth: 1,
                                                            borderColor: '#BDBDBD',
                                                            borderRadius: 5,
                                                            height: 48,
                                                            paddingLeft: 10,
                                                            paddingRight: 10,
                                                            backgroundColor: 'transparent',

                                                            fontSize: 14,
                                                        },
                                                        textInput: {
                                                            fontFamily: 'Montserrat-Regular',
                                                            color: '#4F4F4F',
                                                        },
                                                        description: {
                                                            fontWeight: 'bold',
                                                        },
                                                        predefinedPlacesDescription: {
                                                            color: '#1faadb',
                                                        },
                                                    }}
                                                    debounce={200}
                                                    renderDescription={(row) => row.description || row.vicinity} // custom description render
                                                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                                        console.log(data, details);
                                                        this.setState({
                                                            listViewDisplayed: false,
                                                            selectedLocation: details.geometry.location,
                                                            selectedAddress: details.formatted_address,
                                                        });
                                                    }}
                                                />
                                            </View>
                                        </>
                                }


                                <View style={styles.mapPins}>
                                    {this.props.categories &&
                                        this.props.categories.map(category => {
                                            let isCategorySelected =
                                                this.state.selectedCategory == category.id;
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.setState({ selectedCategory: category.id });
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
                                        onChangeText={pinTitle => this.setState({ pinTitle })}
                                        value={this.state.pinTitle}
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
                                            this.setState({ pinDescription })
                                        }
                                        value={this.state.pinDescription}
                                    />
                                </View>
                            </ScrollView>
                        </View>
                        <View style={styles.footerButton}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonPrimary, { flex: 1 }]}
                                onPress={() => {
                                    this.updatePin();
                                }}>
                                <Text style={styles.buttonText}>Update Pin</Text>
                                {/* {
                  this.state.addingPin ?
                    <ActivityIndicator color={'#fff'} size={'small'} />
                    :
                    <Text style={styles.buttonText}>Add Pin</Text>
                } */}
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* image picker modal */}
                    <Dialog
                        rounded={false}
                        visible={this.state.showPickerDialog}
                        hasOverlay={true}
                        animationDuration={1}
                        onTouchOutside={() => {
                            this.setState({ showPickerDialog: false });
                        }}
                        dialogAnimation={
                            new FadeAnimation({
                                initialValue: 0, // optional
                                animationDuration: 150, // optional
                                useNativeDriver: true, // optional
                            })
                        }
                        onHardwareBackPress={() => {
                            this.setState({ showPickerDialog: false });
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
                                    onPress={() => this.setState({ showPickerDialog: false })}>
                                    <Feather name={'x'} style={styles.buttonCloseIcon} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={styles.formLabel}>Select From:</Text>
                                <View style={styles.shareSocial}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonCamera]}
                                        onPress={() =>
                                            this.setState({ showPickerDialog: false }, () => {
                                                this.showPicker('gallery');
                                            })
                                        }>
                                        <AntDesign name={'picture'} color={'#fff'} size={16} />
                                        <Text style={[styles.buttonText]}>Gallery</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonCamera]}
                                        onPress={() =>
                                            this.setState({ showPickerDialog: false }, () => {
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
export default connect(mapStateToProps, mapDispatchToProps)(EditMapDetails);
