import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import DoctorScheduleComponent from '../Doctor/DoctorScheduleComponent';
import DetailDoctorExtra from '../Doctor/DetailDoctorExtra';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialtyByIdAPI } from '../../../services/userService';
import _ from 'lodash';
import * as actions from "../../../store/actions";
import { languages } from '../../../utils';
import Select from 'react-select';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
            selectedProvince: ''
        };
    }

    async componentDidMount() {
        this.props.getRequiredDoctorInfo();

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let specialtyId = this.props.match.params.id;

            let res = await getDetailSpecialtyByIdAPI({
                id: specialtyId,
                location: 'ALL'
            });

            if (res && res.errCode == 0) {
                let resData = res.data;
                if (resData && !_.isEmpty(resData)) {
                    let resDataDoctors = resData.doctorSpecialty;

                    this.setState({
                        arrDoctorId: resDataDoctors,
                        dataDetailSpecialty: res.data
                    })
                }


            }

        }

        if (this.props.allProvinces) {
            let dataSelect = this.buildDataInputSelect(this.props.allProvinces, "province");
            this.setState({
                listProvince: dataSelect
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.allProvinces !== this.props.allProvinces
            || prevProps.lang !== this.props.lang) {
            let dataSelect = this.buildDataInputSelect(this.props.allProvinces, "province");
            this.setState({
                listProvince: dataSelect
            })
        }
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let language = this.props.lang;

        if (inputData && inputData.length > 0) {
            if (type === "doctors") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.lastName + " " + item.firstName;
                    let labelEN = item.firstName + " " + item.lastName;

                    obj.key = item.id;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }
            if (type === "price") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.valueVI + " VND";
                    let labelEN = item.valueEN + " USD";

                    obj.key = item.keyMap;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }
            if (type === "payment") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.valueVI;
                    let labelEN = item.valueEN;

                    obj.key = item.keyMap;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }
            if (type === "province") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.valueVI;
                    let labelEN = item.valueEN;

                    obj.key = item.keyMap;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }
            if (type === "specialty") {
                inputData.map((item, index) => {
                    let obj = {};
                    obj.key = item.id;
                    obj.label = item.name
                    result.push(obj);
                });
            }
        }
        return result;
    }

    //handleChange = (selectedOption, name)
    handleChange = async (selectedOption) => {

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let specialtyId = this.props.match.params.id;

            let res = await getDetailSpecialtyByIdAPI({
                id: specialtyId,
                location: selectedOption.key
            });


            if (res && res.errCode == 0) {
                let resData = res.data;
                if (resData && !_.isEmpty(resData)) {
                    let resDataDoctors = resData.doctorSpecialty;

                    this.setState({
                        arrDoctorId: resDataDoctors,
                        dataDetailSpecialty: res.data
                    })
                }
            }
            console.log("check state handleChange: ", this.state)

        }
    }


    render() {
        let { arrDoctorId, dataDetailSpecialty } = this.state;

        return (
            <React.Fragment>
                <HomeHeader />
                <div className='detail-specialty-container'>
                    <div className='detail-specialty-description'>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                            <>
                                <div className='detail-specialty-title'>
                                    {dataDetailSpecialty.name}
                                </div>
                                <div className='detail-specialty-content'>
                                    <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }} />
                                </div>
                            </>

                        }
                    </div>

                    <div className='detail-specialty-doctors'>
                        <div className='select-province'>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleChange}
                                options={this.state.listProvince}
                                // placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                                name="selectedProvince"
                            />
                        </div>

                        <div>
                            {arrDoctorId && arrDoctorId.length > 0 &&
                                arrDoctorId.map((item, index) => {
                                    return (
                                        <div className='detail-specialty-doctor-item'
                                            key={index}>
                                            <div className='doctor-item-content-left'>
                                                <ProfileDoctor
                                                    doctorId={item.doctorId}
                                                    // timeData={timeData}
                                                    isShowDescription={true}
                                                    isShowMore={true}
                                                />
                                            </div>
                                            <div className='doctor-item-content-right'>
                                                <div className='content-right-up'>
                                                    <DoctorScheduleComponent
                                                        doctorIdFromDetailDoctorPage={item.doctorId} />
                                                </div>
                                                <div className='content-right-down'>
                                                    <DetailDoctorExtra
                                                        doctorIdFromDetailDoctorPage={item.doctorId} />
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>


                    </div>
                </div>

                <HomeFooter />
                <div style={{ height: '100px', backgroundColor: '#64b9e5' }}></div>
            </React.Fragment >

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allProvinces: state.admin.allProvinces,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
