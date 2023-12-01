import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutBtn from './logout/LogoutBtn';
import SearchBlock from './components/SearchBlock/SearchBlock';

function Nav({ quantumAuth }) {
  const [role, setRole] = React.useState('');

  useEffect(() => {
    if (quantumAuth.isAuthenticated()) {
      setRole(quantumAuth.getAuthentication().account.role);
    } else {
      setRole('');
    }
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [quantumAuth.isAuthenticated()]);


  return (
    <nav className="navbar navbar-expand-lg navbar-light mb-3 fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src='/img/logo_dark_bg.png' height={"60px"} alt='logo' />
          Quantum Cup
        </NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Vendors dropdown menu */}
            {
              role === 'vendor' &&
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  Vendors
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <NavLink className="nav-link" to="/vendor">Vendors Page</NavLink>
                  </li>
                  <li className="dropdown-item">
                    <NavLink className="nav-link" to="/createproduct">Create Product</NavLink>
                  </li>
                  <li className="dropdown-item">
                    <NavLink className="nav-link" to="/vendor/product">Product Management</NavLink>
                  </li>
                  <li className="dropdown-item">
                    <NavLink className="nav-link" to="/vendor/orders">Order Management</NavLink>
                  </li>
                </ul>
              </li>
            }

            {/* buyers dropdown menu */}
            {
              role === 'buyer' &&
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  Buyers
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <NavLink className="nav-link" to="/buyer">Buyers Page</NavLink>
                  </li>
                  <li className="dropdown-item">
                    <NavLink className="nav-link" to="/products">List Products</NavLink>
                  </li>
                  <li className="dropdown-item">
                    <NavLink className="nav-link" to="/ordermgmt">Order Management</NavLink>
                  </li>
                </ul>
              </li>
            }
          </ul>
          {
            /* Search box */
            quantumAuth.isAuthenticated() &&
            <SearchBlock placeholder="Search for products" quantumAuth={quantumAuth} />
          }
        </div>
        {
          /* Login button */
          quantumAuth.isAuthenticated() &&
          <LogoutBtn quantumAuth={quantumAuth} />
        }

      </div>
    </nav>
  )
}

export default Nav;
