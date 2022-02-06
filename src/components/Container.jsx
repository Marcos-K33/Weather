import { useContext } from "react";
import { PixaProvider } from "../context/PixaContext";
import WeatherContext from "../context/WeatherContext";
import DescContainer from "./DescContainer";
import SearchBar from "./SearchBar";
import Loader from "./Loader";
import HourlyDailyContainer from "./HourlyDailyContainer";

const Container = () => {
    const { current: [current, ],
            found: [found, ],
            loader: [loader, ]} = useContext(WeatherContext);

    return (
        <>
            <PixaProvider>
                <SearchBar />
                {(!found && !loader && current) ?
                    <div className="flex-col flex">
                        <div className="flex flex-col md:flex-row">
                            <DescContainer />
                            <HourlyDailyContainer />
                        </div>
                        <footer className='w-full py-4 px-2 text-center'>
                            <small className='text-skyBlue'>
                                <p className='my-2'>
                                    Información meteorológica proporcionada por <a className="underline" href="https://openweathermap.org/" taget="_blank" rel="noopener noreferrer" >OpenWeather</a> e imágenes proporcionadas por <a className="underline" href='https://pixabay.com/es/' target="_blank" rel='noopener noreferrer' >Pixabay</a>
                                </p>
                            </small>
                            <div className='flex justify-between md:w-2/12 w-6/12 mx-auto'>
                                <p className='my-2 text-skyBlue text-xs'><a className="underline" href='https://codepen.io/tholman/pen/yenku' target="_blank" rel='noopener noreferrer' >loader cloud</a></p>
                                <p className='my-2 text-skyBlue text-xs'><a className="underline" href='https://codepen.io/brettclanton001/pen/Hdgru' target="_blank" rel="noopener noreferrer" >loader compass</a></p>
                            </div>
                        </footer>
                    </div>
                    :
                    <Loader loader={loader} />
                }
            </PixaProvider>
        </>
    );
}
 
export default Container;