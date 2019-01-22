// SubmitOrder
class SubmitOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            selectValue: '',
            selectedPizza: [],
            totalCost: '0.00',
            idSelected: 0,
        }
    }

    handleChange = (e) => {
        this.setState({selectValue: e.target.value})
    }

    handleAddToSelected = (name, price) => {
        const selectedPizza = [...this.state.selectedPizza];
        const id = this.state.idSelected+1;

        selectedPizza.push({id, name, price});

        const cost = parseFloat(price) + parseFloat(this.state.totalCost);
        const totalCost = cost.toFixed(2);

        this.setState({
            selectedPizza, 
            totalCost, 
            idSelected: id,
        });
    }

    handleRemoveSelected = (id, price) => {
        const selectedPizza = [...this.state.selectedPizza];
        const selectedPizzaId = []

        selectedPizza.forEach(item=>selectedPizzaId.push(item.id));

        const index = selectedPizzaId.indexOf(id);
        selectedPizza.splice(index, 1);

        const cost = parseFloat(this.state.totalCost)-parseFloat(price);
        const totalCost = cost.toFixed(2);

        this.setState({
            selectedPizza,
            totalCost,
        })
    }

    handleConfirmClick = () => {
        const selectedPizza = [...this.state.selectedPizza];
        let selectedPizzaName = [];
        
        selectedPizza.forEach(item=>{
            selectedPizzaName.push(item.name);
        })
        selectedPizzaName = selectedPizzaName.join(', ');

        this.props.addOrder(this.state.selectValue, this.state.totalCost, selectedPizzaName);
        this.clearOrder();
    }

    clearOrder = () => {
        this.setState({
            selectValue: '',
            selectedPizza: [],
            totalCost: '0.00',
            idSelected: 0,
        })
    }

    render() {
        const selectItem = this.props.tables.filter(item=>!item.isState).map(item=><SelectItem
            key={item.id}
            id={item.id}
            name={item.name}
            seats={item.seats}/>)

        return (  
            <div className="col-12 col-lg-8">
                <h2>Dodaj zamówienie</h2>
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <select value={this.state.selectValue} onChange={this.handleChange} className="custom-select">
                            <option value="">Wybierz stolik</option>
                            {selectItem}
                        </select>
                        {this.state.selectValue && <ChoosePizza 
                            pizza={this.props.pizza}
                            clickAdd={this.handleAddToSelected} />}
                    </div>
                    
                    {this.state.selectValue ? <SummaryOrder 
                        tableNumber={this.state.selectValue}
                        selectedPizza={this.state.selectedPizza}
                        totalCost={this.state.totalCost}
                        delete={this.handleRemoveSelected}
                        confirm={this.handleConfirmClick}
                        cancel={this.clearOrder} /> : null}
                </div>
            </div>
        );
    }
}

const SelectItem = (props) => <option value={props.id}>{props.name} (ilość miejsc: {props.seats})</option>;

const ChoosePizza = (props) => {
    const itemList = props.pizza.map(item=><ItemList 
        key={item.id}
        name={item.name}
        price={item.price}
        clickAdd={props.clickAdd} />)

    return (
        <React.Fragment>
        <p>Wybierz pizze</p>
        <ul className="list-group">
            {itemList}
        </ul>
        </React.Fragment>
    )
}

const ItemList = (props) => {
    const {name, price} = props;

    return (
        <li className="list-group-item d-flex align-items-center justify-content-between">
            {name}
            <button className="btn btn-primary btn-sm" onClick={()=>props.clickAdd(name,price)}>Dodaj</button>
        </li>
    )
}

const SummaryOrder = (props) => {
    const itemSelectedPizzaList = props.selectedPizza.map(item=><ItemSelectedPizzaList 
        key={item.id}
        id={item.id}
        name={item.name}
        price={item.price}
        delete={props.delete} />)
    return (
        <div className="col-12 col-lg-6">
            <h2>Podsumowanie</h2>
            <p>Stolik nr. {props.tableNumber}</p>
            {props.selectedPizza.length ? <ul>{itemSelectedPizzaList}</ul> : <p>Proszę dodać pizzę do zamówienia</p>}
        
            <h4>Do zapłaty: {props.totalCost} PLN</h4>

            {props.selectedPizza.length ? <button onClick={()=>props.confirm()} className="btn btn-primary">Potwierdź zamówienie</button> : null}
            <button onClick={()=>props.cancel()} className="btn btn-secondary">Anuluj zamówienie</button>
        </div>
    )
}

const ItemSelectedPizzaList = (props) => {
    const {id,name,price} = props;
    return (
        <li className="d-flex justify-content-between align-items-center">
            {name}
            <button className="btn btn-danger btn-sm" onClick={()=>props.delete(id, price)}>Usuń (-{price} PLN)</button>
        </li>
    )
}