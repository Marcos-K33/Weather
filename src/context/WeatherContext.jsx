import { createContext, useState } from "react";

const WeatherContext = createContext();

const WeatherProvider = ({children}) => {
    const [current, setCurrent] = useState({});
    const [forecast, setForecast] = useState({});
    const [loader, setLoader] = useState(true);
    const [found, setFound] = useState(true);

    const store = {
        loader: [loader, setLoader],
        forecast: [forecast, setForecast],
        current: [current, setCurrent],
        found: [found, setFound]
    }

    return (
        <WeatherContext.Provider value={store}>{children}</WeatherContext.Provider>
    )
}

export {WeatherProvider};
export default WeatherContext;