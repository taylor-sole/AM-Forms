import ReactDOM from 'react-dom';
import './styles/index.css';
import { makeMainRoutes } from './routes';

const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);