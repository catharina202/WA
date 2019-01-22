class Pizzeria extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            pizza: [],
            tables: [],
            orders: [],
        }
    }

    // Pobieranie danych z bazy do pizza, tables, orders w this.state
    componentDidMount() {
        this.getPizza();
        this.getTables();
        this.getOrders();
    }

    // Dodawanie pizzy do bazy
    addPizza = (name, ingredients, price) => {
        const pizza = [...this.state.pizza];
        pizza.push({id: pizza.length+1, name, ingredients, price});

        let json = {
            request: "addPizza",
            name: name,
            ingredients: ingredients,
            price: price,
        }

        $.post(
            './api/api.php',
            json,
            function(data) {
            }
        )

        this.getPizza();
    }

    // Usuwanie pizzy z bazy
    deletePizza = (id) => {
        let json={
            request: "deletePizza",
            id: id,
        }
        $.post(
            './api/api.php',
            json,
            function( data ) {
            },
            "json"
        )

        this.getPizza();
    }

    // Dodawanie nowego zamówienia
    addOrder = (table, totalCost, selectedPizza) => {
        const tables = [...this.state.tables];
        tables.forEach(item=>{
            if(item.id == tableId) item.isState=true;
        })

        const tableId = parseInt(table);

        let json = {
            request: "addOrder",
            tableId: tableId,
            totalCost: totalCost,
            selectedPizza: selectedPizza,
            isActive: 1,
        }

        $.post(
            './api/api.php',
            json,
            function (data) {
            },
            "json"
        );

        this.getTables();
        this.getOrders();
    }

    // Kończenie zamówienia
    endOrder = (orderId, tableId) => {
        let json={
            request:"endOrder",
            orderId: orderId,
            tableId: tableId,
        }
          
        $.post(
        './api/api.php',
        json,
        function( data ) {
        },
        "json"
        )

        this.getTables();
        this.getOrders();

    }

    // Metody pobierające dane z bazy do state
    getPizza() {

        $.post(
            './api/api.php',
            { 
                request: "getPizza",
                headers: {"X-My-Custom-Header": "some value"}, },
            function (resp) {
                this.setState({
                    pizza: resp,
                })
            }.bind(this),
            "json"
        );
    }
    getTables() {
        $.post(
            './api/api.php',
            { 
                request: "getTables",
                headers: {"X-My-Custom-Header": "some value"}, },
            function (resp) {
                this.setState({
                    tables: resp,
                })
            }.bind(this),
            "json"
        );
    }
    getOrders() {
        $.post(
            './api/api.php',
            { 
                request: "getOrders",
                headers: {"X-My-Custom-Header": "some value"}, },
            function (resp) {
                this.setState({
                    orders: resp,
                })
            }.bind(this),
            "json"
        );
    }
    // KONIEC - Metody pobierające dane z bazy do state

    render() { 
        return (
            <div className="container" id="main">
                {/* Komponent wyświetlający dane */}
                <PizzeriaData 
                    pizza={this.state.pizza}
                    tables={this.state.tables} 
                    orders={this.state.orders}
                    deletePizza={this.deletePizza}
                    endOrder={this.endOrder} />

                {/* Komponent zarządzający danymi */}
                <PizzeriaManager 
                    tables={this.state.tables}
                    pizza={this.state.pizza}
                    addPizza={this.addPizza}
                    addOrder={this.addOrder} />
            </div>
        )
    }
}