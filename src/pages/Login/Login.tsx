import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import InputAuth from '../../components/InputAuth/InputAuth';
import styles from './Login.module.css';
import { FormEvent, useEffect } from 'react';
import { AppDispatch, RootState } from '../../redux/store/store';
import { login, userAction } from '../../redux/slices/user.slice';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux';
import cn from 'classnames';

export interface LoginForm {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
}

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const jwt = useSelector((e: RootState) => e.user.jwt);
  const loginErrorMessage = useSelector((e: RootState) => e.user.loginErrorMessage);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userAction.clearLoginError());
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  return (
    <div className={styles.container}>
      <Heading>Вхід</Heading>
      {loginErrorMessage && <div className={styles['error-message']}>{loginErrorMessage}</div>}
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.input}>
          <InputAuth
            className={cn({ [styles.error]: loginErrorMessage })}
            id='email'
            name='email'
            title='Ваш email'
            placeholder='Email'
          />
          <InputAuth
            className={cn({ [styles.error]: loginErrorMessage })}
            id='password'
            name='password'
            title='Ваш пароль'
            placeholder='Пароль'
            type='password'
          />
        </div>
        <div className={styles.button}>
          <Button size='big'>Вхід</Button>
        </div>
      </form>
      <div className={styles.links}>
        <div>Немає акканута?</div>
        <Link to='/auth/register'>Зареєструватись</Link>
      </div>
    </div>
  );
};

export default Login;
