## Table `users`
```
CREATE TABLE users (
    username VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    avatar VARCHAR(255),
    PRIMARY KEY (username)
);
```

## Table `reset`
```
CREATE TABLE reset (
    username VARCHAR(15) NOT NULL,
    token VARCHAR(64) NOT NULL,
    expiry DATETIME NOT NULL,
    PRIMARY KEY (username),
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
);
```