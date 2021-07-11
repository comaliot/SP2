import { Card } from 'react-bootstrap';

export default function Article({ id, title, date, excerpt }) {
  return (
    <Card key={id} className="my-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {/* https://www.pluralsight.com/guides/return-html-elements-in-json */}
        <Card.Text dangerouslySetInnerHTML={{ __html: excerpt }}></Card.Text>
      </Card.Body>
    </Card>
  );
}
