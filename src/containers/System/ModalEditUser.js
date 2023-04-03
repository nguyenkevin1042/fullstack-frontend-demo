import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: ''
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,

            })
        }
        console.log("Didmount edit user", this.props.currentUser);
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
        let arrInput = ['email',
            'firstName', 'lastName',
            'address', 'phoneNumber'];
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

    handleUpdateUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.editUser(this.state);
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

                    <ModalHeader toggle={this.toggle}>Edit a new user</ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <div className=" row">
                                <div className="col-md-6">
                                    <label for="inputEmail4">Email</label>
                                    <input type="email" name="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={this.state.email}
                                        disabled />
                                </div>
                            </div>

                            <div className=" row">
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

                            <div className=" row">
                                <div className="col-md-6">
                                    <label for="inputAddress">Address</label>
                                    <input type="text" name="address"
                                        className="form-control"
                                        placeholder="1234 Main St"
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                                </div>
                                <div className="col-md-6">
                                    <label for="inputCity">Phone Number</label>
                                    <input type="text"
                                        name="phoneNumber"
                                        className="form-control"
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')} />
                                </div>
                            </div>

                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button className='btn btn-add'
                            color="primary"
                            onClick={this.handleUpdateUser}>
                            Save changes
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
