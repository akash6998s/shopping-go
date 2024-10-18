import { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row, Card } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="cartContainer">
      <ListGroup>
        {cart.map((prod) => (
          <ListGroup.Item key={prod.id} className="cartItem">
            <Row className="align-items-center">
              <Col md={2}>
                <Image src={prod.image} alt={prod.name} fluid rounded />
              </Col>
              <Col md={3}>
                <div className="cartItemDetail">
                  <span>{prod.name}</span>
                  <span>₹ {prod.price}</span>
                </div>
              </Col>
              <Col md={2}>
                <Rating rating={prod.ratings} />
              </Col>
              <Col md={2}>
                <Form.Control
                  as="select"
                  value={prod.qty}
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_CART_QTY",
                      payload: {
                        id: prod.id,
                        qty: e.target.value,
                      },
                    })
                  }
                >
                  {[...Array(prod.inStock).keys()].map((x) => (
                    <option key={x + 1}>{x + 1}</option>
                  ))}
                </Form.Control>
              </Col>
              <Col md={1}>
                <Button
                  type="button"
                  variant="light"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: prod,
                    })
                  }
                >
                  <AiFillDelete fontSize="20px" />
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className="summary">
        <Card>
          <Card.Body>
            <Card.Title>Order Summary</Card.Title>
            <Card.Text>
              Subtotal ({cart.length} {cart.length > 1 ? "items" : "item"}):{" "}
              <strong>₹ {total}</strong>
            </Card.Text>
            <Button type="button" variant="success" disabled={cart.length === 0}>
              Proceed to Checkout
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
