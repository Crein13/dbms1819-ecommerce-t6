var Category = {
  list: (client, filter, callback) => {
    const categoryListQuery = `
      SELECT * FROM categories
      `;
    client.query(categoryListQuery, (req, data) => {
      console.log(data.rows);
      callback(data.rows);
    });
  },

  mostOrderedCategory: (client, filter, callback) => {
    const query = `
      SELECT categories.category_name AS category_name,
      ROW_NUMBER() OVER (ORDER BY SUM(orders.quantity) DESC) AS ROW,
      SUM(orders.quantity) as TOTAL
      FROM orders
      INNER JOIN products ON orders.product_id=products.product_id
      INNER JOIN categories ON products.category_id=categories.category_id
      GROUP BY category_name
      ORDER BY SUM(orders.quantity) DESC
      LIMIT 3;
    `;
    client.query(query, (req, result) => {
      // console.log(result.rows);
      callback(result.rows);
    });
  }
};
module.exports = Category;
