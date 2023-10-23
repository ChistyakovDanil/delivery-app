import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles['spin-wrapper']}>
      <div className={styles['spinner']}></div>
    </div>
  );
};

export default Loading;
