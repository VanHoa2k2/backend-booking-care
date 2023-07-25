import db from "../models/index";

let createHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
          if (
            !data.name || !data.describe ||
            !data.imageBase64 ||
            !data.descriptionHtml ||
            !data.descriptionMarkdown
          ) {
            resolve({
              errCode: 1,
              errMessage: "Missing required param !",
            });
          } else {
            await db.Handbook.create({
              name: data.name,
              describe: data.describe,
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
          console.log(e);
          reject(e);
        }
    });
}

let editHandbook = (data) => {
  return new Promise(async(resolve, reject) => {
    try {
      if (!data.id) {
          resolve({
            errCode: 1,
            errMessage: "Missing required param !",
      })
    } else {
      let Handbook = await db.Handbook.findOne({
        where: { id: data.id },
        raw: false,
      });

      if(Handbook) {
        Handbook.name = data.name;
        Handbook.describe = data.describe;
        Handbook.descriptionHtml = data.descriptionHtml;
        Handbook.descriptionMarkdown = data.descriptionMarkdown;
        
        if(data.imageBase64) {
          Handbook.imageBase64 = data.imageBase64;
        }

        await Handbook.save();

        resolve({
          errCode: 0,
          message: "Update the Handbook succeeds!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Handbook's not found",
        });
      }
    }
    } catch (e) {
      reject(e);
    }
  })
}

let getALLHandbook = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Handbook.findAll();
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

let deleteHandbook = async (handbookId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundHandbook = await db.Handbook.findOne({
        where: { id: handbookId },
      });
      if (!foundHandbook) {
        resolve({
          errCode: 2,
          errMessage: "The handbook isn't exist",
        });
      }
  
      await db.Handbook.destroy({
        where: { id: handbookId },
      });
      
      resolve({
        errCode: 0,
        message: "The handbook is deleted",
      });
    } catch (e) {
      reject(e)
    }
  });
}

let getDetailHandbookById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required param !",
        });
      } else {
        let data = await db.Handbook.findOne({
          where: { id: inputId },
          attributes: ["name", "describe", "descriptionHtml", "descriptionMarkdown"],
        });

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
    createHandbook: createHandbook,
    editHandbook: editHandbook,
    getALLHandbook: getALLHandbook,
    deleteHandbook: deleteHandbook,
    getDetailHandbookById: getDetailHandbookById,
}