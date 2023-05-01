import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { CommonUtils } from '../../../utils'
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewClinicAPI } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt();

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            address: '',
            contentHTML: '',
            contentMarkdown: ''
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }
    }

    handleOnChangeInput = (event, key) => {
        let copyState = { ...this.state };
        copyState[key] = event.target.value;
        this.setState({ ...copyState })
    }

    handleEditorChange = (obj) => {
        this.setState({
            contentMarkdown: obj.text,
            contentHTML: obj.html
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64.result
            })
        }

    }

    handleSaveNewClinic = async () => {
        let res = await createNewClinicAPI(this.state);
        if (res && res.errCode === 0) {
            toast.success("Create new clinic successful")
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                contentHTML: '',
                contentMarkdown: ''
            })
        } else {
            toast.error("Create new clinic fail")

        }
    }

    render() {
        return (
            <React.Fragment>

                <div className='manage-specialty-container'>
                    <div className='manage-specialty-title'>
                        Manage Clinic
                    </div>

                    <div className='add-new-specialty'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Tên phòng khám</label>
                                <input type='text' className='form-control'
                                    value={this.state.name}
                                    onChange={(event) => this.handleOnChangeInput(event, 'name')} />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Ảnh phòng khám</label>
                                <input type='file' className='form-control-file'
                                    // value={this.state.imageBase64}
                                    onChange={(event) => this.handleOnChangeImage(event)} />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ phòng khám</label>
                                <input type='text' className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                            </div>
                            <div className='col-12 form-group'>
                                <MdEditor style={{
                                    height: '300px',
                                    marginBottom: '20px'
                                }}
                                    value={this.state.contentMarkdown}
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={this.handleEditorChange}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <button className='btn btn-primary'
                                    onClick={() => this.handleSaveNewClinic()}>
                                    Save New Clinic
                                </button>
                            </div>
                        </div>

                    </div>


                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
