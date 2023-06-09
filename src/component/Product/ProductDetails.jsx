import React, { useEffect, Fragment, useState } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails, newReview } from "../../actions/productAction.js";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard.js";
import ReactStars from "react-rating-stars-component";
import Loader from "../layout/Loader/Loader";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { addItemsToCart } from "../../actions/cartAction";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [load, setLoad] = useState(false);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
  };

  const submitReviewToggle = () => {
    setOpen(!open);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
    setOpen(false);
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, error, loading } = useSelector((state) => state.productDetails);

  const options = {
    size: window.innerWidth < 600 ? 20 : 25,
    readOnly: true,
    precision: 0.5,
    edit: false,
    idHalf: true,
    activeColor: "tomato",
    color: "rgba(20,20,20,0.12)",
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!loading) {
      setLoad(true);
    }
  }, [loading]);

  console.log("product", product?.images?.[0]?.url);

  return (
    load && (
      <Fragment>
        <div className="ProductDetails">
          <div>
            <div>
              {product?.images &&
                product.images.map((item, i) => (
                  <img
                    className="divImage"
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </div>
          </div>

          <div>
            <div className="detailsBlock-1">
              <h2>{product?.name}</h2>
              <p>Product # {product?._id}</p>
            </div>
            <div className="detailsBlock-2">
              <ReactStars {...options} />
              <span className="detailsBlock-2-span">
                {" "}
                ({product?.numOfReviews} Reviews)
              </span>
            </div>
            <div className="detailsBlock-3">
              <h1>{`₹${product?.price}`}</h1>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button onClick={decreaseQuantity}>-</button>
                  <input readOnly type="number" value={quantity} />
                  <button onClick={increaseQuantity}>+</button>
                </div>
                <button
                  disabled={product?.Stock < 1 ? true : false}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </div>

              <p>
                Status:
                <b className={product?.Stock < 1 ? "redColor" : "greenColor"}>
                  {product?.Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>

            <div className="detailsBlock-4">
              Description : <p>{product?.description}</p>
            </div>

            <button className="submitReview" onClick={submitReviewToggle}>
              Submit Review
            </button>
          </div>
        </div>

        <h3 className="reviewsHeading">REVIEWS</h3>

        <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
        >
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className="submitDialog">
            <ReactStars
              onChange={(newRating) => setRating(newRating)}
              value={rating}
              size="large"
            />

            <textarea
              className="submitDialogTextArea"
              cols="30"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={submitReviewToggle}>
              Cancel
            </Button>
            <Button color="primary" onClick={reviewSubmitHandler}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        {product?.reviews && product.reviews[0] ? (
          <div className="reviews">
            {product.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )}
      </Fragment>
    )
  );
};

export default ProductDetails;
