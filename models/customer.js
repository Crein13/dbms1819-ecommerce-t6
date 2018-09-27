var Customer = {
  getById: (client, customerId, callback) => {
    const customerQuery = `SELECT
        customers.first_name AS first_name,
        customers.last_name AS last_name,
        customers.customer_email AS customer_email,
        customers.street AS street,
        customers.municipality AS municipality,
        customers.province AS province,
        customers.zipcode AS zipcode,
        products.name AS product_name,
        orders.quantity AS quantity,
        orders.purchase_date AS purchase_date
      FROM orders
      INNER JOIN customers ON orders.customer_id = customers.customer_id
      INNER JOIN products ON orders.product_id = products.product_id
      WHERE customers.id = ${customerId}
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
        SUM (products.price * orders.quantity)
        FROM orders
        INNER JOIN products ON products.id = orders.product_id
        INNER JOIN customers ON customers.id = orders.customer_id
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
        INNER JOIN orders ON orders.customer_id = customers.id
        GROUP BY customer_id, customers.first_name, customers.last_name
        ORDER BY COUNT DESC LIMIT 10;
    `;
    client.query(query, (req, result) => {
      // console.log(result.rows);
      callback(result.rows);
    });
  }
};
module.exports = Customer;
