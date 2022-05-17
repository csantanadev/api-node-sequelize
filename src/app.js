import dotenv from 'dotenv'

dotenv.config()
// chamando o index da pasta database
import './database'

import express from "express"
import { resolve } from 'path'
import alunoRoutes from './routes/alunoRoutes'
import userRoutes from './routes/userRoutes'
import tokenRoutes from './routes/tokenRoutes'
import fotoRoutes from './routes/fotoRoutes'
//import authMiddleware from './src/middlewares/authMiddleware'


class App {

    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json())

        // habilitando no express o caminho estatico das imagens do servidor (ate a pasta uploads é estático após isso /images/1652808113890_16457.png é variável)
        this.app.use(express.static(resolve(__dirname, 'uploads')))  

        //this.app.use(authMiddleware)
    }

    routes() {
        //        this.app.use('/', homeRoutes)
        this.app.use('/alunos/', alunoRoutes)
        this.app.use('/users/', userRoutes)
        this.app.use('/tokens/', tokenRoutes)
        this.app.use('/fotos/', fotoRoutes)
    }
}

// exportando a classe instanciada e o atributo app do express
export default new App().app