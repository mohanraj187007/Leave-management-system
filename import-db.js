const mysql = require('mysql2/promise');
const fs = require('fs');

async function run() {
  const connection = await mysql.createConnection({
    host: 'bbm1zqqzgjlcahpd1yay-mysql.services.clever-cloud.com',
    port: 3306,
    user: 'ujhqc8rixvbtqmi3',
    password: 'Hm9h7StUrXUGxha2WsNK',
    database: 'bbm1zqqzgjlcahpd1yay',
    multipleStatements: true
  });

  const schema = fs.readFileSync('./database/schema.sql', 'utf8');
  console.log('Running schema.sql...');
  await connection.query(schema);
  console.log('done schema.sql');

  const seed = fs.readFileSync('./database/seed.sql', 'utf8');
  console.log('Running seed.sql...');
  await connection.query(seed);
  console.log('done seed.sql');

  await connection.end();
  console.log('All done!');
}

run().catch(err => {
  console.error('Error:', err.message);
});
