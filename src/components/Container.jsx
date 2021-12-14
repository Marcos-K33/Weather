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