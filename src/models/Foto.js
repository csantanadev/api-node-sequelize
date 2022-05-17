import Sequelize, { Model } from 'sequelize'
import appConfig from '../config/appConfig'

export default class Foto extends Model {

    // metodo estatico não precisa de instancia
    static init(sequelize) {

        super.init(
            {
                originalname: {
                    type: Sequelize.STRING,
                    defaultValue: '',
                    validate: {
                        notEmpty: {
                            msg: 'originalname não pode ficar vazio.'
                        }
                    }
                },
                filename: {
                    type: Sequelize.STRING,
                    defaultValue: '',
                    validate: {
                        notEmpty: {
                            msg: 'filename não pode ficar vazio.'
                        }
                    }
                },
                url: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return `${appConfig.base_url}/images/${this.getDataValue('filename')}`
                    },
                }
            },
            { sequelize }
        )
        return this
    }

    static associate(models) {
        this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' })
    }


}





