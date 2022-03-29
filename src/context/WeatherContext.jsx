import { createContext, useState } from "react";

const WeatherContext = createContext();

const WeatherProvider = ({children}) => {
    const [current, setCurrent] = useState({});
    const [forecast, setForecast] = useState({});
    const [loader, setLoader] = useState(true);
    const [found, setFound] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [dataModal, setDataModal] = useState({});

    const store = {
        loader: [loader, setLoader],
        forecast: [forecast, setForecast],
        current: [current, setCurrent],
        found: [found, setFound],
        modal: [modalShow, setModalShow],
        dataModal: [dataModal, setDataModal]
    }

    return (
        <WeatherContext.Provider value={store}>{children}</WeatherContext.Provider>
    )
}

export {WeatherProvider};
export default WeatherContext;