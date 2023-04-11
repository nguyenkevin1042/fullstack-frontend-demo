import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import './Login.scss';
// import { FormattedMessage } from 'react-intl';
import { handleLoginAPI } from '../../services/userService';
// import { userLoginSuccess } from '../../store/actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isShowed: false,
            message: ''
        };
    }

    handleOnChangeEmailInput = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    handleOnChangePasswordInput = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    handleLogin = async () => {
        this.setState({
            message: ''
        });

        try {
            let email = this.state.email;
            let password = this.state.password;
            let data = await handleLoginAPI(email, password);
            if (data && data.errCode !== 0) {
                this.setState({
                    message: data.message
                });
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        message: error.response.data.message
                    });
                }
            }
        }

    }

    handleShowHidePassword = () => {
        this.setState({
            isShowed: !this.state.isShowed
        });
    }


    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 login-text'>
                            Login
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Email</label>
                            <input type='text' className='form-control' placeholder='Enter your email' value={this.state.email} onChange={(event) => this.handleOnChangeEmailInput(event)} />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowed ? 'text' : 'password'} className='form-control' placeholder='Enter your password' value={this.state.password} onChange={(event) => this.handleOnChangePasswordInput(event)} />
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.isShowed ? "far fa-eye show-hide-icon" : "far fa-eye-slash show-hide-icon"}></i>
                                </span>

                            </div>
                        </div>
                        <div className='col-12 error-message mt-4'>
                            {this.state.message}
                        </div>
                        <div className='col-12'>
                            <button className='login-btn' onClick={(event) => { this.handleLogin(event) }}>Log in</button>
                        </div>

                        <div className='col-12'>
                            <p className='forgot-password text-center'>Forgot your password?</p>
                        </div>
                        <div className='col-12'>
                            <p className='text-center'>Or sign in with</p>
                        </div>
                        <div className='col-12 social-login text-center'>
                            <i className="fab fa-facebook-f facebook icon"></i>
                            <i className="fab fa-google-plus-g google icon"></i>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
