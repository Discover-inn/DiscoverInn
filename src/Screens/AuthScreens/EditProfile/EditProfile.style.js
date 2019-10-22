import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editProfileContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  formGroup: {
    marginBottom: 15,
  },
  formLabel: {
    color: '#4F4F4F',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 5,
    paddingLeft: 10,
  },
  formControl: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 5,
    height: 48,
    paddingLeft: 25,
    paddingRight: 25,
    fontFamily: 'Montserrat-Regular',
    color: '#4F4F4F',
    fontSize: 14,
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#2F80ED',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  textStyle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
  },
});

export default styles;
