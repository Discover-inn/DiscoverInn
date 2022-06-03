import React, { Fragment } from 'react';
import {
  View,
  Text,
  Platform,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import styles from './HomeScreen.style';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './../../components/header/header';
import GoogleAutoComplete from './../../components/GoogleAutoComplete';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import fontelloConfig from './../../selection.json';
const IconMoon = createIconSetFromIcoMoon(fontelloConfig);
import ImageBlurLoading from './../../components/ImageLoader';
import { askForPermissions } from '../../config/permission';
import RNLocation from 'react-native-location';
import MapboxGL from '@react-native-mapbox-gl/maps';
MapboxGL.setAccessToken(
  'sk.eyJ1IjoicmF2aXNvaml0cmF3b3JrIiwiYSI6ImNrYTByeHVxZjBqbGszZXBtZjF3NmJleWgifQ.idSimILJ3_sk1gSWs2sMsQ',
);
import Tabs from '../../components/TopTabBars'
const { width } = Dimensions.get('window');

function Test2() {
  return (
    <View style={{ flex: 1, }} />
  )
}

// const TopTab = createMaterialTopTabNavigator({
//   Test1: { screen: Test1 },
//   Test2: { screen: Test2 },
// },
// {
//   initialRouteName: 'Test1',
//   activeTintColor: '#F44336',
// },)
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from './../../actions/authActions';
import * as mapActions from './../../actions/mapActions';
import { NavigationEvents } from 'react-navigation';
import MostPopular from './MostPopular';
import TopRated from './TopRated';
import colors from '../../config/colors';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSorting: false,
      userData: { userName: 'test' },
      carouselCateItems: [
        {
          title: 'Sights',
          icon: 'sights',
        },
        {
          title: 'Activities',
          icon: 'activities',
        },
        {
          title: 'Restaurants',
          icon: 'restaurants',
        },
        {
          title: 'Nightlife',
          icon: 'nightlife',
        },
        {
          title: 'Transportations',
          icon: 'transportations',
        },
        {
          title: 'Shopping',
          icon: 'shopping',
        },
        {
          title: 'Other',
          icon: 'other',
        },
      ],
      searchTerm: '',
      query: '',
    };
    this._renderItemTop = this._renderItemTop.bind(this);
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem({ item, index }) {
    let avgReview = parseInt(item.avrage_review);
    let coverImage = item.cover_image
      ? { uri: item.cover_image }
      : require('./../../Images/login-bg.jpg');
    return (
      <TouchableOpacity
        style={styles.mapSlidCard}
        onPress={() =>
          this.props.navigation.navigate('MapView', {
            mapID: item.id,
            mapName: item.name,
            mapData: item
          })
        }
        activeOpacity={1}>
        <View style={styles.mapSlidCardInner}>
          <ImageBlurLoading
            withIndicator
            style={styles.mapSlideCardImg}
            source={coverImage}
            thumbnailSource={{
              uri: 'https://discover-inn.com/upload/cover/map-image.jpeg',
            }}
          />
          <View style={styles.mapSlideCardImg_overlay} />
          <View style={styles.mapSlideCardContent}>
            <View style={[styles.badgeRed, styles.badge]}>
              <Text style={[styles.badgeText]}>
                {item.views} <Feather name="eye" />
              </Text>
            </View>
            <Text style={styles.mapSlideCardTitle}>{item.name}</Text>
            <View style={styles.rateList}>
              {Array(avgReview)
                .fill(1)
                .map((d, i) => {
                  return (
                    <MaterialCommunityIcons
                      style={styles.starIcon}
                      name="star"
                      size={15}
                      color="#FFAF2C"
                      key={item.id + '_' + i}
                    />
                  );
                })}
              {Array(5 - avgReview)
                .fill(1)
                .map((d, i) => {
                  return (
                    <MaterialCommunityIcons
                      style={styles.starIcon}
                      name="star-outline"
                      size={15}
                      color="#FFAF2C"
                      key={'outline' + item.id + '_' + i}
                    />
                  );
                })}
              <Text style={styles.rateListCount}>
                ({item.total_review} Reviews)
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _renderItemTop({ item, index }) {
    let avgReview = parseInt(item.avrage_review) || 0;
    let coverImage = item.cover_image
      ? { uri: item.cover_image }
      : require('./../../Images/login-bg.jpg');
    return (
      <TouchableOpacity
        style={styles.mapSlidCard}
        activeOpacity={1}
        onPress={() =>
          this.props.navigation.navigate('MapView', {
            mapID: item.id,
            mapName: item.name,
            mapData: item
          })
        }>
        <View style={styles.mapSlidCardInner}>
          <ImageBlurLoading
            withIndicator
            style={styles.mapSlideCardImg}
            source={coverImage}
            thumbnailSource={{
              uri: 'https://discover-inn.com/upload/cover/map-image.jpeg',
            }}
          />
          <View style={styles.mapSlideCardImg_overlay} />
          <View style={styles.mapSlideCardContent}>
            <View style={[styles.badgeGreen, styles.badge]}>
              <Text style={[styles.badgeText]}>
                {item.views} <Feather name="eye" />
              </Text>
            </View>
            <Text style={styles.mapSlideCardTitle}>{item.name}</Text>
            <View style={styles.rateList}>
              {Array(avgReview)
                .fill(1)
                .map((d, i) => {
                  return (
                    <MaterialCommunityIcons
                      style={styles.starIcon}
                      name="star"
                      size={15}
                      color="#FFAF2C"
                      key={item.id + '_' + i}
                    />
                  );
                })}
              {Array(5 - avgReview)
                .fill(1)
                .map((d, i) => {
                  return (
                    <MaterialCommunityIcons
                      style={styles.starIcon}
                      name="star-outline"
                      size={15}
                      color="#FFAF2C"
                      key={'outline' + item.id + '_' + i}
                    />
                  );
                })}
              <Text style={styles.rateListCount}>
                ({item.total_review} Reviews)
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  async componentDidMount() {
    let packs = await MapboxGL.offlineManager.getPacks();
    if (packs && packs.length > 0) {
      packs.map(async pack => {
        let status = await pack.status();
        if (status.state == 2) {
          pack.resume();
        }
      });
    }
    if (Platform.OS == 'android') {
      await askForPermissions();
    }
    RNLocation.configure({
      distanceFilter: 5.0,
    });
    await RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
      },
    });

    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.props.navigation.isFocused()) {
        Alert.alert(
          'Exit App',
          'Do you want to exit?',
          [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'Yes', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false },
        );
        return true;
      }
      return false;
      // else {
      //   console.log(this.props.navigation)
      //   this.props.navigation.navigate('Home')
      //   return true;
      // }
    });

  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => { });
  }

  _renderItemCate = ({ item, index }) => {
    let category = this.state.carouselCateItems.find(c => c.title == item.name);
    let iconName = category.icon || 'other';
    return (
      <TouchableOpacity
        style={styles.mapSlidCard}
        onPress={() => this.fetchCategoryMaps(item.id)}
        activeOpacity={0.8}>
        <View>
          <View style={styles.cateSlideCard}>
            <View style={styles.cateSlideCardContent}>
              <IconMoon name={iconName} style={styles.cateSlideCardIcon} />
              <Text style={styles.cateSlideCardTitle}>{item.name}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  fetchCategoryMaps(categoryID) {
    let userID = this.props.userData && this.props.userData.id;
    let searchObj = {
      categorie: [categoryID],
      page: 1,
      sort_by: 'rating',
      // user_id: userID,
    };
    this.props.navigation.navigate('MapList', {
      category: [categoryID],
      searchObj,
    });
  }

  fetchSearchedMaps(searchTerm, userId) {
    let searchObj = {
      page: 1,
      sort_by: 'popularity',
      searchUserId: userId,
      search: searchTerm,
    };

    this.props.navigation.navigate('MapList', { searchTerm, searchObj });
  }

  render() {

    const { query } = this.state;
    return (
      <Fragment>
        <Header
          // showMenu={true}
          title={'Discover-Inn'}
          {...this.props}
          style={{ backgroundColor: '#F3F4F6' }}
          rightEmpty={true}
          showRightButton={false}
        />
        <NavigationEvents onWillFocus={() => this.setState({ searchTerm: '' })} />
        <GoogleAutoComplete
          autoCapitalize="none"
          autoCorrect={false}
          defaultValue={query}
          onChangeText={text => {
            this.setState({ searchTerm: text });
          }}
          placeholder="Next Travel Destination"
          fetchSearchedMaps={(searchTerm, userId) => this.fetchSearchedMaps(searchTerm, userId)}
          onValueChange={(searchTerm, userId) => {
            this.setState({ searchTerm, userId }, () => {
              this.fetchSearchedMaps(searchTerm, userId);
            });
          }}
        // showSorting={() => 
        //   this.setState({ showSorting: !this.state.showSorting });
        // }}
        />
        <View style={{
          width: '100%',
          height: 1,
          marginVertical: 8,
          backgroundColor: colors.gray
        }} />
        <Tabs
          screen={[
            {
              title: "Most Popular",
              component: MostPopular,
              props: this.props
            },
            {
              title: "Top Rated",
              component: TopRated,
              props: this.props
            },
            {
              title: "Nearby",
              component: Test2,
              props: this.props
            },
          ]}
          activeBorderColor={colors.gray}
          selectedFontColor={"black"}
        />
        {/* <ScrollView
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
          nestedScrollEnabled={true}>
          <View style={styles.container}>
            <View style={styles.homeHeadingCard}>
              <Text style={styles.homeHeadingText}>
                The 1-stop Travel Planner that suits your needs!
              </Text>
            </View>
            {this.state.showSorting && (
              <View style={styles.categoryDropdown}>
                <TouchableOpacity style={[styles.button, styles.buttonPrimary]}>
                  <Text style={styles.buttonText}>Discover</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.buttonOutlinePrimary,
                    styles.buttonDisabled,
                  ]}
                  onPress={() => this.setState({ saveToListModal: false })}>
                  <Text
                    style={
                      ([styles.buttonText],
                      {
                        color: '#2F80ED',
                      })
                    }>
                    Inn
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.cateCard}>
              <Text style={styles.sectionTitle}>Categories</Text>
            </View>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{ paddingRight: 15 }}>
              {this.props.categories &&
                this.props.categories.map(item => {
                  let category = this.state.carouselCateItems.find(
                    c => c.title == item.name,
                  );
                  let iconName = category.icon || 'other';
                  return (
                    <TouchableOpacity
                      style={styles.mapSlidCard}
                      key={item.id}
                      onPress={() => this.fetchCategoryMaps(item.id)}
                      activeOpacity={0.8}>
                      <View style={styles.cateSlideCard}>
                        <View style={styles.cateSlideCardContent}>
                          <IconMoon
                            name={iconName}
                            style={styles.cateSlideCardIcon}
                          />
                          <Text style={styles.cateSlideCardTitle}>
                            {item.name}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </View>
        </ScrollView> */}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.user.userData,
    popularMaps: state.maps.popularMaps,
    topRatedMaps: state.maps.topRatedMaps,
    categories: state.maps.categories,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    authAction: bindActionCreators(authActions, dispatch),
    mapAction: bindActionCreators(mapActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
