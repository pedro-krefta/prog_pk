const Entrega = require('../models/entrega')

const cadastar = async(req,res)=>{
    const valores = req.body

    try{
        await Entrega.create(valores)
        res.status(200).json({message: 'Entrega cadastrada com sucesso'})
    }catch(err){
        console.error('erro ao cadastrar')
        res.status(400).json({message: 'erro ao cadastrar'})
    }
}

module.exports = {cadastar}