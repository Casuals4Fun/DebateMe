## Table `users`
```
CREATE TABLE users (
    username VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    avatar VARCHAR(255),
    PRIMARY KEY (username)
);
```