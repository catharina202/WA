// TableList
class TablesList extends React.Component {
    state = {  }
    render() { 
        const itemListTables = this.props.pizza.map(item=><ItemListTables 
            key={item.id}
            id={item.id}
            name={item.name}
            seats={item.seats}
            isState={item.isState} />)

        return (  
            <div className="col-12 col-lg-4">
                <h2>Lista z stolikami</h2>
                <ul className="list-group">
                    {itemListTables}
                </ul>
            </div>
        );
    }
}

const ItemListTables = (props) => {
    const { id,name,seats,isState } = props;
    return (
        <li className="list-group-item" style={props.isState ? {color: 'gray'} : null}><span className="font-weight-bold">{id}. {name}</span> ({seats} miejsca) - {isState ? "Zajęty" : "Wolny"}</li>
    )
}

