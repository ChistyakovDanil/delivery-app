import { CartProps } from './CartItem.props';
import styles from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store/store';
import { cartAction } from '../../redux/slices/cart.slice';
import { MouseEvent } from 'react';

const CartItem = (props: CartProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const add = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartAction.add(props.id));
  };

  const remove = () => {
    dispatch(cartAction.remove(props.id));
  };
  const deleteAll = () => {
    dispatch(cartAction.delete(props.id));
  };

  return (
    <div className={styles.card}>
      <img className={styles.image} src={props.img} alt='img' />
      <div className={styles.description}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.price}>{props.price}₴</div>
      </div>
      <div className={styles.actions}>
        <button className={styles['button-minus']} onClick={remove}>
          <img src='/minus-icon.svg' alt='cart-product' />
        </button>
        <div>{props.count}</div>
        <button className={styles['button-plus']} onClick={add}>
          <img src='/plus-icon.svg' alt='cart-product' />
        </button>
        <button className={styles.removeAll} onClick={deleteAll}>
          <img src='/remove-icon.svg' alt='cart-product' />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
