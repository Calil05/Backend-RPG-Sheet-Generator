import { Model, DataTypes, Sequelize, QueryTypes } from 'sequelize';
import connection from '../db/config';

class UserRepository {

  async findUsersByEmail(keyword: string): Promise<any[]> {
    const query = `
      SELECT * FROM users
      WHERE email LIKE :keyword
    `;
    return connection.query(query, {
      replacements: { keyword: `%${keyword}%` },
      type: QueryTypes.SELECT,
    });
  }

}

export default UserRepository;
