import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getListPatientAPI } from '../../../services/userService';
import moment from 'moment';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
            dataPatient: []
        };
    }

    async componentDidMount() {
        let user = this.props.user;
        let { currentDate } = this.state;
        let fomattedDate = moment(currentDate).startOf('day').valueOf();
        await this.getDataPatient(user, fomattedDate);
        console.log(this.state);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }



    }

    getDataPatient = async (user, fomattedDate) => {
        let res = await getListPatientAPI({
            doctorId: user.id,
            date: fomattedDate
        });
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
        console.log(this.state.dataPatient)
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            let user = this.props.user;
            let { currentDate } = this.state;
            let fomattedDate = moment(currentDate).startOf('day').valueOf();
            await this.getDataPatient(user, fomattedDate);

        })
    }


    render() {
        let { dataPatient } = this.state;
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
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Gender</th>
                                    <th>Time</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>


                            <tbody>
                                {dataPatient && dataPatient.length > 0 &&
                                    dataPatient.map((item, index) => {
                                        return (
                                            <>
                                                <tr key={index}>
                                                    <td>{item.id}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{item.patientData.lastName}</td>
                                                    <td>{item.patientData.gender}</td>
                                                    <td>{item.timeTypeDataBooking.valueVI}</td>
                                                    <td>
                                                        <button className='btn-edit'
                                                        // onClick={() => this.handleEditUser(item)}
                                                        >Confirm</button>
                                                        <button className='btn-delete'
                                                        // onClick={() => this.handleDeleteUser(item)}
                                                        >Cancel</button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })}
                            </tbody>


                        </table>
                    </div>
                </div>
            </div>

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
