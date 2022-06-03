import React, { Fragment } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from './Unauthscreens.style';
const DEVICE_HEIGHT = Dimensions.get('window').height;
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from './../../actions/authActions';
import * as mapActions from './../../actions/mapActions';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', //'ketanlathiya@gmail.com',
      password: '', //'admin@1234',
      loggingIn: false,
    };
    this.checkLogin(props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.checkLogin(nextProps);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.props.navigation.isFocused()) {
        this.props.navigation.navigate('Home');
        return true;
      }
      return false;
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => { });
  }

  checkLogin(props) {
    if (props.userData && props.userData.id) {
      this.props.navigation.navigate('Home');
    }
  }

  login() {
    // this.props.navigation.navigate('Home');
    // return
    this.setState({ loggingIn: true });
    let { email, password } = this.state;
    if (!email) {
      return alert('Please enter email');
    }
    if (!password) {
      return alert('Please enter password');
    }
    this.props.authAction
      .userLogin(email, password)
      .then(d => {
        this.props.mapAction.fetchTripList();
        if (this.props && this.props.userData && this.props.userData.id) {
          this.props.mapAction.fetchMyReviews({
            user_id: this.props.userData.id,
            page: 1,
          });
          this.props.mapAction.fetchVisitorReviews({
            user_id: this.props.userData.id,
            page: 1,
          });
        }
      })
      .catch(e => {
        alert(e);
        this.setState({ loggingIn: false });
      });
  }

  render() {
    return (
      <Fragment>
        <ImageBackground
          source={require('../../Images/login-bg.jpg')}
          style={{
            width: '100%',
            height: '100%',
          }}>
          <Image
            style={styles.blackOverlay}
            source={require('./../../Images/login-overlay.png')}
            resizeMode="stretch"
          />
          <SafeAreaView style={styles.container}>
            <ScrollView
              style={[styles.container, styles.unauthContent]}
              keyboardShouldPersistTaps={'always'}
              contentContainerStyle={{ height: DEVICE_HEIGHT - 80 }}>
              <View style={styles.unauthContent}>
                <Text style={styles.logoText}>Discover - Inn</Text>
                <View style={styles.unauthForm}>
                  <Text style={styles.formTitle}>Log In</Text>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Email</Text>
                    <TextInput
                      style={styles.formControl}
                      onChangeText={email => {
                        this.setState({ email: email.trim() });
                      }}
                      value={this.state.email}
                      autoCapitalize={'none'}
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>
                      Password
                      <Text
                        style={styles.restoreLink}
                        onPress={() =>
                          this.props.navigation.navigate('ForgotPassScreen')
                        }>
                        {' '}
                        Forgot?
                      </Text>
                    </Text>
                    <TextInput
                      secureTextEntry={true}
                      style={styles.formControl}
                      onChangeText={password => {
                        this.setState({ password: password.trim() });
                      }}
                      value={this.state.password}
                      autoCapitalize={'none'}
                    />
                  </View>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonPrimary]}
                    onPress={() => {
                      this.login();
                    }}>
                    {this.state.loggingIn ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>Log In</Text>
                    )}
                  </TouchableOpacity>
                </View>
                <Text style={[styles.toggleText, { marginBottom: 5 }]}>
                  New User?
                  <Text
                    style={styles.toggleTextLink}
                    onPress={() =>
                      this.props.navigation.navigate('SignupScreen')
                    }>
                    {' '}
                    Sign Up
                  </Text>
                </Text>
              </View>
              <Text
                style={{
                  color: 'white',
                  alignSelf: 'center',
                  textDecorationLine: 'underline',
                  fontFamily: 'Montserrat-SemiBold',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
                onPress={() => this.props.navigation.navigate('App')}>
                Skip
              </Text>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.user.userData,
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
)(LoginScreen);
