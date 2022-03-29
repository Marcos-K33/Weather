import { useContext } from "react";
import WeatherContext from "../context/WeatherContext";
import { WeatherUtils } from "../utils/WeatherUtils";
import CardDaily from "./CardDaily";
import DetailModalDaily from "./DetailModalDaily";

const _utils = WeatherUtils();

function CardHourly({item}) {
    let {weather} = item;
    let time = _utils.mssToLocalTimeDate(item.dt);
    
    return (
        <div className="bg-gradient-to-bl from-purple-400 to-green-400 p-4 flex flex-col text-center mx-2 rounded-xl">
            <p className="">{`${time} ${(parseInt(time)>=0 && parseInt(time) < 12) ? ' am': ' pm'}`}</p>
            <p className=" capitalize mt-2 whitespace-nowrap">{weather[0].description}</p>
            <i className={_utils.getIcon(weather[0].id) + " text-3xl my-3 shadow-icon"}></i>
            <p className="">{_utils.roundTemp(item.temp) + "°C"}</p>
            <p className="text-xs whitespace-nowrap"><i className="wi wi-strong-wind mr-2"></i>{ _utils.msToKmh(item.wind_speed) + " Km/h"}</p>
        </div>
    );
}

const HourlyDailyContainer = () => {
    const { forecast: [forecast,],
        modal: [modalShow, setModalShow],
        dataModal: [dataModal, setDataModal]} = useContext(WeatherContext);
    let {hourly, daily} = forecast;
    hourly = [...hourly.slice(1,25)];
    daily = [...daily.slice(1,7)];

    return (<>
        <div className="py-3 ml-0 mt-4 md:mt-0 md:ml-4 text-white w-fulll md:w-3/4 text-center flex flex-col">
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
                <div className="flex flex-nowrap overflow-x-scroll py-2">
                    {
                        daily.map(item =>
                            <CardDaily key={Math.random() * Date.now() - Math.random()}
                                item={item}
                                setModalShow={setModalShow}
                                setDataModal={setDataModal}
                            />
                        )
                    }
                </div>
            </div>
        </div>
        {modalShow && <DetailModalDaily dataModal={dataModal} modalShow={modalShow} setModalShow={setModalShow} />}
    </>);
}
 
export default HourlyDailyContainer;