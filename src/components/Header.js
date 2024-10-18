import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import logo from "./image/Logo.png";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { CartState } from "../context/Context";
import { useState, useEffect } from "react";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      productDispatch({
        type: "FILTER_BY_SEARCH",
        payload: searchTerm,
      });
    }, 300); // Debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, productDispatch]);

  return (
    <Navbar bg="dark" variant="dark" className="navbar" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img src={logo} style={{width: '100px'}} alt="Your Shop Logo" />
          </Link>
        </Navbar.Brand>
        {useLocation().pathname.split("/")[1] !== "cart" && (
          <Navbar.Text className="search">
            <FormControl
              style={{ width: "100%" }}
              type="search"
              placeholder="Search a product..."
              className="m-auto"
              aria-label="Search"
              onChange={handleSearchChange}
            />
          </Navbar.Text>
        )}
        <Nav>
          <Dropdown alignRight>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge bg="danger" pill>
                {cart.length}
              </Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 300, padding: '20px' }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((prod) => (
                    <span className="cartitem" key={prod.id}>
                      <img
                        src={prod.image}
                        className="cartItemImg"
                        alt={prod.name}
                        onError={(e) => {
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.src = "https://via.placeholder.com/200"; // Fallback image
                        }}
                      />
                      <div className="cartItemDetail">
                        <span>{prod.name}</span>
                        <span>₹ {prod.price.split(".")[0]}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button variant="primary" className="w-100 mt-2">
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <span style={{ padding: 10 }}>Cart is Empty!</span>
                  <Link to="/">
                    <Button variant="primary" className="w-100 mt-2">
                      Continue Shopping
                    </Button>
                  </Link>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
