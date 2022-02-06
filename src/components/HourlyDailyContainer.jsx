import { useContext } from "react";
import WeatherContext from "../context/WeatherContext";
import { WeatherUtils } from "../utils/WeatherUtils";

const _utils = WeatherUtils();

function CardHourly({item}) {
    let {weather} = item;
    let time = _utils.mssToLocalTimeDate(item.dt);
    
    return (
        <div className="p-4 flex flex-col text-center text-darkBlue mx-2">
            <p className="text-gray-700">{`${time} ${(parseInt(time)>=0 && parseInt(time) < 12) ? ' am': ' pm'}`}</p>
            <p className="text-gray-700 capitalize mt-2 whitespace-nowrap">{weather[0].description}</p>
            <i className={_utils.getIcon(weather[0].id) + " text-3xl my-3 shadow-icon"}></i>
            <p className="text-gray-700">{_utils.roundTemp(item.temp) + "°C"}</p>
            <p className="text-xs whitespace-nowrap"><i className="wi wi-strong-wind mr-2"></i>{ _utils.msToKmh(item.wind_speed) + " Km/h"}</p>
        </div>
    );
}

function CardDaily({item}) {
    const {temp, feels_like, weather} = item;

    return (
        <div className="p-4 mx-3">
            <div className="w-full">
                <h5 className="text-base text-center mb-3">{_utils.mssToLocaleDateString(item.dt)}</h5>
            </div>
            <div className="flex flex-col md:flex-row items-center fw-container">
                <div className="w-full text-center cont-left">
                    <i className={_utils.getIcon(weather[0].id) + " text-3xl my-3 shadow-icon"}></i>
                    <p className="text-gray-600">{weather[0].description}</p>
                    <div className="flex flex-col w-2/4 mx-auto">
                        <div className="flex flex-row flex-nowrap justify-evenly">
                            <div className="flex flex-row justify-center flex-nowrap items-center">
                                <i className="wi wi-direction-up text-2xl my-3"></i>
                                <p className="text-gray-700 ml-2">{`${_utils.roundTemp(temp.max)}°C`}</p>
                            </div>
                            <div className="flex flex-row justify-center flex-nowrap items-center ml-2">
                                <i className="wi wi-direction-down text-2xl my-3"></i>
                                <p className="text-gray-700 ml-2">{`${_utils.roundTemp(temp.min)}°C`}</p>
                            </div>
                        </div>
                        <div className="flex flex-row flex-nowrap justify-evenly">
                            <div className="flex flex-row justify-center flex-nowrap items-center">
                                <i className="wi wi-raindrops text-2xl my-3"></i>
                                <p className="text-gray-700 ml-2">{`${_utils.decimalToPercentage(item.pop)}%`}</p>
                            </div>
                            <div className="flex flex-row justify-center flex-nowrap items-center ml-2">
                                <i className="wi wi-day-sunny text-xl my-3"></i>
                                <p className="text-gray-700 ml-2 whitespace-nowrap">{`${Math.round(item.uvi)}uv`}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full pl-3 cont-right overflow-x-scroll md:overflow-visible">
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th></th>
                                <th className="text-sm p-2">Mañana</th>
                                <th className="text-sm p-2">Día</th>
                                <th className="text-sm p-2">Tarde</th>
                                <th className="text-sm p-2">Noche</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-sm p-2">Temperatura</td>
                                <td className="p-2">{`${_utils.roundTemp(temp.morn)}°C`}</td>
                                <td className="p-2">{`${_utils.roundTemp(temp.day)}°C`}</td>
                                <td className="p-2">{`${_utils.roundTemp(temp.eve)}°C`}</td>
                                <td className="p-2">{`${_utils.roundTemp(temp.night)}°C`}</td>
                            </tr>
                            <tr>
                                <td className="text-sm p-2 whitespace-nowrap">Sensación Térmica</td>
                                <td className="p-2">{`${_utils.roundTemp(feels_like.morn)}°C`}</td>
                                <td className="p-2">{`${_utils.roundTemp(feels_like.day)}°C`}</td>
                                <td className="p-2">{`${_utils.roundTemp(feels_like.eve)}°C`}</td>
                                <td className="p-2">{`${_utils.roundTemp(feels_like.night)}°C`}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const HourlyDailyContainer = () => {
    const {forecast: [forecast,]} = useContext(WeatherContext);
    let {hourly, daily} = forecast;
    hourly = [...hourly.slice(1,25)];
    daily = [...daily.slice(1,7)];

    return (
        <div className="bg-sky-blue rounded-lg py-3 ml-0 mt-4 md:mt-0 md:ml-4 text-darkBlue w-fulll md:w-3/4 text-center flex flex-col">
            <div className="my-4">
                <h2 className="text-2xl text-center md:text-left ml-0 md:ml-4">Pronóstico 24 hrs.</h2>
                <div className="flex flex-nowrap overflow-x-scroll overflow-y-hidden p-2">
                    {
                        hourly.map(item => <CardHourly key={Math.random() * Date.now()} item={item} />)
                    }
                </div>
            </div>
            <div className="my-4">
                <h2 className="text-2xl text-center md:text-left ml-0 md:ml-4 mt-4">Pronóstico 6 días</h2>
                <div className="flex flex-col md:flex-row py-2 md:overflow-x-scroll">
                    {
                        daily.map(item => <CardDaily key={Math.random() * Date.now() - Math.random()} item={item} />)
                    }
                </div>
            </div>
        </div>
    );
}
 
export default HourlyDailyContainer;