import React, { Component } from "react";
import { View } from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from './../actions/authActions';
import * as mapActions from './../actions/mapActions';

class DefaultScreen extends Component {

    resetAction(routeName) {
        this.props.navigation.navigate(routeName);
    }

    redirectToApp(props) {
        if (props && props.userData && props.userData.userId) {
            this.resetAction("App");
        }
        else {
            this.resetAction("Auth");
        }
    }

    logout() {
        this.props.userAction.logout();
    }

    componentDidMount() {
        this.fetchInitialData()
        this.redirectToApp(this.props);
    }

    fetchInitialData(){
        this.props.mapAction.loadPopularAndRated();
        this.props.mapAction.loadCategories();
        this.props.mapAction.fetchTripList();
    }

    componentWillReceiveProps(nextProps) {
        this.redirectToApp(nextProps)
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }} />
        );
    }
}

function mapStateToProps(state) {
    return {
        userData: state.user && state.user.userData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userAction: bindActionCreators(userActions, dispatch),
        mapAction: bindActionCreators(mapActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultScreen);
