import React, { Fragment, useEffect,useState } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import ProductCard from '../Home/ProductCard';
import Search from './Search';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination'
import { Slider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Loader from '../layout/Loader/Loader';
const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];
  
const Products = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
  
    const [ratings, setRatings] = useState(0);
  const dispatch = useDispatch();
  const { products, loading, error, productCount ,resultPerPage,filteredProductsCount} = useSelector(state => state.products);

const {keyword}=useParams()
const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
    let count = filteredProductsCount;
  useEffect(() => {
    dispatch(getProduct(keyword,currentPage,price,category,ratings));
  }, [dispatch, keyword,currentPage,price,category,error,ratings]);
console.log('products', products,loading)
  return (
    <Fragment>
        <Search/>

      {loading ? (
        <Loader />
      ) : (
        
        <Fragment>
            <h1 className='productsHeading'></h1>
            <div className='products'>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          </div>
      
         
        
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
       
    </Fragment>
     );
};

export default Products;

