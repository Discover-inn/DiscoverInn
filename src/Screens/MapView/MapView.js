import React, { Fragment } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './MapView.style';
import exampleIcon from './../../Images/transportations1.png';
import exampleIcon1 from './../../Images/sights1.png';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Spinner from './../../components/Loader';

import { NavigationEvents } from 'react-navigation'

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import fontelloConfig from './../../selection.json';
const IconMoon = createIconSetFromIcoMoon(fontelloConfig);
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYWJyaWxsbyIsImEiOiJjanNlbHVjb28wanFwNDNzNzkyZzFnczNpIn0.39svco2wAZvwcrFD6qOlMw',
);

//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mapActions from './../../actions/mapActions';


class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTripList: false,
      currentLat: 21.2148224,
      currentLong: 72.8629248,
      isSelected: '1',
      featureCollection: MapboxGL.geoUtils.makeFeatureCollection(),
      showDestination: true,
      carouselItems: [
        {
          title: 'Lonely Planet - Bangkok',
        },
        {
          title: 'Lonely Planet - Franch',
        },
        {
          title: 'Lonely Planet - Maxico',
        },
        {
          title: 'Lonely Planet - India',
        },
      ],
      mapPinsInProgress: false
    };
  }
  componentDidMount() {
    console.log('map loaded', this.props);
  }

  //pin destination on the map
  pinDestination = () => {
    if (!this.state.showDestination) {
      return;
    }
    return (
      <MapboxGL.PointAnnotation
        key="pointAnnotation"
        id="pointAnnotation"
        coordinate={[this.state.currentLong, this.state.currentLat]}>
        <Image
          source={require('./../../Images/transportations1.png')}
          style={{ height: 16, width: 16 }}
        />
        {/* <Icon style={styles.search} name="location-on" size={16} color="red" /> */}
        <MapboxGL.Callout title={'From'} />
      </MapboxGL.PointAnnotation>
    );
  };

  loadMapPins(payload) {
    console.log("payload", payload);
    console.log("this.props", this.props);
    let mapID = payload.state.params && payload.state.params.mapID;
    // this.setState({ mapPinsInProgress: true })
    if (mapID) {
      this.props.mapAction.getMapPins({ map_id: mapID, user_id: this.props.userData.id }).then((data) => {
        this.setState({ mapPinsInProgress: false })
      }).catch((err) => {
        console.log("error => ",err)
        this.setState({ mapPinsInProgress: false })
      })
    }
  }

  render() {
    let { params } = this.props.navigation.state;
    params = params || {};

    const featureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          id: `asdf`,
          properties: {
            id: `asdf`,
          },
          geometry: {
            type: 'Point',
            coordinates: [this.state.currentLong, this.state.currentLat],
          },
        },
        {
          type: 'Feature',
          id: `asdf`,
          properties: {
            id: `asdf`,
          },
          geometry: {
            type: 'Point',
            coordinates: [this.state.currentLat, this.state.currentLong],
          },
        },
      ],
    };
    const featureCollection1 = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          id: `asdf`,
          properties: {
            id: `asdf`,
            description:
              '<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a <a href="http://tallulaeatbar.ticketleap.com/2012beachblanket/" target="_blank" title="Opens in a new window">Big Backyard Beach Bash and Wine Fest</a> on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>',
          },
          geometry: {
            type: 'Point',
            coordinates: [72.9583783, 21.1998507],
          },
        },
      ],
    };
    return (
      <View style={styles.page}>
        <NavigationEvents
          onWillFocus={payload => this.loadMapPins(payload)}
        />
        <View style={styles.container}>
          <Spinner
            visible={this.state.mapPinsInProgress}
            textContent={'Fetching Pins...'}
            textStyle={{ color: '#fff' }}
          />
          <View style={styles.viewMapHeader}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name={'arrow-left'} size={24} color={'#333333'} />
            </TouchableOpacity>
          </View>
          <MapboxGL.MapView
            style={styles.map}
            styleURL={MapboxGL.StyleURL.Street}
            logoEnabled={false}
            attributionEnabled={false}>
            <MapboxGL.Camera
              centerCoordinate={[this.state.currentLong, this.state.currentLat]}
              zoomLevel={10}
              animationMode={'flyTo'}
            />

            <MapboxGL.ShapeSource
              id="symbolLocationSource"
              hitbox={{ width: 20, height: 20 }}
              shape={featureCollection}
              cluster={true}
              onPress={e => {
                this.props.navigation.navigate('PinView');
              }}>
              <MapboxGL.SymbolLayer
                id="symbolLocationSymbols"
                minZoomLevel={1}
                style={{
                  iconImage: exampleIcon,
                  iconAllowOverlap: true,
                  iconSize: 0.4,
                }}
              />
              <MapboxGL.Callout title="Rivadavia 1841, 7º Piso, Of. 749." />
            </MapboxGL.ShapeSource>

            <MapboxGL.ShapeSource
              id="symbolLocationSource1"
              hitbox={{ width: 20, height: 20 }}
              shape={featureCollection1}
              cluster={true}
              onPress={e => {
                this.props.navigation.navigate('PinView');
              }}>
              <MapboxGL.SymbolLayer
                id="symbolLocationSymbols1"
                minZoomLevel={1}
                style={{
                  iconImage: exampleIcon1,
                  iconAllowOverlap: true,
                  iconSize: 0.4,
                }}>
                <View style={{ width: 20, height: 20, backgroundColor: 'red' }}>
                  <Text>5</Text>
                </View>
              </MapboxGL.SymbolLayer>
              <MapboxGL.Callout title="Rivadavia 1841, 7º Piso, Of. 749." />
            </MapboxGL.ShapeSource>
          </MapboxGL.MapView>
          {/* <ScrollView
            horizontal={true}
            style={{height: 95, position: 'absolute', bottom: 30}}>
            {[1, 2, 3, 4, 5].map(i => {
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.mapViewCard}
                  onPress={() => this.props.navigation.navigate('PinView')}>
                  <Image
                    style={styles.mapViewCardImg}
                    source={require('./../../Images/login-bg.jpg')}
                  />
                  <View style={styles.mapViewCardContent}>
                    <View style={styles.mapViewTitle}>
                      <Text style={styles.mapViewTitleText}>
                        Planet - Bangkok
                      </Text>
                      <SimpleLineIcons
                        name={'heart'}
                        size={15}
                        color={'#EB5757'}
                      />
                    </View>
                    <View style={styles.mapViewCate}>
                      <IconMoon name="sights" style={styles.mapViewCateIcon} />
                      <Text style={styles.mapViewCateText}> Sights</Text>
                    </View>
                    <Text style={styles.mapViewContentText}>
                      Australian chef-author David Thompson is the man behind
                      one of Bangkok's
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView> */}
          <View style={styles.mapActionButton}>
            <TouchableOpacity
              style={[
                styles.iconButton,
                styles.iconButtonPrimary,
                styles.iconButtonView,
              ]}>
              <Icon name={'map-pin'} size={24} color={'#FFF'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.iconButton,
                styles.iconButtonPrimary,
                styles.iconButtonAdd,
              ]}
              onPress={() => this.props.navigation.navigate('AddMapDetail', { ...params })}
            >
              <Icon name={'plus-circle'} size={24} color={'#FFF'} />
            </TouchableOpacity>
          </View>
          <View style={[styles.mapControlButton]}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.buttonOutline,
                styles.buttonOutlineGray,
                styles.buttonDecline,
              ]}
              onPress={() => { }}>
              <Text style={[styles.buttonText, styles.buttonTextGray]}>
                Reload Map
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonDanger, styles.buttonSave]}
              onPress={() => { }}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
          {/* <Carousel
                        data={this.state.carouselItems}
                        sliderWidth={DEVICE_WIDTH}
                        sliderHeight={95}
                        itemWidth={300}
                        firstItem={0}
                        inactiveSlideOpacity={1}
                        inactiveSlideScale={1}
                        renderItem={this._renderItem}
                        contentContainerStyle={{ position: 'absolute', height: 95, flex: 0.05 }}
                        contentContainerCustomStyle={{ position: 'absolute', bottom: 30, height: 95, }}
                    /> */}
        </View>
      </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(MapView);
