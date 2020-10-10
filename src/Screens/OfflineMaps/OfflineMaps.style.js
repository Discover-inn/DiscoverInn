import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingRight: 0,
    marginRight: 0,
    backgroundColor: '#F3F4F6',
  },
  bgHeader: {
    backgroundColor: '#F3F4F6',
  },
  pageContent: {
    paddingVertical: 5,
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
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 10,
    elevation: 5,
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
    height: 40,
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
  mapSlideCard: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginRight: 15,
    width: 295,
    marginBottom: 10,
    height: 500,
  },
  mapSlideCardImg: {
    width: 300,
    height: 180,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  mapSlideCardImg_overlay: {
    width: 300,
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
    position: 'relative',
  },
  mapSlideCardBody: {
    backgroundColor: '#fff',
    padding: 15,
    paddingBottom: 30,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 0,
    marginRight: 0,
    width: 300,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 10,
    minHeight: 300,
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
  },
  mapSlideCardAuthor: {
    fontSize: 14,
    color: '#aaa',
    fontFamily: 'Montserrat-Medium',
    marginBottom: 5,
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
  mapPins: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
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
  buttonContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
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
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  buttonPrimary: {
    backgroundColor: '#2F80ED',
  },
  deleteButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor:'#dc3545'
  },  
  shareMapContant: {
    paddingTop: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  mapShareDescText: {
    color: '#BDBDBD',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  shareButton: {
    position: 'absolute',
    right: 15,
    top: 0,
    backgroundColor: 'transparent',
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default styles;
