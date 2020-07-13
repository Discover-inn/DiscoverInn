import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, BackHandler, StyleSheet, Dimensions} from 'react-native';
import InfoScreen from './InfoScreen';
import Carousel from 'react-native-snap-carousel';
import Video from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux';
import debounce from 'lodash.debounce';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  backgroundVideo: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    // flex: 1,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
});

let data = [
  {
    type: 'info',
    title: 'Start exploring',
    info:
      'Navigate through well known travel guide, bloggers suggestions or your friends last trip.',
    cover:
      'https://discover-inn.s3.ca-central-1.amazonaws.com/cover_249_thumb2_image-922.jpg',
  },
  {
    type: 'video',
    uri:
      'https://discover-inn.s3.ca-central-1.amazonaws.com/walkthrough/video_1_320_480.mp4',
  },
  {
    type: 'info',
    title: 'Set your Trip',
    info:
      'Dive into multiple maps and add your favorite suggestions to your Trip List.',
    cover:
      'https://discover-inn.s3.ca-central-1.amazonaws.com/cover_202_thumb5_image-168.jpg',
  },
  {
    type: 'video',
    uri:
      'https://discover-inn.s3.ca-central-1.amazonaws.com/walkthrough/video_2_320_480.mp4',
  },
  {
    type: 'info',
    title: 'Create Souvenirs',
    info:
      'Do your own map based on your experiences and photos. On Website, you can also import from Google MyMaps.',
    cover:
      'https://discover-inn.s3.ca-central-1.amazonaws.com/cover_251_thumb4_image-408.jpg',
  },
  {
    type: 'video',
    uri:
      'https://discover-inn.s3.ca-central-1.amazonaws.com/walkthrough/video_3_320_480.mp4',
  },
  {
    type: 'info',
    title: 'No Internet? No Problem!',
    info:
      'Download maps for Offline use to keep your Travel Guide right in your pocket.',
    cover:
      'https://discover-inn.s3.ca-central-1.amazonaws.com/cover_254_thumb7_image-755.jpg',
  },
  {
    type: 'video',
    uri:
      'https://discover-inn.s3.ca-central-1.amazonaws.com/walkthrough/video_4_320_480.mp4',
  },
];

const WalkThrough = props => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const sliderRef = useRef();

  useEffect(() => {
    dispatch({type: 'introCompleted', value: true});
    let eventHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return props.navigation.navigate('GetStarted');
    });
    return () => eventHandler.remove();
  }, []);

  const onSkip = () => {
    dispatch({type: 'introCompleted', value: true});
    props.navigation.navigate('AuthLoading');
  };

  const onSignIn = () => {
    dispatch({type: 'introCompleted', value: true});
    props.navigation.navigate('AuthLoading', {signInFromIntro: true});
  };

  const onVideoEnd = () => {
    if (sliderRef.current.currentIndex == data.length - 1) {
      props.navigation.navigate('AuthLoading');
    } else {
      sliderRef.current.snapToNext();
    }
  };

  const renderComp = ({item, index}) => {
    return item.type == 'video' ? (
      <VideoComponent
        uri={item.uri}
        paused={index != currentIndex}
        currentIndex={currentIndex}
        onVideoEnd={onVideoEnd}
      />
    ) : (
      <InfoScreen values={{...item}} onSkip={onSkip} onSignIn={onSignIn} />
    );
  };

  return (
    <View style={{backgroundColor:'white',flexGrow:1}}>
      <Carousel
        ref={sliderRef}
        data={data}
        sliderWidth={DEVICE_WIDTH}
        itemWidth={DEVICE_WIDTH}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        renderItem={renderComp}
        onSnapToItem={setCurrentIndex}
        removeClippedSubviews={true}
      />
    </View>
  );
};

const VideoComponent = React.memo(({uri, paused, onVideoEnd,currentIndex}) => {

  const videoRef = useRef(null);
  useEffect(()=>{
    videoRef && videoRef.current.seek(0);
  },[currentIndex])

  const f = useCallback(
    debounce(({currentTime, playableDuration}) => {
      console.log({currentTime, playableDuration});
      if (Math.ceil(currentTime) == Math.ceil(playableDuration)) {
        onVideoEnd();
      }
    }, 1000),
    [],
  );

  return (
    <View style={styles.slide2}>
      <Video
        source={{uri}}
        volume={1.0}
        key={uri}
        paused={paused}
        style={styles.backgroundVideo}
        ref={videoRef}
        controls
        onProgress={f}
      />
    </View>
  );
});
export default React.memo(WalkThrough);
