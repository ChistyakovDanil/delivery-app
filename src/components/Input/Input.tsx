import { InputProps } from './Input.props';
import styles from './Input.module.css';

const Input = ({ ...props }: InputProps) => {
  return <input className={styles.input} {...props} />;
};

export default Input;
