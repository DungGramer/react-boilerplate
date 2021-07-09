import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './components/Home/Home';


function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  );
}

export default App;
