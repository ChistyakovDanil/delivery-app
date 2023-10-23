import { InputAuthProps } from './InputAuth.props';
import styles from './InputAuth.module.css';

const InputAuth = ({ placeholder, id, title, type, error, ...props }: InputAuthProps) => {
  return (
    <div className={styles.input}>
      <label htmlFor={id}>{title}</label>
      <input {...props} id={id} type={type} placeholder={placeholder} />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default InputAuth;
