import { HeadingProps } from './Heading.props';
import styles from './Heading.module.css';
import cn from 'classnames';

const Heading = ({ children, ...props }: HeadingProps) => {
  return (
    <h1 className={cn(styles.title)} {...props}>
      {children}
    </h1>
  );
};

export default Heading;
