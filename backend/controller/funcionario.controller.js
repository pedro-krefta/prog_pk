const Funcionario = require('../models/funcionario')
const cryptoJs = require('crypto-js')
const chave = '123'

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.nome || !valores.email || !valores.senha){
        return res.status(404).json({message: 'insira todos os dados corretamente'})
    }

    try{
        const senhaHash = cryptoJs.AES.encrypt(valores.senha, chave).toString()

        await Funcionario.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaHash
        })

        res.status(200).json({message: 'usuario cadastrado com sucesso'})
    }catch(err){
        console.error('erro ao cadastrar')
        res.status(400).json({message: 'erro ao cadastrar'})
    }
}

module.exports = {cadastrar}