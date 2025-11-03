// Tests for src/repository/customerRepository.js
// This file contains unit tests for CRUD operations (Create, Read, Delete) in customerRepository.
// It verifies correct SQL queries and expected results for getAll, create, getById, and deleteById methods.

// Mock the db module that the repository imports. The path below is relative to this test file
// and should resolve to src/config/db when the repository module imports it.
jest.mock('../src/config/db', () => ({
  __esModule: true,
  default: { query: jest.fn() }
}));

import db from '../src/config/db';
import customerRepository from '../src/repository/customerRepository';

describe('customerRepository', () => {
  beforeEach(() => {
    // reset mock implementation and call history before each test
    db.query.mockReset();
  });

  test('getAll returns rows', async () => {
    const rows = [{ id: 1, name: 'Alice' }];
    db.query.mockResolvedValue({ rows });

    const result = await customerRepository.getAll();

    expect(db.query).toHaveBeenCalledWith('SELECT * FROM customer');
    expect(result).toEqual(rows);
  });

  test('create inserts and returns new customer', async () => {
    const input = { name: 'John', age: 30, email: 'john@example.com', active: true };
    const returned = { id: 2, ...input };
    db.query.mockResolvedValue({ rows: [returned] });

    const result = await customerRepository.create(input);

    expect(db.query).toHaveBeenCalledWith(
      'INSERT INTO customer (name, age, email, active) VALUES ($1, $2, $3, $4) RETURNING *',
      [input.name, input.age, input.email, input.active]
    );

    expect(result).toEqual(returned);
  });

  test('getById returns row or null', async () => {
    // No rows -> null
    db.query.mockResolvedValue({ rows: [] });
    const resNull = await customerRepository.getById(99);
    expect(db.query).toHaveBeenCalledWith('SELECT * FROM customer WHERE id = $1', [99]);
    expect(resNull).toBeNull();

    // With row
    const row = { id: 3, name: 'Bob' };
    db.query.mockResolvedValue({ rows: [row] });
    const resRow = await customerRepository.getById(3);
    expect(resRow).toEqual(row);
  });

  test('deleteById returns deleted row or null', async () => {
    // No rows -> null
    db.query.mockResolvedValue({ rows: [] });
    const resNull = await customerRepository.deleteById(10);
    expect(db.query).toHaveBeenCalledWith('DELETE FROM customer WHERE id = $1 RETURNING *', [10]);
    expect(resNull).toBeNull();

    // With deleted row
    const deleted = { id: 10, name: 'Deleted' };
    db.query.mockResolvedValue({ rows: [deleted] });
    const resDeleted = await customerRepository.deleteById(10);
    expect(resDeleted).toEqual(deleted);
  });
});
