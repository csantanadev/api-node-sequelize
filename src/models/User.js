import Sequelize, { Model } from 'sequelize'
import bcryptjs from 'bcryptjs'

export default class User extends Model {

    // metodo estatico não precisa de instancia
    static init(sequelize) {

        // init da super classe -> Model
        super.init(
            {
                nome: {
                    type: Sequelize.STRING,
                    defaultValue: '',
                    validate: {
                        len: {
                            args: [3, 255], // tem que ter min 3 e max 255
                            msg: 'Campo nome deve ter entre 3 e 255 caracteres'
                        }
                    }
                },
                email: {
                    type: Sequelize.STRING,
                    defaultValue: '',
                    unique: {
                        msg: 'Email já cadastrado'
                    },
                    validate: {
                        isEmail: {
                            msg: 'E-mail inválido'
                        }
                    }
                },
                password_hash: {
                    type: Sequelize.STRING,
                    defaultValue: '',
                },
                password: {
                    type: Sequelize.VIRTUAL, // este campo não vai existir na base de dados
                    defaultValue: '',
                    validate: {
                        len: {
                            args: [6, 50],
                            msg: 'A senha precisa ter entre 6 e 50 caracteres'
                        },

                    }
                },

            }, { sequelize }
        )

        // método fornecido pelo proprio sequelize
        this.addHook('beforeSave', async (user) => {
            if (user && user.password) {
                user.password_hash = await bcryptjs.hash(user.password, 8)
            }
        })
        return this
    }
    
    passwordIsValid(password) {
        return bcryptjs.compare(password, this.password_hash)
    }
    
}



