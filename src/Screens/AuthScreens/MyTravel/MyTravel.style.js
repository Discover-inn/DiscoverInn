import {StyleSheet, Dimensions} from 'react-native';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  pageContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  bgTransfrent: {
    backgroundColor: '#f3f4f6',
  },
  searchbarCard: {
    marginVertical: 0,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    flex: 1,
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
  accordionCard: {
    marginTop: 15,
  },
  accordionCardHeader: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomColor: '#E0E0E0',
    borderRadius: 5,
    zIndex: 1,
  },
  accordionCardHeaderClose: {
    marginBottom: 10,
  },
  accordionCardHeaderOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  mapIcon: {
    color: '#2F80ED',
    fontSize: 14,
    marginRight: 10,
  },
  accordionCardtitle: {
    color: '#333333',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    flex: 1,
  },
  accordionCardHeaderIcon: {
    fontSize: 16,
    color: '#828282',
    alignSelf: 'flex-end',
  },
  accordionCardBody: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    zIndex: 0,
  },
  myTravelCard: {
    borderTopColor: '#E0E0E0',
    borderTopWidth: 1,
    marginHorizontal: 0,
  },
  myTravelItem: {
    paddingTop: 10,
    paddingLeft: 0,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    // paddingRight:10
  },
  myTravelItemSwitch: {
    borderColor: '#DADBDF',
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
  },
  myTravelItemTitle: {
    color: '#333',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  myTravelItemValue: {
    color: '#4F4F4F',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  myTravelAction: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  myTravelActionLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  myTravelActionRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonSm: {
    height: 30,
  },
  buttonPrimary: {
    backgroundColor: '#2F80ED',
    color: '#fff',
  },
  buttonSuccess: {
    backgroundColor: '#6FCF97',
    color: '#fff',
  },
  buttonDanger: {
    backgroundColor: '#EB5757',
    color: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  myTravelItemCover: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    flex: 1,
    position: 'relative',
  },
  dropdownText: {
    color: '#4F4F4F',
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
    margin: 0,
    padding: 0,
  },
  dropdownArrow: {
    fontSize: 14,
    color: '#828282',
    width: 14,
    height: 20,
    margin: 0,
    padding: 0,
    position: 'absolute',
    right: 25,
    top: 0,
  },
  myTravelItemDropdown: {
    fontSize: 12,
    height: 25,
    position: 'relative',
  },
  editImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editImageIcon: {
    color: '#2F80ED',
    fontSize: 14,
  },
  formGroup: {
    marginBottom: 15,
  },
  customPopup: {
    width: DEVICE_WIDTH,
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
    maxHeight: DEVICE_HEIGHT - 190,
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
  coverImageCard: {
    width: DEVICE_WIDTH - 40,
    height: 120,
  },
  coverImageCardBox: {
    height: 120,
    width: DEVICE_WIDTH - 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2F80ED',
    zIndex: 9999,
  },
  addPlusIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 120,
    width: DEVICE_WIDTH - 40,
    backgroundColor: 'rgba(47, 128, 237, 0.1)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  addPlusText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  footerButton: {
    flexDirection: 'row',
    marginTop: 0,
    alignItems: 'flex-end',
    marginBottom: 20,
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
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
  buttonOutline: {
    borderColor: '#BDBDBD',
    backgroundColor: '#fff',
    borderWidth: 1,
    color: '#fff',
  },
  buttonDecline: {
    flex: 1,
    marginRight: 15,
  },
  buttonSave: {
    flex: 1,
    marginLeft: 15,
  },
  buttonTextGray: {
    color: '#333333',
  },
  deleteModalBody: {
    paddingTop: 20,
    paddingHorizontal: 35,
    paddingBottom: 50,
  },
  deleteModalBodyText: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
  },
  changeCoverModalBody: {
    paddingTop: 15,
    paddingBottom: 25,
  },
  defaultImageCheck: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  defaultImageCheckText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#4F4F4F',
  },
  footerButton: {
    flexDirection: 'row',
    marginTop: 0,
    marginHorizontal: 15,
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  buttonNewMap: {
    width: DEVICE_WIDTH - 30,
  },
});

export default styles;
