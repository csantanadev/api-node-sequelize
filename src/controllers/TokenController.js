import User from '../models/User'
import jwt from 'jsonwebtoken'

class TokenController {

    async store(req, res) {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(401).json({ message: 'invalid email or password' })
        }

        // neste momento caso o usuário exista com o email, é devolvido a instância da classe User que está no model
        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.status(404).json({ message: 'user do not exists' })
        }

        // com a instância eu posso acessar qualquer método descrito na classe
        if (! await user.passwordIsValid(password)) {
            return res.status(404).json({ message: 'invalid password' })
        }

        const { id, nome } = user

        // criando o token com o id e o email
        const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION })
        res.json({ token, user: { id, nome, email } })
    }


}

export default new TokenController()