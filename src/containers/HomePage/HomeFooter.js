import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";

class HomeFooter extends Component {

    render() {
        return (
            <div className='home-footer'>
                <p>&copy; FullStack with ReactJS and NodeJS.
                    Click
                    <a href="https://github.com/nguyenkevin1042?tab=repositories" target='blank'> here </a>to redirect to my Github page</p>
            </div>
        );

    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
