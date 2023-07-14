import specialtyService from "../services/specialtyService"

let createSpecialty = async(req, res) => {
    try {
        let infor = await specialtyService.createSpecialty(req.body)
        return res.status(200).json(infor)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getALLSpecialty = async(req, res) => {
    try {
        let infor = await specialtyService.getALLSpecialty()
        return res.status(200).json(infor)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getDetailSpecialtyById = async(req, res) => {
    try {
        let infor = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location);
        return res.status(200).json(infor)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    createSpecialty: createSpecialty,
    getALLSpecialty: getALLSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById
}