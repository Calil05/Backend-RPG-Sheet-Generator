import { Model, DataTypes, Sequelize, QueryTypes } from 'sequelize';
import connection from '../db/config';

class UserRepository {

  async findUserByEmail(varEmail: string): Promise<any> {
    return connection.models.User.findOne({
      where: {
        email: varEmail
      }
    });
  }

}

export default UserRepository;
