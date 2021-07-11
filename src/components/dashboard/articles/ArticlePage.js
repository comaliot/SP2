import { NavLink } from 'react-router-dom';
import DashboardPage from '../DashboardPage';
import ArticleList from '../articles/ArticleList';
import Heading from '../../layout/Heading';

export default function ArticlePage() {
  return (
    <DashboardPage>
      <Heading size="3" content="All articles" />
      <p>
        <NavLink to="/dashboard/articles/add">Add post</NavLink>
      </p>
      <ArticleList />
    </DashboardPage>
  );
}
