import './App.css';

import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';

function App() {
  return (
    <>
      <h1>WEATHER APP</h1>
      <div className="flex flex-col gap-6">
        <div>input</div>

        <CurrentWeather />
        <Forecast />
      </div>
    </>
  );
}

export default App;
