const config = {
  development: {
    // db: {
    //   database: 'storedb',
    //   user: 'postgres',
    //   password: 12345,
    //   host: 'localhost',
    //   port: 5432
    // },
    db: {
      database: 'd4clggv62j2det',
      user: 'olnlnpdigamris',
      password: 'a62e045839dfb4785622cd9f61312f5727ab1148f3b752672fa306504750b8e5',
      host: 'ec2-23-23-242-163.compute-1.amazonaws.com',
      port: 5432,
      ssl: true
    },
    nodemailer: {

    }
  },
  production: {
    db: {
      database: process.env.DB_DB,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      ssl: true
    },
    nodemailer: {

    }
  }
};

module.exports = process.env.NODE_ENV === 'production' ? config.production : config.development;
