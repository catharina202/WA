// PizzaList
class PizzaList extends React.Component {
    state = {  }
    render() {
        const itemListPizza = this.props.pizza.map(item=><ItemListPizza 
            key={item.id}
            id={item.id}
            name={item.name}
            ingredients={item.ingredients}
            price={item.price}
            delete={this.props.deletePizza} />)

        return (  
            <div className="col-12 col-lg-8">
                <h2>Lista z pizzami</h2>
                {itemListPizza.length ? <ul className="list-group">{itemListPizza}</ul> : "Nie dodano pizzy" }
            </div>
        );
    }
}

const ItemListPizza = (props) => {
    const { id,name,ingredients,price } = props;
    return (
        <li className="list-group-item d-flex justify-content-between">
            <div className="">
                <span className="font-weight-bold d-block">{name} - {price} PLN</span>({ingredients}) 
            </div>
            <button className="btn btn-danger btn-sm" onClick={()=>props.delete(id)}>Usuń</button>
        </li>
    )
}
