import Vue from "vue";
import Vuex from "vuex";
import { NOTIFICATION, SNACKBAR, SET_LANG } from "./mutation-types";

Vue.use(Vuex);

const defaultNotification = {
  statut: false,
  timeout: 6000,
  right: false,
  top: true,
  color: "rgba(0, 0, 0, 1)",
  left: true,
  bottom: false,
  text: "",
};

export default new Vuex.Store({
  state: {
    numbers: {},
    snackbar: null,
    notification: defaultNotification,
    allowedLanguage: ["fr", "en"],
    defaultLang: "fr",
    roles: [
      {
        text: "$vuetify.roles.NORMAL",
        value: "NORMAL",
      },
      {
        text: "$vuetify.roles.DOCTOR",
        value: "DOCTOR",
      },
      {
        text: "$vuetify.roles.PATIENT",
        value: "PATIENT",
      },

      // {
      //   text: "$vuetify.roles.RECEPTIONIST",
      //   value: "RECEPTIONIST"
      // },
      // {
      //   text: "$vuetify.roles.CASHIER",
      //   value: "CASHIER"
      // },
      // {
      //   text: "$vuetify.roles.HR",
      //   value: "HR"
    ],
    rolesR: [
      {
        text: "$vuetify.roles.DOCTOR",
        value: "DOCTOR",
      },
      {
        text: "$vuetify.roles.PATIENT",
        value: "PATIENT",
      },
      {
        text: "$vuetify.roles.RECEPTIONIST",
        value: "RECEPTIONIST",
      },
      {
        text: "$vuetify.roles.HR",
        value: "HR",
      },
    ],
    type_advantage: [
      {
        text: "$vuetify.hospitals.cols.type_advantage.FIDELITY",
        value: "FIDELITY",
      },
      // {
      //   text: "$vuetify.hospitals.cols.type_advantage.PROMO",
      //   value: "PROMO",
      // }
      // {
      //   text: "$vuetify.hospitals.cols.type_advantage.VOUCHER",
      //   value: "VOUCHER",
      // },
    ],
    action_type: [
      {
        text: "$vuetify.promotion_action.cols.action_type.PERCENT",
        value: "PERCENT",
      },
      {
        text: "$vuetify.promotion_action.cols.action_type.FREE",
        value: "FREE",
      },
      {
        text: "$vuetify.promotion_action.cols.action_type.FIXED",
        value: "FIXED",
      },
    ],
    days: [
      {
        text: "$vuetify.days.MONDAY",
        value: "MONDAY",
      },
      {
        text: "$vuetify.days.TUESDAY",
        value: "TUESDAY",
      },
      {
        text: "$vuetify.days.WEDNESDAY",
        value: "WEDNESDAY",
      },
      {
        text: "$vuetify.days.THURSDAY",
        value: "THURSDAY",
      },
      {
        text: "$vuetify.days.FRIDAY",
        value: "FRIDAY",
      },
      {
        text: "$vuetify.days.SATURDAY",
        value: "SATURDAY",
      },
      {
        text: "$vuetify.days.SUNDAY",
        value: "SUNDAY",
      },
    ],
    examination: [
      {
        text: "$vuetify.examination.cols.type_examination.CLINICAL",
        value: "CLINICAL",
      },
      {
        text: "$vuetify.examination.cols.type_examination.COMPLEMENTARY",
        value: "COMPLEMENTARY",
      },
    ],
    type_planning: [
      {
        text: "$vuetify.appointment.cols.type_planning.RDV",
        value: "RDV",
      },
      {
        text: "$vuetify.appointment.cols.type_planning.SURGICAL_INTERVENTIONS",
        value: "SURGICAL_INTERVENTIONS",
      },
    ],
    type_glass: [
      {
        text: "$vuetify.patient_glass.cols.type_glass.SIMPLE_FOCUS",
        value: "SIMPLE_FOCUS",
      },
      {
        text: "$vuetify.patient_glass.cols.type_glass.BIFOCAL",
        value: "BIFOCAL",
      },
      {
        text: "$vuetify.patient_glass.cols.type_glass.PROGRESSIVE_LENSES",
        value: "PROGRESSIVE_LENSES",
      },
      {
        text: "$vuetify.patient_glass.cols.type_glass.DECREASING_GLASS",
        value: "DECREASING_GLASS",
      },
    ],
    type_material: [
      {
        text: "$vuetify.patient_glass.cols.type_material.MINERAL_GLASS",
        value: "MINERAL_GLASS",
      },
      {
        text: "$vuetify.patient_glass.cols.type_material.ORGANIC_GLASS",
        value: "ORGANIC_GLASS",
      },
      {
        text: "$vuetify.patient_glass.cols.type_material.POLYCARBONATE_GLASS",
        value: "POLYCARBONATE_GLASS",
      },
    ],
    glass_treatments: [
      {
        text: "$vuetify.patient_glass.cols.glass_treatments.ANTI_SCRATCH",
        value: "ANTI_SCRATCH",
      },
      {
        text: "$vuetify.patient_glass.cols.glass_treatments.ANTI_GLARE",
        value: "ANTI_GLARE",
      },
      {
        text: "$vuetify.patient_glass.cols.glass_filter.BLUE_LIGHT",
        value: "BLUE_LIGHT",
      },
      {
        text: "$vuetify.patient_glass.cols.glass_filter.SOLAR",
        value: "SOLAR",
      },
      {
        text: "$vuetify.patient_glass.cols.glass_filter.PHOTOCHROMIC",
        value: "PHOTOCHROMIC",
      },
      {
        text: "$vuetify.patient_glass.cols.glass_filter.POLARIZED",
        value: "POLARIZED",
      },
    ],
    filter: [
      {
        text: "$vuetify.patient_glass.cols.glass_filter.BLUE_LIGHT",
        value: "BLUE_LIGHT",
      },
      {
        text: "$vuetify.patient_glass.cols.glass_filter.SOLAR",
        value: "SOLAR",
      },
      {
        text: "$vuetify.patient_glass.cols.glass_filter.PHOTOCHROMIC",
        value: "PHOTOCHROMIC",
      },
      {
        text: "$vuetify.patient_glass.cols.glass_filter.POLARIZED",
        value: "POLARIZED",
      },
    ],
    type_solar: [
      {
        text: "$vuetify.patient_glass.cols.type_solar.CAT0",
        value: "CAT0",
      },
      {
        text: "$vuetify.patient_glass.cols.type_solar.CAT1",
        value: "CAT1",
      },
      {
        text: "$vuetify.patient_glass.cols.type_solar.CAT2",
        value: "CAT2",
      },
      {
        text: "$vuetify.patient_glass.cols.type_solar.CAT3",
        value: "CAT3",
      },
      {
        text: "$vuetify.patient_glass.cols.type_solar.CAT4",
        value: "CAT4",
      },
    ],
    cat_hue: [
      {
        text: "$vuetify.patient_glass.cols.cat_hue.CAT0",
        value: "CAT0",
      },
      {
        text: "$vuetify.patient_glass.cols.cat_hue.CAT1",
        value: "CAT1",
      },
      {
        text: "$vuetify.patient_glass.cols.cat_hue.CAT2",
        value: "CAT2",
      },
      {
        text: "$vuetify.patient_glass.cols.cat_hue.CAT3",
        value: "CAT3",
      },
      {
        text: "$vuetify.patient_glass.cols.cat_hue.CAT4",
        value: "CAT4",
      },
    ],
    hue: [
      {
        text: "$vuetify.patient_glass.cols.hue.BROWN",
        value: "BROWN",
      },
      {
        text: "$vuetify.patient_glass.cols.hue.BLUE",
        value: "BLUE",
      },
      {
        text: "$vuetify.patient_glass.cols.hue.YELLOW",
        value: "YELLOW",
      },
      {
        text: "$vuetify.patient_glass.cols.hue.GRAY",
        value: "GRAY",
      },
      {
        text: "$vuetify.patient_glass.cols.hue.GREEN",
        value: "GREEN",
      },
      {
        text: "$vuetify.patient_glass.cols.hue.BLACK",
        value: "BLACK",
      },
      {
        text: "$vuetify.patient_glass.cols.hue.RED",
        value: "RED",
      },
    ],
    anomaly: [
      {
        text: "$vuetify.complaints.cols.anomaly.MISSING_PRODUCTS",
        value: "MISSING_PRODUCTS",
      },
      {
        text: "$vuetify.complaints.cols.anomaly.EXCESS_PRODUCTS",
        value: "EXCESS_PRODUCTS",
      },
      {
        text: "$vuetify.complaints.cols.anomaly.EXPIRED_PRODUCTS",
        value: "EXPIRED_PRODUCTS",
      },
      {
        text: "$vuetify.complaints.cols.anomaly.DAMAGED_PRODUCTS",
        value: "DAMAGED_PRODUCTS",
      },
      {
        text: "$vuetify.complaints.cols.anomaly.POOR_QUALITY_PRODUCTS",
        value: "POOR_QUALITY_PRODUCTS",
      },
      {
        text: "$vuetify.complaints.cols.anomaly.OTHER_ANOMALY",
        value: "OTHER_ANOMALY",
      },
    ],
    type_Center: [
      {
        text: "$vuetify.HealthCenter.cols.centerType.titleP",
        value: "PRIVATE",
      },
      {
        text: "$vuetify.HealthCenter.cols.centerType.titlePU",
        value: "PUBLIC",
      },
    ],
    employeeLeaveStatus: [
      {
        text: "$vuetify.employeeLeave.cols.status.NO_START",
        value: "NO_START",
      },
      {
        text: "$vuetify.employeeLeave.cols.status.PENDING",
        value: "PENDING",
      },
      {
        text: "$vuetify.employeeLeave.cols.status.FINISH",
        value: "FINISH",
      },
    ],
    type_leave: [
      {
        text: "$vuetify.leave.cols.type.AUTHORIZED",
        value: "AUTHORIZED",
      },
      {
        text: "$vuetify.leave.cols.type.LEGAL",
        value: "LEGAL",
      },
      {
        text: "$vuetify.leave.cols.type.JUSTIFIED_ABSCENCE",
        value: "JUSTIFIED_ABSCENCE",
      },
      {
        text: "$vuetify.leave.cols.type.JUSTIFIED_NOT_ABSCENCE",
        value: "JUSTIFIED_NOT_ABSCENCE",
      },
    ],
    type_bonus: [
      {
        text: "$vuetify.performanceBonus.cols.type.TAX_FREE",
        value: "TAX_FREE",
      },
      {
        text: "$vuetify.performanceBonus.cols.type.TAXABLE",
        value: "TAXABLE",
      },
    ],
    type_Gender: [
      {
        text: "$vuetify.users.cols.gender.MAN",
        value: "MAN",
      },
      {
        text: "$vuetify.users.cols.gender.WOMAN",
        value: "WOMAN",
      },
    ],
    type_room_status: [
      {
        text: "$vuetify.room.cols.status.NOT_OCCUPIED",
        value: "NOT_OCCUPIED",
      },
      {
        text: "$vuetify.room.cols.status.IN_PREPARATION",
        value: "IN_PREPARATION",
      },
      {
        text: "$vuetify.room.cols.status.OCCUPIED",
        value: "OCCUPIED",
      },
    ],
    type_bills: [
      {
        text: "$vuetify.bills.cols.bill_type.ONSITE",
        value: "ONSITE",
      },
      {
        text: "$vuetify.bills.cols.bill_type.DELIVERY",
        value: "DELIVERY",
      },
      {
        text: "$vuetify.bills.cols.bill_type.CATERING",
        value: "CATERING",
      },
      {
        text: "$vuetify.bills.cols.bill_type.EVENT",
        value: "EVENT",
      },
      // {
      //   text: "$vuetify.bills.cols.bill_type.laboratory",
      //   value: "laboratory"
      // },
      // {
      //   text: "$vuetify.bills.cols.bill_type.radiography",
      //   value: "radiography"
      // },
      // {
      //   text: "$vuetify.bills.cols.bill_type.surgery",
      //   value: "surgery"
      // },
      // {
      //   text: "$vuetify.bills.cols.bill_type.diagnostic",
      //   value: "diagnostic"
      // },
      // {
      //   text: "$vuetify.bills.cols.bill_type.exam_investigation",
      //   value: "exam_investigation"
      // },
      // {
      //   text: "$vuetify.bills.cols.bill_type.consultation",
      //   value: "consultation",
      // },
    ],
    number_bed: [
      {
        text: "$vuetify.hospitalization.cols.number_bed.SHARE_ROOM",
        value: "SHARE_ROOM",
      },
      {
        text: "$vuetify.hospitalization.cols.number_bed.PRIVATE_ROOM",
        value: "PRIVATE_ROOM",
      },
      {
        text: "$vuetify.hospitalization.cols.number_bed.VIP_ROOM",
        value: "VIP_ROOM",
      },
    ],
    status_occupation: [
      {
        text: "$vuetify.hospitalization.cols.status_occupation.PENDING",
        value: "PENDING",
      },
      {
        text: "$vuetify.hospitalization.cols.status_occupation.FINISHED",
        value: "FINISHED",
      },
    ],
    type_cash: [
      {
        text: "$vuetify.cash.cols.type_cash.CASH_COUNTERS",
        value: "CASH_COUNTERS",
      },
      {
        text: "$vuetify.cash.cols.type_cash.CASH_MAIN",
        value: "CASH_MAIN",
      },
      {
        text: "$vuetify.cash.cols.type_cash.CASH_BANK",
        value: "CASH_BANK",
      },
    ],
    type_consultation: [
      {
        text: "$vuetify.consultation.cols.type_consultation.STANDART",
        value: "STANDART",
      },
      {
        text: "$vuetify.consultation.cols.type_consultation.COMPLEX",
        value: "COMPLEX",
      },
      {
        text: "$vuetify.consultation.cols.type_consultation.VERY_COMPLEX",
        value: "VERY_COMPLEX",
      },
    ],
    type_emergency: [
      {
        text: "$vuetify.consultation.cols.type_emergency.VITAL_EMERGENCY",
        value: "VITAL_EMERGENCY",
      },
      {
        text: "$vuetify.consultation.cols.type_emergency.RELATIVE_EMERGENCY",
        value: "RELATIVE_EMERGENCY",
      },
    ],
    type_cash_movement: [
      {
        text: "$vuetify.cash_movement.cols.type_cash_movement.CREDIT",
        value: "CREDIT",
      },
      {
        text: "$vuetify.cash_movement.cols.type_cash_movement.DEBIT",
        value: "DEBIT",
      },
    ],
    type_accommodation: [
      {
        text: "$vuetify.hospitalization.cols.type_accommodation.BOOKING",
        value: "BOOKING",
      },
      {
        text: "$vuetify.hospitalization.cols.type_accommodation.OCCUPATION",
        value: "OCCUPATION",
      },
    ],
    type_product: [
      {
        text: "$vuetify.supplies.cols.type_product.REAGENT",
        value: "REAGENT",
      },
      {
        text: "$vuetify.supplies.cols.type_product.CONSUMABLE",
        value: "CONSUMABLE",
      },
    ],
    type_products: [
      {
        text: "$vuetify.supplies.cols.type_product.PHARMACY",
        value: "PHARMACY",
      },
      {
        text: "$vuetify.supplies.cols.type_product.REAGENT",
        value: "REAGENT",
      },
      {
        text: "$vuetify.supplies.cols.type_product.CONSUMABLE",
        value: "CONSUMABLE",
      },
    ],
    type_certificate: [
      {
        text: "$vuetify.certificate.cols.certificate_type.MEDICAL_CERTIFICATE",
        value: "MEDICAL_CERTIFICATE",
      },
      {
        text: "$vuetify.certificate.cols.certificate_type.SPORTS_SKILLS",
        value: "SPORTS_SKILLS",
      },
      {
        text: "$vuetify.certificate.cols.certificate_type.CHRONIC_DESEASE",
        value: "CHRONIC_DESEASE",
      },
      {
        text: "$vuetify.certificate.cols.certificate_type.STOPPAGE_WORK",
        value: "STOPPAGE_WORK",
      },
      {
        text: "$vuetify.certificate.cols.certificate_type.STOPPAGE_SCHOOL",
        value: "STOPPAGE_SCHOOL",
      },
    ],
    type_shape: [
      {
        text: "$vuetify.bills.cols.bill_shape.ordinance",
        value: "ORDINANCE",
      },
      {
        text: "$vuetify.bills.cols.bill_shape.classic",
        value: "CLASSIC",
      },
    ],
    type_stoppage: [
      {
        text: "$vuetify.certificate.cols.stoppage_type.STOP",
        value: "STOP",
      },
      {
        text: "$vuetify.certificate.cols.stoppage_type.EXTENSION",
        value: "EXTENSION",
      },
      {
        text: "$vuetify.certificate.cols.stoppage_type.GETTING_BACK",
        value: "GETTING_BACK",
      },
    ],
    type_Billable: [
      {
        text: "$vuetify.category.cols.billable.YES",
        value: "YES",
      },
      {
        text: "$vuetify.category.cols.billable.NO",
        value: "NO",
      },
    ],
    type_Movement_stock: [
      // {
      //   text: "$vuetify.expenses_nature.cols.type.ENTRY",
      //   value: "ENTRY"
      // },
      {
        text: "$vuetify.expenses_nature.cols.type.TRANSFER",
        value: "TRANSFER",
      },
      {
        text: "$vuetify.expenses_nature.cols.type.EXIT",
        value: "EXIT",
      },
    ],
    type_Movement: [
      {
        text: "$vuetify.expenses_nature.cols.type.ENTRY",
        value: "ENTRY",
      },
      {
        text: "$vuetify.expenses_nature.cols.type.EXIT",
        value: "EXIT",
      },
    ],
    type_language: [
      {
        text: "$vuetify.dish.cols.language.FR",
        value: "fr",
      },
      {
        text: "$vuetify.dish.cols.language.EN",
        value: "en",
      },
    ],
    type_action: [
      {
        text: "$vuetify.ingredient.cols.type_action.ADD",
        value: "ADD",
      },
      {
        text: "$vuetify.ingredient.cols.type_action.REMOVE",
        value: "REMOVE",
      },
    ],
    payment: [
      {
        text: "$vuetify.bills.cols.payment_method.CASH",
        value: "CASH",
      },
      {
        text: "$vuetify.bills.cols.payment_method.OM",
        value: "OM",
      },
      {
        text: "$vuetify.bills.cols.payment_method.MOMO",
        value: "MOMO",
      },
      {
        text: "$vuetify.bills.cols.payment_method.BANK_CARD",
        value: "BANK_CARD",
      },
      {
        text: "$vuetify.patientaccount.cols.type_account.PREPAID",
        value: "PREPAID",
      },
    ],
    export: [
      {
        text: "$vuetify.itemsMovement.cols.export.ALL",
        value: "1",
      },
      {
        text: "$vuetify.itemsMovement.cols.export.BILLS_LIST",
        value: "2",
      },
      {
        text: "$vuetify.itemsMovement.cols.export.SUPPLIES_LIST",
        value: "3",
      },
      {
        text: "$vuetify.itemsMovement.cols.export.MOVEMENTS_LIST",
        value: "4",
      },
    ],
    type_Patient_shape: [
      {
        text: "$vuetify.patient.cols.patient_shape.NORMAL",
        value: "NORMAL",
      },
      {
        text: "$vuetify.patient.cols.patient_shape.COVERED",
        value: "COVERED",
      },
      {
        text: "$vuetify.patient.cols.patient_shape.EMPLOYEE",
        value: "EMPLOYEE",
      },
      {
        text: "$vuetify.patient.cols.patient_shape.INDIGENT",
        value: "INDIGENT",
      },
    ],
    patient_shape: [
      {
        text: "$vuetify.patient.cols.patient_shape.NORMAL",
        value: "NORMAL",
      },
      {
        text: "$vuetify.patient.cols.patient_shape.OLD",
        value: "OLD",
      },
      {
        text: "$vuetify.patient.cols.patient_shape.CHILD",
        value: "CHILD",
      },
      {
        text: "$vuetify.patient.cols.patient_shape.DISABILITY",
        value: "DISABILITY",
      },
      {
        text: "$vuetify.patient.cols.patient_shape.PREGNANT",
        value: "PREGNANT",
      },
    ],
    acuity: [
      {
        text: "$vuetify.ophtamologique.cols.acuity.1010",
        value: "10/10",
      },
      {
        text: "$vuetify.ophtamologique.cols.acuity.910",
        value: "9/10",
      },
      {
        text: "$vuetify.ophtamologique.cols.acuity.810",
        value: "8/10",
      },
      {
        text: "$vuetify.ophtamologique.cols.acuity.710",
        value: "7/10",
      },
      {
        text: "$vuetify.ophtamologique.cols.acuity.610",
        value: "6/10",
      },
      {
        text: "$vuetify.ophtamologique.cols.acuity.510",
        value: "5/10",
      },
      {
        text: "$vuetify.ophtamologique.cols.acuity.410",
        value: "4/10",
      },
      {
        text: "$vuetify.ophtamologique.cols.acuity.310",
        value: "3/10",
      },
      {
        text: "$vuetify.ophtamologique.cols.acuity.210",
        value: "2/10",
      },
      {
        text: "$vuetify.ophtamologique.cols.acuity.110",
        value: "1/10",
      },
      {
        text: "$vuetify.ophtamologique.cols.acuity.CF5M",
        value: "CF 5m",
      },
      {
        text: "$vuetify.ophtamologique.cols.acuity.CF4M",
        value: "CF 4m",
      },
      {
        text: "$vuetify.ophtamologique.cols.acuity.CF3M",
        value: "CF 3m",
      },
      {
        text: "$vuetify.ophtamologique.cols.acuity.CF2M",
        value: "CF 2m",
      },
      {
        text: "$vuetify.ophtamologique.cols.acuity.CF1M",
        value: "CF 1m",
      },
      {
        text: "$vuetify.ophtamologique.cols.acuity.HM",
        value: "HM",
      },
      {
        text: "$vuetify.ophtamologique.cols.acuity.LP",
        value: "LP",
      },
      {
        text: "$vuetify.ophtamologique.cols.acuity.NLP",
        value: "NLP",
      },
    ],
    appointment_type: [
      {
        text: "$vuetify.patient.cols.appointment_type.GENERAL",
        value: "GENERAL",
      },
      {
        text: "$vuetify.patient.cols.appointment_type.SPECIALIST",
        value: "SPECIALIST",
      },
      {
        text: "$vuetify.patient.cols.appointment_type.CONSULTANT",
        value: "CONSULTANT",
      },
    ],
    appointment_status: [
      {
        text: "$vuetify.appointment.cols.appointment_status.NOT_STARTED",
        value: "NOT_STARTED",
      },
      {
        text: "$vuetify.appointment.cols.appointment_status.WAITING",
        value: "WAITING",
      },
      {
        text: "$vuetify.appointment.cols.appointment_status.PENDING",
        value: "PENDING",
      },
      {
        text: "$vuetify.appointment.cols.appointment_status.FINISHED",
        value: "FINISHED",
      },
    ],
    mission_status: [
      {
        text: "$vuetify.employeeMission.cols.status.NOT_STARTED",
        value: "NOT_STARTED",
      },
      {
        text: "$vuetify.employeeMission.cols.status.PENDING",
        value: "PENDING",
      },
      {
        text: "$vuetify.employeeMission.cols.status.FINISHED",
        value: "FINISHED",
      },
    ],
    status_consultation: [
      {
        text: "$vuetify.consultation.cols.status.WAITING",
        value: "WAITING",
      },
      {
        text: "$vuetify.consultation.cols.status.PENDING",
        value: "PENDING",
      },
      {
        text: "$vuetify.consultation.cols.status.FINISHED",
        value: "FINISHED",
      },
    ],

    type_Blood_group: [
      {
        text: "$vuetify.patient.cols.blood_group.titleAM",
        value: "A-",
      },
      {
        text: "$vuetify.patient.cols.blood_group.titleAP",
        value: "A+",
      },
      {
        text: "$vuetify.patient.cols.blood_group.titleBM",
        value: "B-",
      },
      {
        text: "$vuetify.patient.cols.blood_group.titleBP",
        value: "B+",
      },
      {
        text: "$vuetify.patient.cols.blood_group.titleABM",
        value: "AB-",
      },
      {
        text: "$vuetify.patient.cols.blood_group.titleABP",
        value: "AB+",
      },
      {
        text: "$vuetify.patient.cols.blood_group.titleOM",
        value: "O-",
      },
      {
        text: "$vuetify.patient.cols.blood_group.titleOP",
        value: "O+",
      },
    ],
    type_Electrophoresis: [
      {
        text: "$vuetify.patient.cols.electrophoresis.titleAA",
        value: "AA",
      },
      {
        text: "$vuetify.patient.cols.electrophoresis.titleAS",
        value: "AS",
      },
      {
        text: "$vuetify.patient.cols.electrophoresis.titleSS",
        value: "SS",
      },
    ],
    type_Religion: [
      {
        text: "$vuetify.patient.cols.religion.titleC",
        value: "CATHOLIQUE",
      },
      {
        text: "$vuetify.patient.cols.religion.titleP",
        value: "PROTESTANT",
      },
      {
        text: "$vuetify.patient.cols.religion.titleO",
        value: "ORTHODOXE",
      },
      {
        text: "$vuetify.patient.cols.religion.titleA",
        value: "ANIMISTE",
      },
      {
        text: "$vuetify.patient.cols.religion.titleM",
        value: "MUSULMAN",
      },
      {
        text: "$vuetify.patient.cols.religion.titleTJ",
        value: "TEMOIN JEHOVAH",
      },
      {
        text: "$vuetify.patient.cols.religion.titleOT",
        value: "OTHER",
      },
    ],
    type_Relation: [
      {
        text: "$vuetify.folder.cols.relation.titleM",
        value: "ME",
      },
      {
        text: "$vuetify.folder.cols.relation.titleC",
        value: "CHILDREN",
      },
      {
        text: "$vuetify.folder.cols.relation.titleWH",
        value: "HUSBAND_OR_WIFE",
      },
      {
        text: "$vuetify.folder.cols.relation.titleO",
        value: "OTHER",
      },
    ],
    type_ID: [
      {
        text: "$vuetify.patient.cols.type_id.titleP",
        value: "PASSPORT",
      },
      {
        text: "$vuetify.patient.cols.type_id.titleC",
        value: "CNI",
      },
      {
        text: "$vuetify.patient.cols.type_id.titleO",
        value: "OTHER",
      },
    ],
    type_Reminder: [
      {
        text: "$vuetify.reminders.cols.type.auto",
        value: "REMINDER_STATUS_AUTO",
      },
      {
        text: "$vuetify.reminders.cols.type.manual",
        value: "REMINDER_STATUS_MANUAL",
      },
    ],
    mode_anesthesia: [
      {
        text: "$vuetify.surgeryPatient.cols.mode_anesthesia.GENERAL_ANESTHESIA",
        value: "GENERAL_ANESTHESIA",
      },
      {
        text: "$vuetify.surgeryPatient.cols.mode_anesthesia.SPINAL_ANESTHESIA",
        value: "SPINAL_ANESTHESIA",
      },
      {
        text: "$vuetify.surgeryPatient.cols.mode_anesthesia.EPIDURAL_ANALGESIA",
        value: "EPIDURAL_ANALGESIA",
      },
      {
        text: "$vuetify.surgeryPatient.cols.mode_anesthesia.LOCAL_ANESTHESIA",
        value: "LOCAL_ANESTHESIA",
      },
    ],
    type_Status: [
      {
        text: "$vuetify.bugs.cols.status.open",
        value: "OPEN",
      },
      {
        text: "$vuetify.bugs.cols.status.pending",
        value: "PENDING",
      },
      {
        text: "$vuetify.bugs.cols.status.solve",
        value: "SOLVE",
      },
    ],
    blood_transfusion: [
      {
        text: "$vuetify.surgeryPatient.cols.blood_transfusion.DEFORE_PROCEDURE",
        value: "DEFORE_PROCEDURE",
      },
      {
        text: "$vuetify.surgeryPatient.cols.blood_transfusion.DURING_PROCEDURE",
        value: "DURING_PROCEDURE",
      },
    ],
    threads: [
      {
        text: "$vuetify.surgeryPatient.cols.type_suture_threads.ABSORBABLE",
        value: "ABSORBABLE",
      },
      {
        text: "$vuetify.surgeryPatient.cols.type_suture_threads.NOT_ABSORBABLE",
        value: "NOT_ABSORBABLE",
      },
      {
        text: "$vuetify.surgeryPatient.cols.type_suture_threads.NATURAL",
        value: "NATURAL",
      },
      {
        text: "$vuetify.surgeryPatient.cols.type_suture_threads.SYNTHETIC",
        value: "SYNTHETIC",
      },
      {
        text: "$vuetify.surgeryPatient.cols.type_suture_threads.BRAIDS",
        value: "BRAIDS",
      },
      {
        text: "$vuetify.surgeryPatient.cols.type_suture_threads.MONOFILAMENTS",
        value: "MONOFILAMENTS",
      },
      {
        text: "$vuetify.surgeryPatient.cols.type_suture_threads.NOTCHED",
        value: "NOTCHED",
      },
    ],
    type_MaritalStatus: [
      {
        text: "$vuetify.patient.cols.maritalStatus.SINGLE",
        value: "SINGLE",
      },
      {
        text: "$vuetify.patient.cols.maritalStatus.MARRIED",
        value: "MARRIED",
      },
      {
        text: "$vuetify.patient.cols.maritalStatus.DIVORCE",
        value: "DIVORCE",
      },
      {
        text: "$vuetify.patient.cols.maritalStatus.WIDOW",
        value: "WIDOW",
      },
    ],
    fetal: [
      {
        text: "$vuetify.pregnancy_visit.cols.fetal_movement.PRESENT",
        value: "PRESENT",
      },
      {
        text: "$vuetify.pregnancy_visit.cols.fetal_movement.ABSENT",
        value: "ABSENT",
      },
    ],
    position: [
      {
        text: "$vuetify.pregnancy_visit.cols.position.LONGITUDINAL",
        value: "LONGITUDINAL",
      },
      {
        text: "$vuetify.pregnancy_visit.cols.position.TRANSVERSE",
        value: "TRANSVERSE",
      },
      {
        text: "$vuetify.pregnancy_visit.cols.position.OBLIQUE",
        value: "OBLIQUE",
      },
    ],
    position_doctor: [
      {
        text: "$vuetify.pregnancy_visit.cols.position.INTERNAL",
        value: "INTERNAL",
      },
      {
        text: "$vuetify.pregnancy_visit.cols.position.EXTERNAL",
        value: "EXTERNAL",
      },
    ],
    presentation: [
      {
        text: "$vuetify.pregnancy_visit.cols.presentation.CEPHALIC",
        value: "CEPHALIC",
      },
      {
        text: "$vuetify.pregnancy_visit.cols.presentation.SEAT",
        value: "SEAT",
      },
      {
        text: "$vuetify.pregnancy_visit.cols.presentation.TRANSVERSE",
        value: "TRANSVERSE",
      },
      {
        text: "$vuetify.pregnancy_visit.cols.presentation.VARIABLE",
        value: "VARIABLE",
      },
    ],
    category: [
      {
        text: "$vuetify.background.cols.category.OBSTETRICAL_GYNECOLOGISTS",
        value: "OBSTETRICAL_GYNECOLOGISTS",
      },
      {
        text: "$vuetify.background.cols.category.MEDICAL",
        value: "MEDICAL",
      },
      {
        text: "$vuetify.background.cols.category.SURGICAL",
        value: "SURGICAL",
      },
      {
        text: "$vuetify.background.cols.category.FAMILY",
        value: "FAMILY",
      },
      {
        text: "$vuetify.background.cols.category.ANESTHESIA",
        value: "ANESTHESIA",
      },
      {
        text: "$vuetify.background.cols.category.ALLERGY",
        value: "ALLERGY",
      },
    ],
    categoryOpht: [
      {
        text: "$vuetify.background.cols.category.MEDICAL",
        value: "MEDICAL",
      },
      {
        text: "$vuetify.background.cols.category.SURGICAL",
        value: "SURGICAL",
      },
      {
        text: "$vuetify.background.cols.category.FAMILY",
        value: "FAMILY",
      },
      {
        text: "$vuetify.background.cols.category.ALLERGY",
        value: "ALLERGY",
      },
      {
        text: "$vuetify.background.cols.category.ANESTHESIA",
        value: "ANESTHESIA",
      },
      {
        text: "$vuetify.ophtamologique.cols.ophtalmologic_back.title",
        value: "OPHTALMOLOGIC",
      },
    ],
    consultation_type: [
      {
        text: "$vuetify.consultation.cols.consultation_type.MEDICAL",
        value: "MEDICAL",
      },
      {
        text: "$vuetify.consultation.cols.consultation_type.PRENATAL",
        value: "PRENATAL",
      },
      {
        text: "$vuetify.consultation.cols.consultation_type.OPHTALMOLOGIC",
        value: "OPHTALMOLOGIC",
      },
      {
        text: "$vuetify.consultation.cols.consultation_type.DENTAL",
        value: "DENTAL",
      },
    ],
    visit: [
      {
        text: "$vuetify.consultation.cols.visit.1ST_VISIT",
        value: "1ST_VISIT",
      },
      {
        text: "$vuetify.consultation.cols.visit.2RD_VISIT",
        value: "2RD_VISIT",
      },
      {
        text: "$vuetify.consultation.cols.visit.3RD_VISIT",
        value: "3RD_VISIT",
      },
      {
        text: "$vuetify.consultation.cols.visit.4TH_VISIT",
        value: "4TH_VISIT",
      },
      {
        text: "$vuetify.consultation.cols.visit.5TH_VISIT",
        value: "5TH_VISIT",
      },
    ],
    tbm: [
      {
        text: "$vuetify.background.cols.tbm.HTA",
        value: "HTA",
      },
      {
        text: "$vuetify.background.cols.tbm.DIABETE",
        value: "DIABETE",
      },
      {
        text: "$vuetify.background.cols.tbm.ASTHMA",
        value: "ASTHMA",
      },
      {
        text: "$vuetify.background.cols.tbm.HEART_DISEASE",
        value: "HEART_DISEASE",
      },
      {
        text: "$vuetify.background.cols.tbm.PNEUMONIA",
        value: "PNEUMONIA",
      },
      {
        text: "$vuetify.background.cols.tbm.NEUROPATHY",
        value: "NEUROPATHY",
      },
      {
        text: "$vuetify.background.cols.tbm.NEPHROPATHY",
        value: "NEPHROPATHY",
      },
      {
        text: "$vuetify.background.cols.tbm.UROPATHY",
        value: "UROPATHY",
      },
      {
        text: "$vuetify.background.cols.tbm.EPILEPSIY",
        value: "EPILEPSIY ",
      },
      {
        text: "$vuetify.background.cols.tbm.LIVER_PROBLEMS",
        value: "LIVER_PROBLEMS",
      },
      {
        text: "$vuetify.background.cols.tbm.EAR_DISCHARGE",
        value: "EAR_DISCHARGE",
      },
      {
        text: "$vuetify.background.cols.tbm.SKIN_LESIONS",
        value: "SKIN_LESIONS",
      },
      {
        text: "$vuetify.background.cols.tbm.HYPERTENSION",
        value: "HYPERTENSION",
      },
    ],
    tbs: [
      {
        text: "$vuetify.background.cols.tbs.CAESAREAN_SECTION",
        value: "CAESAREAN_SECTION",
      },
      {
        text: "$vuetify.background.cols.tbs.HYSTERECTOMY",
        value: "HYSTERECTOMY",
      },
      {
        text: "$vuetify.background.cols.tbs.LAPAROTOMY",
        value: "LAPAROTOMY",
      },
      {
        text: "$vuetify.background.cols.tbs.HERNIOGRAPHY",
        value: "HERNIOGRAPHY",
      },
    ],
    op: [
      {
        text: "$vuetify.ophtamologique.cols.ophtalmologic_back.GLAUCOMA",
        value: "GLAUCOMA",
      },
      {
        text: "$vuetify.ophtamologique.cols.ophtalmologic_back.EYE_OPERATION",
        value: "EYE_OPERATION",
      },
      {
        text: "$vuetify.ophtamologique.cols.ophtalmologic_back.EYE_TRAUMA",
        value: "EYE_TRAUMA",
      },
      {
        text: "$vuetify.ophtamologique.cols.ophtalmologic_back.SQUIRT",
        value: "SQUIRT",
      },
    ],
    conjunctivae: [
      {
        text: "$vuetify.examination.cols.conjunctivae.COLORED",
        value: "COLORED",
      },
      {
        text: "$vuetify.examination.cols.conjunctivae.PALE",
        value: "PALE",
      },
    ],
    anesthesia: [
      {
        text: "$vuetify.anesthesia_general.cols.type_anesthesia.NASO_TRACHEAL_INTUBATION",
        value: "NASO_TRACHEAL_INTUBATION",
      },
      {
        text: "$vuetify.anesthesia_general.cols.type_anesthesia.WITHOUT_INTUBATION",
        value: "WITHOUT_INTUBATION",
      },
    ],
    eye: [
      {
        text: "$vuetify.anesthesia_general.cols.eye_operated.RIGHT_EYE",
        value: "RIGHT_EYE",
      },
      {
        text: "$vuetify.anesthesia_general.cols.eye_operated.LEFT_EYE",
        value: "LEFT_EYE",
      },
    ],
    patient_below_15: [
      {
        text: "$vuetify.anesthesia_general.cols.patient_below_15.GESTATIONAL_AGE",
        value: "GESTATIONAL_AGE",
      },
      {
        text: "$vuetify.anesthesia_general.cols.patient_below_15.NICU",
        value: "NICU",
      },
      {
        text: "$vuetify.anesthesia_general.cols.patient_below_15.VENTILATED",
        value: "VENTILATED",
      },
    ],
    jaundice: [
      {
        text: "$vuetify.examination.cols.jaundice.YES",
        value: "YES",
      },
      {
        text: "$vuetify.examination.cols.jaundice.NO",
        value: "NO",
      },
    ],
    type_prosthetics: [
      {
        text: "$vuetify.consultation.cols.type_prosthetics.removable",
        value: "removable",
      },
      {
        text: "$vuetify.consultation.cols.type_prosthetics.fixed",
        value: "fixed",
      },
    ],
    care: [
      {
        text: "$vuetify.consultation.cols.care.caries_care",
        value: "caries_care",
      },
      {
        text: "$vuetify.consultation.cols.care.endodontic_treatment",
        value: "endodontic_treatment",
      },
      {
        text: "$vuetify.consultation.cols.care.descaling",
        value: "descaling",
      },
      {
        text: "$vuetify.consultation.cols.care.surfacing",
        value: "surfacing",
      },
      {
        text: "$vuetify.consultation.cols.care.oral_dental_trauma",
        value: "oral_dental_trauma",
      },
      {
        text: "$vuetify.consultation.cols.care.dental_extraction",
        value: "dental_extraction",
      },
      {
        text: "$vuetify.consultation.cols.care.prosthetics",
        value: "prosthetics",
      },
    ],
    condition: [
      {
        text: "$vuetify.examination.cols.condition.GOOD",
        value: "GOOD",
      },
      {
        text: "$vuetify.examination.cols.condition.FAIR",
        value: "FAIR",
      },
      {
        text: "$vuetify.examination.cols.condition.ALTERED",
        value: "ALTERED",
      },
    ],
    symptoms: [
      {
        text: "$vuetify.ophtamologique.cols.interrogation.PAIN",
        value: "PAIN",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.DECREASED_VISUAL_ACUITY",
        value: "DECREASED_VISUAL_ACUITY",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.LTCH",
        value: "LTCH",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.SECRETIONS",
        value: "SECRETIONS",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.EYE_CHANGE",
        value: "EYE_CHANGE",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.blurred_view",
        value: "blurred_view",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.Halos",
        value: "Halos",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.Flashes_light",
        value: "Flashes_light",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.Floaters",
        value: "Floaters",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.Irritation",
        value: "Irritation",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.Foreign_body_sensation_",
        value: "Foreign_body_sensation_",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.Photophobia",
        value: "Photophobia",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.Diplopia",
        value: "Diplopia",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.WATERY_EYES",
        value: "WATERY_EYES",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.ITCH",
        value: "ITCH",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.FLOW",
        value: "FLOW",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.CORRECTING_EYESIGHT",
        value: "CORRECTING_EYESIGHT",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.HEADACHE",
        value: "HEADACHE",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.OTALGIA",
        value: "OTALGIA",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.RUNNY_NOSE",
        value: "RUNNY_NOSE",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.SORE_THROAT",
        value: "SORE_THROAT",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.COUGH",
        value: "COUGH",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.NAUSEA",
        value: "NAUSEA",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.DSCHARGE",
        value: "DSCHARGE",
      },
      {
        text: "$vuetify.ophtamologique.cols.interrogation.JOINT_INFLAMMATION",
        value: "JOINT_INFLAMMATION",
      },
    ],
    others: [
      {
        text: "$vuetify.other_oui_informations.cols.other.check_icc",
        value: "test_duochrome",
      },
      {
        text: "$vuetify.other_refraction_informations.cols.other.test_duochrome",
        value: "test_duochrome",
      },
      {
        text: "$vuetify.other_refraction_informations.cols.other.patient_pg",
        value: "patient_pg",
      },
      {
        text: "$vuetify.other_refraction_informations.cols.other.present_nh",
        value: "present_nh",
      },
      {
        text: "$vuetify.other_refraction_informations.cols.other.change_glasse",
        value: "change_glasse",
      },
      {
        text: "$vuetify.other_refraction_informations.cols.other.cyclopegic_refraction",
        value: "cyclopegic_refraction",
      },
    ],
    sys_options: [
      {
        text: "$vuetify.ophtamologique.cols.type_dias.RIGHT_ARM",
        value: "RIGHT_ARM",
      },
      {
        text: "$vuetify.ophtamologique.cols.type_dias.LEFT_ARM",
        value: "LEFT_ARM",
      },
    ],
    type_account: [
      {
        text: "$vuetify.patientaccount.cols.type_account.PRIVATE",
        value: "PRIVATE",
      },
      {
        text: "$vuetify.patientaccount.cols.type_account.INSURED",
        value: "INSURED",
      },
      {
        text: "$vuetify.patientaccount.cols.type_account.CORPORATE",
        value: "CORPORATE",
      },
      {
        text: "$vuetify.patientaccount.cols.type_account.SOCIAL",
        value: "SOCIAL",
      },
      {
        text: "$vuetify.patientaccount.cols.type_account.PREPAID",
        value: "PREPAID",
      },
      {
        text: "$vuetify.patientaccount.cols.type_account.DEPENDENT",
        value: "DEPENDENT",
      },
    ],
    type_reportings: [
      {
        text: "$vuetify.type_reportings.SMS_DAY",
        value: "SMS_DAY",
      },
      {
        text: "$vuetify.type_reportings.MAIL_DAY",
        value: "MAIL_DAY",
      },
      {
        text: "$vuetify.type_reportings.MAIL_SMS_MONTH",
        value: "MAIL_SMS_MONTH",
      },
    ],
  },
  getters: {
    roles: (state) => {
      return state.roles;
    },
    rolesR: (state) => {
      return state.rolesR;
    },
    type_advantage: (state) => {
      return state.type_advantage;
    },
    action_type: (state) => {
      return state.action_type;
    },
    days: (state) => {
      return state.days;
    },
    position: (state) => {
      return state.position;
    },
    position_doctor: (state) => {
      return state.position_doctor;
    },
    fetal: (state) => {
      return state.fetal;
    },
    presentation: (state) => {
      return state.presentation;
    },
    category: (state) => {
      return state.category;
    },
    categoryOpht: (state) => {
      return state.categoryOpht;
    },
    consultation_type: (state) => {
      return state.consultation_type;
    },
    visit: (state) => {
      return state.visit;
    },
    examination: (state) => {
      return state.examination;
    },
    anomaly: (state) => {
      return state.anomaly;
    },
    rolesADM: (state) => {
      return state.rolesADM;
    },
    type_Gender: (state) => {
      return state.type_Gender;
    },
    type_room_status: (state) => {
      return state.type_room_status;
    },
    tbm: (state) => {
      return state.tbm;
    },
    tbs: (state) => {
      return state.tbs;
    },
    op: (state) => {
      return state.op;
    },
    condition: (state) => {
      return state.condition;
    },
    symptoms: (state) => {
      return state.symptoms;
    },
    others: (state) => {
      return state.others;
    },
    sys_options: (state) => {
      return state.sys_options;
    },
    jaundice: (state) => {
      return state.jaundice;
    },
    anesthesia: (state) => {
      return state.anesthesia;
    },
    eye: (state) => {
      return state.eye;
    },
    patient_below_15: (state) => {
      return state.patient_below_15;
    },
    type_glass: (state) => {
      return state.type_glass;
    },
    type_material: (state) => {
      return state.type_material;
    },
    glass_treatments: (state) => {
      return state.glass_treatments;
    },
    filter: (state) => {
      return state.filter;
    },
    type_solar: (state) => {
      return state.type_solar;
    },
    hue: (state) => {
      return state.hue;
    },
    cat_hue: (state) => {
      return state.cat_hue;
    },
    type_prosthetics: (state) => {
      return state.type_prosthetics;
    },
    care: (state) => {
      return state.care;
    },
    conjunctivae: (state) => {
      return state.conjunctivae;
    },
    type_stoppage: (state) => {
      return state.type_stoppage;
    },
    type_bills: (state) => {
      return state.type_bills;
    },
    number_bed: (state) => {
      return state.number_bed;
    },
    type_certificate: (state) => {
      return state.type_certificate;
    },
    status_occupation: (state) => {
      return state.status_occupation;
    },
    type_accommodation: (state) => {
      return state.type_accommodation;
    },
    type_cash_movement: (state) => {
      return state.type_cash_movement;
    },
    type_account: (state) => {
      return state.type_account;
    },
    type_emergency: (state) => {
      return state.type_emergency;
    },
    type_consultation: (state) => {
      return state.type_consultation;
    },
    type_cash: (state) => {
      return state.type_cash;
    },
    type_product: (state) => {
      return state.type_product;
    },
    type_products: (state) => {
      return state.type_products;
    },
    type_shape: (state) => {
      return state.type_shape;
    },
    type_Billable: (state) => {
      return state.type_Billable;
    },
    type_Movement: (state) => {
      return state.type_Movement;
    },
    type_language: (state) => {
      return state.type_language;
    },
    type_action: (state) => {
      return state.type_action;
    },
    type_Movement_stock: (state) => {
      return state.type_Movement_stock;
    },
    type_Blood_group: (state) => {
      return state.type_Blood_group;
    },
    type_Patient_shape: (state) => {
      return state.type_Patient_shape;
    },
    acuity: (state) => {
      return state.acuity;
    },
    patient_shape: (state) => {
      return state.patient_shape;
    },
    appointment_type: (state) => {
      return state.appointment_type;
    },
    appointment_status: (state) => {
      return state.appointment_status;
    },
    mission_status: (state) => {
      return state.mission_status;
    },
    status_consultation: (state) => {
      return state.status_consultation;
    },
    payment: (state) => {
      return state.payment;
    },
    export: (state) => {
      return state.export;
    },
    type_Relation: (state) => {
      return state.type_Relation;
    },
    type_Religion: (state) => {
      return state.type_Religion;
    },
    type_ID: (state) => {
      return state.type_ID;
    },
    mode_anesthesia: (state) => {
      return state.mode_anesthesia;
    },
    type_Electrophoresis: (state) => {
      return state.type_Electrophoresis;
    },
    type_Status: (state) => {
      return state.type_Status;
    },
    blood_transfusion: (state) => {
      return state.blood_transfusion;
    },
    threads: (state) => {
      return state.threads;
    },
    type_MaritalStatus: (state) => {
      return state.type_MaritalStatus;
    },
    type_Center: (state) => {
      return state.type_Center;
    },
    employeeLeaveStatus: (state) => {
      return state.employeeLeaveStatus;
    },
    type_leave: (state) => {
      return state.type_leave;
    },
    type_bonus: (state) => {
      return state.type_bonus;
    },
    notification: (state) => {
      return state.notification;
    },
    snackbar: (state) => {
      return state.snackbar;
    },
    allowedLanguage: (state) => {
      return state.allowedLanguage;
    },
    defaultLang: (state) => {
      return state.defaultLang;
    },
  },
  mutations: {
    [SNACKBAR](state, snackbar) {
      state.snackbar = snackbar;
    },
    [SET_LANG](state, lang) {
      state.lang = lang;
    },
    [NOTIFICATION](state, notification) {
      state.notification = notification;
    },
  },
  actions: {
    setLang: (store, lang) => {
      store.commit([SET_LANG], lang);
    },
    showNotification: ({ commit }, destination) => {
      // Object.assign copie les valeurs des propriétés de defaultNotication
      // pour placer dans newNotification. {} est la cible
      // defaultNotification est la SOURCE
      let newNotification = Object.assign({}, defaultNotification, destination);
      commit(NOTIFICATION, newNotification);

      // Délai de 6s avant d'acter la mutation NOTIFICATION
      let snackbar = setTimeout(function () {
        commit(NOTIFICATION, defaultNotification);
      }, newNotification.timeout);
      commit(SNACKBAR, snackbar);
    },
    request: (store, params) => {
      return new Promise((resolve, reject) => {
        Vue.axios({
          ...params,
        })
          .then((response) => {
            resolve(response);
            //console.log("str", response)
          })
          .catch((error) => {
            reject(error);
          })
          .then(() => {
            resolve();
          });
      });
    },
  },
  modules: {},
});
