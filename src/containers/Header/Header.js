import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { languages } from '../../utils';


class Header extends Component {
    changeLanguage = (languageInput) => {
        this.props.changeLanguageApp(languageInput);
    }

    render() {
        let { processLogout } = this.props;
        let appLanguage = this.props.lang;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
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

                {/* nút logout */}
                {/* <div className="btn btn-logout" onClick={processLogout} title='Logout'>
                    <i className="fas fa-sign-out-alt"></i>
                </div> */}
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
        changeLanguageApp: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
