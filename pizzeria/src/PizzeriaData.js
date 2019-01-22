// PizzeriaData
class PizzeriaData extends React.Component {
    state = {  }
    render() { 
        return (  
            <div className="row">
                {/* Wyświetlanie listy z pizzami */}
                <PizzaList 
                    pizza={this.props.pizza}
                    deletePizza={this.props.deletePizza} />

                {/* Wyświetlanie stolików */}
                <TablesList pizza={this.props.tables} />

                {/* Wyświetlanie zamówień */}
                <OrdersList 
                    orders={this.props.orders}
                    endOrder={this.props.endOrder} />
            </div>
        );
    }
}