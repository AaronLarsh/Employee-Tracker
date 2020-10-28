use employeeTr_db;

insert into department ( id, dept_Name) Values (1, 'PD');
insert into department ( id, dept_Name) Values (2, 'Management');
insert into department ( id, dept_Name) Values (3, 'Customer service');
insert into department ( id, dept_Name) Values (4, 'Marketing');

insert into role(id, title, salary, department_ID) values(1,"Engineer", "100000", 1);
insert into role(id, title, salary, department_ID) values(2,"Customer service", "20000", 3);
insert into role(id, title, salary, department_ID) values(3,"Accountant", "80000", 2);
insert into role(id, title, salary, department_ID) values(4,"Manager", "120000", 2);
insert into role(id, title, salary, department_ID) values(5,"Marketer", "75000", 4);


insert into employee (id, first_name, last_name, role_id) values (1, "Don", "Jones", 1);
insert into employee (id, first_name, last_name, role_id) values (2, "Hem", "Lones", 2);
insert into employee (id, first_name, last_name, role_id) values (3, "Yom", "hones", 3);
insert into employee (id, first_name, last_name, role_id) values (4, "Dem", "Trom", 4);
insert into employee (id, first_name, last_name, role_id) values (5, "Lem", "Krom", 5);


insert into employee (id, first_name, last_name, role_id) values(15, "Mark", "Con", 1);
insert into employee (id, first_name, last_name, role_id) values(16, "Lenny", "Son", 2);
insert into employee (id, first_name, last_name, role_id) values(17, "Derk", "Don", 3);
insert into employee (id, first_name, last_name, role_id) values(18, "Remmy", "Low", 4);
insert into employee (id, first_name, last_name, role_id) values(19, "Highler", "Termer", 5);

