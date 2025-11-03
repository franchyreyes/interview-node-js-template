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
  },

  // Get a single customer by id
  async getById(id) {
    const result = await db.query('SELECT * FROM customer WHERE id = $1', [id]);
    return result.rows[0] || null;
  },

  // Delete a customer by id,
  async deleteById(id) {
    const result = await db.query('DELETE FROM customer WHERE id = $1 RETURNING *', [id]);
    return result.rows[0] || null;
  }



};

export default customerRepository;
