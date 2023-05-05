import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './RemedyModel.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import _ from 'lodash';
import * as actions from "../../../../store/actions";
import { toast } from 'react-toastify';
import moment from 'moment';
import { CommonUtils } from '../../../../utils';


class RemedyModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imageBase64: ''
        };
    }

    componentDidMount() {
        if (this.props.dataModel) {
            this.setState({
                email: this.props.dataModel.email
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.lang !== this.props.lang) {

        // }
        if (prevProps.dataModel !== this.props.dataModel) {
            this.setState({
                email: this.props.dataModel.email
            })
        }


    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];


        if (file) {
            let objectURL = URL.createObjectURL(file);

            let base64 = await CommonUtils.getBase64(file);

            this.setState({
                // imageBase64: objectURL,
                imageBase64: base64.result
            })
        }

    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    }

    render() {
        let { isOpenRemedyModel, closeRemedyModel, sendRemedy, dataModel } = this.props;
        let { email, imageBase64 } = this.state;
        return (
            <React.Fragment>

                <Modal
                    isOpen={isOpenRemedyModel}
                    // toggle={this.toggle}
                    className={'remedy-model-container'}
                    size='lg'
                    centered>

                    <div>
                        <ModalHeader toggle={closeRemedyModel}>Gửi hóa đơn khám bệnh</ModalHeader>
                        <ModalBody>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label>Email bệnh nhân</label>
                                    <input type='email' value={email} className='form-control'
                                        onChange={(event) => this.handleOnChangeEmail(event)} />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Chọn hóa đơn</label>
                                    <input type='file' className='form-control-file'
                                        onChange={(event) => this.handleOnChangeImage(event)} />
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary"
                                onClick={() => this.handleSendRemedy()}
                            >
                                Send
                            </Button>{' '}
                            <Button color="secondary"
                                onClick={closeRemedyModel}
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </div>
                </Modal>
            </React.Fragment >

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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModel);
