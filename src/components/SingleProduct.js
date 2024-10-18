import { Card, Button } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="products">
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={prod.image}
          alt={prod.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="product-title">{prod.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <span>₹ {prod.price.split(".")[0]}</span>
            <span>
              {prod.fastDelivery ? (
                <span className="text-success">Fast Delivery</span>
              ) : (
                <span className="text-muted">4 days delivery</span>
              )}
            </span>
          </Card.Subtitle>
          <div className="mt-auto">
            <Rating rating={prod.ratings} />
            {cart.some((p) => p.id === prod.id) ? (
              <Button
                variant="danger"
                className="mt-2 w-100"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: prod,
                  })
                }
              >
                Remove from Cart
              </Button>
            ) : (
              <Button
                variant="primary"
                className="mt-2 w-100"
                onClick={() =>
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: prod,
                  })
                }
                disabled={!prod.inStock}
              >
                {!prod.inStock ? "Out of Stock" : "Add to Cart"}
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
