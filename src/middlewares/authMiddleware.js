import jwt from 'jsonwebtoken'
// import User from '../models/User'

export default /*async*/ (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ message: 'invalid token' })
    }

    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJjYXJsb3NzYW50YW5hLmRlc2VudkBnbWFpbC5jb20
    const [typeAuthorization, token] = authorization.split(' ')

    if (!typeAuthorization || typeAuthorization !== 'Bearer') {

        return res.status(401).json({ message: 'invalid token' })
    }

    try {
        // o verifiy retona o payload que foi criado no momento que o token foi criado (id + email)
        const dados = jwt.verify(token, process.env.TOKEN_SECRET)
        const { id, email } = dados


        // Existe uma imensa discussão na internet se é realmente necessário verificar se o usuário não 
        // mudou o email na sua plataforma. Se ele mudou, é necessário que este token gerado já não esteja mais válido e ele tenha que 
        // novamente fazer um novo login e obter um novo token. Por outro lado isso pode trazer sérios problemas de performance se toda as vezes
        // eu tiver que ir na minha base validar se o email mudou ou não (ir em todas as rotas protegidas)

        /*
        Minha opinião como dev é que não é necessário este tipo de implementação, uma vez que o email deveria ser a chave identificadora do usuário
        e isso trás sérios problemas de performance.

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

