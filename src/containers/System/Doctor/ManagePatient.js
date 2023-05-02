import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';


class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }


    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }


    render() {
        return (
            <div className='manage-patient-container'>
                <div className='manage-patient-title'>
                    Quản lý bệnh nhân
                </div>

                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            className="form-control"
                            onChange={this.handleOnChangeDatePicker}
                            value={this.state.currentDate}
                        />
                    </div>

                    <div className='col-12 manage-patient-table'>
                        <table id="patients">
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


                            {/* <tbody>
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
                            </tbody> */}


                        </table>
                    </div>
                </div>
            </div>

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
