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

class SpecialtySlider extends Component {

    render() {
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <h2 className='section-header-title'>Chuyên khoa phổ biến</h2>
                        <button className='section-header-more'>Xem thêm</button>
                    </div>

                    <div className='section-slider'>
                        <Slider {...this.props.settings}>
                            <div className='section-item'>
                                <div className='bg' />
                                <h3 className='change-color'>Cơ xương khớp 1</h3>
                            </div>

                            <div className='section-item'>
                                <div className='bg' />
                                <h3 className='change-color'>Cơ xương khớp 2</h3>
                            </div>

                            <div className='section-item'>
                                <div className='bg' />
                                <h3 className='change-color'>Cơ xương khớp 3</h3>
                            </div>

                            <div className='section-item'>
                                <div className='bg' />
                                <h3 className='change-color'>Cơ xương khớp 4</h3>
                            </div>

                            <div className='section-item'>
                                <div className='bg' />
                                <h3 className='change-color'>Cơ xương khớp 5</h3>
                            </div>

                            <div className='section-item'>
                                <div className='bg' />
                                <h3 className='change-color'>Cơ xương khớp 6</h3>
                            </div>

                            <div className='section-item'>
                                <div className='bg' />
                                <h3 className='change-color'>Cơ xương khớp 7</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtySlider);