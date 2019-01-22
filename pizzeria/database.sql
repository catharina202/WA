create database pizzeria;
CREATE USER 'kucharz'@'localhost' IDENTIFIED BY 'hasloDoPizzerii';
GRANT ALL PRIVILEGES ON pizzeria.* TO 'kucharz'@'localhost';

CREATE TABLE Pizza (
    PizzaID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(255),
    Ingredients VARCHAR(1000),
    Price VARCHAR(20),
    PRIMARY KEY (PizzaID)
);

INSERT INTO Pizza (Name, Ingredients, Price) 
VALUES ('Pepperoni','Ser, szynka, sos pomidorowy','18.00'),
('Capricosa','Ser, szynka, sos pomidorowy, pieczarki','19.00');

CREATE TABLE Tables (
    TablesID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(255),
    Seats INT,
    IsState BOOLEAN,
    PRIMARY KEY (TablesID)
);

INSERT INTO Tables (Name, Seats, IsState) VALUES 
    ('Stolik nr. 1', 2, 0),
    ('Stolik nr. 2', 4, 0),
    ('Stolik nr. 3', 12, 0),
    ('Stolik nr. 4', 8, 1);

CREATE TABLE Orders (
    OrdersID INT NOT NULL AUTO_INCREMENT,
    TablesID INT, 
    TotalCost VARCHAR(20),
    SelectedPizza VARCHAR(1000),
    IsActive BOOLEAN,
    PRIMARY KEY (OrdersID),
    FOREIGN KEY (TablesID) REFERENCES Tables(TablesID)
);

INSERT INTO Orders (TablesID, TotalCost, SelectedPizza, IsActive) VALUES (4, "50.34", "Pepperoni, Hawajska", 1);