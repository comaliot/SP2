import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { BASE_URL, TOKEN_PATH } from '../../constants/api';
import AuthContext from '../../context/AuthContext';

const url = BASE_URL + TOKEN_PATH;

const schema = yup.object().shape({
  username: yup.string().required('Please enter your username'),
  password: yup.string().required('Please enter your password'),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors }, //if you use errors from useForm(), now errors feature is exported from formState.
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    console.log(data);

    try {
      const response = await axios.post(url, data);
      console.log('response', response.data);
      setAuth(response.data);
      history.push('/dashboard');
    } catch (error) {
      console.log('error', error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="px-4">
        {loginError && <Alert className="text-danger">{loginError}</Alert>}
        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            name="username"
            placeholder="Enter username"
            {...register('username')}
          />
          {errors.username && (
            <Alert className="text-danger">{errors.username.message}</Alert>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter Password"
            {...register('password')}
          />
          {errors.password && (
            <Alert className="text-danger">{errors.password.message}</Alert>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          {submitting ? 'Loggin in...' : 'Login'}
        </Button>
      </Form>
    </>
  );
}
