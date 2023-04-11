import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter';
import './ManageDoctor.scss';
// import MakedownEditor from './MakedownEditor';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import * as actions from "../../store/actions";
import { languages } from '../../utils'

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorId: '',
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: []
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.lang !== this.props.lang) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
    }

    handleEditorChange = (obj) => {
        this.setState({
            contentMarkdown: obj.text,
            contentHTML: obj.html
        })

    }

    handleSaveContentMarkdown() {
        this.props.saveDoctorInformation({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.key
        })
    }

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };

    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let language = this.props.lang;

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                let labelVI = item.lastName + " " + item.firstName;
                let labelEN = item.firstName + " " + item.lastName;

                obj.key = item.id;
                obj.label = language === languages.VI ? labelVI : labelEN;
                result.push(obj);
            });


        }
        return result;
    }

    render() {
        return (
            <Fragment>
                <div className='manage-doctors-container'>
                    <div className='manage-doctors-title'>
                        <h2>Tạo thông tin bác sĩ</h2>
                    </div>

                    <div className='more-info'>
                        <div className='content-left form-group'>
                            <label>Chọn bác sĩ</label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='content-right form-group'>
                            <label>Thông tin giới thiệu</label>
                            <textarea className='form-control'
                                rows={4}
                                onChange={(event) => this.handleOnChangeDescription(event)}
                                value={this.state.description} />
                        </div>
                    </div>

                    <div className='manage-doctors-editor'>
                        <MdEditor style={{
                            height: '400px',
                            arginBottom: '100px'
                        }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange} />
                    </div>

                    <div className='manage-doctors-save-btn'>
                        <button type='submit'
                            className='btn btn-primary mt-3 save-content-doctor'
                            onClick={() => this.handleSaveContentMarkdown()}>
                            Lưu thông tin
                        </button>
                    </div>

                </div>
            </Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDoctorInformation: (data) => dispatch(actions.saveDoctorInformation(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
