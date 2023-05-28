import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { useToast } from '@chakra-ui/react';

// @ts-ignore
import { auth } from '../../services/FirebaseConfig';

// @ts-ignore
import logoLogin from '../../assets/imagem/logo.png';

import './styles.css';

export function Login() {
  const [form, setForm] = useState({
    email: {
      hasChanged: false,
      value: '',
    },
    password: {
      hasChanged: false,
      value: '',
    },
  });

  const [error, setError] = useState();

  const navigate = useNavigate();

  const toast = useToast({
    position: 'top',
    title: 'Erro de Login!',
    status: 'error',
    duration: 9000,
    isClosable: true,
  });

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, form.email.value, form.password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate('/home');
        console.log(user);
      })
      .catch((error) => {
        if (error.code == 'auth/invalid-email')
          toast({
            description: 'Email invalido ou campo vazio',
          });

        if (error.code == 'auth/wrong-password')
          toast({
            description: 'Senha incorreta',
          });

        if (error.code == 'auth/missing-password')
          toast({
            description: 'Campo de senha vazio',
          });

        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <div className="containerLogin">
        <div className="header">
          <img src={logoLogin} alt="" />
          <span>Entrar</span>
        </div>
        <form className="formularioLogin">
          <div className="inputContainer">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="E-mail"
              value={form.email.value}
              onChange={(event) =>
                setForm({
                  ...form,
                  email: {
                    hasChanged: true,
                    value: event.target.value,
                  },
                })
              }
              data-testid="email"
            />
          </div>
          <div className="inputContainer">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Senha"
              value={form.password.value}
              onChange={(event) =>
                setForm({
                  ...form,
                  password: {
                    hasChanged: true,
                    value: event.target.value,
                  },
                })
              }
              data-testid="password"
            />
          </div>
          <button className="button" onClick={onLogin}>
            Entrar
          </button>
        </form>
      </div>
    </>
  );
}
