import jwt from 'jsonwebtoken'
// import User from '../models/User'

export default /*async*/ (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ message: 'invalid token' })
    }
    
    const [typeAuthorization, token] = authorization.split(' ')

    if (!typeAuthorization || typeAuthorization !== 'Bearer') {

        return res.status(401).json({ message: 'invalid token' })
    }

    try {
        // o verifiy retona o payload que foi criado no momento que o token foi criado (id + email)
        const dados = jwt.verify(token, process.env.TOKEN_SECRET)
        const { id, email } = dados

        /*
        ::Expirar o token caso o usuario não exista mais por algum outro motivo::
        
        Não é necessário este tipo de implementação, uma vez que o email deveria ser a chave identificadora do usuário
        e isso trás sérios problemas de performance ter ir toda vez no bd.

        const user = await User.findOne({ where: { id, email } })
        if (!user) {
            throw new Error('token expired')
        }
        */

        // adiciona na request o id e email do usuário
        req.userId = id
        req.userEmail = email
        return next()
    }
    catch (e) {
        return res.status(401).json({ message: 'invalid token or expired' })
    }
}

