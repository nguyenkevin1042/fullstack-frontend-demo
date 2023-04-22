import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import './DetailDoctorExtra.scss';
import { FormattedMessage } from 'react-intl';
import NumericFormat from 'react-number-format';
// import * as actions from "../store/actions";
import { languages } from '../../../utils'
import { getExtraInfoByIdAPI } from '../../../services/userService'



class DetailDoctorExtra extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isShowDetail: false,
            extraInfo: {}
        };
    }

    componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.lang !== this.props.lang) {
        //     this.setState({
        //         allDays: this.getDateForAllDaysState()
        //     })
        // }

        if (prevProps.doctorIdFromDetailDoctorPage !== this.props.doctorIdFromDetailDoctorPage) {

            let doctorId = this.props.doctorIdFromDetailDoctorPage;
            let res = await getExtraInfoByIdAPI(doctorId);

            this.setState({
                extraInfo: res.data ? res.data : {}
            })

        }
    }

    handleChangeIsShowDetail = (status) => {
        this.setState({
            isShowDetail: status
        })
    }


    render() {
        let { isShowDetail, extraInfo } = this.state
        let language = this.props.lang

        return (

            <div className='detail-doctor-extra-container'>

                <div className='up'>
                    <div className='text-address'>
                        <FormattedMessage id="patient.extra-info.address" />
                    </div>
                    <div className='text-name-clinic'>
                        {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
                    </div>
                    <div className='text-address-clinic'>
                        {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}
                    </div>
                </div>
                <div className='down'>
                    {isShowDetail === false &&
                        <div className='text-price'>
                            <span className='text-price-title'>
                                <FormattedMessage id="patient.extra-info.price" />:</span>
                            <span className='text-price-price'>
                                {extraInfo && extraInfo.priceData
                                    && language === languages.VI &&
                                    <NumericFormat value={extraInfo.priceData.valueVI}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VND'} />
                                }
                                {extraInfo && extraInfo.priceData
                                    && language === languages.EN &&
                                    <NumericFormat value={extraInfo.priceData.valueEN}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'$'} />
                                }
                            </span>
                            <span className='text-price-more-details'
                                onClick={() => this.handleChangeIsShowDetail(true)}>
                                <FormattedMessage id="patient.extra-info.more-details" />
                            </span>

                        </div>
                    }

                    {isShowDetail === true &&
                        <>
                            <div className='title'>
                                <FormattedMessage id="patient.extra-info.price" />: .
                            </div>
                            <div className='details'>
                                <div className='details-info'>
                                    <div className='details-price'>
                                        <span className='left'>
                                            <FormattedMessage id="patient.extra-info.price" />
                                        </span>
                                        <span className='right'>

                                            {extraInfo && extraInfo.priceData
                                                && language === languages.VI &&
                                                <NumericFormat value={extraInfo.priceData.valueVI}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VND'} />
                                            }
                                            {extraInfo && extraInfo.priceData
                                                && language === languages.EN &&
                                                <NumericFormat value={extraInfo.priceData.valueEN}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'$'} />
                                            }
                                        </span>
                                    </div>
                                    <div className='details-price-foreigner'>

                                        {extraInfo && extraInfo.note ? extraInfo.note : ''}
                                    </div>
                                </div>

                                <div className='payment-info'>
                                    Người bệnh có thể thanh toán chi phí bằng hình thức:<br />
                                    {extraInfo && extraInfo.paymentData &&
                                        language === languages.VI && extraInfo.paymentData.valueVI}
                                    {extraInfo && extraInfo.paymentData &&
                                        language === languages.EN && extraInfo.paymentData.valueEN}
                                </div>
                            </div>

                            <div>
                                <span className='text-hide-price'
                                    onClick={() => this.handleChangeIsShowDetail(false)}>
                                    <FormattedMessage id="patient.extra-info.hide-details" />
                                </span>
                            </div>
                        </>

                    }



                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctorExtra);
