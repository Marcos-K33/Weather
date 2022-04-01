import { WeatherUtils } from "../utils/WeatherUtils";

const DetailModalDaily = ({ dataModal, modalShow, setModalShow }) => {
    const { weather, temp, feels_like } = dataModal;
    const _utils = WeatherUtils();

    const handleModalShow = () => {
        setModalShow(false);
        const bodyDoc = document.getElementsByTagName('body');
        bodyDoc[0].style.removeProperty('overflow');
    }

    return (
        <div className={`${!modalShow ? "invisible" : ""} fixed h-full w-full top-0 left-0 bg-gray-100 dark:bg-gray-900 z-50`}>
            <div className="showModal text-gray-800 dark:text-white w-10/12 md:w-6/12 mx-auto relative p-5 rounded-lg bg-gradient-to-tr from-green-200 to-blue-200 dark:from-red-500 dark:to-purple-500 shadow-xl dark:shadow-none">
                <div className="flex justify-end items-center cursor-pointer" onClick={handleModalShow}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rounded-full text-white bg-gradient-to-l from-red-400 to-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className="w-full">
                    <h3 className="text-base text-center mb-3 text-3xl">{_utils.mssToLocaleDateString(dataModal.dt)}</h3>
                </div>
                <div className="w-full text-center cont-left">
                    <i className={`${_utils.getIcon(weather[0].id)} text-6xl my-3 shadow-icon`}></i>
                    <p className="">{weather[0].description}</p>
                    <div className="flex flex-col">
                        <div className="flex flex-row flex-wrap justify-evenly">
                            <div className="flex flex-row justify-center flex-nowrap items-center">
                                <i className="wi wi-direction-up text-xl my-3"></i>
                                <p className=" ml-2">{`Máxima: ${_utils.roundTemp(temp.max)}°C`}</p>
                            </div>
                            <div className="flex flex-row justify-center flex-nowrap items-center ml-2">
                                <i className="wi wi-direction-down text-2xl my-3"></i>
                                <p className=" ml-2">{`Mínima: ${_utils.roundTemp(temp.min)}°C`}</p>
                            </div>
                            <div className="flex flex-row justify-center flex-nowrap items-center ml-2">
                                <p className=" ml-2">{`Sensación: ${_utils.roundTemp(feels_like.day)}°C`}</p>
                            </div>
                        </div>
                        <div className="flex flex-row flex-wrap justify-evenly">
                            <div className="flex flex-row justify-center flex-nowrap items-center">
                                <i className="wi wi-sunrise text-xl my-3"></i>
                                <p className=" ml-2">{`Salida del Sol: ${_utils.mssToLocalTimeDate(dataModal.sunrise)} am`}</p>
                            </div>
                            <div className="flex flex-row justify-center flex-nowrap items-center ml-2">
                                <i className="wi wi-sunset text-xl my-3"></i>
                                <p className=" ml-2">{`Mínima: ${_utils.mssToLocalTimeDate(dataModal.sunset)} pm`}</p>
                            </div>
                            <div className="flex flex-row justify-center flex-nowrap items-center ml-2">
                                <i className="wi wi-raindrops text-3xl my-3"></i>
                                <p className="ml-2">{`Prob. de lluvia: ${_utils.decimalToPercentage(dataModal.pop)}%`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default DetailModalDaily;