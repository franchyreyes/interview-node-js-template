import db from '../config/db';

const customerRepository = {
  async getAll() {
    const result = await db.query('SELECT * FROM customer');
    return result.rows;
  },

  async create({ name, age, email, active }) {
    const result = await db.query(
      'INSERT INTO customer (name, age, email, active) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, age, email, active]
    );
    return result.rows[0];
  }

};

export default customerRepository;
