/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.sql(`
  INSERT INTO contacts VALUES 
    ('user-1', 'Nikola', 'Tesla', '+6281311311311', 'nikola@dicoding.com'),
    ('user-2', 'Albert', 'Einstein', '+6281311311312', 'albert@dicoding.com'),
    ('user-3', 'Brendan', 'Eich', '+6281311311313', 'brendan@dicoding.com'),
    ('user-4', 'Charles', 'Darwin', '+6281311311314', 'charles@dicoding.com')
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
  DELETE FROM contacts WHERE 1=1
  `);
};
