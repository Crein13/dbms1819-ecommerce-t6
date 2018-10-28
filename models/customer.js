var Customer = {
  getById: (client, customer_id, callback) => {
      const query =  `
          SELECT * FROM customers WHERE customer_id = '${customer_id}'
      `;
      client.query(query,(req,result)=>{
        callback(result.rows[0]);
      });
    },
  getByCustomerId: (client, customerId, callback) => {
    const customerQuery = `SELECT
        customers.customer_id AS customer_id,
        customers.first_name AS first_name,
        customers.last_name AS last_name,
        customers.customer_email AS customer_email,
        customers.street AS street,
        customers.municipality AS municipality,
        customers.province AS province,
        customers.zipcode AS zipcode,
        products.product_name AS product_name,
        orders.quantity AS quantity,
        orders.purchase_date AS purchase_date
      FROM orders
      INNER JOIN customers ON orders.customer_id = customers.customer_id
      INNER JOIN products ON orders.product_id = products.product_id
      WHERE customers.customer_id = ${customerId}
      ORDER BY purchase_date DESC
    `;
    client.query(customerQuery, (req, data) => {
      console.log(data.rows);
      var customerData = {
        first_name: data.rows[0].first_name,
        last_name: data.rows[0].last_name,
        customer_email: data.rows[0].customer_email,
        street: data.rows[0].street,
        municipality: data.rows[0].municipality,
        province: data.rows[0].province,
        zipcode: data.rows[0].zipcode,
        product_name: data.rows[0].product_name,
        quantity: data.rows[0].quantity,
        purchase_date: data.rows[0].purchase_date
      };
      callback(customerData);
    });
  },
  getByEmail: (client,customer_email,callback) => {
    const query =  `
          select * from customers where customer_email = '${customer_email}'
      `;
      client.query(query,(req,result)=>{
        callback(result.rows[0]);
      });
    },
  getCustomerData: (client,customer_id,callback) => {
      const query =  `
          select * from customers where customer_id = '${customer_id.customer_id}'
      `;
      client.query(query,(req,result)=>{
        callback(result.rows);
      });
    },
  list: (client, filter, callback) => {
    const customerListQuery = `
      SELECT * FROM customers
      ORDER BY customer_id DESC
    `;
    client.query(customerListQuery, (req, data) => {
      console.log(data.rows);
      callback(data.rows);
    });
  },

  topCustomersHighestPayment: (client, filter, callback) => {
    const query = `
        SELECT DISTINCT customers.first_name, customers.last_name,
        SUM (products.product_price * orders.quantity)
        FROM orders
        INNER JOIN products ON products.product_id = orders.product_id
        INNER JOIN customers ON customers.customer_id = orders.customer_id
        GROUP BY customers.first_name, customers.last_name 
        ORDER BY SUM DESC LIMIT 10;
    `;
    client.query(query, (req, result) => {
      // console.log(result.rows);
      callback(result.rows);
    });
  },
  topCustomersMostOrder: (client, filter, callback) => {
    const query = `
        SELECT first_name, last_name,
        COUNT (orders.customer_id)
        FROM customers
        INNER JOIN orders ON orders.customer_id = customers.customer_id
        GROUP BY customers.customer_id, customers.first_name, customers.last_name
        ORDER BY COUNT DESC LIMIT 10;
    `;
    client.query(query, (req, result) => {
      // console.log(result.rows);
      callback(result.rows);
    });
  }
};
module.exports = Customer;
