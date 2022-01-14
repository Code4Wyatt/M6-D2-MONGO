
CREATE TABLE IF NOT EXISTS product
(
    product_id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    name varchar(100) NOT NULL,
    description text NOT NULL,
    brand varchar(100) NOT NULL,
    image_url text NOT NULL,
    price integer NOT NULL,
    category varchar(100) NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT product_pkey PRIMARY KEY (product_id)
);

CREATE TABLE IF NOT EXISTS review
(
    review_id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    comment text NOT NULL,
    rate integer NOT NULL,
    product_id integer,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT review_pkey PRIMARY KEY (review_id),
    CONSTRAINT review_product_id_fkey FOREIGN KEY (product_id)
        REFERENCES public.product (product_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS categories
(
    category_id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    category_name text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
)

CREATE TABLE IF NOT EXISTS users
(
    user_id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    lastName integer NOT NULL,
    email text NOT NULL,
    age integer NOT NULL,
    country text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
)

CREATE TABLE IF NOT EXISTS cart
(
    product_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
)