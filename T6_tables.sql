CREATE TABLE "customers" (
  "customer_id" SERIAL PRIMARY KEY,
  "customer_email" VARCHAR(80),
  "first_name" VARCHAR(80),
  "last_name" VARCHAR(80),
  "street" VARCHAR(80),
  "municipality" VARCHAR(80),
  "province" VARCHAR(80),
  "zipcode" INT
);

CREATE TABLE "brands" (
  "brand_id" SERIAL PRIMARY KEY,
  "brand_name" VARCHAR(80),
  "brand_description" VARCHAR(255)
);

CREATE TABLE "categories" (
  "category_id" SERIAL PRIMARY KEY,
  "category_name" VARCHAR(80)
);

CREATE TABLE "products" (
  "product_id" SERIAL PRIMARY KEY,
  "product_name" VARCHAR(80),
  "product_description" VARCHAR(255),
  "brand_tagline" VARCHAR(50),
  "product_price" FLOAT(2),
  "product_picture" VARCHAR(255),
  "warranty" INT,
  "category_id" INT REFERENCES categories(category_id),
  "brand_id" INT REFERENCES brands(brand_id)
);

CREATE TABLE "orders" (
  "order_id" SERIAL PRIMARY KEY,
  "customer_id" INT REFERENCES customers(customer_id),
  "product_id" INT REFERENCES products(product_id),
  "purchase_date" timestamp default current_timestamp,
  "quantity" INT
);

CREATE TABLE "customer_fave_products" (
  "fave_products_id" SERIAL PRIMARY KEY,
  "customer_id" INT REFERENCES customers(customer_id),
  "product_id" INT REFERENCES products(product_id)
);
