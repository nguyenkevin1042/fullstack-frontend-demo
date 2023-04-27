import React, { Component } from 'react';
import { connect } from 'react-redux';
import { languages } from '../../../utils'


import * as actions from "../../../store/actions";
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";

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

class OutstandingDoctorSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topDoctorsArr: []
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                topDoctorsArr: this.props.topDoctorsRedux,
            })
        }
    }

    handleViewDetailDoctor = (doctor) => {

        this.props.history.push("/detail-doctor/" + doctor.id);

    }

    render() {
        let language = this.props.lang;
        let topDoctors = this.state.topDoctorsArr;
        topDoctors = topDoctors.concat(topDoctors);

        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <h2 className='section-header-title'>Bác sĩ nổi bật tuần qua</h2>
                        <button className='section-header-more'>Xem thêm</button>
                    </div>

                    <div className='section-slider'>
                        <Slider {...this.props.settings}>
                            {topDoctors && topDoctors.length > 0 &&
                                topDoctors.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    // console.log("OutstandingDoctorSection: ", imageBase64)

                                    let textVI = item.positionData.valueVI + " " +
                                        item.lastName + " " + item.firstName;
                                    let textEN = item.positionData.valueEN + " " +
                                        item.firstName + " " + item.lastName;
                                    return (
                                        <div key={index} className='section-item doctor-item'
                                            onClick={() => this.handleViewDetailDoctor(item)}>
                                            <div className='customize-border'>
                                                <div className='bg'
                                                    style={{
                                                        backgroundImage: "url(" + imageBase64 + ")"
                                                    }} />
                                                <div className='position text-center'>
                                                    <div className='change-color'>
                                                        {language === languages.VI ? textVI : textEN}
                                                    </div>
                                                    <div>Thần kinh</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                            {/* <div className='section-item doctor-item'>
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
                            </div> */}
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
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: (limit) => dispatch(actions.fetchTopDoctors(limit)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctorSection));
