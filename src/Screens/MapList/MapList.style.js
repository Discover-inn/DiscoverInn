import {StyleSheet, Dimensions,Platform} from 'react-native';
const {width} = Dimensions.get('window');
const height = Dimensions.get('window').height;

const border = {
  borderColor: '#b9b9b9',
  borderRadius: 1,
  borderWidth: 1,
};

const androidStyles = {
  container: {
    flex: 1,
    // marginTop: 25
  },
  inputContainer: {
    marginBottom: 0,
  },
  list: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    marginTop: 0,
    ...border,
    // maxHeight: 180,
    padding: 10,
    zIndex: 999,
  },
};

const iosStyles = {
  container: {
    zIndex: 1,
    // marginTop: 25
  },
  list: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    // left: 0,
    // position: 'absolute',
    // right: 0,
    ...border,
    maxHeight: 180,
  },
};

const styles = StyleSheet.create({
  ...Platform.select({
    android: {...androidStyles},
    ios: {...iosStyles},
  }),
  container: {
    paddingVertical: 5,
  },
  scrollView: {
    paddingRight: 0,
    marginRight: 0,
    paddingVertical: 5,
    backgroundColor: '#F3F4F6',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  searchbarCard: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 10,
    marginRight: 5,
    flex: 1,
    width: width - 90,
  },
  searchbarInputBox: {
    flex: 1,
    borderBottomWidth: 0,
  },
  searchbarIcon: {
    fontSize: 16,
    borderBottomWidth: 0,
    paddingTop: 3,
    paddingLeft: 10,
    paddingRight: 5,
  },
  searchbarInput: {
    backgroundColor: 'transparent',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    padding: 0,
    height: 40,
  },
  searchbarFilter: {
    fontSize: 16,
    borderBottomWidth: 0,
    color: '#828282',
  },
  searchbarCardButton: {
    marginVertical: 4,
    marginHorizontal: 5,
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
  searchSectionAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonIcon: {
    margin: 5,
    padding: 5,
    borderRadius: 5,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIconPrimary: {
    backgroundColor: 'rgba(47, 128, 237, 0.2)',
  },
  buttonIconText: {
    fontSize: 14,
    color: 'rgba(47, 128, 237, 1)',
  },
  iconButton: {
    width: 40,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginLeft: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 10,
  },
  iconButtonIcon: {
    fontSize: 18,
    color: '#828282',
  },
  searchresultCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 20,
  },
  searchresultText: {
    fontSize: 14,
    color: '#828282',
    fontFamily: 'Montserrat-Medium',
  },
  searchresultSelect: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchresultSelectText: {
    fontSize: 14,
    color: '#333333',
    fontFamily: 'Montserrat-Medium',
  },
  searchresultSelectIcon: {
    fontSize: 20,
    color: '#828282',
    marginLeft: 5,
  },
  mapSlideCard: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginRight: 15,
    width: 295,
    marginBottom: 30,
    // height: height - 190,
  },
  mapSlideCardImg: {
    width: '100%',
    height: 180,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  mapSlideCardImg_overlay: {
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    flex: 1,
    height: 180,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  mapSlideCardHeader: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  mapSlideCardBody: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
  },
  mapSlideBadgeGroup: {
    flexDirection: 'row',
  },
  badge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginBottom: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginRight: 5,
    marginBottom: 5,
  },
  badgeRed: {
    backgroundColor: 'rgba(235, 87, 87, 0.2)',
  },
  badgeRedText: {
    color: '#EB5757',
  },
  badgeGreen: {
    backgroundColor: 'rgba(39, 174, 96, 0.2)',
  },
  badgeGreenText: {
    color: '#27AE60',
  },
  badgeText: {
    fontSize: 10,
    color: '#fff',
    borderRadius: 5,
    fontFamily: 'Montserrat-Medium',
    alignItems: 'center',
  },
  badgeIcon: {
    fontSize: 10,
  },
  mapSlideCardTitle: {
    fontSize: 18,
    color: '#333333',
    fontFamily: 'Montserrat-Medium',
    marginBottom: 5,
    fontWeight: '600',
  },
  mapSlideCardAuthor: {
    fontSize: 12,
    color: '#aaa',
    fontFamily: 'Montserrat-Medium',
    marginBottom: 5,
  },
  mapPins: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  singlePin: {
    color: 'white',
    fontSize: 14,

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 8,
  },
  selectedCat: {
    borderWidth: 2,
    borderColor: '#2F80ED',
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 34,
    height: 34,
    borderRadius: 7,
  },
  unSelectedCat: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  rateList: {
    flexDirection: 'row',
    marginBottom: 20,
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
  shareMapContant: {
    paddingTop: 10,
  },
  mapShareDescText: {
    color: '#BDBDBD',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  shareButton: {
    position: 'absolute',
    left: 15,
    top: 15,
    zIndex: 99999,
  },
  mapButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    backgroundColor: 'transparent',
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapDetaileGrid: {
    marginTop: 10,
  },
  mapDetaileItem: {
    flexDirection: 'row',
  },
  mapDetaileItemTop: {
    borderBottomColor: 'rgba(224, 224, 224, 0.4)',
    borderBottomWidth: 0.5,
  },
  mapDetaileItemBottom: {
    borderTopColor: 'rgba(224, 224, 224, 0.4)',
    borderTopWidth: 0.5,
  },
  mapDetaileChild: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  mapDetaileChildLeft: {
    borderRightColor: 'rgba(224, 224, 224, 0.4)',
    borderRightWidth: 0.5,
  },
  mapDetaileChildRight: {
    borderLeftColor: 'rgba(224, 224, 224, 0.4)',
    borderLeftWidth: 0.5,
  },
  mapDetaileTitle: {
    fontSize: 14,
    color: '#BDBDBD',
    marginBottom: 5,
    fontFamily: 'Montserrat-Medium',
  },
  mapDetaileValue: {
    fontSize: 14,
    color: '#4F4F4F',
    fontFamily: 'Montserrat-SemiBold',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#2F80ED',
  },
  buttonReview: {
    // marginTop: 15,
  },
  buttonContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },

  customPopup: {
    width: width,
    padding: 0,
    position: 'absolute',
    bottom: 0,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: -2},
    shadowRadius: 10,
    maxHeight: height - 190,
  },
  customPopupContent: {
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  customPopupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  customPopupHeaderTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#333333',
  },
  buttonClose: {
    width: 24,
    height: 24,
  },
  buttonCloseIcon: {
    color: '#BDBDBD',
    fontSize: 24,
  },
  formGroup: {
    marginBottom: 15,
  },
  formLabel: {
    color: '#4F4F4F',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 5,
    paddingLeft: 7,
  },
  formControl: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 5,
    height: 48,
    paddingLeft: 25,
    paddingRight: 25,
    fontFamily: 'Montserrat-Medium',
    color: '#4F4F4F',
    fontSize: 14,
  },
  formControlTextarea: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    height: 90,
  },
  customPopupFooter: {
    marginTop: 20,
    marginBottom: 10,
  },
  shareSocial: {
    flexDirection: 'row',
    marginHorizontal: -7.5,
  },
  buttonFacebook: {
    backgroundColor: '#4A6D9D',
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 7.5,
  },
  buttonTwitter: {
    backgroundColor: '#3BC1ED',
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 7.5,
  },
  orDivider: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  orDividerText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#333333',
    paddingHorizontal: 10,
    zIndex: 7,
    backgroundColor: '#ffffff',
  },
  orDividerBorder: {
    position: 'absolute',
    width: '100%',
    height: 1,
    zIndex: 6,
    backgroundColor: '#C4C4C4',
  },
  autocompleteContainer: {
    flex: 1,
    // left: 0,
    // position: 'absolute',
    // right: 0,
    // top: 0,
    zIndex: 1,
  },
  mapDetailesImg: {
    borderRadius: 5,
    height: 180,
  },
  mdPopupImages: {
    height: 180,
    borderRadius: 5,
    width: '100%',
  },
  mdPopupTitle: {
    color: '#333333',
    fontSize: 18,
    marginTop: 15,
    marginBottom: 5,
    fontFamily: 'Montserrat-SemiBold',
  },
  mdPopupAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mdPopupAuthorLabel: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#4F4F4F',
  },
  mdPopupAuthorName: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#BDBDBD',
    paddingLeft: 2,
  },
  mdPopupDis: {
    fontSize: 12,
    color: '#BDBDBD',
    fontFamily: 'Montserrat-Regular',
    marginTop: 15,
  },
  reviewCard: {
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 10,
    padding: 10,
  },
  reviewCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  reviewCardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewCardHeading: {
    marginLeft: 10,
  },
  reviewCardAvatar: {
    width: 44,
    height: 44,
    borderWidth: 4,
    borderColor: '#F3F4F6',
    borderRadius: 44,
  },
  reviewCardTitle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#333333',
    marginBottom: 5,
  },
  reviewCardRateList: {
    flexDirection: 'row',
  },
  reviewTime: {
    color: '#BDBDBD',
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
  },
  reviewCardBody: {
    backgroundColor: 'rgba(242, 242, 242, 0.5)',
    borderRadius: 5,
    padding: 10,
  },
  reviewCardText: {
    fontFamily: 'Montserrat-Medium',
    color: '#828282',
    fontSize: 10,
    zIndex: 7,
  },
  reviewExclamationmark: {
    position: 'absolute',
    zIndex: 5,
    width: 56,
    top: -20,
  },
  createListButton: {
    marginTop: 10,
  },
  selectListItem: {
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    flexDirection: 'row',
  },
  selectListText: {
    fontSize: 14,
    color: '#BDBDBD',
    fontFamily: 'Montserrat-Medium',
    paddingLeft: 10,
  },
  reviewReport: {
    color: '#EB5757',
    alignSelf: 'flex-end',
    marginTop: 10,
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },
  buttonCTGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonCT: {
    flex: 1,
  },
  buttonCTCancel: {
    marginRight: 10,
  },
  buttonCTSubmit: {
    marginLeft: 10,
  },
  buttonOutline: {
    borderColor: '#BDBDBD',
    borderWidth: 1,
    color: '#fff',
  },
  buttonTextDark: {
    color: '#333333',
  },
});

export default styles;
