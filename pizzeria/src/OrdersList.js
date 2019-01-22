// OrderList
class OrdersList extends React.Component {
    state = {  }
    render() { 
        const itemListOrders = this.props.orders.filter(item=>item.isActive).map(item=><ItemListOrders 
            key={item.id} 
            id={item.id} 
            table={item.table} 
            totalCost={item.totalCost} 
            selectedPizza={item.selectedPizza}
            endOrder={this.props.endOrder} />)

        return (  
            <div className="col-12" id="orders">
                <h2>Zamówienia</h2>
                {itemListOrders.length ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Nr</th>
                            <th scope="col">Numer stolika</th>
                            <th scope="col">Cena zamówienia</th>
                            <th scope="col">Wybrane pizze</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemListOrders}
                    </tbody>
                </table>) : <p>Brak zamówień</p>}
            </div>
        );
    }
}

const ItemListOrders = (props) => {
    const {id, table, totalCost, selectedPizza} = props;
    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td>Stolik nr. {props.table}</td>
            <td>{props.totalCost} PLN</td>
            <td>{props.selectedPizza}</td>
            <td><button className="btn btn-outline-danger" onClick={()=>props.endOrder(props.id, props.table)}>Koniec zamówienia</button></td>
        </tr>
    )
}