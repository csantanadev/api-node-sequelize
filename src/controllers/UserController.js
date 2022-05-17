import User from '../models/User'


class UserController {

    async store(req, res) {
        // const { email } = req.body
        try {
            /* const userExists = await User.findOne({ where: { email } })
 
             if (userExists) {
                 return res.status(400).json({ message: 'Usuário já cadastrado com esse email' })
             } */
            const user = await User.create(req.body)

            // desestruturando os campos que importam serem devolvidos
            const { id, nome, email, created_at, updated_at } = user

            return res.status(201).json({ id, nome, email, created_at, updated_at })
        }
        catch (e) {
            // erros é um array com todos os erros levantados validados no model
            if (e?.errors) {
                return res.status(400).json(
                    {
                        errors: e.errors.map(err => err.message)
                    }
                )
            }
            // se chegou aqi é por conta de erro de implementação
            return res.status(500).json({ message: 'internal server error' })
        }
    }

    async index(req, res) {
        try {
            const users = await User.findAll({ attributes: ['id', 'nome', 'email'] })
            return res.json(users)
        }
        catch (e) {
            return res.json(null)
        }
    }

    async show(req, res) {
        try {
            if (!req.params.id) {
                return res.status(400).json({ mesage: 'invalid request' })
            }

            const user = await User.findByPk(req.params.id, { attributes: ['id', 'nome', 'email'] })

            return user ? res.json(user) : res.status(404).json({ message: 'user do not exists' })
        }
        catch (e) {
            return res.json(null)
        }
    }

    async delete(req, res) {
        try {
            // esse userId é vindo lá do middleware
            if (!req.userId) {
                return res.status(400).json({ mesage: 'invalid request' })
            }

            const n = await User.destroy({ where: { id: req.userId } })
            return n === 1 ? res.status(200).json({ message: 'user was deleted successfully' }) : res.status(404).json({ message: 'user do not exists' })
        }
        catch (e) {
            return res.json(null)
        }
    }

    async update(req, res) {
        try {

            // esse userId é vindo lá do middleware
            if (!req.userId) {
                return res.status(400).json({ mesage: 'invalid request' })
            }

            // neste momento o retorno de user tem uma instancia da classe User
            const user = await User.findByPk(req.userId)

            if(!user) {
                res.status(404).json({ message: 'user do not exists' })
            }

            // o que chegou no body sera atualizado 
            const newData = await user.update(req.body)

            const { id, nome, email } = newData
            return res.json({ id, nome, email })
        }
        catch (e) {
            // erros é um array com todos os erros levantados validados no model
            if (e?.errors) {
                return res.status(400).json(
                    {
                        errors: e.errors.map(err => err.message)
                    }
                )
            }

            // se chegou aqi é por conta de erro de implementação
            return res.status(500).json({ message: 'internal server error' })
        }
    }


}

export default new UserController()

/*
  index - lista todos os usuários -> GET
  create ou store - cria um usuario -> POST
  show - mostra um usuario -> GET
  update - atualiza um usuario -> PATCH (apenas um valor alterado) OU PUT (vários valores alterados)
  delete - deleta um usuario  -> DELETE
*/ 