import React from 'react';
import { Jumbotron, Button, Form, FormControl } from 'react-bootstrap';
import Articles from '../articles/Articles';

export default function Home() {
  return (
    <div>
      <Jumbotron className="mt-4">
        <h1 className="text-white">Hello World!</h1>
        <p className="text-white">
          We help Front-end developers to provide useful front-end knowledge
        </p>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Jumbotron>

      <Articles />
    </div>
  );
}
