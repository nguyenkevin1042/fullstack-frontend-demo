import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import './Banner.scss';


class Banner extends Component {

    render() {
        return (
            <div className='home-banner'>
                <div className='upper-content'>
                    <div className='title1'>
                        NỀN TẢNG Y TẾ
                    </div>
                    <div className='title2'>
                        CHĂM SÓC SỨC KHỎE TOÀN DIỆN
                    </div>
                    <div className='search'>
                        <i className="fas fa-search"></i>
                        <input type='text' placeholder='Tìm chuyên khoa' />
                    </div>
                </div>
                <div className='lower-content'>
                    <div className='options'>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <div className='icon-khamchuyenkhoa'></div>
                            </div>
                            <div className='text-child'>
                                Khám <br /><span>Chuyên khoa</span>
                            </div>
                        </div>

                        <div className='option-child'>
                            <div className='icon-child icon-khamtuxa'>
                                <div className='icon-khamtuxa'>

                                </div>
                            </div>
                            <div className='text-child'>
                                Khám <br /><span>từ xa</span>
                            </div>
                        </div>

                        <div className='option-child'>
                            <div className='icon-child icon-khamtongquat'>
                                <div className='icon-khamtongquat'>

                                </div>
                            </div>
                            <div className='text-child'>
                                Khám <br /><span>tổng quát</span>
                            </div>
                        </div>

                        <div className='option-child'>
                            <div className='icon-child'>
                                <div className='icon-xetnghiemyhoc'>

                                </div>
                            </div>
                            <div className='text-child'>
                                Xét nghiệm <br /><span>y học</span>
                            </div>
                        </div>

                        <div className='option-child'>
                            <div className='icon-child icon-suckhoetinhthan'>
                                <div className='icon-suckhoetinhthan'>

                                </div>
                            </div>
                            <div className='text-child'>
                                Sức khỏe <br /><span>tinh thần</span>
                            </div>
                        </div>

                        <div className='option-child'>
                            <div className='icon-child icon-khamnhakhoa'>
                                <div className='icon-khamnhakhoa'>

                                </div>
                            </div>
                            <div className='text-child'>
                                Khám <br /><span>nha khoa</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
