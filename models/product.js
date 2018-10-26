var Product = {
  getById: (client, productId, callback) => {
    const productQuery = `
      SELECT 
        products.product_id AS product_id,
        products.product_name AS product_name,
        products.product_picture AS product_picture,
        products.product_description AS product_description,
        products.product_price AS product_price,
        products.brand_tagline AS brand_tagline,
        products.warranty AS warranty,
        brands.brand_name AS brand_name,
        brands.brand_description AS brand_description,
        categories.category_name AS category_name
      FROM products
      INNER JOIN brands ON products.brand_id = brands.brand_id
      INNER JOIN categories ON products.category_id = categories.category_id
      WHERE products.product_id = ${productId}
      ORDER BY product_id ASC
    `;
    client.query(productQuery, (req, results) => {
      console.log(req);
      // console.log(results.rows[0]);
      var productData = {
        product_name: results.rows[0].product_name,
        product_description: results.rows[0].product_description,
        brand_tagline: results.rows[0].brand_tagline,
        product_price: results.rows[0].product_price,
        warranty: results.rows[0].warranty,
        product_picture: results.rows[0].product_picture,
        brand_name: results.rows[0].brand_name,
        brand_description: results.rows[0].brand_description,
        category_name: results.rows[0].category_name,
        product_id: results.rows[0].product_id
      };
      callback(productData);
    });
  },

  list: (client, filter, callback) => {
    const productListQuery = 'SELECT * FROM products ORDER BY product_id ASC';
    client.query(productListQuery, (req, data) => {
      console.log(data.rows);
      callback(data.rows);
    });
  },

  mostOrderedProduct: (client, filter, callback) => {
    const query = `SELECT products.product_name AS product_name,
      ROW_NUMBER() OVER (ORDER BY SUM(orders.quantity) DESC) AS ROW,
      SUM(orders.quantity) AS TOTAL
      FROM orders
      INNER JOIN products ON orders.product_id = products.product_id
      GROUP BY product_name
      ORDER BY SUM(orders.quantity) DESC
      LIMIT 2`;
    client.query(query, (req, results) => {
      console.log(results.rows);
      callback(results.rows);
    });
  },

  leastOrderedProduct: (client, filter, callback) => {
    const query = `
      SELECT products.product_name AS product_name,
      ROW_NUMBER() OVER (ORDER BY SUM(orders.quantity) ASC) AS ROW,
      SUM(orders.quantity) AS TOTAL
      FROM orders
      INNER JOIN products ON orders.product_id = products.product_id
      GROUP BY products_name
      ORDER BY SUM(orders.quantity) ASC
      LIMIT 10;
    `;
    client.query(query, (req, result) => {
      // console.log(result.rows);
      callback(result.rows);
    });
  }
};

module.exports = Product;
