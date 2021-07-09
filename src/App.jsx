import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';


const Hello = () => {
  return <h1>Hello World</h1>;
};

function App() {
  return (
    <Switch>
      <Header />
      <Route path="/" exact component={Hello} />
    </Switch>
  );
}

export default App;
