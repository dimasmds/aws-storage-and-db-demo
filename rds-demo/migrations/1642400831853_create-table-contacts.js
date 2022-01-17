/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('contacts', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    first_name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    last_name: {
      type: 'VARCHAR(50)',
    },
    phone: {
      type: 'VARCHAR(50)',
    },
    email: {
      type: 'VARCHAR(100)',
    },
    created_at: {
      type: 'TEXT',
    },
    updated_at: {
      type: 'TEXT',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('contacts');
};
