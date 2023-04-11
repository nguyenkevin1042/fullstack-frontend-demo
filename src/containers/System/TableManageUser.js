import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter';
import './TableManageUser.scss';
import CustomScrollbars from '../../components/CustomScrollbars';

import * as actions from "../../store/actions";

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: []
        };
    }

    componentDidMount() {
        this.props.fetchAllUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers,
            })
        }
    }

    handleEditUser = (user) => {

        this.props.handleEditUserFromUserRedux(user);

    }

    handleDeleteUser = (user) => {
        this.props.deleteUser(user.id);
    }

    render() {
        let users = this.state.userRedux;

        return (
            <Fragment>
                <CustomScrollbars style={{ height: '768px' }}>
                    <div className='mt-3'>
                        <table className='table-manage-user'>
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
                                {users && users.map((item, index) => {
                                    return (
                                        <Fragment>
                                            <tr key={index}>
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

                </CustomScrollbars>
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.allUsers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
