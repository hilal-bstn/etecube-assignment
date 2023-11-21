import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/layouts/Nav';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Report from './components/reports/Report';
import ProductList from './components/product/ProductList';
import CompanyList from './components/company/CompanyList';
import PrivateComponent from './components/layouts/PrivateComponent';
import HomeMenu from './components/layouts/Menu';

function App() {
  const auth = localStorage.getItem('user');

  return (
    <div className="App">
      <BrowserRouter>
      <div>
        <Nav />

        <div className="app-container">
              <Routes>
                <Route element={<PrivateComponent />}>
                  <Route path="/" element={<Report />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/companies" element={<CompanyList />} />
                  <Route path="/logout" element={<h1>Logout Component</h1>} />
                </Route>

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Routes>
          </div>
        </div>
    </BrowserRouter>
        

      {/* <Footer/> */}

    </div>
  );
}

export default App;