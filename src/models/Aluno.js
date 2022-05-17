import Sequelize, { Model } from 'sequelize'

export default class Aluno extends Model {

    // metodo estatico não precisa de instancia
    static init(sequelize) {

        super.init(
            {
                nome: {
                    type: Sequelize.STRING,
                    defaultValue: '',
                    validate: {
                        len: {
                            args: [3, 255], // tem que ter min 3 e max 255
                            msg: 'Nome deve ter entre 3 e 255 caracteres'
                        }
                    }
                },
                sobrenome: {
                    type: Sequelize.STRING,
                    defaultValue: '',
                    validate: {
                        len: {
                            args: [3, 255], // tem que ter min 3 e max 255
                            msg: 'Nome deve ter entre 3 e 255 caracteres'
                        }
                    }
                },
                email: {
                    type: Sequelize.STRING,
                    defaultValue: '',
                    unique: {
                        msg: 'Email já cadastrado na base de dados'
                    },
                    validate: {
                        isEmail: {
                            msg: 'E-mail inválido'
                        }
                    }
                },
                idade: {
                    type: Sequelize.INTEGER,
                    defaultValue: '',
                    validate: {
                        isInt: {
                            msg: 'Idade deve ser um valor inteiro'
                        }
                    }
                },
                peso: {
                    type: Sequelize.FLOAT,
                    defaultValue: '',
                    validate: {
                        isFloat: {
                            msg: 'Peso deve ser um valor inteiro ou flutuante'
                        }
                    }
                },
                altura: {
                    type: Sequelize.FLOAT,
                    defaultValue: '',
                    validate: {
                        isFloat: {
                            msg: 'Altura deve ser um valor inteiro ou flutuante'
                        }
                    }
                },
            },
            { sequelize }
        )
        return this
    }

    static associate(models) {
        this.hasMany(models.Foto, {foreignKey: 'aluno_id'})
    }
}





