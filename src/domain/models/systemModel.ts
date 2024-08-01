import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { systemDices } from "../enumeration/systemDices";
import { User } from "./userModel";

@Table({
    timestamps: false,
    tableName: "system"
})

export class System extends Model {
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
        type: DataType.STRING,
        allowNull: true
    })
    theme!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    description!: string;

    @Column({
        type: DataType.ENUM,
        values: [systemDices.D20, systemDices.D100],
        allowNull: false
    })
    dice!: systemDices;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId!: number;

    @BelongsTo(() => User)
    user!: User;
}