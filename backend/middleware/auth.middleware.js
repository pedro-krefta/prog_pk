const cryptoJs = require('crypto-js')
const chave = '123'

function authMiddleware(req,res,next){
    const token = req.headers['authorization']

    if(!token){
        return res.status(404).json({message: 'login nescessario'})
    }

    try{
        const bytes = cryptoJs.AES.decrypt(token, chave)
        const dadosdescriptografados = bytes.toString(cryptoJs.enc.Utf8)

        if(!dadosdescriptografados){
            return res.status(403).json({message: 'acesso proibido'})
        }

        const payload = JSON.parse(dadosdescriptografados)

        if(Date.now() > payload.expiraEm){
        res.status(400).json({message: 'tempo de login expirado! faça login novamente'})
        }

        req.usuario = payload

        next()
    }catch(err){
        console.error('erro ao verificar token')
        res.status(400).json({message: 'erro ao verificar token'})
      }
    }

module.exports = {authMiddleware}