import { Route, Switch } from 'react-router-dom';
import('./App.css');
// import './App.css';

const Hello = () => {
  return <h1>Hello World</h1>;
};

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Hello} />
    </Switch>
  );
}

export default App;
