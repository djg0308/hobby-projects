import Routes from './routes/routes'
import Header from './components/home/header/header'
import Footer from './components/home/footer/footer'
import React from 'react'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
       <Routes/>
      <Footer />
    </div>
  );
}

export default App;

// https://mui.com/material-ui/getting-started/usage/