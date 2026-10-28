const Motorista = require('../models/motorista')
const cryptoJs = require('crypto-js')
const chave = '123'

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.nome || !valores.cnh || !valores.cpf || !valores.telefone){
        return res.status(404).json({message: 'insira todos os dados'})
    }

    try{
        const cnhHash = cryptoJs.AES.encrypt(valores.cnh, chave).toString()
        const cpfHash = cryptoJs.AES.encrypt(valores.cpf, chave).toString()

        await Motorista.create({
            nome: valores.nome,
            cnh: cnhHash,
            cpf: cpfHash,
            telefone: valores.telefone
        })
        
        res.status(200).json({message: 'Motorista cadsatrado com sucesso'})

    }catch(err){
        console.error('erro ao cadastrar')
        res.status(400).json({message: 'erro ao cadastrar'})
    }
}

const listar = async(req,res)=>{
    try{
        const dados = await Motorista.findAll()
        res.status(200).json(dados)
    }catch(err){
        console.error('erro ao listar')
        res.status(400).json({message: 'erro ao listar'})
    }
}

const consultar = async(req,res)=>{
    const nome = req.params.nome

    try{
        const dados = await Motorista.findOne({where: {nome: nome}})
        res.status(200).json(dados)
    }catch(err){
        console.error('erro ao consultar')
        res.status(400).json({message: 'erro ao consultar'})
    }
}

const apagar = async(req,res)=>{
    const id = req.params.id

    try{
        const dados = await Motorista.findByPk(id)
        if(!dados){
            return res.status(404).json({message: 'motorista não enontrado'})
        }
        await Motorista.destroy({where: {codMotorista: id}})
        res.status(200).json({message: 'motorista excluido com sucesso'})
    }catch(err){
        console.error('erro ao apagar')
        res.status(400).json({message: 'erro ao apagar'})
    }
}

module.exports = {cadastrar,listar,consultar,apagar}