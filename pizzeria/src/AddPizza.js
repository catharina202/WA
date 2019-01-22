// AddPizza
class AddPizza extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            name: "",
            ingredients: "",
            price: "",
        }
    }

    handleChange = (e) => {
        const value = e.target.value;

        if(e.target.name==="name") this.setState({name: value})
        else if(e.target.name==="ingredients") this.setState({ingredients: value})
        else if(e.target.name==="price") this.setState({price: value})
    }

    handleAddPizza = () => {
        const {name,ingredients,price} = this.state;

        if(name==="" && name.length<3) return alert("Wpisz nazwę produktu min(3 znaki)")
        else if(ingredients==="" && ingredients.length<5) return alert("Podaj składniki pizzy min(5 znaki)")
        else if(price==="") return alert("Wpisz cenę")

        this.props.addPizza(name, ingredients, price);
        this.setState({
            name: "",
            ingredients: "",
            price: "",
        })
    }

    render() { 
        return (  
            <div className="col-12 col-lg-4">
                <h2>Dodaj pizze</h2>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Nazwa Pizzy</span>
                    </div>
                    <input type="text" value={this.state.name} name="name" onChange={this.handleChange} className="form-control" />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Cena</span>
                    </div>
                    <input type="text" value={this.state.price} name="price" onChange={this.handleChange} className="form-control" />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Składniki</span>
                    </div>
                    <textarea value={this.state.ingredients} name="ingredients" onChange={this.handleChange} className="form-control" />
                </div>

                <button type="button" className="btn btn-primary" onClick={this.handleAddPizza}>Dodaj</button>
                <button type="button" className="btn btn-secondary" onClick={()=>this.props.cancel()}>Anuluj</button>
            </div>
        );
    }
}