import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { FormattedMessage } from 'react-intl';
import { languages, userRole } from '../../utils'
import _ from 'lodash';
// import { changeLanguageApp } from '../../store/actions';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        };
    }

    changeLanguage = (languageInput) => {
        this.props.changeLanguageApp(languageInput);
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {

            let role = userInfo.roleId;

            if (role === userRole.ADMIN) {
                menu = adminMenu;
            }
            if (role === userRole.DOCTOR) {
                menu = doctorMenu;
            }
        }

        this.setState({
            menuApp: menu
        })
        // console.log("menuApp: ", this.state.menuApp)
    }

    render() {
        let { processLogout } = this.props;
        let appLanguage = this.props.lang;
        let user = this.props.userInfo;
        // console.log(this.props.userInfo);
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                {/* Welcome text */}
                <div className="welcome">
                    <FormattedMessage id="homeHeader.welcome" />,
                    {user && user.firstName ? user.firstName : ''} {user && user.lastName ? user.lastName : ''}
                </div>

                {/* doi ngon ngu + nút logout*/}
                <div className="languages-logout">
                    <span className={appLanguage === languages.VI ? 'language-vi active' : 'language-vi'}
                        onClick={() => this.changeLanguage(languages.VI)}>VI</span>
                    <span className={appLanguage === languages.EN ? 'language-en active' : 'language-en'}
                        onClick={() => this.changeLanguage(languages.EN)}>EN</span>
                    <div className="btn btn-logout" onClick={processLogout} title='Logout'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageApp: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
