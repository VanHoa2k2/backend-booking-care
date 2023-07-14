import db from "../models/index";

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
          if (
            !data.name || !data.address ||
            !data.imageBase64 ||
            !data.descriptionHtml ||
            !data.descriptionMarkdown
          ) {
            resolve({
              errCode: 1,
              errMessage: "Missing required param !",
            });
          } else {
            await db.Clinic.create({
              name: data.name,
              address: data.address,
              image: data.imageBase64,
              descriptionHtml: data.descriptionHtml,
              descriptionMarkdown: data.descriptionMarkdown,
            });
    
            resolve({
              errCode: 0,
              errMessage: "ok",
            });
          }
        } catch (e) {
          reject(e);
        }
    });
}

let editClinic = (data) => {
  return new Promise(async(resolve, reject) => {
    try {
      if (!data.id) {
          resolve({
            errCode: 1,
            errMessage: "Missing required param !",
      })
    } else {
      let clinic = await db.Clinic.findOne({
        where: { id: data.id },
        raw: false,
      });

      if(clinic) {
        clinic.name = data.name;
        clinic.address = data.address;
        clinic.descriptionHtml = data.descriptionHtml;
        clinic.descriptionMarkdown = data.descriptionMarkdown;
        
        if(data.imageBase64) {
          clinic.imageBase64 = data.imageBase64;
        }

        await clinic.save();

        resolve({
          errCode: 0,
          message: "Update the clinic succeeds!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Clinic's not found",
        });
      }
    }
    } catch (e) {
      reject(e);
    }
  })
}

let getALLClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll();
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: "ok",
        data,
      });
    } catch (e) {
      reject(e);
    }
  })
}

let getDetailClinicById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required param !",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: { id: inputId },
          attributes: ["name", "address", "descriptionHtml", "descriptionMarkdown"],
        });

        if (data) {
          let doctorClinic = [];

          doctorClinic = await db.Doctor_infor.findAll({
              where: { clinicId: inputId },
              attributes: ["doctorId", "provinceId"],
            });

          data.doctorClinic = doctorClinic;
        } else data = {};
        resolve({
          errCode: 0,
          errMessage: "ok!",
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
    createClinic: createClinic,
    getALLClinic: getALLClinic,
    getDetailClinicById: getDetailClinicById,
    editClinic: editClinic,
}