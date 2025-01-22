import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar color="warning" expand="md">
        <Nav navbar>
          <NavbarBrand href="/">Hillary's Hair Care</NavbarBrand>
          <NavItem>
            <NavLink href="/appointments">Appointments</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/stylists">Stylists</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/customers">Customers</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      <Outlet />
    </>
  );
}

export default App;
