import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModel.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';


class BookingModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,

        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }


    }

    toggle = () => {
        this.props.toggleFromParent();
    }


    render() {
        // let doctorId = '';
        let { isModelClose, timeData } = this.props;
        let doctorId = timeData && !_.isEmpty(timeData) ?
            timeData.doctorId : '';
        console.log(doctorId)

        return (
            <React.Fragment>

                <Modal isOpen={this.props.isModalOpened}
                    // toggle={this.toggle}
                    className={'booking-model-container'}
                    size='lg'
                    centered>

                    <div className='booking-model-content'>
                        <div className='booking-model-header'>
                            <span className='left'>Đặt lịch khám</span>
                            <span className='right'>
                                <i className='fas fa-times'
                                    onClick={isModelClose}></i>
                            </span>
                        </div>

                        <div className='booking-model-body container'>
                            <div className='doctor-info'>

                                <ProfileDoctor
                                    doctorId={doctorId}
                                />
                            </div>
                            <div className='price'>

                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label>Họ Tên</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Số điện thoại</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Địa chỉ liên hệ</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Địa chỉ Email</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Giới tính</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Đặt cho</label>
                                    <input className='form-control' />
                                </div>


                                <div className='col-12 form-group'>
                                    <label>Lý do khám</label>
                                    <input className='form-control' />
                                </div>
                            </div>
                            {/* {JSON.stringify(this.props.timeData)} */}
                        </div>

                        <div className='booking-model-footer'>
                            <button className='btn btn-add'>
                                Add
                            </button>
                            <button className='btn btn-cancel'
                                onClick={isModelClose}>
                                Cancel
                            </button>
                        </div>

                    </div>

                </Modal>
            </React.Fragment >

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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModel);
