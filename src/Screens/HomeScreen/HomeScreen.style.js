import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homePage: {
    marginBottom: 25,
  },
  scrollView: {
    paddingRight: 0,
    marginRight: 0,
    backgroundColor: '#F3F4F6',
  },
  homeHeadingCard: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingLeft: 15,
    paddingRight: 15,
  },
  homeHeadingText: {
    fontSize: 24,
    lineHeight: 29,
    color: '#333333',
    fontFamily: 'Montserrat-SemiBold',
  },
  searchbarInput: {
    padding: 0,
    backgroundColor: '#fff',
    marginLeft: 15,
  },
  containerStyle: {
    backgroundColor: '#000',
  },
  cateCard: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 8,
  },
  seeAll: {
    fontSize: 12,
    color: '#2F80ED',
    fontFamily: 'Montserrat-Medium',
    lineHeight: 15,
  },
  cateSlideCard: {
    width: 80,
    height: 80,
    marginBottom: 10,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: 'rgba(6, 18, 42, 0.08);',
    shadowOpacity: 1.0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 5,
  },
  cateSlideCardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cateSlideCardIcon: {
    margin: 'auto',
    fontSize: 26,
    alignSelf: 'center',
    color: '#2F80ED',
  },
  cateSlideCardTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
    lineHeight: 12,
    marginTop: 10,
    color: '#333333',
    textAlign: 'center',
  },
  carouselMapViewRated: {
    paddingBottom: 50,
  },
  carouselItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapSlidCard: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  mapSlideCardImg: {
    width: width - 10,
    height: 280,
    borderRadius: 10,
  },
  mapSlideCardImg_overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width - 10,
    height: 280,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  mapSlideCardContent: {
    position: 'absolute',
    left: 12,
    bottom: 25,
  },
  badge: {
    paddingTop: 5,
    paddingStart: 7,
    paddingEnd: 7,
    paddingBottom: 5,
    marginBottom: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  badgeRed: {
    backgroundColor: '#EB5757',
  },
  badgeGreen: {
    backgroundColor: '#27AE60',
  },
  badgeText: {
    fontSize: 12,
    color: '#fff',
    borderRadius: 5,
    fontFamily: 'Montserrat-Medium',
    alignItems: 'center',
  },
  mapSlideCardTitle: {
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 10,
  },
  rateList: {
    flexDirection: 'row',
  },
  starIcon: {
    paddingRight: 3,
  },
  rateListCount: {
    color: '#BDBDBD',
    fontSize: 12,
    lineHeight: 15,
    marginLeft: 10,
  },
  searchbarCard: {
    marginHorizontal: 15,
    marginVertical: 0,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  searchbarInputBox: {
    flex: 1,
    borderBottomWidth: 0,
  },
  searchbarIcon: {
    fontSize: 16,
    borderBottomWidth: 0,
    paddingLeft: 15,
    paddingRight: 10,
  },
  searchbarInput: {
    backgroundColor: 'transparent',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    padding: 0,
    height: 56,
  },
  searchbarFilter: {
    fontSize: 16,
    borderBottomWidth: 0,
    paddingRight: 5,
    color: '#828282',
  },
  searchbarCardButton: {
    margin: 5,
    padding: 10,
    width: 32,
    height: 32,
    backgroundColor: 'rgba(47, 128, 237, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchbarCardButtonIcon: {
    fontSize: 18,
    width: 18,
    height: 18,
    color: 'rgba(47, 128, 237, 1)',
  },
  categoryDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    height: 30,
    alignSelf: 'center',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    marginHorizontal: 5,
  },
  buttonPrimary: {
    backgroundColor: '#2F80ED',
    borderColor: '#2F80ED',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  buttonOutlinePrimary: {
    backgroundColor: 'rgba(47, 128, 237, 0.2)',
    borderColor: '#2F80ED',
  },
  buttonDisabled: {
    opacity: 0.2,
  },
  header: {
    height: '22%',
    backgroundColor: '#F3F4F6'
  },
  mapTitle: {
    color: '#000',
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    lineHeight: 22,
    alignSelf: 'flex-start',
    marginLeft: 5
  },
  authorTitle: {
    color: 'gray',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    lineHeight: 22,
    alignSelf: 'flex-start',
    marginLeft: 5,
  },
});

export default styles;
