
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Homepage from './pages/Homepage';
import Coins from './pages/Coins';
import Header from './components/Header';
import Login from './pages/Login';
function App() {
  
  return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" Component={Homepage} />
            <Route path="/coin/:id" Component={Coins} exact />
          </Routes>
        </div>
      </BrowserRouter>
  
  );
}

export default App;
