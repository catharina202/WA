class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        {/* Komponent główny aplikacji */}
        <Pizzeria />
        <Footer />
      </div>
    );
  }
}

// Struktura nagłówka
const Header = () => (
  <header>
    <div className="container">
      <h1>Pizzeria</h1>
    </div>
  </header>
)

// Struktura stopki
const Footer = () => (
  <footer>
    <div className="container">
      <h6>Projekt zaliczeniowy z WA | Katarzyna Krzemień</h6>
    </div>
  </footer>
)
