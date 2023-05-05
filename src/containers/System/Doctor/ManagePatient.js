import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getListPatientAPI, sendRemedyAPI } from '../../../services/userService';
import moment from 'moment';
import { languages } from '../../../utils';
import RemedyModel from './Model/RemedyModel';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay'

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
            dataPatient: [],
            isOpenRemedyModel: false,
            dataModel: {},
            isLoading: false
        };
    }

    async componentDidMount() {

        this.getDataPatient();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }



    }

    getDataPatient = async () => {
        let user = this.props.user;
        let { currentDate } = this.state;
        let fomattedDate = moment(currentDate).startOf('day').valueOf();

        let res = await getListPatientAPI({
            doctorId: user.id,
            date: fomattedDate
        });
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient();
        })
    }

    handleConfirm = (item) => {
        console.log(item)

        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        };

        this.setState({
            isOpenRemedyModel: true,
            dataModel: data
        });
    }

    renderTableData = (dataPatient) => {
        let language = this.props.lang;
        return (
            <>
                {dataPatient && dataPatient.length > 0 &&
                    dataPatient.map((item, index) => {
                        let timeType = language === languages.VI ?
                            item.timeTypeDataBooking.valueVI :
                            item.timeTypeDataBooking.valueEN;
                        // let timeType
                        return (
                            <>
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.patientData.firstName}</td>
                                    <td>{item.patientData.lastName}</td>
                                    <td>{item.patientData.gender}</td>
                                    <td>{timeType}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleConfirm(item)}
                                        >Confirm</button>

                                    </td>
                                </tr>
                            </>
                        )
                    })}

            </>

        )
    }

    closeRemedyModel = () => {
        this.setState({
            isOpenRemedyModel: false
        })
    }

    sendRemedy = async (dataFromRemedyModel) => {
        let { dataModel } = this.state;
        this.setState({
            isLoading: true
        })
        let res = await sendRemedyAPI({
            email: dataFromRemedyModel.email,
            imageBase64: dataFromRemedyModel.imageBase64,
            doctorId: dataModel.doctorId,
            patientId: dataModel.patientId,
            timeType: dataModel.timeType,
            language: this.props.lang,
            patientName: dataModel.patientName
        })
        if (res && res.errCode === 0) {
            this.setState({
                isLoading: false
            })
            toast.success('Send Remedy Success')
            this.closeRemedyModel();
            await this.getDataPatient();
        } else {
            this.setState({
                isLoading: false
            })
            toast.error('Send Remedy Fail')
        }

    }


    render() {
        let { dataPatient, isOpenRemedyModel, dataModel, isLoading } = this.state;
        let language = this.props.lang;
        return (
            <>
                <LoadingOverlay
                    active={isLoading}
                    spinner
                    text='Loading...'
                >
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
                                        {this.renderTableData(dataPatient)}

                                    </tbody>


                                </table>
                            </div>
                        </div>
                    </div>

                    <RemedyModel
                        isOpenRemedyModel={isOpenRemedyModel}
                        dataModel={dataModel}
                        closeRemedyModel={this.closeRemedyModel}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </>


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
