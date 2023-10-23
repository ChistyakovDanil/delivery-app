import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './MenuLayout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { userAction } from '../../redux/slices/user.slice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { cartAction } from '../../redux/slices/cart.slice';

const MenuLayout = () => {
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const jwtToken = useSelector((state: RootState) => state.user.jwt);
  const items = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    // Проверяем, есть ли JWT-токен
    if (jwtToken) {
      // Выполняем запрос к маршруту /user на вашем сервере
      axios
        .get('http://localhost:3000/user', {
          headers: {
            Authorization: `${jwtToken}`,
          },
        })
        .then((response) => {
          // Обновляем информацию о пользователе
          setUserInfo({
            name: response.data.name,
            email: response.data.email,
          });
        })
        .catch((error) => {
          console.error('Ошибка получения информации о пользователе', error);
        });
    }
  }, [jwtToken]);

  const logout = () => {
    dispatch(cartAction.clearCart());
    dispatch(userAction.logout());
    navigate('/auth/login');
  };

  return (
    <div className={styles['left-panel']}>
      <div className={styles.sidebar}>
        <div className={styles['user-info']}>
          <img src='/userIcon.svg' alt='Icon' />
          <div className={styles['user-name']}>
            <div className={styles.name}>{userInfo.name}</div>
            <div className={styles.email}>{userInfo.email}</div>
          </div>
        </div>
        <div className={styles.nav}>
          <NavLink to='/' className={({ isActive }) => cn(styles.link, { [styles.active]: isActive })}>
            <img src='/menu-icon.svg' alt='menuIcon' />
            Меню
          </NavLink>
          <div className={styles['cart-info']}>
            <NavLink to='/cart' className={({ isActive }) => cn(styles.link, { [styles.active]: isActive })}>
              <img src='/cart-icon.svg' alt='menuIcon' />
              Корзина
            </NavLink>
            <div className={styles.counter}>{items.reduce((acc, item) => (acc += item.count), 0)}</div>
          </div>
        </div>
        <Button className={styles.exit} onClick={logout}>
          <img src='/exitIcon.svg' alt='exitIcon' />
          Вийти
        </Button>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default MenuLayout;
