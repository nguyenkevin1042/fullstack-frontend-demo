import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            role: ''

        }

        this.listenToEmitter();
    }

    componentDidMount() {
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: '',
                role: ''

            })
        });

    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password',
            'firstName', 'lastName',
            'address', 'phoneNumber',
            'gender', 'role'];
        for (let i = 0; i < arrInput.length; i++) {
            const element = arrInput[i];
            if (!this.state[element]) {
                isValid = false;
                alert('Missing parameter: ' + element)
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.createNewUser(this.state);
        }

    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen}
                    toggle={this.toggle}
                    className={'model-user-container'}
                    size='lg'
                    centered>

                    <ModalHeader toggle={this.toggle}>Create a new user</ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <label for="inputEmail4">Email</label>
                                    <input type="email" name="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')} />
                                </div>
                                <div className="col-md-6">
                                    <label for="inputPassword4">Password</label>
                                    <input type="password" name="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={(event) => this.handleOnChangeInput(event, 'password')} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <label for="inputEmail4">First Name</label>
                                    <input type="text" name="firstName"
                                        className="form-control"
                                        placeholder="First Name"
                                        value={this.state.firstName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'firstName')} />
                                </div>
                                <div className="col-md-6">
                                    <label for="inputPassword4">Last Name</label>
                                    <input type="text" name="lastName"
                                        className="form-control"
                                        placeholder="Last Name"
                                        value={this.state.lastName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'lastName')} />
                                </div>
                            </div>
                            <div className="row">

                                <label for="inputAddress">Address</label>
                                <input type="text" name="address"
                                    className="form-control"
                                    placeholder="1234 Main St"
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                            </div>
                            <div className=" row">
                                <div className="col-md-4">
                                    <label for="inputCity">Phone Number</label>
                                    <input type="text"
                                        name="phoneNumber"
                                        className="form-control"
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')} />
                                </div>
                                <div className="col-md-4">
                                    <label for="inputState">Gender</label>
                                    <select name="gender"
                                        className="form-control"
                                        onChange={(event) => this.handleOnChangeInput(event, 'gender')} >
                                        <option defaultValue>Choose...</option>
                                        <option value="0">Male</option>
                                        <option value="1">Female</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label for="inputRole">Role</label>
                                    <select name="roleId" className="form-control"
                                        onChange={(event) => this.handleOnChangeInput(event, 'role')} >
                                        <option defaultValue>Choose...</option>
                                        <option value="0">Admin</option>
                                        <option value="1">Doctor</option>
                                        <option value="2">Patient</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button className='btn btn-add'
                            color="primary"
                            onClick={this.handleAddNewUser}>
                            Add
                        </Button>{' '}
                        <Button className='btn btn-cancel' color="secondary" onClick={this.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
