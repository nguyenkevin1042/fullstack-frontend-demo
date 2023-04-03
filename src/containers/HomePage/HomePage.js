import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
// import { adminMenu } from './menuApp';
// import './HomePage.scss';
import HomeHeader from './HomeHeader';
import Banner from './Banner'

class HomePage extends Component {

    render() {
        return (
            <div>
                <HomeHeader />
                <Banner />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
