import multer from 'multer'
import multerConfig from '../config/multerConfig'

import Foto from '../models/Foto'

class FotoController {

    store(req, res) {

        // o retorno disso é uma funcao que me da req, res, e se o filter gerou um erro (err)
        const upload = multer(multerConfig).single('foto')

        return upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                    erros: [err.code]
                })
            }

            const { aluno_id } = req.body

            if (!aluno_id) {
                return res.status(400).json({ mesage: 'invalid request' })
            }

            try {
                const { originalname, filename } = req.file
                const foto = await Foto.create({ aluno_id, originalname, filename })
                return res.json(foto)
            }
            catch (e) {
                return res.status(404).json({ message: 'aluno do not exists' })
            }
        })
    }


}


export default new FotoController()