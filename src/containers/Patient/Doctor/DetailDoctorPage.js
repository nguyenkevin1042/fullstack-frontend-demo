import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './DetailDoctorPage.scss';
import { getDetailDoctorAPI } from '../../../services/userService';
// import * as actions from "../store/actions";
import { languages } from '../../../utils'
import DoctorSchedulePage from './DoctorSchedulePage';
import DetailDoctorExtra from './DetailDoctorExtra.js';



class DetailDoctorPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            doctorState: [],
            currentDoctorId: -1
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let doctorId = this.props.match.params.id;

            this.setState({
                currentDoctorId: doctorId
            })

            let res = await getDetailDoctorAPI(doctorId);
            if (res && res.errCode == 0) {
                this.setState({
                    doctorState: res.data
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.allDoctors !== this.props.allDoctors) {

        // }


    }

    render() {
        let language = this.props.lang;
        let doctor = this.state.doctorState;
        let doctorImg = doctor && doctor.image ? doctor.image : '';
        let textVI = "";
        let textEN = "";
        if (doctor && doctor.positionData) {
            textVI += doctor.positionData.valueVI + " " +
                doctor.lastName + " " + doctor.firstName;
            textEN += doctor.positionData.valueEN + " " +
                doctor.firstName + " " + doctor.lastName;
        }

        return (
            <div>
                <HomeHeader />

                <div className='detail-doctor-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{
                                backgroundImage: "url(" + doctorImg + ")"
                            }}>

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === languages.VI ? textVI : textEN}
                            </div>
                            <div className='down'>
                                {doctor.Markdown && doctor.Markdown.description &&
                                    <span>{doctor.Markdown.description}</span>}
                            </div>
                        </div>

                    </div>

                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedulePage
                                doctorIdFromDetailDoctorPage={this.state.currentDoctorId} />
                        </div>
                        <div className='content-right'>
                            <DetailDoctorExtra
                                doctorIdFromDetailDoctorPage={this.state.currentDoctorId} />

                        </div>

                    </div>

                    <div className='detail-info-doctor'>
                        {doctor.Markdown && doctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: doctor.Markdown.contentHTML }} />
                        }

                    </div>

                    <div className='comment-doctor'>


                    </div>

                </div>


                <HomeFooter />
            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctorPage);
