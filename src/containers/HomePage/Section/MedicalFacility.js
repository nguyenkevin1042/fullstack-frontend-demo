import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../../store/actions";
// import './MedicalFacility.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { getAllClinicAPI } from '../../../services/userService';
import { withRouter } from 'react-router';

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

class MedicalFacility extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinic: []
        };
    }

    async componentDidMount() {
        let res = await getAllClinicAPI();

        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : []
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

    }
    handleViewDetailClinic = (clinic) => {
        // console.log(clinic)
        if (this.props.history) {
            this.props.history.push("/detail-clinic/" + clinic.id);
        }
    }

    renderClinicDataSlider = () => {
        let { dataClinic } = this.state;
        return (

            <>
                <div className='section-slider'>
                    <Slider {...this.props.settings}>
                        {dataClinic && dataClinic.length > 0 &&
                            dataClinic.map((item, index) => {
                                return (
                                    <div className='section-item' key={index}
                                        onClick={() => this.handleViewDetailClinic(item)}>
                                        <div className='bg'
                                            style={{
                                                backgroundImage: "url(" + item.image + ")"
                                            }} />
                                        <h3 className='change-color'>{item.name}</h3>
                                    </div>
                                )

                            })

                        }
                    </Slider>
                </div >
            </>
        )
    }

    render() {
        let { dataClinic } = this.state;

        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <h2 className='section-header-title'>Cơ sở y tế nổi bật</h2>
                        <button className='section-header-more'>Tìm kiếm</button>
                    </div>

                    {this.renderClinicDataSlider()}

                    {/* <div className='section-slider'>
                        <Slider {...this.props.settings}> */}

                    {/* {dataClinic && dataClinic.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div className='section-item' key={index}>
                                            <div className='bg'
                                                style={{
                                                    backgroundImage: "url(" + item.image + ")"
                                                }} />
                                            <h3 className='change-color'>{item.name}</h3>
                                        </div>
                                    )

                                })

                            } */}
                    {/* </Slider>
                    </div> */}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
