// PizzeraManager
class PizzeriaManager extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isAddPizzaActive: false,
            isSumbitOrderActive: false,
        }
    }

    // Zmieniający stan state.isAddPizzaActive - pokazywanie componentu dodającego pizze
    isAddActive = () => {
        this.setState({
            isAddPizzaActive: !this.state.isAddPizzaActive,
            isSumbitOrderActive: false,
        });
    }

    // Zmieniający stan state.isSumbitOrderActive - pokazywanie componentu dodającego zamówienie
    isSubmitActive = () => {
        this.setState({
            isSumbitOrderActive: !this.state.isSumbitOrderActive,
            isAddPizzaActive: false,
        });
    }

    // Anulowanie wyświetlania componentu dodawania
    handleCancelAdd = () => {
        this.setState({ isAddPizzaActive: false });
    }

    render() { 
        return (
            // React.Fragment - otoczka dla pozostałych elementów
            <React.Fragment>
            <div className="row">
                {this.state.isAddPizzaActive ? <AddPizza addPizza={this.props.addPizza} 
                    cancel={this.handleCancelAdd} /> : <div className="col-12 col-lg-6"><button className="btn btn-info" onClick={this.isAddActive}>Dodaj pizze</button></div>}
            </div>
            
            <div className="row">
                {!this.state.isSumbitOrderActive ? <div className="col-12 col-lg-6"><button className="btn btn-success" onClick={this.isSubmitActive}>Dodaj zamówienie</button></div> : <SubmitOrder 
                    pizza={this.props.pizza} 
                    tables={this.props.tables}
                    addOrder={this.props.addOrder} />}
            </div>
            </React.Fragment>
        );
    }
}
