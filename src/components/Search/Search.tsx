import { SearchProps } from './Search.props';
import styles from './Search.module.css';

const Search = ({ ...props }: SearchProps) => {
  return (
    <div className={styles.container}>
      <input className={styles.search} {...props} />
      <img className={styles.img} src='/searchIcon.svg' alt='Icon' />
    </div>
  );
};

export default Search;
