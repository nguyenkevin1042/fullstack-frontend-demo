import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages } from '../../utils'

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import * as actions from "../../store/actions";
import './UserRedux.scss';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpened: false
        }
    }

    componentDidMount() {
        this.props.getGendersStart();
        this.props.getPositionsStart();
        this.props.getRolesStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genders !== this.props.genders) {
            this.setState({
                genderArr: this.props.genders,
            })
        }

        if (prevProps.positions !== this.props.positions) {
            this.setState({
                positionArr: this.props.positions,
            })
        }

        if (prevProps.roles !== this.props.roles) {
            this.setState({
                roleArr: this.props.roles,
            })
        }
    }

    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        // previewImgURL
        if (file) {
            let objectURL = URL.createObjectURL(file);
            // this.setState({
            //     previewImgURL: objectURL
            // });
            this.state.previewImgURL = objectURL;
            console.log("image: ", this.state.previewImgURL);
            console.log("state: ", this.state);
        } else {

        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpened: true
        })
    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.lang;
        let isLoadingGenders = this.props.isLoadingGenders;
        console.log("CHECK ROLES: ", roles);
        console.log("CHECK POSITIONS: ", positions);

        return (

            <div className="user-redux-container" >
                <div className="text-center user-redux-title" >UserRedux</div>
                <div className="user-redux-body" >
                    <div className="container">
                        <div className="row">
                            <div className="col-12 mb-3 mt-3 text-center">
                                <span>{isLoadingGenders === true ? "Loading genders" : ""}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 mb-3 mt-3">
                                <h2><FormattedMessage id="manage-user-redux.add" /></h2>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <label for="inputEmail4">
                                    <FormattedMessage id="manage-user-redux.email" />
                                </label>
                                <input type="email" name="email"
                                    className="form-control" placeholder="Email" />
                            </div>
                            <div className="col-md-3">
                                <label for="inputPassword4">
                                    <FormattedMessage id="manage-user-redux.password" />
                                </label>
                                <input type="password" name="password"
                                    className="form-control" placeholder="Password" />
                            </div>
                            <div className="col-md-3">
                                <label for="inputEmail4">
                                    <FormattedMessage id="manage-user-redux.first-name" />
                                </label>
                                <input type="text" name="firstName"
                                    className="form-control" placeholder="First Name" />
                            </div>
                            <div className="col-md-3">
                                <label for="inputPassword4">
                                    <FormattedMessage id="manage-user-redux.last-name" />
                                </label>
                                <input type="text" name="lastName"
                                    className="form-control" placeholder="Last Name" />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-6">
                                <label for="inputAddress">
                                    <FormattedMessage id="manage-user-redux.address" />
                                </label>
                                <input type="text" name="address"
                                    className="form-control" placeholder="1234 Main St" />
                            </div>
                            <div className="col-md-6">
                                <label for="inputCity">
                                    <FormattedMessage id="manage-user-redux.phone-number" />
                                </label>
                                <input type="text" name="phoneNumber" className="form-control" />
                            </div>
                        </div>

                        <div className="row mt-3">

                            <div className="col-md-3">
                                <label for="inputState">
                                    <FormattedMessage id="manage-user-redux.gender" />
                                </label>

                                <select name="gender" className="form-control">
                                    <option defaultValue>Choose...</option>
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

                            <div className="col-md-3">
                                <label for="inputRole">
                                    <FormattedMessage id="manage-user-redux.position" />
                                </label>
                                <select name="position" className="form-control">
                                    <option defaultValue>Choose...</option>
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option value={index}>
                                                    {language === languages.VI ? item.valueVI : item.valueEN}
                                                </option>

                                            );
                                        })
                                    }
                                </select>
                            </div>

                            <div className="col-md-3">
                                <label for="inputRole">
                                    <FormattedMessage id="manage-user-redux.role" />
                                </label>
                                <select name="roleId" className="form-control">
                                    <option defaultValue>Choose...</option>
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option value={index}>
                                                    {language === languages.VI ? item.valueVI : item.valueEN}
                                                </option>

                                            );
                                        })
                                    }
                                </select>
                            </div>

                            <div className="col-md-3">
                                <label for="inputCity">
                                    <FormattedMessage id="manage-user-redux.image" />
                                </label>

                                <div className='preview-img-container'>
                                    <input type='file' id='previewImg'
                                        onChange={(event) => this.handleOnChangeImage(event)}
                                        hidden />
                                    <label htmlFor='previewImg' className='label-upload'>Tải ảnh <i className='fas fa-upload'></i></label>
                                    <div className='preview-img'
                                        style={{
                                            backgroundImage: "url(" + this.state.previewImgURL + ")"
                                        }}
                                        onClick={() => this.openPreviewImage()}>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary mt-3">
                            <FormattedMessage id="manage-user-redux.save" />
                        </button>
                    </div>
                </div>


                {this.state.isOpened === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL} W
                        onCloseRequest={() => this.setState({ isOpen: false })}

                    />
                }
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        genders: state.admin.genders,
        positions: state.admin.positions,
        roles: state.admin.roles,
        isLoadingGenders: state.admin.isLoadingGenders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGendersStart: () => dispatch(actions.fetchGenderStart()),
        getPositionsStart: () => dispatch(actions.fetchPositionStart()),
        getRolesStart: () => dispatch(actions.fetchRoleStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageApp: (language) => dispatch(actions.changeLanguageApp(language));
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
