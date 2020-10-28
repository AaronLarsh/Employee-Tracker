DROP DATABASE IF EXISTS employeeTr_db;

CREATE DATABASE employeeTr_db;

USE employeeTr_db;

create table department (
    id INT Primary KEY,
    dept_Name VARCHAR(30)
);

create table role (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_ID INT
);

create table employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT
);