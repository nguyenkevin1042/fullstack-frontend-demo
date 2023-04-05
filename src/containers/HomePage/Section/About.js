import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../../store/actions";

class About extends Component {

    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    <h2>Truyền thông nói về BookingCare</h2>
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="570" height="320" src="https://www.youtube.com/embed/FyDQljKtWnI" title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>CÀ PHÊ KHỞI NGHIỆP VTV1
                            Chương trình được phát sóng lúc 6h55 ngày 14/11/2018 trên VTV1
                            ------------------------------------------------------------------
                            Hãy cùng đón xem:
                            📺 Chương trình Quốc gia khởi nghiệp
                            🎬 Phát sóng vào 20:10 tối thứ 6 hàng tuần
                            📺 Chương trình Cà phê khởi nghiệp
                            🎬 Phát sóng vào lúc 06:55 sáng thứ 2 đến thứ 6 hàng tuần trên kênh VTV1, Đài truyền hình Việt Nam</p>
                    </div>
                </div>
            </div>
        );

    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
