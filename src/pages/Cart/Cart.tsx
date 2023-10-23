import { useDispatch, useSelector } from 'react-redux';
import Heading from '../../components/Heading/Heading';
import { AppDispatch, RootState } from '../../redux/store/store';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/products.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import CartItem from '../../components/CartItem/CartItem';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartAction } from '../../redux/slices/cart.slice';

const Cart = () => {
  const [cartProducts, setCardProducts] = useState<Product[]>([]);
  const items = useSelector((s: RootState) => s.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const allProducts = items.map((item) => {
    // Найдите продукт в корзине по id
    const product = cartProducts.find((p) => p.id === item.id);
    if (!product) {
      return null;
    }
    return <CartItem key={product.id} count={item.count} {...product} />;
  });

  const clickSuccess = () => {
    if (items.length <= 0) {
      return alert('Додайте товар до кошика');
    }
    dispatch(cartAction.clearCart());
    navigate('/success');
  };

  const total = items
    .map((item) => {
      // Найдите продукт в корзине по id
      const product = cartProducts.find((p) => p.id === item.id);
      if (!product) {
        return 0;
      }
      return item.count * product.price;
    })
    .reduce((acc, i) => (acc += i), 0);

  useEffect(() => {
    // Загрузите все продукты один раз при монтировании компонента
    const loadProducts = async () => {
      try {
        const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
        setCardProducts(data);
      } catch (error) {
        console.error('Ошибка при загрузке продуктов', error);
      }
    };

    loadProducts();
  }, []);

  return (
    <>
      <Heading className={styles.head}>Кошик</Heading>
      <div className={styles.items}>{items.length <= 0 ? <div>Ваш кошик порожній</div> : allProducts}</div>
      <div className={styles.main}>
        <div className={styles.info}>
          <div className={styles.title}>Підсумок</div>
          <div className={styles.price}>
            {total}
            <span> ₴</span>
          </div>
        </div>
        <div className={styles.delivery}>
          <div className={styles.title}>Доставка</div>
          <div className={styles.price}>
            100<span> ₴</span>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            Підсумок <span>{`(${items.length})`}</span>
          </div>
          <div className={styles.price}>
            {total + 100}
            <span> ₴</span>
          </div>
        </div>
      </div>

      <div className={styles.button}>
        <Button size='big' onClick={clickSuccess}>
          оформити
        </Button>
      </div>
    </>
  );
};

export default Cart;
