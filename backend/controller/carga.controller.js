const Carga = require('../models/carga')

const cadastrar = async(req,res)=>{
    const valores = req.body

    try{
        await Carga.create(valores)
        res.status(200).json({message: 'Carga cadastrada com sucesso'})
    }catch(err){
        console.error('erro ao cadastrar')
        res.status(400).json({message: 'erro ao cadastar'})

    }
}

module.exports = {cadastrar}