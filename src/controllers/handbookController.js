import HandbookService from "../services/HandbookService"

let createNewHandbook = async(req, res) => {
    try {
        let infor = await HandbookService.createHandbook(req.body)
        return res.status(200).json(infor)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let editHandbook = async(req, res) => {
    try {
        let infor = await HandbookService.editHandbook(req.body)
        return res.status(200).json(infor)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getALLHandbook = async(req, res) => {
    try {
        let infor = await HandbookService.getALLHandbook()
        return res.status(200).json(infor)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let deleteHandbook = async(req, res) => {
    try {
        let infor = await HandbookService.deleteHandbook(req.query.id)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)

        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getDetailHandbookById = async(req, res) => {
    try {
        let infor = await HandbookService.getDetailHandbookById(req.query.id);
        return res.status(200).json(infor)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    createNewHandbook: createNewHandbook,
    editHandbook: editHandbook,
    getALLHandbook: getALLHandbook,
    deleteHandbook: deleteHandbook,
    getDetailHandbookById: getDetailHandbookById,
}