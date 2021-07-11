import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, Button, Alert } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useAxios from '../../../hooks/useAxios';
import DashboardPage from '../DashboardPage';
import Heading from '../../layout/Heading';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
});

export default function AddArticle() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const history = useHistory();
  const http = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors }, //if you use errors from useForm(), now errors feature is exported from formState.
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    data.status = 'publish';

    console.log(data);

    try {
      const response = await http.post('/wp/v2/posts', data);
      console.log('response', response.data);
      history.push('/dashboard/posts');
    } catch (error) {
      console.log('error', error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <DashboardPage>
      <Heading size="3" content="Add post" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        {serverError && <Alert className="text-danger">{serverError}</Alert>}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            {...register('title')} // After 6.x.x -> 7.x.x update it's not "ref={register}" anymore, but {...register("value_name")}
          />
          {errors.title && (
            <Alert className="text-danger">{errors.title.message}</Alert>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Article content textarea</Form.Label>
          <Form.Control as="textarea" rows={3} {...register('content')} />
        </Form.Group>
        <Button variant="primary" type="submit">
          {submitting ? 'Creating...' : 'Create'}
        </Button>
      </Form>
    </DashboardPage>
  );
}
