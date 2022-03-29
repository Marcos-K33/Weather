import { useContext } from "react";
import PixaContext from "../context/PixaContext";
import WeatherContext from "../context/WeatherContext";
import { WeatherUtils } from "../utils/WeatherUtils";

const DescContainer = () => {
    const _utils = WeatherUtils();
    const [pixa, ] = useContext(PixaContext);
    const {current: [current,]} = useContext(WeatherContext);
    const {main, wind , weather, sys} = current;
    const code = (weather) ? weather[0].id : "0";

    return (
        <div className="bg-gradient-to-tr from-purple-400 to-green-400 rounded-lg py-3 text-white w-full md:w-1/4 text-center">
            <div className="my-4">
                <small className="shadow-lg mx-auto break-words bg-gray-900 pill text-skyBlue">{`${_utils.mssToLocaleDateString(Date.now() / 1000)}, ${current.name}, ${sys.country}`}</small>
            </div>
            <div className="mx-auto p-3 rounded-lg">
                <img className="rounded-lg shadow-xl mx-auto max-h-80" src={pixa[0].largeImageURL} alt={pixa[0].tags} />
            </div>
            <div className="flex flex-nowrap items-center justify-center my-5">
                <i className={_utils.getIcon(code) + " text-3xl mr-4 shadow-icon"}></i>
                <p className="text-3xl capitalize text-center">{weather[0].description}</p>
            </div>
            <p className="text-6xl mx-auto">{_utils.roundTemp(main.temp)+'°C'}</p>
            <small className="mx-auto mb-4">{'Sensación térmica: ' + _utils.roundTemp(main.feels_like)+'°C'}</small>
            <div className="flex justify-between flex-wrap w-full md:w-2/4 lg:w-full mx-auto">
                <div className="flex w-2/4 flex-nowrap justify-center items-center mb-3">
                    <i className="wi wi-direction-up text-2xl"></i>
                    <p className="ml-2">{'Máx: '+_utils.roundTemp(main.temp_max)+'°C'}</p>
                </div>
                <div className="flex w-2/4 flex-nowrap justify-center items-center mb-3">
                    <i className="wi wi-direction-down text-2xl"></i>
                    <p className="ml-2">{'Mín: '+_utils.roundTemp(main.temp_min)+'°C'}</p>
                </div>
                <div className="flex w-full flex-nowrap justify-center items-center mb-3">
                    <i className="wi wi-raindrop text-2xl"></i>
                    <p className="ml-2">{'Humedad: '+main.humidity+'%'}</p>
                </div>
                <div className="flex w-full flex-nowrap justify-center items-center mb-3">
                    <i className="wi wi-strong-wind text-2xl"></i>
                    <p className="ml-2">{'Velocidad del viento: '+_utils.roundTemp(_utils.msToKmh(wind.speed))+' Km/h'}</p>
                </div>
                <div className="flex w-full flex-nowrap justify-around mt-5">
                    <div className="flex flex-col justify-center items-center">
                        <div className="w-full text-center">
                            <p>Amanecer:</p>
                        </div>
                        <i className="wi wi-sunrise text-2xl"></i>
                        <p className="ml-2">{`${_utils.mssToLocalTimeDate(sys.sunrise)} am`}</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="w-full text-center">
                            <p>Anochecer:</p>
                        </div>
                        <i className="wi wi-sunset text-2xl"></i>
                        <p className="ml-2">{`${_utils.mssToLocalTimeDate(sys.sunset)} pm`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default DescContainer;