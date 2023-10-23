import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import InputAuth from '../../components/InputAuth/InputAuth';
import styles from './Register.module.css';
import { FormEvent, useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../redux/store/store';
import { register, userAction } from '../../redux/slices/user.slice';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux';
import cn from 'classnames';

export interface RegisterForm {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
}

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { jwt, registerErrorMessage } = useSelector((e: RootState) => e.user);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userAction.clearRegisterError());
    const target = e.target as typeof e.target & RegisterForm;
    const { email, password, name } = target;

    setEmailError(null);
    setPasswordError(null);
    setNameError(null);

    if (!email.value) {
      setEmailError('Email не може бути порожнім');
    }
    if (!password.value) {
      setPasswordError('Пароль не може бути порожнім');
    }
    if (!name.value) {
      setNameError("Ім'я не може бути порожнім");
    }

    if (!email.value || !password.value || !name.value) {
      return;
    }

    dispatch(register({ email: email.value, password: password.value, name: name.value }));
  };

  return (
    <div className={styles.container}>
      <Heading>Реєстрація</Heading>
      {registerErrorMessage && <div className={styles['error-message']}>{registerErrorMessage}</div>}
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.input}>
          <InputAuth
            error={emailError}
            className={cn({ [styles.error]: emailError || registerErrorMessage })}
            id='email'
            name='email'
            title='Ваш email'
            placeholder='Email'
          />
          <InputAuth
            error={passwordError}
            className={cn({ [styles.error]: passwordError || registerErrorMessage })}
            id='password'
            name='password'
            title='Ваш пароль'
            placeholder='Пароль'
            type='password'
          />
          <InputAuth
            error={nameError}
            className={cn({ [styles.error]: nameError || registerErrorMessage })}
            id='name'
            name='name'
            title="Ваше ім'я"
            placeholder="Ім'я"
          />
        </div>
        <div className={styles.button}>
          <Button size='big'>Зареєструватись</Button>
        </div>
      </form>
      <div className={styles.links}>
        <div>Є аккаунт?</div>
        <Link to='/auth/login'>Увійти</Link>
      </div>
    </div>
  );
};

export default Register;
