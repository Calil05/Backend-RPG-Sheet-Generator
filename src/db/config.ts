import { Sequelize } from "sequelize-typescript";
import { User } from "../models/userModel";

const connection = new Sequelize({
    dialect:"mysql",
    host:"localhost",
    username:"root",
    password:"root",
    database:"rpgsheetgenerator",
    logging:false,
    models:[ User ]
});

export default connection;