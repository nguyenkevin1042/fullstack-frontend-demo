import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { crudActions, languages, CommonUtils } from '../../utils'


import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

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
            isOpened: false,

            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: ''
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

        if (prevProps.listUsers !== this.props.listUsers) {
            let genderArr = this.props.genders;
            let roleArr = this.props.roles;
            let positionArr = this.props.positions;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
                action: crudActions.CREATE
            })
        }
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];

        if (file) {
            let objectURL = URL.createObjectURL(file);

            let base64 = await CommonUtils.getBase64(file);

            this.setState({
                previewImgURL: objectURL,
                avatar: base64.result
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpened: true
        })
    }

    handleEditUserFromUserRedux = (user) => {
        let imageBase64 = '';

        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }

        this.setState({
            email: user.email,
            password: '',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            previewImgURL: imageBase64,
            avatar: user.avatar,
            action: crudActions.EDIT,
            id: user.id
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        let action = this.state.action;
        if (isValid === false) return;

        if (action === crudActions.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                phoneNumber: this.state.phoneNumber,
                avatar: this.state.avatar
            })
        }

        if (action === crudActions.EDIT) {
            this.props.editUserRedux({
                id: this.state.id,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                phoneNumber: this.state.phoneNumber,
                avatar: this.state.avatar
            }, () => {
                console.log(this.state)
            })
        }




    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber',
            'gender', 'position', 'role'];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Missing input ' + arrCheck[i]);
                break;
            }

        }
        return isValid;
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.lang;
        let isLoadingGenders = this.props.isLoadingGenders;
        let { email, password, firstName, lastName, address, phoneNumber,
            gender, position, role, avatar } = this.state;

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
                                    className="form-control" placeholder="Email"
                                    value={email}
                                    onChange={(event) => this.onChangeInput(event, 'email')} />
                            </div>
                            <div className="col-md-3">
                                <label for="inputPassword4">
                                    <FormattedMessage id="manage-user-redux.password" />
                                </label>
                                <input type="password" name="password"
                                    className="form-control" placeholder="Password"
                                    value={password}
                                    onChange={(event) => this.onChangeInput(event, 'password')} />
                            </div>
                            <div className="col-md-3">
                                <label for="inputEmail4">
                                    <FormattedMessage id="manage-user-redux.first-name" />
                                </label>
                                <input type="text" name="firstName"
                                    className="form-control" placeholder="First Name"
                                    value={firstName}
                                    onChange={(event) => this.onChangeInput(event, 'firstName')} />
                            </div>
                            <div className="col-md-3">
                                <label for="inputPassword4">
                                    <FormattedMessage id="manage-user-redux.last-name" />
                                </label>
                                <input type="text" name="lastName"
                                    className="form-control" placeholder="Last Name"
                                    value={lastName}
                                    onChange={(event) => this.onChangeInput(event, 'lastName')} />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-6">
                                <label for="inputAddress">
                                    <FormattedMessage id="manage-user-redux.address" />
                                </label>
                                <input type="text" name="address"
                                    className="form-control" placeholder="1234 Main St"
                                    value={address}
                                    onChange={(event) => this.onChangeInput(event, 'address')} />
                            </div>
                            <div className="col-md-6">
                                <label for="inputCity">
                                    <FormattedMessage id="manage-user-redux.phone-number" />
                                </label>
                                <input type="text" name="phoneNumber" className="form-control"
                                    value={phoneNumber}
                                    onChange={(event) => this.onChangeInput(event, 'phoneNumber')} />
                            </div>
                        </div>

                        <div className="row mt-3">

                            <div className="col-md-3">
                                <label for="inputState">
                                    <FormattedMessage id="manage-user-redux.gender" />
                                </label>

                                <select name="gender" className="form-control"
                                    onChange={(event) => this.onChangeInput(event, 'gender')}
                                    value={gender}>
                                    <option selected>Choose...</option>

                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
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
                                <select name="position" className="form-control"
                                    onChange={(event) => this.onChangeInput(event, 'position')}
                                    value={position}>
                                    <option defaultValue>Choose...</option>
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
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
                                <select name="roleId" className="form-control"
                                    onChange={(event) => this.onChangeInput(event, 'role')}
                                    value={role}>
                                    <option defaultValue>Choose...</option>
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
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

                        <div className="row">
                            <div className="col-12">
                                <button type="submit"
                                    className={this.state.action === crudActions.EDIT ? "btn btn-warning mt-3" : "btn btn-primary mt-3"}
                                    onClick={() => this.handleSaveUser()}>
                                    <FormattedMessage id="manage-user-redux.save" />
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <TableManageUser
                                    handleEditUserFromUserRedux={this.handleEditUserFromUserRedux}
                                    action={this.state.action} />

                            </div>
                        </div>
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
        listUsers: state.admin.allUsers,
        isLoadingGenders: state.admin.isLoadingGenders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGendersStart: () => dispatch(actions.fetchGenderStart()),
        getPositionsStart: () => dispatch(actions.fetchPositionStart()),
        getRolesStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (userData) => dispatch(actions.createNewUser(userData)),
        fetchAllUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editUserRedux: (userData) => dispatch(actions.updateUser(userData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
