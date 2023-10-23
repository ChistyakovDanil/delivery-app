import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Success.module.css';

const Success = () => {
  return (
    <div className={styles.container}>
      <img className={styles.img} src='/success-icon.svg' alt='' />
      <div className={styles.text}>Ваше замовлення успішно оформлене!</div>
      <Link to='/'>
        <Button size='big'>На головну</Button>
      </Link>
    </div>
  );
};

export default Success;
