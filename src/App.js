import './App.css';
import './static/weatherIcons/weather-icons/weather-icons.min.css'
import Container from './components/Container';
import { WeatherProvider } from './context/WeatherContext';

function App() {

  return (
    <div className="App p-6">
        <WeatherProvider>
            <Container />
        </WeatherProvider>
    </div>
  );
}

export default App;


/**
 * TODO : add to footer link to loader wetaher
 * https://codepen.io/tholman/pen/yenku loader cloud
 * https://codepen.io/brettclanton001/pen/Hdgru loader compass
 * rootTagClass = document.documentElement.className
 **/
