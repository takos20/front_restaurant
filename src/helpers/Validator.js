import store from "../store";
//var sprintf = require("sprintf-js").sprintf;
const _phonePattern =
  /^((6(7[0-9]{7}|5[0-4]{1}[0-9]{6}|8[0-4]{1}[0-9]{6}))|(6(9[0-9]{7}|5[5-9]{1}[0-9]{6}|8[6-9]{1}[0-9]{6}))|(6(6[0-9]{7}|85[0-9]{6})))$/;
const phonePattern = /^(237(6([5-9][0-9]{7}))|((242|243)[0-9]{6}))$/;
const phoneregisterpattern = /^((6([5-9][0-9]{7})))$/;
const imagepattern = /[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/;
export const isPhone = (number) => {
  return _phonePattern.test(number);
};
export const phoneH = (number) => {
  return phonePattern.test(number);
};
export const phoneR = (number) => {
  return phoneregisterpattern.test(number);
};
export const imagePattern = (number) => {
  return imagepattern.test(number);
};

export const existPackageName = (value, component) => {
  if (value === null || value === component["oldPackageName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "packages/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameTaxe = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "taxeContributions/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameDistrict = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "districts/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameIngredient = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "ingredients/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameCity = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "cities/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameDish = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "dishes/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};

export const existTranslateDish = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "dishes/translate/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};

export const existTranslateCategory = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "categories/translate/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};

export const existTranslateIgredient = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "ingredients/translate/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};

export const existNameRegion = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "regions/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameInsurance = (value, component) => {
  if (value === null || value === component["oldInsuranceName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "insurances/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNumberInsurance = (value, component) => {
  if (value === null || value === component["oldInsuranceNumber"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "insurances/number/exists",
        method: "POST",
        data: { number: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existPhoneInsurance = (value, component) => {
  if (value === null || value === component["oldInsurancePhone"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "insurances/phone/exists",
        method: "POST",
        data: { phone: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existEmailInsurance = (value, component) => {
  if (value === null || value === component["oldInsuranceName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "insurances/email/exists",
        method: "POST",
        data: { email: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existEmailAgency = (value, component) => {
  if (value === null || value === component["oldAgencyEmail"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "insurance_agencies/email/exists",
        method: "POST",
        data: { email: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};

export const existPhoneAgency = (value, component) => {
  if (value === null || value === component["oldAgencyPhone"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "insurance_agencies/phone/exists",
        method: "POST",
        data: { phone: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNumberAgency = (value, component) => {
  if (value === null || value === component["oldAgencyNumber"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "insurance_agencies/number/exists",
        method: "POST",
        data: { number: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameAgency = (value, component) => {
  if (value === null || value === component["oldAgencyName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "insurance_agencies/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existTitleDosage = (value, component) => {
  if (value === null || value === component["oldTitle"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "dosages/title/exists",
        method: "POST",
        data: { title: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameSanction = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "sanctions/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNametypeContract = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "typeContracts/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameLeave = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "leaves/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameBonus = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "performanceBonus /name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameFunction = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "functions/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};

export const existTitleTypeExam = (value, component) => {
  if (value === null || value === component["oldTitle"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "type_exams/title/exists",
        method: "POST",
        data: { title: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existTitleTypesRooms = (value, component) => {
  if (value === null || value === component["oldTitle"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "types_rooms/title/exists",
        method: "POST",
        data: { title: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};

export const existTitleTypePatient = (value, component) => {
  if (value === null || value === component["oldTitle"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "type_patients/title/exists",
        method: "POST",
        data: { title: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};

export const existTitleTypeDoctor = (value, component) => {
  if (value === null || value === component["oldTitle"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "type_doctors/title/exists",
        method: "POST",
        data: { title: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};

export const existTitleTypeDiagnostic = (value, component) => {
  if (value === null || value === component["oldTitle"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "type_diagnostics/title/exists",
        method: "POST",
        data: { title: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};

export const existTitleTypeInvestigation = (value, component) => {
  if (value === null || value === component["oldTitle"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "type_investigations/title/exists",
        method: "POST",
        data: { title: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};

export const existTitleTypeSurgery = (value, component) => {
  if (value === null || value === component["oldTitle"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "Type_surgeries/title/exists",
        method: "POST",
        data: { title: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};

export const existTitleQte = (value, component) => {
  if (value === null || value === component["oldTitle"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "qteDosages/title/exists",
        method: "POST",
        data: { title: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existTitleRadiography = (value, component) => {
  if (value === null || value === component["oldTitle"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "radiographs/title/exists",
        method: "POST",
        data: { title: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existTitleFunctional_exploration = (value, component) => {
  if (value === null || value === component["oldTitle"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "functional_explorations/title/exists",
        method: "POST",
        data: { title: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existTitleCheckup = (value, component) => {
  if (value === null || value === component["oldTitle"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "checkups/title/exists",
        method: "POST",
        data: { title: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameRoom = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "rooms/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameCunsumable = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "consumables/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameReagent = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "reagents/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameBed = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "beds/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existTitleTypeConsultation = (value, component) => {
  if (value === null || value === component["oldTitle"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "type_consultations/title/exists",
        method: "POST",
        data: { title: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existTitleSurgery = (value, component) => {
  if (value === null || value === component["oldTitle"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "suregeries/title/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};

export const existTitleLaboratory = (value, component) => {
  if (value === null || value === component["oldTitle"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "laboratoreis/title/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};

export const existTitleExamInvest = (value, component) => {
  if (value === null || value === component["oldTitle"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "exam_investigations/title/exists",
        method: "POST",
        data: { title: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};

export const existTitleDiagnostic = (value, component) => {
  if (value === null || value === component["oldTitle"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "diagnostics/title/exists",
        method: "POST",
        data: { title: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};

export const existDistrictName = (value, component) => {
  if (value === null || value === component["oldDistrictName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "districts/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existEmail = (value, component) => {
  if (value === null || value === component["oldEmail"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "users/email/exists",
        method: "POST",
        data: { email: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existPhone = (value, component) => {
  if (value === null || value === component["oldPhone"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "users/phone/exists",
        method: "POST",
        data: { phone: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existName = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "departments/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameCategory = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "categories/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existDateHour = (value, component) => {
  if (value === null || value === component["oldHour"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "appointments/date/hour/exists",
        method: "POST",
        data: {
          hour: value,
          date: component["start_appointment_date"],
          patient: component["patient"],
          doctor: component["doctor"],
        },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameshape = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "shapes/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNamedci = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "dcis/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameproduct = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "product/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existUsername = (value, component) => {
  if (value === null || value === component["oldUsername"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "users/username/exists",
        method: "POST",
        data: { username: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existRole = (value, component) => {
  if (value === null || value === component["oldRole"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "users/roles/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existModule = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "module/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameAct = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "medical_act/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameAreas = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "medical_areas/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameDoctor = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "doctors/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNamesuppliers = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "suppliers/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNamePatient = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "patients/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameDepart = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    store
      .dispatch("request", {
        url: "departments/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};
export const existNameHospital = (value, component) => {
  if (value === null || value === component["oldName"]) {
    return true;
  }
  return new Promise((resolve) => {
    console.log("ici");
    store
      .dispatch("request", {
        url: "hospitals/name/exists",
        method: "POST",
        data: { name: value },
      })
      .then(() => {
        //console.log("existe", resp);
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
};

export const isEmpty = (v) => v == null || v === "" || v.length === 0;

export const required = (validators, isRequired, errorMessage = "") => {
  if (isRequired) {
    errorMessage = errorMessage ? errorMessage : "This field is required";
    const required_ = (v) => {
      return !!v || errorMessage;
    };
    validators.push(required_);
  }
  return validators;
};

export const visible = (expression = "", maListe) => {
  maListe.forEach((element) => {
    if (
      !isEmpty(element.name_) &&
      !isEmpty(element.comparator) &&
      !isEmpty(element.element)
    ) {
      expression =
        expression +
        element.other +
        " " +
        "{" +
        element.name_ +
        "}" +
        " " +
        element.comparator +
        " " +
        "'" +
        element.element +
        "'" +
        " ";
    }
  });
  return expression;
};

export const email = (validators, errorMessage = "") => {
  errorMessage = errorMessage
    ? errorMessage
    : "This field shall be an email address";
  const email_ = (v) => {
    const EMAIL_REGEX =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return isEmpty(v) ? true : (v && EMAIL_REGEX.test(v)) || errorMessage;
  };
  validators.push(email_);
  return validators;
};

export const phone = (validators, errorMessage = "") => {
  errorMessage = errorMessage
    ? errorMessage
    : "This field shall a correct phone";
  const phone_ = (v) => {
    const PHONE_REGEX =
      /^((6(7[0-9]{7}|5[0-4]{1}[0-9]{6}|8[0-4]{1}[0-9]{6}))|(6(9[0-9]{7}|5[5-9]{1}[0-9]{6}|8[6-9]{1}[0-9]{6}))|(6(6[0-9]{7}|85[0-9]{6})))$/i;
    return isEmpty(v) ? true : (v && PHONE_REGEX.test(v)) || errorMessage;
  };
  validators.push(phone_);
  return validators;
};

export const text = (validators, validation = {}) => {
  if (validation["minLength"]) {
    validators = addMinLength(
      validators,
      validation["minLength"],
      validation["message"]
    );
  }

  if (validation["maxLength"]) {
    validators = addMaxLength(
      validators,
      validation["maxLength"],
      validation["message"]
    );
  }

  return validators;
};

const addMinLength = (validators, min, errorMessage = "") => {
  if (!isEmpty(min)) {
    const tempMin = parseFloat(min);
    if (!isNaN(tempMin)) {
      errorMessage = errorMessage
        ? errorMessage
        : "This field must be great than " + tempMin + " characters";
      const minLength = (v) => {
        return (v && v.length >= tempMin) || errorMessage;
      };
      validators.push(minLength);
    }
  }
  return validators;
};

const addMaxLength = (validators, max, errorMessage = "") => {
  if (!isEmpty(max)) {
    const tempMax = parseFloat(max);
    if (!isNaN(tempMax)) {
      errorMessage = errorMessage
        ? errorMessage
        : "This field must be less than " + tempMax + " characters";
      const maxLength = (v) => {
        return (v && v.length <= tempMax) || errorMessage;
      };
      validators.push(maxLength);
    }
  }
  return validators;
};

export const number = (validators, validation = {}, errorMessage = "") => {
  errorMessage = errorMessage ? errorMessage : "This field shall be a number";
  const number_ = (v) => {
    return isEmpty(v) ? true : (v && !isNaN(v)) || errorMessage;
  };
  validators.push(number_);

  if (validation["minValue"]) {
    validators = addMinValue(
      validators,
      validation["minValue"],
      validation["message"]
    );
  }

  if (validation["maxValue"]) {
    validators = addMaxValue(
      validators,
      validation["maxValue"],
      validation["message"]
    );
  }

  return validators;
};

const addMinValue = (validators, min, errorMessage = "") => {
  if (!isEmpty(min)) {
    const tempMin = parseFloat(min);
    if (!isNaN(tempMin)) {
      errorMessage = errorMessage
        ? errorMessage
        : "This field must be great than " + tempMin;
      const minValue = (v) => {
        const tempVal = parseFloat(v);
        return (v && !isNaN(tempVal) && tempVal >= tempMin) || errorMessage;
      };
      validators.push(minValue);
    }
  }
  return validators;
};

const addMaxValue = (validators, max, errorMessage = "") => {
  if (!isEmpty(max)) {
    const tempMax = parseFloat(max);
    if (!isNaN(tempMax)) {
      errorMessage = errorMessage
        ? errorMessage
        : "This field must be less than " + tempMax;
      const maxValue = (v) => {
        const tempVal = parseFloat(v);
        return (v && !isNaN(tempVal) && tempVal <= tempMax) || errorMessage;
      };
      validators.push(maxValue);
    }
  }
  return validators;
};

export default {
  required,
  email,
  text,
  number,
  visible,
};
