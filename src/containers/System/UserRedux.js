import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages } from '../../utils'

import { getAllCodesAPI } from '../../services/userService';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: []
        }
    }

    async componentDidMount() {
        try {
            let res = await getAllCodesAPI('gender');
            if (res && res.errCode === 0) {
                this.setState({
                    genderArr: res.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }


    render() {
        let genders = this.state.genderArr;
        let language = this.props.lang;
        return (
            <div className="user-redux-container" >
                <div className="text-center user-redux-title" >UserRedux</div>
                <div className="user-redux-body" >
                    <div className="container">
                        <div className="row">

                            <div class="col-12 mb-3 mt-3">
                                <h2><FormattedMessage id="manage-user-redux.add" /></h2>
                            </div>

                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <label for="inputEmail4">
                                    <FormattedMessage id="manage-user-redux.email" />
                                </label>
                                <input type="email" name="email"
                                    class="form-control" placeholder="Email" />
                            </div>
                            <div class="col-md-6">
                                <label for="inputPassword4">
                                    <FormattedMessage id="manage-user-redux.password" />
                                </label>
                                <input type="password" name="password"
                                    class="form-control" placeholder="Password" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <label for="inputEmail4">
                                    <FormattedMessage id="manage-user-redux.first-name" />
                                </label>
                                <input type="text" name="firstName"
                                    class="form-control" placeholder="First Name" />
                            </div>
                            <div class="col-md-6">
                                <label for="inputPassword4">
                                    <FormattedMessage id="manage-user-redux.last-name" />
                                </label>
                                <input type="text" name="lastName"
                                    class="form-control" placeholder="Last Name" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <label for="inputAddress">
                                    <FormattedMessage id="manage-user-redux.address" />
                                </label>
                                <input type="text" name="address"
                                    class="form-control" placeholder="1234 Main St" />
                            </div>

                        </div>

                        <div class="row">
                            <div class="col-md-3">
                                <label for="inputCity">
                                    <FormattedMessage id="manage-user-redux.phone-number" />
                                </label>
                                <input type="text" name="phoneNumber" class="form-control" />
                            </div>
                            <div class="col-md-3">
                                <label for="inputState">
                                    <FormattedMessage id="manage-user-redux.gender" />
                                </label>

                                <select name="gender" class="form-control">
                                    <option selected>Choose...</option>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option value={index}>
                                                    {language === languages.VI ? item.valueVI : item.valueEN}
                                                </option>

                                            );
                                        })
                                    }
                                </select>
                            </div>

                            <div class="col-md-3">
                                <label for="inputRole">
                                    <FormattedMessage id="manage-user-redux.role" />
                                </label>
                                <select name="roleId" class="form-control">
                                    <option selected>Choose...</option>
                                    <option value="0">Admin</option>
                                    <option value="1">Doctor</option>
                                    <option value="2">Patient</option>
                                </select>
                            </div>

                            <div class="col-md-3">
                                <label for="inputCity">
                                    <FormattedMessage id="manage-user-redux.image" />
                                </label>
                                <input type="text" name="phoneNumber" class="form-control" />
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary">
                            <FormattedMessage id="manage-user-redux.save" />
                        </button>
                    </div>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
