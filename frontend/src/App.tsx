import './App.css';
import FastAPIClient from './Client';
import Button from './components/Button';

import config from './config';


function App(): JSX.Element
{
  const api = new FastAPIClient(config);

  return (
    <div className="App">
      <header className="App-header">
        <Button text="Test" callback={api.buttonPress} />
      </header>
    </div>
  );
}

export default App;
