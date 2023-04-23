import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import './DoctorSchedulePage.scss';
import { FormattedMessage } from 'react-intl';
// import * as actions from "../store/actions";
import { languages } from '../../../utils'
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getDoctorScheduleByIdAndDateAPI } from '../../../services/userService'
import BookingModel from './Model/BookingModel';

class DoctorSchedulePage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isModalOpened: false,
            timeData: {}
        };
    }

    async componentDidMount() {
        let allDaysArr = this.getDateForAllDaysState()
        let doctorId = this.props.doctorIdFromDetailDoctorPage;
        let date = allDaysArr[0].value;
        let res = await getDoctorScheduleByIdAndDateAPI(doctorId, date)


        this.setState({
            allDays: allDaysArr,
            allAvailableTime: res.data ? res.data : []
        })



    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {
            this.setState({
                allDays: this.getDateForAllDaysState()
            })
        }

        if (prevProps.doctorIdFromDetailDoctorPage !== this.props.doctorIdFromDetailDoctorPage) {
            let allDaysArr = this.getDateForAllDaysState()


            let doctorId = this.props.doctorIdFromDetailDoctorPage;
            let date = allDaysArr[0].value;
            let res = await getDoctorScheduleByIdAndDateAPI(doctorId, date)

            this.setState({
                allAvailableTime: res.data ? res.data : []
            })

        }

    }

    getDateForAllDaysState = () => {
        let currentDate = new Date();
        let arrDate = [];
        let language = this.props.lang;

        for (let index = 0; index < 7; index++) {
            let obj = {};
            if (language === languages.VI) {
                let labelVI = moment(currentDate).add(index, 'days').format('dddd - DD/MM')
                obj.label = this.capitalizeFirstLetter(labelVI);

            } else {
                obj.label = moment(currentDate).add(index, 'days').locale('en').format('dddd - DD/MM')

            }
            obj.value = moment(currentDate).add(index, 'days').startOf('day').valueOf();
            arrDate.push(obj)
        }

        return arrDate;
    }

    handleOnChangeSelect = async (event) => {

        if (this.props.doctorIdFromDetailDoctorPage
            && this.props.doctorIdFromDetailDoctorPage != -1) {
            let doctorId = this.props.doctorIdFromDetailDoctorPage;
            let date = event.target.value;

            let res = await getDoctorScheduleByIdAndDateAPI(doctorId, date)

            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }

        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    handleToggleModal = () => {
        this.setState({
            isModalOpened: !this.state.isModalOpened
        })
    }

    handleShowBookingModel = (item) => {
        this.setState({
            isModalOpened: true,
            timeData: item
        })

    }

    handleCloseBookingModel = () => {
        this.setState({
            isModalOpened: false
        })
    }

    render() {
        let { allDays, allAvailableTime, isModalOpened, timeData } = this.state
        let language = this.props.lang


        return (
            <>

                <div className='doctor-schedule-container' >
                    <div className='all-schedules'>
                        <select
                            onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option key={index} value={item.value}>{item.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <span>
                                <i className='fas fa-calendar-alt'></i>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span>
                        </div>

                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <Fragment>
                                    <div className='time-content-buttons'>
                                        {
                                            allAvailableTime.map((item, index) => {
                                                let timeVI = item.timeTypeData.valueVI;
                                                let timeEN = item.timeTypeData.valueEN;
                                                return (
                                                    <button key={index}
                                                        onClick={() => this.handleShowBookingModel(item)}>
                                                        {language === languages.VI ? timeVI : timeEN}
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='book-free'>
                                        <span>
                                            <FormattedMessage id='patient.detail-doctor.choose' />
                                            <i className='far fa-hand-point-up' />
                                            <FormattedMessage id='patient.detail-doctor.book-free' />
                                        </span>
                                    </div>

                                </Fragment>
                                :

                                <div className='no-schedule'>
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </div>

                            }
                        </div>
                    </div>

                </div>

                <BookingModel
                    isModalOpened={isModalOpened}
                    timeData={timeData}
                    isModelClose={this.handleCloseBookingModel} />
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        // saveDoctorInformation: (data) => dispatch(actions.saveDoctorInformation(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedulePage);
