
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'John doe', email: 'anu.me@mail.com', password:'1234567'},
        {username: 'Borja Soler', email: 'borja.me@mail.com', password:'1234567'},
        {username: 'Pascal Bou', email: 'pascal.me@mail.com', password:'1234567'},
      ]);
    });
};
