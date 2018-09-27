var Category = {
  list: (client, filter, callback) => {
    const categoryListQuery = `
      SELECT * FROM cateories
      `;
    client.query(categoryListQuery, (req, data) => {
      console.log(data.rows);
      callback(data.rows);
    });
  },

  mostOrderedCategory: (client, filter, callback) => {
    const query = `
      SELECT products_category.product_category_name AS category_name,
      ROW_NUMBER() OVER (ORDER BY SUM(orders.quantity) DESC) AS ROW,
      SUM(orders.quantity) as TOTAL
      FROM orders
      INNER JOIN products ON orders.product_id=products.id
      INNER JOIN products_category ON products.category_id=products_category.id
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
