import Sequelize from 'sequelize'
import databaseConfig from '../config/database'
import Aluno from '../models/Aluno'
import User from '../models/User'
import Foto from '../models/Foto'

const models = [Aluno, User, Foto]
const conection = new Sequelize(databaseConfig)


// varrendo todos os models e passando a conexao para o método estático
models.forEach(model => model.init(conection))

// fazendo o mesmo para o método associate (fk)
// verificando se existe o metodo associate ele passa os models da conn 
models.forEach(model => model.associate && model.associate(conection.models))
