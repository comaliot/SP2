import { useState, useEffect } from 'react';
import { BASE_URL } from '../../constants/api';
import Article from '../layout/Article';
import Heading from '../layout/Heading';

const API = BASE_URL + 'wp/v2/posts';

export default function Articles() {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(API);

        if (response.ok) {
          const json = await response.json();
          // console.log(json);
          setArticles(json);
        } else {
          setError('An error occured');
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occured: {error}</div>;
  }

  return (
    <div className="px-4">
      <Heading content="Articles" />
      {articles.map(function (article) {
        const {
          id,
          title: { rendered: title },
          date,
          excerpt: { rendered: excerpt },
        } = article;
        return <Article key={id} title={title} date={date} excerpt={excerpt} />;
      })}
    </div>
  );
}
