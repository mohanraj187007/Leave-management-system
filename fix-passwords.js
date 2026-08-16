const mysql = require('mysql2/promise');

async function run() {
  const c = await mysql.createConnection({
    host: 'bbm1zqqzgjlcahpd1yay-mysql.services.clever-cloud.com',
    port: 3306,
    user: 'ujhqc8rixvbtqmi3',
    password: 'Hm9h7StUrXUGxha2WsNK',
    database: 'bbm1zqqzgjlcahpd1yay'
  });

  await c.execute('UPDATE users SET password=? WHERE email=?', ['$2a$10$IXLFpST3omtxwr7BcHSbyu1fq7o1fIkERiyhL1mogdwPKUSxF1il2', 'admin@company.com']);
  await c.execute('UPDATE users SET password=? WHERE email=?', ['$2a$10$0tyotkYxSh3/IKK9i5niW.zB8WzrdYmBu.cGpm0btx/.KNzjvAFcW', 'manager@company.com']);
  await c.execute('UPDATE users SET password=? WHERE email=?', ['$2a$10$5qZ/otktvQ9yyaurFOvVde599uadjUAauFvkXrIjuXcHvEOgrwjBC', 'employee@company.com']);

  console.log('passwords updated for real this time');
  await c.end();
}

run().catch(e => console.error('Error:', e.message));
