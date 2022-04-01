import { useContext, useRef } from "react";
import { PixaProvider } from "../context/PixaContext";
import WeatherContext from "../context/WeatherContext";
import DescContainer from "./DescContainer";
import SearchBar from "./SearchBar";
import Loader from "./Loader";
import HourlyDailyContainer from "./HourlyDailyContainer";

const Container = () => {
    const { current: [current, ],
            found: [found, ],
        loader: [loader,] } = useContext(WeatherContext);
    const refDark = useRef();
    
    const handleDarkMode = () => {
        let rootTag = document.documentElement;
        console.log(rootTag);
        rootTag.classList = refDark.current.checked ? 'dark' : '';
    }   

    return (
        <>
            <div className="flex justify-end items-center">
                <label htmlFor="dark-mode" className="mr-4 text-gray-800 dark:text-white" onClick={handleDarkMode}>Dark Mode</label>
                <input type="checkbox" ref={refDark} id="dark-mode" onClick={handleDarkMode} className="appearance-none px-3 py-2 bg-white dark:bg-slate-900 rounded-full" />
            </div>
            <PixaProvider>
                <SearchBar />
                {(!found && !loader && current) ?
                    <div className="flex flex-col md:flex-row">
                        <DescContainer />
                        <HourlyDailyContainer />
                    </div>
                    :
                    <Loader loader={loader} />
                }
            </PixaProvider>
        </>
    );
}
 
export default Container;