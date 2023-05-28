import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService.ts';

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

  const SingIn = () => {
    new AuthService()
      .login(form.email.value, form.password.value)
      .then((e) => console.log(e))
      .catch((e) => console.log('Error', e));
  };

  return (
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
        <button className="button" onClick={SingIn}>
          Entrar
        </button>
      </form>
    </div>
  );
}
