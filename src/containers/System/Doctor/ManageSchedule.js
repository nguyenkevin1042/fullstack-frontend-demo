import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import "./ManageSchedule.scss";
import Select from 'react-select';
import { crudActions, dateFormat, languages } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from "../../../components/Formating/FormattedDate"
import * as actions from "../../../store/actions";
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleAPI } from '../../../services/userService';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: [],
            listDoctors: [],
            currentDate: new Date(),
            rangeTime: [],
            schedule: []
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {

            let data = this.props.allScheduleTime;

            // data.map(item => {
            //     item.isSelected = false;
            // })
            data = data.map(item => ({ ...item, isSelected: false }));
            this.setState({
                rangeTime: data
            })

        }
    }


    handleChange = async (selectedDoctor) => {
        this.setState({
            selectedDoctor: selectedDoctor
        })

    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let language = this.props.lang;

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                let labelVI = item.lastName + " " + item.firstName;
                let labelEN = item.firstName + " " + item.lastName;

                obj.key = item.id;
                obj.label = language === languages.VI ? labelVI : labelEN;
                result.push(obj);
            });


        }
        return result;
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            });
        }

        this.setState({
            rangeTime: rangeTime
        })

    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let selectedTime = [];

        let fomattedDate = new Date(currentDate).getTime();

        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Missing doctor');
            return;
        }

        if (!currentDate) {
            toast.error('Invalid Date');
            return;
        }

        if (rangeTime && rangeTime.length > 0) {
            selectedTime = rangeTime.filter(item => item.isSelected === true)
        }

        let res = await saveBulkScheduleAPI({
            selectedTime: selectedTime,
            doctorId: selectedDoctor.key,
            date: fomattedDate + ''
        });

        if (res && res.errCode === 0) {
            toast.success("Save Schedule success")
        } else {
            toast.error("Save Schedule fail")
        }

    }

    render() {
        let { rangeTime } = this.state;
        let language = this.props.lang;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

        return (
            <React.Fragment>
                <div className='manage-schedule-container'>
                    <div className='manage-schedule-title'>
                        <FormattedMessage id="manage-schedule.title" />
                    </div>

                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-4 form-group'>
                                <label>
                                    <FormattedMessage id="manage-schedule.chooseDoctor" />
                                </label>
                                <Select
                                    value={this.state.selectedOption}
                                    onChange={this.handleChange}
                                    options={this.state.listDoctors}
                                />
                            </div>

                            <div className='col-md-4 form-group'>
                                <label>
                                    <FormattedMessage id="manage-schedule.chooseDate" />
                                </label>
                                <div>
                                    <DatePicker
                                        className="form-control"
                                        onChange={this.handleOnChangeDatePicker}
                                        value={this.state.currentDate}
                                        // selected={this.state.currentDate}
                                        minDate={yesterday} />
                                </div>

                            </div>
                        </div>

                        <div className='row pick-hour-container'>
                            <div className='col-md-12 form-group'>
                                {rangeTime && rangeTime.length > 0 &&
                                    rangeTime.map((item, index) => {
                                        return (
                                            <button className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"}
                                                key={index}
                                                onClick={() => this.handleClickTime(item)}>
                                                {language === languages.VI ?
                                                    item.valueVI : item.valueEN}</button>
                                        )
                                    })

                                }

                            </div>
                        </div>

                        <div className='row'>
                            <button className='btn btn-primary'
                                onClick={this.handleSaveSchedule}>
                                <FormattedMessage id="manage-schedule.saveSchedule" />
                            </button>
                        </div>

                    </div>
                </div>

            </React.Fragment >

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allDoctors: state.admin.allDoctors,
        isLoggedIn: state.user.isLoggedI,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllCodeTime()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
