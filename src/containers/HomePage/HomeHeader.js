import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import logo from '../../assets/logo.svg';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils'
import { changeLanguageApp } from '../../store/actions';
import { withRouter } from 'react-router';

class HomeHeader extends Component {

    changeLanguage = (languageInput) => {
        this.props.changeLanguageApp(languageInput);
    }

    toHomePage = () => {
        this.props.history.push("/home");
    }

    render() {
        let appLanguage = this.props.lang;
        return (
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='left-content'>
                        <i className="fas fa-bars"></i>
                        <img className='header-logo' src={logo} onClick={() => this.toHomePage()} />
                    </div>

                    <div className='center-content'>
                        <div className='child-content'>
                            <div>
                                <b><FormattedMessage id="homeHeader.specialty" /></b>
                            </div>
                            <div className='sub-title'>
                                <FormattedMessage id="homeHeader.searchDoctor" />
                            </div>
                        </div>

                        <div className='child-content'>
                            <div>
                                <b><FormattedMessage id="homeHeader.facility" /></b>
                            </div>
                            <div className='sub-title'>
                                <FormattedMessage id="homeHeader.hospital" />
                            </div>
                        </div>

                        <div className='child-content'>
                            <div>
                                <b><FormattedMessage id="homeHeader.doctor" /></b>
                            </div>
                            <div className='sub-title'><FormattedMessage id="homeHeader.searchDoctor" /></div>
                        </div>

                        <div className='child-content'>
                            <div>
                                <b><FormattedMessage id="homeHeader.fee" /></b>
                            </div>
                            <div className='sub-title'><FormattedMessage id="homeHeader.checkHealth" /></div>
                        </div>
                    </div>

                    <div className='right-content'>
                        <div className='support'>
                            <i className="fas fa-question-circle"></i>
                            <FormattedMessage id="homeHeader.support" />
                        </div>
                        <div className={appLanguage === languages.VI ? 'language-vi active' : 'language-vi'}>
                            <span onClick={() => this.changeLanguage(languages.VI)}>VI</span>
                        </div>
                        <div className={appLanguage === languages.EN ? 'language-en active' : 'language-en'}>
                            <span onClick={() => this.changeLanguage(languages.EN)}>EN</span>
                        </div>
                    </div>
                </div>
            </div >

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
        changeLanguageApp: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
