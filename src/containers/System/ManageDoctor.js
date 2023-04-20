import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter';
import './ManageDoctor.scss';
// import MakedownEditor from './MakedownEditor';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import * as actions from "../../store/actions";
import { crudActions, languages } from '../../utils';
import { getDetailDoctorAPI } from '../../services/userService';

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
            listDoctors: [],

            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',

            hasOldData: false
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getRequiredDoctorInfo();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors
            || prevProps.lang !== this.props.lang) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "doctors");
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allPrices !== this.props.allPrices
            || prevProps.lang !== this.props.lang) {
            let dataSelect = this.buildDataInputSelect(this.props.allPrices);
            this.setState({
                listPrice: dataSelect
            })
        }

        if (prevProps.allPayments !== this.props.allPayments
            || prevProps.lang !== this.props.lang) {
            let dataSelect = this.buildDataInputSelect(this.props.allPayments);
            this.setState({
                listPayment: dataSelect
            })
        }

        if (prevProps.allProvinces !== this.props.allProvinces
            || prevProps.lang !== this.props.lang) {
            let dataSelect = this.buildDataInputSelect(this.props.allProvinces);
            this.setState({
                listProvince: dataSelect
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
        let hasOldData = this.state.hasOldData;
        this.props.saveDoctorInformation({
            doctorId: this.state.doctorId,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            action: hasOldData === true ? 'EDIT' : 'CREATE'
        })
    }

    handleChange = async (selectedDoctor) => {
        let res = await getDetailDoctorAPI(selectedDoctor.key);
        console.log(res.data.Markdown.contentHTML)
        if (res && res.errCode === 0 && res.data && res.data.Markdown
            && res.data.Markdown.contentHTML != null
            && res.data.Markdown.contentMarkdown != null
            && res.data.Markdown.description != null) {
            let markdown = res.data.Markdown;
            this.setState({
                doctorId: res.data.id,
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            });
        } else {
            this.setState({
                doctorId: res.data.id,
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            });
        }
    }

    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let language = this.props.lang;

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                let labelVI = type === "doctors" ? item.lastName + " " + item.firstName : item.valueVI;
                let labelEN = type === "doctors" ? item.firstName + " " + item.lastName : item.valueEN;
                // let labelVI = item.lastName + " " + item.firstName;
                // let labelEN = item.firstName + " " + item.lastName;

                obj.key = item.id;
                obj.label = language === languages.VI ? labelVI : labelEN;
                result.push(obj);
            });


        }
        return result;
    }

    render() {
        let language = this.props.lang
        let hasOldData = this.state.hasOldData;

        return (
            <Fragment>
                <div className='manage-doctors-container'>
                    <div className='manage-doctors-title'>
                        <h2><FormattedMessage id='admin.manage-doctor.title' /></h2>
                    </div>

                    <div className='more-info'>
                        <div className='content-left form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.choose-doctor' /></label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.listDoctors}
                                placeholder={
                                    language === languages.VI ?
                                        "Chọn bác sĩ" :
                                        "Choose doctor"
                                }
                            />
                        </div>
                        <div className='content-right form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.intro' /></label>
                            <textarea className='form-control'
                                rows={2}
                                onChange={(event) => this.handleOnChangeDescription(event)}
                                value={this.state.description} />
                        </div>
                    </div>

                    <div className='more-info-extra row'>
                        <div className='col-4 form-group'>
                            <label>Chọn giá tiền</label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.listPrice}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Chọn phương thức thanh toán</label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.listPayment}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Chọn tỉnh thành</label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.listProvince}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Tên phòng khám</label>
                            <input className='form-control' />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Địa chỉ phòng khám</label>
                            <input className='form-control' />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Lưu ý</label>
                            <input className='form-control' />
                        </div>
                    </div>

                    <div className='manage-doctors-editor'>
                        <MdEditor style={{
                            height: '400px',
                            marginBottom: '20px'
                        }}
                            value={this.state.contentMarkdown}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange} />
                    </div>

                    <div className='manage-doctors-save-btn'>
                        <button type='submit'
                            className={hasOldData === true ? "btn btn-warning mt-3" : "btn btn-primary mt-3"}
                            onClick={() => this.handleSaveContentMarkdown()}>
                            <FormattedMessage id='admin.manage-doctor.save-info' />
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
        allDoctors: state.admin.allDoctors,
        allPrices: state.admin.allPrices,
        allPayments: state.admin.allPayments,
        allProvinces: state.admin.allProvinces
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
        saveDoctorInformation: (data) => dispatch(actions.saveDoctorInformation(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
