import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModel.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ProfileDoctor from '../ProfileDoctor';
import DatePicker from '../../../../components/Input/DatePicker';
import _ from 'lodash';
import Select from 'react-select';
import { dateFormat } from '../../../../utils';
import { languages } from '../../../../utils'
import { savePatientScheduleAPI } from '../../../../services/userService';
import * as actions from "../../../../store/actions";
import { toast } from 'react-toastify';
import moment from 'moment';


class BookingModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            timeData: {},

            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            gender: '',
            doctorId: '',
            timeType: '',
            date: ''
        };
    }

    componentDidMount() {
        this.props.getGendersStart();


        let doctorId = this.props.timeData && !_.isEmpty(this.props.timeData) ?
            this.props.timeData.doctorId : '';

        this.setState({
            doctorId: doctorId,
            timeData: this.props.timeData,
            timeType: this.props.timeData.timeType,
            date: this.props.timeData.date
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {
            this.setState({
                genderArr: this.buildGenderData(this.props.genders)
            })
        }

        if (prevProps.genders !== this.props.genders) {
            this.setState({
                genderArr: this.buildGenderData(this.props.genders)
            })
        }

        if (prevProps.timeData !== this.props.timeData) {
            let doctorId = this.props.timeData && !_.isEmpty(this.props.timeData) ?
                this.props.timeData.doctorId : '';
            this.setState({
                doctorId: doctorId,
                timeType: this.props.timeData.timeType,
                date: this.props.timeData.date
            })

        }
    }

    buildGenderData = (data) => {
        let result = [];
        let language = this.props.lang;

        if (data && data.length > 0) {

            data.map((item, index) => {
                let obj = {};
                obj.label = language === languages.VI ? item.valueVI : item.valueEN;
                obj.value = item.keyMap
                result.push(obj);
            })
        }
        return result
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, key) => {
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChange = (selectedGender) => {
        this.setState({
            gender: selectedGender
        })

    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    buildTimeBooking = (timeData) => {
        let language = this.props.lang;
        let date = '';
        let time = '';

        if (timeData && !_.isEmpty(timeData)) {
            date = language === languages.VI ?
                moment.unix(timeData.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(timeData.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
            time = language === languages.VI ?
                timeData.timeTypeData.valueVI : timeData.timeTypeData.valueEN;
            ;

        }

        return time + ' - ' + this.capitalizeFirstLetter(date);

    }

    buildDoctorName = (timeData) => {
        let language = this.props.lang;
        let result = '';
        let nameVI = timeData.doctorData.lastName + " " + timeData.doctorData.firstName
        let nameEN = timeData.doctorData.firstName + " " + timeData.doctorData.lastName

        if (timeData && !_.isEmpty(timeData)) {
            result = language === languages.VI ? nameVI : nameEN;
        }

        return result;

    }

    async handleSavePatientSchedule() {
        let timeString = this.buildTimeBooking(this.props.timeData)
        let doctorName = this.buildDoctorName(this.props.timeData)
        let res = await savePatientScheduleAPI({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            birthday: this.state.birthday,
            gender: this.state.gender,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            date: this.state.date,
            timeData: this.state.timeData,
            language: this.props.lang,
            timeString: timeString,
            doctorName: doctorName
        });
        console.log(res)

        if (res && res.errCode === 0) {
            toast.success("Save Schedule Success");
            // this.props.handleCloseBookingModel();
        } else {
            toast.error("Save Schedule Fail");

        }
    }

    render() {
        let { fullName, phoneNumber, email, address,
            reason, birthday, gender, genderArr } = this.state;
        let { isModalOpened, handleCloseBookingModel, timeData } = this.props;

        let doctorId = timeData && !_.isEmpty(timeData) ?
            timeData.doctorId : '';

        return (


            <React.Fragment>

                <Modal isOpen={isModalOpened}
                    // toggle={this.toggle}
                    className={'booking-model-container'}
                    size='lg'
                    centered>

                    <div className='booking-model-content'>
                        <div className='booking-model-header'>
                            <span className='left'>
                                <FormattedMessage id="patient.booking-model.header" />
                            </span>
                            <span className='right'>
                                <i className='fas fa-times'
                                    onClick={handleCloseBookingModel}></i>
                            </span>
                        </div>

                        <div className='booking-model-body container'>
                            <div className='doctor-info'>

                                <ProfileDoctor
                                    doctorId={doctorId}
                                    timeData={timeData}
                                    isShowDescription={false}
                                />
                            </div>
                            <div className='price'>

                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-model.fullName" /></label>
                                    <input className='form-control'
                                        value={fullName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'fullName')} />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-model.phoneNumber" /></label>
                                    <input className='form-control'
                                        value={phoneNumber}
                                        onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')} />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-model.address" /></label>
                                    <input className='form-control'
                                        value={address}
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-model.email" /></label>
                                    <input className='form-control'
                                        value={email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')} />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-model.gender" /></label>
                                    <Select
                                        value={gender}
                                        onChange={this.handleChange}
                                        options={genderArr}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-model.birthday" /></label>
                                    <div>
                                        <DatePicker
                                            className="form-control"
                                            onChange={this.handleOnChangeDatePicker}
                                            value={birthday} />
                                    </div>
                                </div>
                                <div className='col-12 form-group'>
                                    <label><FormattedMessage id="patient.booking-model.reason" /></label>
                                    <input className='form-control'
                                        value={reason}
                                        onChange={(event) => this.handleOnChangeInput(event, 'reason')} />
                                </div>



                            </div>

                        </div>

                        <div className='booking-model-footer'>
                            <button className='btn btn-add'
                                onClick={() => this.handleSavePatientSchedule()}>
                                <FormattedMessage id="patient.booking-model.book" />
                            </button>
                            <button className='btn btn-cancel'
                                onClick={handleCloseBookingModel}>
                                <FormattedMessage id="patient.booking-model.cancel" />
                            </button>
                        </div>

                    </div>

                </Modal>
            </React.Fragment >

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGendersStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModel);
