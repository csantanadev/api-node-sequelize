import Aluno from '../models/Aluno'
import Foto from '../models/Foto'

class AlunoController {

    async store(req, res) {
        try {

            const aluno = await Aluno.create(req.body)

            // desestruturando os campos que importam serem devolvidos
            const { id, nome, sobrenome, email, idade, peso, altura } = aluno

            return res.status(201).json({ id, nome, sobrenome, email, idade, peso, altura })
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
            const alunos = await Aluno.findAll({
                attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'], // campos do retorno
                order: [['id', 'DESC'], [Foto, 'id', 'DESC']],  // ordenacao inclusive do model relacionado
                include: {
                    model: Foto,     // dizendo qual é o model relacionado
                    attributes: ['url', 'filename']
                }

            })
            return res.json(alunos)
        }
        catch (e) {
            return res.json(null)
        }
    }

    async show(req, res) {
        try {

            const { id } = req.params

            if (!id) {
                return res.status(400).json({ mesage: 'invalid request' })
            }
            const aluno = await Aluno.findByPk(id, {
                attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'], // campos do retorno
                order: [['id', 'DESC'], [Foto, 'id', 'DESC']],  // ordenacao inclusive do model relacionado
                include: {
                    model: Foto,     // dizendo qual é o model relacionado
                    attributes: ['ur', 'filename']
                }
            })
            return res.json(aluno)
        }
        catch (e) {
            return res.json(null)
        }
    }

    async update(req, res) {

        try {

            if (!req.params.id) {
                return res.status(400).json({ mesage: 'invalid request' })
            }

            const aluno = await Aluno.findByPk(req.params.id)

            if (!aluno) {
                return res.status(404).json({ message: 'aluno do not exists' })
            }

            // o que chegou no body sera atualizado 
            const newData = await aluno.update(req.body)

            const { id, nome, sobrenome, email, idade, peso, altura } = newData
            return res.json({ id, nome, sobrenome, email, idade, peso, altura })
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

    async delete(req, res) {
        try {

            const { id } = req.params

            if (!id) {
                return res.status(400).json({ mesage: 'invalid request' })
            }

            const n = await Aluno.destroy({ where: { id } })
            return n === 1 ? res.status(200).json({ message: 'aluno was deleted successfully' }) : res.status(404).json({ message: 'aluno do not exists' })
        }
        catch (e) {
            return res.json(null)
        }
    }


}

export default new AlunoController()