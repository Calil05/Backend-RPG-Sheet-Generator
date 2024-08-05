import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { System } from "./systemModel";

@Table({
    timestamps: false,
    tableName: "classes"
})

export class Classes extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id!: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    description!: string;

    @ForeignKey(() => System)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    systemId!: number;

    @BelongsTo(() => System)
    system!: System;
}