import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import cn from 'classnames';

const Button = ({ children, size = 'small', className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        styles.button,
        {
          [styles.small]: size === 'small',
          [styles.big]: size === 'big',
        },
        className
      )}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
