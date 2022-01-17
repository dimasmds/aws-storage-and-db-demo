const { Pool } = require('pg');

class ContactServicePostgres {
  constructor() {
    this.pool = new Pool();
  }

  async getContacts() {
    const result = await this.pool.query('SELECT * FROM contacts');
    return result.rows;
  }
}

module.exports = ContactServicePostgres;
