const knex = require('../db/connection');

// Returns a promise, the .then will have the activities array
function INDEX(){
  return knex('activities').select('id', 'name')
}

module.exports = {
  INDEX
};
