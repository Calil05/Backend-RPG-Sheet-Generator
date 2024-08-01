import { Sequelize } from "sequelize-typescript";
import { User } from "../domain/models/userModel";
import * as dotenv from 'dotenv'; 
import { System } from "../domain/models/systemModel";
dotenv.config()

const connection = new Sequelize({
    dialect:"mysql",
    host:process.env.DB_HOST,
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    logging:false,
    models:[ User, System ]
});

export default connection;