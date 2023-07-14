import ClinicService from "../services/ClinicService"

let createNewClinic = async(req, res) => {
    try {
        let infor = await ClinicService.createClinic(req.body)
        return res.status(200).json(infor)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let editClinic = async(req, res) => {
    try {
        let infor = await ClinicService.editClinic(req.body)
        return res.status(200).json(infor)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getALLClinic = async(req, res) => {
    try {
        let infor = await ClinicService.getALLClinic()
        return res.status(200).json(infor)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getDetailClinicById = async(req, res) => {
    try {
        let infor = await ClinicService.getDetailClinicById(req.query.id)
        return res.status(200).json(infor)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}


module.exports = {
    createNewClinic: createNewClinic,
    getALLClinic: getALLClinic,
    getDetailClinicById: getDetailClinicById,
    editClinic: editClinic
}