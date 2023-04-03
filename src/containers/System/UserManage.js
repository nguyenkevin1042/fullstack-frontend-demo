import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './UserManager.scss';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { getAllUsersAPI, createNewUserAPI, deleteUserAPI, editUserAPI } from '../../services/userService';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
            isModalOpened: false,
            isModalEditOpened: false,
            userEdit: {}
        };
    }

    async componentDidMount() {
        await this.getAllUsers();
    }

    getAllUsers = async () => {
        let response = await getAllUsersAPI();
        if (response && response.errCode === 0) {
            this.setState({
                allUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isModalOpened: true
        })
    }

    handleToggleModal = () => {
        this.setState({
            isModalOpened: !this.state.isModalOpened
        })
    }

    handleToggleModalEdit = () => {
        this.setState({
            isModalEditOpened: !this.state.isModalEditOpened
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserAPI(data);
            if (response && response.errCode !== 0) {
                alert("Error: " + response.message);
            } else {
                await this.getAllUsers();
                this.handleToggleModal();
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (error) {
            console.log(error)
        }
    }

    editUser = async (data) => {
        try {
            let response = await editUserAPI(data);

            if (response && response.errCode === 0) {
                await this.getAllUsers();
                this.handleToggleModalEdit();
            } else {
                alert(response.message);
            }
            // console.log(response);
        } catch (error) {
            console.log(error)
        }
    }

    handleDeleteUser = async (data) => {
        try {
            let response = await deleteUserAPI(data.id);

            if (response && response.errCode === 0) {
                await this.getAllUsers();
            } else {
                alert(response.message);
            }
            console.log(response);
        } catch (error) {
            console.log(error)
        }

    }

    handleEditUser = (user) => {
        this.setState({
            isModalEditOpened: true,
            userEdit: user
        });
    }

    render() {
        return (
            <div className="user-container">
                <div className="text-center">Manage users using React + API from NodeJS</div>
                <div className="mt-3 mx-3">
                    <button type="button"
                        className='btn-add px-2 py-2'
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={this.handleAddNewUser}
                    ><i className="fas fa-plus"></i> Add new user</button>
                </div>

                <ModalUser
                    isOpen={this.state.isModalOpened}
                    toggleFromParent={this.handleToggleModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isModalEditOpened &&
                    <ModalEditUser
                        isOpen={this.state.isModalEditOpened}
                        toggleFromParent={this.handleToggleModalEdit}
                        currentUser={this.state.userEdit}
                        editUser={this.editUser}
                    />
                }

                <div className='user-table mt-3 mx-2'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>


                        <tbody>
                            {this.state.allUsers && this.state.allUsers.map((item, index) => {
                                return (
                                    <Fragment>
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit'
                                                    onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                                <button className='btn-delete'
                                                    onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    </Fragment>
                                )
                            })}
                        </tbody>


                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
