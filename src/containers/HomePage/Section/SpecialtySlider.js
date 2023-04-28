import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../../store/actions";
import { CommonUtils } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { getAllSpecialtyAPI } from '../../../services/userService';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from 'react-router';

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
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        };
    }

    async componentDidMount() {
        let res = await getAllSpecialtyAPI();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data
            })
        } else {
            this.setState({
                dataSpecialty: []
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

    }

    handleViewDetailSpecialty = (specialty) => {
        if (this.props.history) {
            this.props.history.push("/detail-specialty/" + specialty.id);
        }
    }


    render() {
        let { dataSpecialty } = this.state;

        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <h2 className='section-header-title'>Chuyên khoa phổ biến</h2>
                        <button className='section-header-more'>Xem thêm</button>
                    </div>

                    <div className='section-slider'>
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    console.log(index, item.image)
                                    return (
                                        <div className='section-item' key={index}
                                            onClick={() => this.handleViewDetailSpecialty(item)}>
                                            <div className='bg'
                                                style={{
                                                    backgroundImage: "url(" + item.image + ")"
                                                }}
                                            />
                                            < h3 className='change-color'>{item.name}</h3>
                                        </div>
                                    )

                                })
                            }
                        </Slider>
                    </div>


                </div >
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpecialtySlider));
