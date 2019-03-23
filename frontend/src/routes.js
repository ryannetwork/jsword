import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const ArticleList = React.lazy(() => import('./views/Articles/index'));
const ArticleDetail = React.lazy(() => import('./views/Articles/show'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', name: 'Home', component: DefaultLayout, exact: true },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/articles/:id', name: '記事', component: ArticleDetail },
  { path: '/articles', name: '記事一覧', component: ArticleList },
];

export default routes;
