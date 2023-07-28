# E-commerce-back-end

## Table of Contents

- [User-story](#user-story)
- [Acceptance-Criteria](#acceptance-criteria)
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Repo-Link](#repo-link)
- [Viedo-Guide](#viedo-guide)

## User Story

```md
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```

## Acceptance Criteria

```md
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia Core for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete data in my database
```

## Description

I build the back end for an e-commerce site. I need to take a working Express.js API and configure it to use Sequelize to interact with a MySQL database.

## Installation

Before you start to run the application, you need to update your MySQL password by add a new file in root called .env, in this file, you need have:

```bash
DB_NAME='ecommerce_db'
DB_USER=''
DB_PW=''
```

Please make sure update your user name and password in the empty area.

Next, you need to install the npm packages by enter:

```bash
>npm i
```

in root terminal.

Next, you need to use MySQL2 to create database by using schema.sql under db folder. After this, you need to update seeds for your database by using index.js under seeds folder. After this, use

```bash
>node server.js
```

in the root terminal to run server, and you can open Insomnia to test function.

## Usage

To use the application, you need to follow the installation part to open the application. If you have anyother quesiton, feel free to reach me out.

## Repo Link

[Link to the code repository](https://github.com/CQlove/E-commerce-back-end)

## Viedo-Guide



https://github.com/CQlove/E-commerce-back-end/assets/128104973/66845f53-314a-43b5-9650-42eca9483fd4

