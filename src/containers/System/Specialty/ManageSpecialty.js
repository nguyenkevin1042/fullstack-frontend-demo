import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { CommonUtils } from '../../../utils'
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewSpecialtyAPI } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
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
            let objectURL = URL.createObjectURL(file);

            let base64 = await CommonUtils.getBase64(file);
            console.log(objectURL)
            console.log(data)
            this.setState({
                imageBase64: objectURL,
                //imageBase64: base64.result
            })
        }
    }

    handleSaveNewSpecialty = async () => {
        let res = await createNewSpecialtyAPI(this.state);
        if (res && res.errCode === 0) {
            toast.success("Create new specialty successful")
        } else {
            toast.error("Create new specialty fail")

        }
    }

    render() {
        return (
            <React.Fragment>

                <div className='manage-specialty-container'>
                    <div className='manage-specialty-title'>
                        Manage Specialty
                    </div>

                    <div className='add-new-specialty'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Tên chuyên khoa</label>
                                <input type='text' className='form-control'
                                    value={this.state.name}
                                    onChange={(event) => this.handleOnChangeInput(event, 'name')} />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Ảnh chuyên khoa</label>
                                <input type='file' className='form-control-file'
                                    // value={this.state.imageBase64}
                                    onChange={(event) => this.handleOnChangeImage(event)} />
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
                                    onClick={() => this.handleSaveNewSpecialty()}>
                                    Save New Specialty
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
