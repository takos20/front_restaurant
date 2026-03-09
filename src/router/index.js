import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout,
    meta: {
      auth: true,
    },
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "Expiration",
        name: "Expiration",
        component: () => import("../views/Expiration.vue"),
      },
      {
        path: "dashboard/:idD",
        name: "dashboardOrganization",
        component: () => import("./../components/dashboard/IndexOrganization"),
      },
      {
        path: "dashboard/:idD",
        name: "dashboardConsultation",
        component: () => import("./../components/dashboard/IndexConsultation"),
      },
      {
        path: "dashboard/:idD",
        name: "dashboardInvestigation",
        component: () => import("./../components/dashboard/IndexInvestigation"),
      },
      {
        path: "dashboard/:idD",
        name: "dashboardSurgery",
        component: () => import("./../components/dashboard/IndexSurgery"),
      },
      {
        path: "dashboard/:idD",
        name: "dashboardRadiography",
        component: () => import("./../components/dashboard/IndexRadiography"),
      },
      {
        path: "dashboard/:idD",
        name: "dashboardDiagnostic",
        component: () => import("./../components/dashboard/IndexDiagnostic"),
      },
      {
        path: "dashboard/:idD",
        name: "dashboardPatient",
        component: () => import("./../components/dashboard/IndexPatient"),
      },
      {
        path: "dashboard/:idD",
        name: "dashboardDoctor",
        component: () => import("./../components/dashboard/IndexDoctor"),
      },
      {
        path: "dashboard/:idD",
        name: "dashboardSecretariat",
        component: () => import("./../components/dashboard/IndexSecretariat"),
      },
      {
        path: "dashboard/:idD",
        name: "dashboardBilling",
        component: () => import("./../components/dashboard/IndexBilling"),
      },
      {
        path: "dashboard/:idD",
        name: "dashboardPharmacy",
        component: () => import("./../components/dashboard/IndexPharmacy"),
      },
      {
        path: "dashboard/:idD",
        name: "dashboardHospitalization",
        component: () =>
          import("./../components/dashboard/IndexHospitalization"),
      },
      {
        path: "/details_meeting/:idD/:id/:name",
        name: "details_meeting",
        component: () => import("../views/Details_meeting/Index"),
      },
      {
        path: "/meeting/:idD",
        name: "meeting",
        component: () => import("../views/Meeting/Index"),
      },
      {
        path: "dashboard/:idD",
        name: "dashboardLaboratory",
        component: () => import("./../components/dashboard/IndexLaboratory"),
      },
      {
        path: "dashboard/:idD",
        name: "dashboardGrh",
        component: () => import("./../components/dashboard/IndexGrh"),
      },
      {
        path: "dashboard/:idD",
        name: "dashboardInsurance",
        component: () => import("./../components/dashboard/IndexInsurance"),
      },
      {
        path: "performanceBonus/:idD",
        name: "performanceBonus",
        component: () => import("./../views/PerformanceBonus/Index"),
      },
      {
        path: "taxeContribution/:idD",
        name: "taxeContribution",
        component: () => import("./../views/TaxeContribution/Index"),
      },
      {
        path: "users/permissions/:idD",
        name: "permissions",
        component: () => import("./../components/permission/Index"),
      },
      {
        path: "/users/:idD",
        name: "users",
        component: () => import("../views/Users/Index.vue"),
      },
      {
        path: "/regions/:idD",
        name: "regions",
        component: () => import("../views/Region/Index.vue"),
      },
      {
        path: "/anesthesic_general/:idD",
        name: "anesthesic_general",
        component: () =>
          import("../views/Anesthesia_general_consultation/Index.vue"),
      },
      {
        path: "/anesthesic_local/:idD",
        name: "anesthesic_local",
        component: () =>
          import("../views/Anesthesia_local_consultation/Index.vue"),
      },
      {
        path: "/city/:idD",
        name: "city",
        component: () => import("../views/City/Index.vue"),
      },
      {
        path: "/district/:idD",
        name: "district",
        component: () => import("../views/District/Index.vue"),
      },
      {
        path: "/expenses_nature/:idD",
        name: "expenses_nature",
        component: () => import("../views/Expenses_nature/Index.vue"),
      },
      {
        path: "/purchase_order/:idD",
        name: "purchase_order",
        component: () => import("../views/Purchase_order/Index.vue"),
      },
      {
        path: "/complaints/:idD",
        name: "complaints",
        component: () => import("../views/Complaints/Index.vue"),
      },
      {
        path: "/storage_depots/:idD",
        name: "storage_depots",
        component: () => import("../views/Storage_depots/Index.vue"),
      },
      {
        path: "/types_rooms/:idD",
        name: "types_rooms",
        component: () => import("../views/Types_rooms/Index.vue"),
      },
      {
        path: "/functions/:idD",
        name: "function",
        component: () => import("../views/Function/Index.vue"),
      },
      {
        path: "/leaves/:idD",
        name: "leave",
        component: () => import("../views/Leave/Index.vue"),
      },
      {
        path: "/sanctions/:idD",
        name: "sanction",
        component: () => import("../views/Sanction/Index.vue"),
      },
      {
        path: "/hospitals/:idD",
        name: "hospitals",
        component: () => import("../views/Hospitals/Index.vue"),
      },
      {
        path: "/hospitals/:idD",
        name: "hospitals_info",
        component: () => import("../components/hospitals/profile.vue"),
      },
      {
        path: "/disciplines/:idD",
        name: "discipline",
        component: () => import("../views/Discipline/Index.vue"),
      },
      {
        path: "/presences/:idD",
        name: "presence",
        component: () => import("../views/Presence/Index.vue"),
      },
      {
        path: "/payslips/:idD",
        name: "payslips",
        component: () => import("../views/Payslips/Index.vue"),
      },
      {
        path: "/employee/:idD",
        name: "employee",
        component: () => import("../views/Employee/Index.vue"),
      },
      {
        path: "/typeContract/:idD",
        name: "typeContract",
        component: () => import("../views/TypeContract/Index.vue"),
      },
      {
        path: "/employee_leave/:idD",
        name: "employeeLeave",
        component: () => import("../views/EmployeeLeave/Index.vue"),
      },
      {
        path: "/employee_bonus/:idD",
        name: "employeeBonus",
        component: () => import("../views/EmployeeBonus/Index.vue"),
      },
      {
        path: "/employee_mission/:idD",
        name: "employeeMission",
        component: () => import("../views/EmployeeMission/Index.vue"),
      },
      {
        path: "/internal_note/:idD",
        name: "internalnote",
        component: () => import("../views/Internal_note/Index.vue"),
      },
      {
        path: "/user_note/:idD",
        name: "usernote",
        component: () => import("../components/internal_note/IndexMyNote.vue"),
      },
      {
        path: "/user_sanction/:idD",
        name: "mySanction",
        component: () => import("../components/discipline/IndexMySanction.vue"),
      },
      {
        path: "/user_leave/:idD",
        name: "myLeave",
        component: () => import("../components/employeeLeave/IndexMyLeave.vue"),
      },
      {
        path: "/user_bonus/:idD",
        name: "myBonus",
        component: () => import("../components/employeeBonus/IndexMyBonus.vue"),
      },
      {
        path: "/user_mission/:idD",
        name: "myMission",
        component: () =>
          import("../components/employeeMission/IndexMyMission.vue"),
      },
      {
        path: "/user_meeting/:idD",
        name: "myMeeting",
        component: () => import("../components/meeting/IndexMyMeeting.vue"),
      },
      {
        path: "user_paylips/:idD",
        name: "myPayslips",
        component: () => import("../components/payslips/IndexMyPayslips.vue"),
      },
      {
        path: "/medical_areas/:idD",
        name: "medical_areas",
        component: () => import("../views/Medical_Areas/Index.vue"),
      },
      {
        path: "/rooms/:idD",
        name: "rooms",
        component: () => import("../views/Rooms/Index.vue"),
      },
      {
        path: "/beds/:idD",
        name: "beds",
        component: () => import("../views/Bed/Index.vue"),
      },
      {
        path: "/hospitalizations/:idD",
        name: "hospitalizations",
        component: () => import("../views/Hospitalization/Index.vue"),
      },
      {
        path: "/medical_act/:idD",
        name: "medical_act",
        component: () => import("../views/Medical_Act/Index.vue"),
      },
      {
        path: "/type_surgery/:idD",
        name: "type_surgery",
        component: () => import("../views/Type_surgery/Index.vue"),
      },
      {
        path: "/type_diagnostic/:idD",
        name: "type_diagnostic",
        component: () => import("../views/Type_diagnostic/Index.vue"),
      },
      {
        path: "/diagnostic/:idD",
        name: "diagnostic",
        component: () => import("../views/Diagnostic/Index.vue"),
      },
      {
        path: "/type_investigation/:idD",
        name: "type_investigation",
        component: () => import("../views/Type_exam_investigation/Index.vue"),
      },
      {
        path: "/type_patient/:idD",
        name: "type_patient",
        component: () => import("../views/Type_patient/Index.vue"),
      },
      {
        path: "/type_doctor/:idD",
        name: "type_doctor",
        component: () => import("../views/Type_doctor/Index.vue"),
      },
      {
        path: "/exam_investigation/:idD",
        name: "exam_investigation",
        component: () => import("../views/Exam_investigation/Index.vue"),
      },
      {
        path: "/modules/:idD",
        name: "modules",
        component: () => import("../views/Module/Index.vue"),
      },
      {
        path: "/archives/:idD",
        name: "archives",
        component: () => import("../views/Archive/Index.vue"),
      },
      {
        path: "/backupfiles/:idD",
        name: "backupfiles",
        component: () => import("../views/BackupFile/Index.vue"),
      },
      {
        path: "/prices/:idD",
        name: "prices",
        component: () => import("../views/Prices/Index.vue"),
      },
      {
        path: "/pricesAll/:idD",
        name: "pricesAll",
        component: () => import("../views/PricesAll/Index.vue"),
      },
      {
        path: "/radiography/:idD",
        name: "radiographs",
        component: () => import("../views/Radiography/Index.vue"),
      },
      {
        path: "/history/:idD",
        name: "history",
        component: () => import("../views/History/Index"),
      },
      {
        path: "/function_exploration/:idD",
        name: "function_exploration",
        component: () => import("../views/Function_exploration/Index.vue"),
      },
      {
        path: "/checkup/:idD",
        name: "checkups",
        component: () => import("../views/Check-up/Index.vue"),
      },
      // {
      //   path: "/checkup/:idD",
      //   name: "checkups",
      //   component: () => import("../views/Check-up/Index.vue")
      // },
      {
        path: "/surgery/:idD",
        name: "surgeries",
        component: () => import("../views/Surgery/Index.vue"),
      },
      {
        path: "/laboratory/:idD",
        name: "laboratories",
        component: () => import("../views/Laboratory/Index.vue"),
      },
      {
        path: "/radioPatient/:idD",
        name: "radio_patients",
        component: () => import("../views/RadioPatient/Index.vue"),
      },
      {
        path: "/surgeryPatient/:idD",
        name: "surgery_patients",
        component: () => import("../views/Surgery_patient/Index.vue"),
      },
      {
        path: "/laboratoryPatient/:idD",
        name: "laboratory_patients",
        component: () => import("../views/Laboratory_patient/Index.vue"),
      },
      {
        path: "/exam_investigationPatient/:idD",
        name: "exam_investigation_patients",
        component: () =>
          import("../views/Exam_investigation_patient/Index.vue"),
      },
      {
        path: "/diagnosticPatient/:idD",
        name: "diagnostic_patients",
        component: () => import("../views/Diagnostic_patient/Index.vue"),
      },
      {
        path: "/checkupPatient/:idD",
        name: "checkup_patients",
        component: () => import("../views/Checkup_patient/Index.vue"),
      },
      {
        path: "/prenatal_consultation/:idD",
        name: "prenatal_consultation",
        component: () => import("../views/Prenatal_consultation/Index.vue"),
      },
      {
        path: "/pregnancy_visit/:idD",
        name: "pregnancy_visits",
        component: () => import("../views/Pregnancy_visit/Index.vue"),
      },
      {
        path: "/medical_consultation/:idD",
        name: "medical_consultation",
        component: () => import("../views/Medical_consultation/Index.vue"),
      },
      {
        path: "/consultation/:idD",
        name: "consultation",
        component: () => import("../views/Consultation/Index.vue"),
      },
      {
        path: "/type_consultation/:idD",
        name: "type_consultation",
        component: () => import("../views/Type_consultation/Index.vue"),
      },
      {
        path: "/ophtamological_consultation/:idD",
        name: "ophtamological_consultation",
        component: () =>
          import("../views/Ophtamological_consultation/Index.vue"),
      },
      {
        path: "/consultationPatient/:idD",
        name: "consultationPatient",
        component: () => import("../components/patient/IndexConsultation.vue"),
      },
      {
        path: "/ordinancePatient/:idD",
        name: "ordinancePatient",
        component: () => import("../components/patient/IndexOrdinance.vue"),
      },
      {
        path: "/appointmentPatient/:idD",
        name: "appointmentPatient",
        component: () => import("../components/patient/IndexOrdinance.vue"),
      },
      {
        path: "/dosage/:idD",
        name: "dosage",
        component: () => import("../views/Dosage/Index.vue"),
      },
      {
        path: "/type_exam/:idD",
        name: "type_exam",
        component: () => import("../views/Type_exam/Index.vue"),
      },
      {
        path: "/certificate/:idD",
        name: "certificate",
        component: () => import("../views/Certificate/Index.vue"),
      },
      {
        path: "/qteDosage/:idD",
        name: "qteDosage",
        component: () => import("../views/QteDosage/Index.vue"),
      },
      {
        path: "/ordinance/:idD",
        name: "ordinance",
        component: () => import("../views/Ordinance/Index.vue"),
      },
      {
        path: "/cash/sessions_analysis/:idD",
        name: "sessions_analysis",
        component: () => import("../views/Sessions_analysis/Index.vue"),
      },
      {
        path: "/cash/bills/:idD",
        name: "bills",
        component: () => import("../components/bills/IndexNewBills.vue"),
      },
      {
        path: "/cash/bills/:idD",
        name: "list_bills",
        component: () => import("../views/Bills/Index.vue"),
      },
      {
        path: "/cash/proforma/:idD",
        name: "proforma",
        component: () => import("../views/Bills/IndexProforma.vue"),
      },
      {
        path: "/patient/account/:idD",
        name: "patientaccount",
        component: () => import("../views/Patient_account/Index.vue"),
      },
      {
        path: "/cash/bills/:idD",
        name: "bills_analysis",
        component: () => import("../views/Bills_analysis/Index.vue"),
      },
      {
        path: "/cash/:idD",
        name: "cash",
        component: () => import("../views/Cash/Index.vue"),
      },
      {
        path: "/promotion/:idD",
        name: "promotion",
        component: () => import("../views/Promotion/Index.vue"),
      },
      {
        path: "/compose_ingredient/:idD",
        name: "compose_ingredient",
        component: () => import("../views/Compose_ingredient/Index.vue"),
      },
      {
        path: "/compose_preparation/:idD",
        name: "compose_preparation",
        component: () => import("../views/Compose_preparation/Index.vue"),
      },
      {
        path: "/promotion_rule/:idD",
        name: "promotion_rule",
        component: () => import("../views/Promotion_rule/Index.vue"),
      },
      {
        path: "/promotion_action/:idD",
        name: "promotion_action",
        component: () => import("../views/Promotion_action/Index.vue"),
      },
      {
        path: "/cash/patients_settlements/:idD",
        name: "patients_settlements",
        component: () => import("../views/Patients_settlements/Index.vue"),
      },
      {
        path: "/cash/movements_analysis/:idD",
        name: "movements_analysis",
        component: () => import("../views/Movements_analysis/Index.vue"),
      },
      {
        path: "/cash/treasury_journal/:idD",
        name: "treasury_journal",
        component: () =>
          import("../views/Movements_analysis/IndexTransfer.vue"),
      },

      {
        path: "/cash/supply_patient/:idD",
        name: "supply_patient",
        component: () => import("../views/Supply_patient/Index.vue"),
      },

      {
        path: "/departments/:idD",
        name: "departments",
        component: () => import("../views/Departments/Index.vue"),
      },
      {
        path: "/syncs/:idD",
        name: "sync",
        component: () => import("../views/Sync/Index.vue"),
      },
      {
        path: "/sync_logs/:idD",
        name: "sync_log",
        component: () => import("../views/Sync_log/Index.vue"),
      },
      {
        path: "/services/:idD",
        name: "services",
        component: () => import("../views/Services/Index.vue"),
      },
      {
        path: "/doctor/:idD",
        name: "doctor",
        component: () => import("../views/Doctor/Index.vue"),
      },
      {
        path: "/doctor/:idD/:id/:name/",
        name: "statDoctor",
        component: () => import("../components/doctor/IndexStatDoctor"),
      },
      {
        path: "/schedule/:idD",
        name: "schedule",
        component: () => import("../views/Schedule/Index.vue"),
      },
      {
        path: "/appointment/:idD",
        name: "appointment",
        component: () => import("../views/Appointment/IndexRDV.vue"),
      },
      {
        path: "/appointment_list/:idD",
        name: "appointment_list",
        component: () => import("../views/Appointment/Index.vue"),
      },
      {
        path: "/appointment_surgical/:idD",
        name: "appointment_surgical",
        component: () => import("../views/Appointment_surgical/IndexRDV.vue"),
      },
      {
        path: "/appointment_surgical_list/:idD",
        name: "appointment_surgical_list",
        component: () => import("../views/Appointment_surgical/Index.vue"),
      },
      {
        path: "/shape/:idD",
        name: "shape",
        component: () => import("../views/Shape/Index.vue"),
      },
      {
        path: "/insurance/:idD",
        name: "insurance",
        component: () => import("../views/Insurance/Index.vue"),
      },
      {
        path: "/suppliers/:idD",
        name: "suppliers",
        component: () => import("../views/Suppliers/Index.vue"),
      },
      {
        path: "/stock_management/:idD",
        name: "stock_management",
        component: () => import("../components/stock_management/Index.vue"),
      },
      // {
      //   path: "/supplies/:idD",
      //   name: "supplies",
      //   component: () => import("../components/supplies/Form.vue")
      // },
      {
        path: "/supplies/:idD",
        name: "list_supplies",
        component: () => import("../views/Supplies/Index.vue"),
      },
      {
        path: "/dci/:idD",
        name: "dci",
        component: () => import("../views/Dci/Index.vue"),
      },
      {
        path: "/product/:idD",
        name: "product",
        component: () => import("../views/Product/Index.vue"),
      },
      {
        path: "/reagent/:idD",
        name: "reagent",
        component: () => import("../views/Reagent/Index.vue"),
      },
      {
        path: "/consumable/:idD",
        name: "consumable",
        component: () => import("../views/Consumable/Index.vue"),
      },
      {
        path: "/price_level/:idD",
        name: "price_level",
        component: () => import("../views/Price_level/Index.vue"),
      },
      {
        path: "/category/:idD",
        name: "category",
        component: () => import("../views/Category/Index.vue"),
      },
      {
        path: "/dish/:idD",
        name: "dishes",
        component: () => import("../views/Dish/Index.vue"),
      },
      {
        path: "/recipe/:idD",
        name: "recipes",
        component: () => import("../views/Recipe/Index.vue"),
      },
      {
        path: "/delivery/:idD",
        name: "deliveries",
        component: () => import("../views/Delivery/Index.vue"),
      },
      {
        path: "/ingredient/:idD",
        name: "ingredients",
        component: () => import("../views/Ingredient/Index.vue"),
      },
      {
        path: "/prescription/:idD",
        name: "prescription",
        component: () => import("../views/Prescription/Index.vue"),
      },
      {
        path: "/patient/:idD",
        name: "patient",
        component: () => import("../views/Patient/Index.vue"),
      },
      {
        path: "/patient/:idD/:id/:name/",
        name: "detailsPatient",
        component: () => import("../components/patient/IndexStatPatient.vue"),
      },
      {
        path: "/patient/:idD/:id/",
        name: "detailsPatientAccount",
        component: () =>
          import("../components/patient_account/IndexDetails.vue"),
      },

      {
        path: "/cash/details_sessions_analysis/:idD",
        name: "details_sessions_analysis",
        component: () => import("../views/Details_sessions_analysis/Index"),
      },
      {
        path: "/cash/details_cash/:idD",
        name: "details_cash",
        component: () => import("../views/Cash_movement/Index"),
      },
      {
        path: "/cash/delivery/:idD",
        name: "delivery",
        component: () => import("../views/Delivery/Index"),
      },
      {
        path: "/cash/catering/:idD",
        name: "caterings",
        component: () => import("../views/Catering/Index"),
      },
      {
        path: "/cash/events/:idD",
        name: "events",
        component: () => import("../views/Event/Index"),
      },
      {
        path: "/stock_analysis/:idD",
        name: "stock_analysis",
        component: () => import("../components/ingredient/IndexStockMvt"),
      },
      {
        path: "/cash/cash_position/:idD/:id",
        name: "cash_position",
        component: () => import("../views/Cash_position/Index"),
      },
      {
        path: "/stock_management/details_stock_management/:idD/:id/:name",
        name: "details_stock_management",
        component: () => import("../components/stock_management/IndexDetails"),
      },
      {
        path: "/medical_act/details/:idD/:id/:name",
        name: "details_acts",
        component: () => import("../components/medical_act/IndexDetails"),
      },
      {
        path: "/expenses_nature/details/:idD/:id/:name",
        name: "details_expenses",
        component: () => import("../components/expenses_nature/IndexDetails"),
      },
      {
        path: "/insurance/details/:idD/:id/:name",
        name: "details_insurances",
        component: () => import("../components/insurance/IndexDetails"),
      },
      {
        path: "/profile/:idD",
        name: "profile",
        component: () => import("../components/Security/Profile"),
      },

      {
        path: "/password",
        name: "password",
        component: () => import("../components/Security/Password"),
      },
    ],
  },
  {
    path: "/register",
    name: "sign up",
    component: () => import("../views/Security/Register"),
  },
  {
    path: "/reset",
    name: "reset",
    component: () => import("../views/Security/Reset"),
  },
  {
    path: "/403",
    name: "forbidden",
    meta: { auth: true },
    component: () => import("../views/Exception/403"),
  },
  {
    path: "/404",
    name: "notfound",
    component: () => import("../views/Exception/404"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/Security/Login.vue"),
  },
  {
    path: "/landing_page",
    name: "landing_page",
    component: () => import("../views/Landing_page/Index.vue"),
  },
  {
    path: "/logout",
    name: "Logout",
    component: () => import("../views/Security/Logout.vue"),
  },
  {
    path: "*",
    redirect: { name: "notfound" },
  },
];

const router = new VueRouter({
  // mode: "history",
  routes,
});

Vue.router = router;

export default router;
