import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';
import { languages } from '../../../utils'
import NumericFormat from 'react-number-format';
import { getProfileDoctorByIdAPI } from '../../../services/userService';
import _ from 'lodash';
import moment from 'moment';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileData: {}
        };
    }

    async componentDidMount() {
        let id = this.props.doctorId;
        let data = await this.getProfileDoctorById(id);
        this.setState({
            profileData: data
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }
        if (prevProps.doctorId !== this.props.doctorId) {
            let id = this.props.doctorId;
            this.getProfileDoctorById(id);
        }

    }

    getProfileDoctorById = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorByIdAPI(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // render
    renderTimeBooking = (timeData) => {
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

        return (
            <>
                <div>{time} - {this.capitalizeFirstLetter(date)}</div>
            </>
        )

    }


    render() {
        let { profileData } = this.state;
        let doctorInfor = profileData.Doctor_Infor;
        let { isShowDescription, timeData } = this.props;
        let language = this.props.lang;

        let doctorImg = profileData && profileData.image ? profileData.image : '';
        let textVI = "";
        let textEN = "";
        if (profileData && profileData.positionData) {
            textVI += profileData.positionData.valueVI + " " +
                profileData.lastName + " " + profileData.firstName;
            textEN += profileData.positionData.valueEN + " " +
                profileData.firstName + " " + profileData.lastName;
        }

        return (
            <div className='profile-doctor-container'>

                <div className='info-doctor'>
                    <div className='content-left'
                        style={{
                            backgroundImage: "url(" + doctorImg + ")"
                        }}
                    >

                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === languages.VI ? textVI : textEN}
                        </div>
                        <div className='down'>
                            {isShowDescription === true ?
                                <>
                                    {
                                        profileData.Markdown && profileData.Markdown.description &&
                                        <span>{profileData.Markdown.description}</span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(timeData)}
                                </>
                            }


                        </div>
                    </div>

                </div>

                <div className='price-text'>
                    <label>Giá khám:</label>
                    <span >
                        {doctorInfor && doctorInfor.priceData
                            && language === languages.VI &&
                            <NumericFormat value={doctorInfor.priceData.valueVI}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'} />
                        }
                        {doctorInfor && doctorInfor.priceData
                            && language === languages.EN &&
                            <NumericFormat value={doctorInfor.priceData.valueEN}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'$'} />
                        }
                    </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
