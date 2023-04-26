import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './VerifyBooking.scss';
import { verifyBookingAPI } from '../../services/userService';

import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';

class VerifyBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        };
    }

    async componentDidMount() {

        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');

            let res = await verifyBookingAPI({
                token: token,
                doctorId: doctorId
            })

            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }


        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }


    }

    renderStatusVerifyBooking = () => {
        let { statusVerify, errCode } = this.state
        console.log(this.state)
        return (
            <>
                {statusVerify === false ?
                    <div>Loading....</div>
                    :
                    <div>
                        {errCode === 0 ?
                            <div className='verify-status-text'>
                                <FormattedMessage id="patient.verify-booking.success" />
                            </div>
                            :
                            <div className='verify-status-text'>
                                <FormattedMessage id="patient.verify-booking.fail" />
                            </div>

                        }
                    </div>

                }
            </>
        )
    }


    render() {
        return (
            <>
                <HomeHeader />
                {this.renderStatusVerifyBooking()}
                {/* <HomeFooter /> */}
            </>

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBooking);
