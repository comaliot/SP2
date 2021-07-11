import Heading from '../layout/Heading';
import ArticleList from './articles/ArticleList';

export default function DashboardPage({ children }) {
  return (
    <div className="px-4">
      <Heading content="Dashboard" />
      {children ? children : <p>Admin dashboard</p>}

      <ArticleList />
    </div>
  );
}
