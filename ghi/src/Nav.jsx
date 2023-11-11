import { NavLink } from 'react-router-dom';

function Nav() {
  return (


    <nav className="navbar navbar-expand-lg mb-3">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src='/img/logo_dark_bg.png' height={"60px"} alt='logo' />
          Quantun Cup
        </NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Buyers dropdown menu */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Vendors
              </a>
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  <NavLink className="nav-link" to="/buyers">Vendors Page</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link" to="/buyers/orders">Orders</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>




  )
}

export default Nav;
