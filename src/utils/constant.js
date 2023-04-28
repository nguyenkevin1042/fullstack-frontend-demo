import { doctorMenu } from "../containers/Header/menuApp";

export const path = {
    HOME: '/',
    HOMEPAGE: '/home',
    LOGIN: '/login',
    LOG_OUT: '/logout',
    SYSTEM: '/system',
    DETAIL_DOCTOR: '/detail-doctor/:id',
    MANAGE_SCHEDULE: '/doctor/manage-schedule',
    VERIFY_BOOKING: '/verify-booking',
    DETAIL_SPECIALTY: '/detail-specialty/:id'
};

export const languages = {
    VI: 'vi',
    EN: 'en'
};

export const crudActions = {
    CREATE: "CREATE",
    EDIT: "EDIT",
    DELETE: "DELETE",
    READ: "READ"
};

export const userRole = {
    ADMIN: 'R1',
    DOCTOR: 'R2',
    PATIENT: 'R3'
};

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY'
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N'
}