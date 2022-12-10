import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
        class User extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                // define association here
            }
        }
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING(60),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(60),
                allowNull: false
            },
            phone_number: {
                type: DataTypes.STRING(11),
                allowNull: false
            },
            password: {
                type: DataTypes.STRING(),
                allowNull: false
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 18
            },
            date_of_birth: {
                type: DataTypes.DATE,
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: new Date().toISOString()
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: new Date().toISOString()
            }
        },
        {
            sequelize,
            timestamps: true,
            // I want updatedAt to actually be called updated_at
            updatedAt: "updated_at",

            // I want createdAt to actually be called created_at
            createdAt: "created_at",
            modelName: "user"
        }
    );
    return User;
};
