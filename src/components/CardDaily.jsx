import { WeatherUtils } from "../utils/WeatherUtils";

const _utils = WeatherUtils();

const CardDaily = ({ item, setModalShow, setDataModal }) => {
    const handleDetails = () => {
        const bodyDoc = document.getElementsByTagName('body');
        bodyDoc[0].style.overflow = "hidden";
        setModalShow(true);
        setDataModal(item);
    }
    
    const { weather, temp } = item;

    return (
        <div className="p-4 mx-3 cursor-pointer border-gradient relative" onClick={handleDetails}>
            <div className="w-full">
                <h3 className="text-base text-center mb-3">{_utils.mssToLocaleDateString(item.dt)}</h3>
            </div>
            <div className="flex flex-col md:flex-row items-center">
                <div className="w-full text-center cont-left">
                    <i className={_utils.getIcon(weather[0].id) + " text-3xl my-3 shadow-icon"}></i>
                    <p className="">{weather[0].description}</p>
                    <div className="flex flex-col">
                        <div className="flex flex-row flex-nowrap justify-evenly">
                            <div className="flex flex-row justify-center flex-nowrap items-center">
                                <i className="wi wi-direction-up text-2xl my-3"></i>
                                <p className=" ml-2">{`${_utils.roundTemp(temp.max)}°C`}</p>
                            </div>
                            <div className="flex flex-row justify-center flex-nowrap items-center ml-2">
                                <i className="wi wi-direction-down text-2xl my-3"></i>
                                <p className=" ml-2">{`${_utils.roundTemp(temp.min)}°C`}</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CardDaily;