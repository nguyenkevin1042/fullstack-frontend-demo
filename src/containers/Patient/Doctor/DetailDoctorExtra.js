import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import './DetailDoctorExtra.scss';
import { FormattedMessage } from 'react-intl';
// import * as actions from "../store/actions";
import { languages } from '../../../utils'



class DetailDoctorExtra extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isShowDetail: false
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {
            this.setState({
                allDays: this.getDateForAllDaysState()
            })
        }
    }

    handleChangeIsShowDetail = (status) => {
        this.setState({
            isShowDetail: status
        })
    }


    render() {
        let { isShowDetail } = this.state
        let language = this.props.lang


        return (

            <div className='detail-doctor-extra-container'>
                <div className='up'>
                    <div className='text-address'>Địa chỉ khám</div>
                    <div className='text-name-clinic'>Phòng khám Chuyên khoa Da Liễu</div>
                    <div className='text-address-clinic'>207 Phố Huế - Hai Bà Trưng - Hà Nội</div>
                </div>
                <div className='down'>
                    {isShowDetail === false &&
                        <div className='text-price'>
                            <span className='text-price-title'>Giá khám:</span>
                            <span className='text-price-price'>300.000đ.</span>
                            <span className='text-price-more-details'
                                onClick={() => this.handleChangeIsShowDetail(true)}>
                                Xem chi tiết
                            </span>

                        </div>
                    }

                    {isShowDetail === true &&
                        <>
                            <div className='title'>Giá khám: .</div>
                            <div className='details'>
                                <div className='details-info'>
                                    <div className='details-price'>
                                        <span className='left'>Giá khám</span>
                                        <span className='right'>300.000<sup>đ</sup></span>
                                    </div>
                                    <div className='details-price-foreigner'>
                                        Được ưu tiên khám trước khi đật khám qua BookingCare.
                                        Giá khám cho người nước ngoài là 30 USD
                                    </div>
                                </div>

                                <div className='payment-info'>
                                    Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ
                                </div>
                            </div>

                            <div>
                                <span className='text-hide-price'
                                    onClick={() => this.handleChangeIsShowDetail(false)}>
                                    Ẩn bảng giá
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
