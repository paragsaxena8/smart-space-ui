## Description

Smart Space is a web application that allows users to create and share blogs and other content.

## Features

- Create and share blogs
- Create Multi-User Communities
- Create Categories & tags
- Users can comment & like blogs
- Users can follow other users **(beta)**

## Installation

- Install Node.js and npm (https://nodejs.org/en/)
- Install [Express](https://expressjs.com/)
- Install [MongoDB](https://www.mongodb.com/)
- Install [Mongoose](https://mongoosejs.com/)

## Setup

    $ npm install
    $ npm start && npm run serve

**Note:** You need to create a `config.env` file in the root directory of the project with the following content:

## Environment Variables

### `NODE_ENV`
- `ENVIRONMENT`: *development* `or` *production*
- `PORT`: The port to run the server on.

### `DB CONFIG`

- `DB_HOST`: The host of the database.
- `DB_PASS`: The password of the database.

### `JWT CONFIG`

- `JWT_SECRET`: JWT SECRET KEY.
- `JWT_EXPIRY_IN`: JWT EXPIRY TIME.
- `JWT_COOKIE_EXPIRY_IN`: JWT COOKIE EXPIRY TIME.

### `EMAIL CONFIG`

- `EMAIL_HOST`: The host of the email server.
- `EMAIL_PORT`: The port of the email server.
- `EMAIL_USERNAME`: The user of the email server.
- `EMAIL_PASSWORD`: The password of the email server.
- `EMAIL_FROM`: The email address of the sender.
- `EMAIL_FROM_NAME`: The name of the sender.
