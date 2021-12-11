import { createContext, useState } from "react";

const WeatherContext = createContext();

const WeatherProvider = ({children}) => {
    const [current, setCurrent] = useState({});
    const [loader, setLoader] = useState(true);
    const [found, setFound] = useState(true);

    const store = {
        loader: [loader, setLoader],
        current: [current, setCurrent],
        found: [found, setFound]
    }

    return (
        <WeatherContext.Provider value={store}>{children}</WeatherContext.Provider>
    )
}

export {WeatherProvider};
export default WeatherContext;