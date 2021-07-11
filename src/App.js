import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Articles from './components/articles/Articles';
import Admin from './components/admin/Admin';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/DashboardPage';
import ArticlePage from './components/dashboard/articles/ArticlePage';
import AddArticle from './components/dashboard/articles/AddArticle';
import './App.css';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/articles" component={Articles} />
          <Route path="/article/:id" component={ArticlePage} />
          <Route path="/admin" component={Admin} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/dashboard/articles" exact component={ArticlePage} />
          <Route path="/dashboard/articles/add" exact component={AddArticle} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
