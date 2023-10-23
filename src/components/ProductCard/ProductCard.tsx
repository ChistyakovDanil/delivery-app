import { ProductProps } from './ProductCard.props';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store/store';
import { cartAction } from '../../redux/slices/cart.slice';
import { MouseEvent } from 'react';

const ProductCard = (props: ProductProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const add = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartAction.add(props.id));
  };

  return (
    <div className={styles.card}>
      <Link to={`/product/${props.id}`} className={styles.link}>
        <div className={styles.head} style={{ backgroundImage: `url('${props.img}')` }}>
          <div className={styles.price}>
            {props.price}
            <span>₴</span>
          </div>
          <div className={styles.rating}>
            {props.rating}
            <img src='/rating-icon.svg' alt='rating' />
          </div>
          <button className={styles.cart} onClick={add}>
            <img src='/cart-product.svg' alt='cart-product' />
          </button>
        </div>
        <div className={styles.footer}>
          <div className={styles.title}>{props.title}</div>
          <div className={styles.description}>{props.description}</div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
