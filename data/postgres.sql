CREATE TABLE account(
  user_id VARCHAR (100) PRIMARY KEY,
  email VARCHAR (200) NULL,
  first_name VARCHAR (200) NULL,
  last_name VARCHAR (200) NULL
);

CREATE TABLE auth_info (
  user_id VARCHAR (100) PRIMARY KEY,
  password VARCHAR (100) NULL,
  twitter_id VARCHAR (100) NULL,
  facebook_id VARCHAR (100) NULL,
  google_id VARCHAR (100) NULL
);

CREATE TABLE PRODUCT (
  PRODUCT_ID VARCHAR(50) PRIMARY KEY,
  DISPLAY_NAME VARCHAR(200) NULL,
  PRICE REAL NULL
);

CREATE TABLE REVIEW (
  REVIEW_ID SERIAL PRIMARY KEY,
  PRODUCT_ID VARCHAR(50) NULL,
  USER_ID VARCHAR (100) NULL,
  TEXT VARCHAR(2000) NULL
);

INSERT INTO account(user_id, email, first_name, last_name) values ('admin', 'brymda1990@gmail.com', 'Aliaksei', 'Tatarynchyk');
INSERT INTO account(user_id, email, first_name, last_name) values ('anon', 'anon@zoo.com', 'Anonymous', 'Pupkin');
INSERT INTO account(user_id, email, first_name, last_name) values ('anna', 'anna@node.js', 'Anna', 'Orlova');
INSERT INTO account(user_id, email, first_name, last_name) values ('pavel', 'pavel@node.js', 'Pavel', 'Treshakov');

INSERT INTO auth_info(user_id, password, twitter_id, facebook_id, google_id) values ('admin', 'Admin123', null, null, '107232008032104519591');
INSERT INTO auth_info(user_id, password, twitter_id, facebook_id, google_id) values ('anon', '123456', null, '3169235779768958', null);
INSERT INTO auth_info(user_id, password, twitter_id, facebook_id, google_id) values ('anna', '123456', null, null, null);
INSERT INTO auth_info(user_id, password, twitter_id, facebook_id, google_id) values ('pavel', '123456', null, null, null);

INSERT INTO PRODUCT(product_id, display_name, price) values ('prd00556', 'Macadamia Oil', 99.99);
INSERT INTO PRODUCT(product_id, display_name, price) values ('prd00487', 'Obagi face care', 50);

INSERT INTO REVIEW(review_id, product_id, user_id, text) values (1, 'prd00556', 'anna', 'It''s a very cool oil, I like it so much so I want to buy it more and more. The only thing that upset me is the price - it''s quite expensive...');
INSERT INTO REVIEW(review_id, product_id, user_id, text) values (2, 'prd00556', 'pavel', 'I''ve bought it for my wife, she told me that she is really happy, but, god''s heaven, why it''s so expensive???');
INSERT INTO REVIEW(review_id, product_id, user_id, text) values (3, 'prd00487', 'anon', 'I''ll just leave it here');