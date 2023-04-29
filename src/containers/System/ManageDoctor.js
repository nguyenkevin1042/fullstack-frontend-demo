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
            clinicId: '',
            specialtyId: '',
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
            listClinic: [],
            listSpecialty: [],
            selectedClinic: '',
            selectedSpecialty: '',

            hasOldData: false
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getRequiredDoctorInfo();

        if (this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "doctors");
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (this.props.allPrices) {
            let dataSelect = this.buildDataInputSelect(this.props.allPrices, "price");

            this.setState({
                listPrice: dataSelect
            })
        }
        if (this.props.allPayments) {
            let dataSelect = this.buildDataInputSelect(this.props.allPayments, "payment");
            this.setState({
                listPayment: dataSelect
            })
        }
        if (this.props.allProvinces) {
            let dataSelect = this.buildDataInputSelect(this.props.allProvinces, "province");
            this.setState({
                listProvince: dataSelect
            })
        }
        if (this.props.allSpecialties) {
            let dataSelect = this.buildDataInputSelect(this.props.allSpecialties, 'specialty');
            this.setState({
                listSpecialty: dataSelect
            })
        }
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
            let dataSelect = this.buildDataInputSelect(this.props.allPrices, "price");

            this.setState({
                listPrice: dataSelect
            })
        }

        if (prevProps.allPayments !== this.props.allPayments
            || prevProps.lang !== this.props.lang) {
            let dataSelect = this.buildDataInputSelect(this.props.allPayments, "payment");
            this.setState({
                listPayment: dataSelect
            })
        }

        if (prevProps.allProvinces !== this.props.allProvinces
            || prevProps.lang !== this.props.lang) {
            let dataSelect = this.buildDataInputSelect(this.props.allProvinces, "province");
            this.setState({
                listProvince: dataSelect
            })
        }

        if (prevProps.allSpecialties !== this.props.allSpecialties
            || prevProps.lang !== this.props.lang) {
            let dataSelect = this.buildDataInputSelect(this.props.allSpecialties, 'specialty');
            this.setState({
                listSpecialty: dataSelect
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
            doctorId: this.state.doctorId,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            selectedPrice: this.state.selectedPrice.key,
            selectedPayment: this.state.selectedPayment.key,
            selectedProvince: this.state.selectedProvince.key,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            selectedSpecialty: this.state.selectedSpecialty.key,
            // selectedClinic: this.state.selectedProvince.key,
            selectedClinic: '',
            action: hasOldData === true ? 'EDIT' : 'CREATE'
        })
    }

    handleChange = async (selectedDoctor) => {
        let res = await getDetailDoctorAPI(selectedDoctor.key);

        console.log(res)
        let { listPrice, listPayment, listProvince, listSpecialty } = this.state

        let resAddressClinic = '', resNameClinic = '',
            resNote = '', resPriceId = '',
            resPaymentId = '', resProvinceId = '', resSpecialtyId = '',
            resSelectedPrice = '', resSelectedPayment = '',
            resSelectedProvince = '', resSelectedSpecialty = '';

        if (res && res.errCode === 0 && res.data && res.data.Markdown
            && res.data.Markdown.contentHTML != null
            && res.data.Markdown.contentMarkdown != null
            && res.data.Markdown.description != null) {

            let markdown = res.data.Markdown;

            if (res.data.Doctor_Infor) {
                resAddressClinic = res.data.Doctor_Infor.addressClinic;
                resNameClinic = res.data.Doctor_Infor.nameClinic;
                resNote = res.data.Doctor_Infor.note;
                resPriceId = res.data.Doctor_Infor.priceId;
                resPaymentId = res.data.Doctor_Infor.paymentId;
                resProvinceId = res.data.Doctor_Infor.provinceId;
                resSpecialtyId = res.data.Doctor_Infor.specialtyId;

                resSelectedPrice = listPrice.find(item => {
                    return item && item.key === resPriceId
                })
                resSelectedPayment = listPayment.find(item => {
                    return item && item.key === resPaymentId
                })
                resSelectedProvince = listProvince.find(item => {
                    return item && item.key === resProvinceId
                })
                resSelectedSpecialty = listSpecialty.find(item => {
                    return item && item.key === resSpecialtyId
                })

                this.setState({
                    doctorId: res.data.id,
                    contentHTML: markdown.contentHTML,
                    contentMarkdown: markdown.contentMarkdown,
                    description: markdown.description,
                    selectedPrice: resSelectedPrice,
                    selectedPayment: resSelectedPayment,
                    selectedProvince: resSelectedProvince,
                    selectedSpecialty: resSelectedSpecialty,
                    nameClinic: resNameClinic,
                    addressClinic: resAddressClinic,
                    note: resNote,
                    hasOldData: true
                });
            } else {
                this.setState({
                    doctorId: res.data.id,
                    contentHTML: '',
                    contentMarkdown: '',
                    description: '',
                    selectedPrice: '',
                    selectedPayment: '',
                    selectedProvince: '',
                    selectedSpecialty: '',
                    nameClinic: '',
                    addressClinic: '',
                    note: '',
                    hasOldData: false
                });
            }
        }
    }

    handleChangeSelectDoctorInfor = (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({ ...stateCopy });
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        });
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let language = this.props.lang;

        if (inputData && inputData.length > 0) {
            if (type === "doctors") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.lastName + " " + item.firstName;
                    let labelEN = item.firstName + " " + item.lastName;

                    obj.key = item.id;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }
            if (type === "price") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.valueVI + " VND";
                    let labelEN = item.valueEN + " USD";

                    obj.key = item.keyMap;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }
            if (type === "payment") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.valueVI;
                    let labelEN = item.valueEN;

                    obj.key = item.keyMap;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }
            if (type === "province") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.valueVI;
                    let labelEN = item.valueEN;

                    obj.key = item.keyMap;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }
            if (type === "specialty") {
                inputData.map((item, index) => {
                    let obj = {};
                    obj.key = item.id;
                    obj.label = item.name
                    result.push(obj);
                });
            }
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
                                placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                                name="selectedOption"
                            />
                        </div>
                        <div className='content-right form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.intro' /></label>
                            <textarea className='form-control'
                                rows={4}
                                onChange={(event) => this.handleOnChangeText(event, 'description')}
                                value={this.state.description} />
                        </div>
                    </div>

                    <div className='more-info-extra row'>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.choose-price' /></label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listPrice}
                                placeholder={
                                    language === languages.VI ?
                                        "Chọn giá tiền" :
                                        "Choose price"
                                }
                                name="selectedPrice"
                            />
                        </div>

                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.choose-payment' /></label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listPayment}
                                placeholder={
                                    language === languages.VI ?
                                        "Chọn phương thức thanh toán" :
                                        "Choose payment method"
                                }
                                name={"selectedPayment"}
                            />
                        </div>

                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.choose-province' /></label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listProvince}
                                placeholder={
                                    language === languages.VI ?
                                        "Chọn tỉnh thành" :
                                        "Choose province"
                                }
                                name="selectedProvince"
                            />
                        </div>

                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.clinic-name' /></label>
                            <input className='form-control'
                                value={this.state.nameClinic}
                                onChange={(event) => this.handleOnChangeText(event, 'nameClinic')} />
                        </div>

                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.clinic-address' /></label>
                            <input className='form-control'
                                value={this.state.addressClinic}
                                onChange={(event) => this.handleOnChangeText(event, 'addressClinic')} />
                        </div>

                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.note' /></label>
                            <input className='form-control'
                                value={this.state.note}
                                onChange={(event) => this.handleOnChangeText(event, 'note')} />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.specialty' /></label>
                            <Select
                                value={this.state.selectedSpecialty}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listSpecialty}
                                placeholder={
                                    language === languages.VI ?
                                        "Chọn chuyên khoa" :
                                        "Choose Specialty"
                                }
                                name="selectedSpecialty"
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.clinic' /></label>
                            <Select
                                value={this.state.selectedClinic}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listClinic}
                                placeholder={
                                    language === languages.VI ?
                                        "Chọn phòng khám" :
                                        "Choose Clinic"
                                }
                                name="selectedClinic"
                            />
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
        allProvinces: state.admin.allProvinces,
        allSpecialties: state.admin.allSpecialties
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
