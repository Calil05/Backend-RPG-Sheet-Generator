import { Table, Model, Column, DataType, HasOne, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import { System } from "./systemModel";

@Table({
    timestamps: false,
    tableName: "users"
})

export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id!: number

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    name!:string;

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    email!:string;

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    passwd!:string;

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    access_level!:string;

    @HasOne(() => System)
    system!: System;
}