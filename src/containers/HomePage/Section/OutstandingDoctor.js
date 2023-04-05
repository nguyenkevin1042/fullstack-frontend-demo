import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../../store/actions";
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}

class OutstandingDoctorSection extends Component {

    render() {
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <h2 className='section-header-title'>Bác sĩ nổi bật tuần qua</h2>
                        <button className='section-header-more'>Xem thêm</button>
                    </div>

                    <div className='section-slider'>
                        <Slider {...this.props.settings}>
                            <div className='section-item doctor-item'>
                                <div className='customize-border'>
                                    <div className='bg' />
                                    <div className='position text-center'>
                                        <div className='change-color'>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Trọng Hưng</div>
                                        <div>Thần kinh</div>
                                    </div>
                                </div>
                            </div>

                            <div className='section-item doctor-item'>
                                <div className='customize-border'>
                                    <div className='bg' />
                                    <div className='position text-center'>
                                        <div className='change-color'>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Trọng Hưng</div>
                                        <div>Thần kinh</div>
                                    </div>
                                </div>
                            </div>

                            <div className='section-item doctor-item'>
                                <div className='customize-border'>
                                    <div className='bg' />
                                    <div className='position text-center'>
                                        <div className='change-color'>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Trọng Hưng</div>
                                        <div>Thần kinh</div>
                                    </div>
                                </div>
                            </div>

                            <div className='section-item doctor-item'>
                                <div className='customize-border'>
                                    <div className='bg' />
                                    <div className='position text-center'>
                                        <div className='change-color'>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Trọng Hưng</div>
                                        <div>Thần kinh</div>
                                    </div>
                                </div>
                            </div>

                            <div className='section-item doctor-item'>
                                <div className='customize-border'>
                                    <div className='bg' />
                                    <div className='position text-center'>
                                        <div className='change-color'>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Trọng Hưng</div>
                                        <div>Thần kinh</div>
                                    </div>
                                </div>
                            </div>

                            <div className='section-item doctor-item'>
                                <div className='customize-border'>
                                    <div className='bg' />
                                    <div className='position text-center'>
                                        <div className='change-color'>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Trọng Hưng</div>
                                        <div>Thần kinh</div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>


                </div>
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctorSection);
