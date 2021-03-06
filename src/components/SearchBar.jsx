import { useContext, useEffect, useRef } from "react";
import PixaContext from "../context/PixaContext";
import WeatherContext from "../context/WeatherContext";
import { AxiosUtil } from "../utils/AxiosUtil";

const SearchBar = () => {
    const refInputSearch = useRef();
    const refSearchIcon = useRef();
    const [, setPixa] = useContext(PixaContext);
    const { current : [current, setCurrent],
            forecast: [, setForecast],
            loader: [, setLoader],
            found: [, setFound] } = useContext(WeatherContext);
    

    useEffect(() => {
        const mountTime = setTimeout(() => {
            AxiosUtil().getPixa('&q=cdmx').then(data => {
                let hitsRes = data.hits.length>0 ? data.hits.filter(hit => hit.imageHeight < hit.imageWidth) : data.hits;
                setPixa(hitsRes);
            });
            AxiosUtil().getWeather('&q=ciudad de mexico').then(data => {
                setCurrent(data);
                let onecall = `&lat=${data.coord.lat}&lon=${data.coord.lon}`;
                AxiosUtil().getWeatherOneCall(onecall).then(data =>{
                    setForecast(data);
                    handleLoadersFalse(false, false);
                });
            });
        }, 2000);

        return () => clearTimeout(mountTime);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const handleLoadersFalse = (loader, found) => {
        setLoader(loader);
        setFound(found);
    }
    
    const handleSearch = (e) =>{
        if((e.key === 'Enter' || e.target === refSearchIcon.current) && refInputSearch.current.value !== ''){
            handleLoadersFalse(true, false);
            let url = `&q=${refInputSearch.current.value.replaceAll(' ', '+')}`;
            AxiosUtil().getWeather(url)
            .then(res => {
                if (res.status && res.status === 500){
                    throw new Error('Ocurrió un problema al obtener los datos del clima');
                }

                let onecall = `&lat=${res.coord.lat}&lon=${res.coord.lon}`;
                AxiosUtil().getWeatherOneCall(onecall).then(data => setForecast(data));
                setCurrent(res);
                AxiosUtil().getPixa(url)
                .then(data => {
                    let hitsRes = data.hits.length>0 ? data.hits.filter(hit => hit.imageHeight < hit.imageWidth) : data.hits;
                    if(hitsRes.length > 0){
                        setPixa(hitsRes);
                        handleLoadersFalse(false, false);
                    }else{
                        url = current ? `&q=${current.weather[0].main}`: "";
                        AxiosUtil().getPixa(url).then(d => setPixa(d.hits));
                        handleLoadersFalse(false, false);
                    }
                })
                .catch(error => {
                    handleLoadersFalse(false, true);
                    refInputSearch.current.focus();
                });
            })
            .catch(error => {
                handleLoadersFalse(false, true);
                refInputSearch.current.focus();
            });
        }
    }

    return (
        <>
            <div className="w-full md:w-3/4 lg:w-2/4 mb-6 mx-auto flex flex-col md:flex-row justify-between items-center showUp">
                <h1 className="text-4xl my-5 font-bold text-dark dark:text-white shadow-icon">Weather App</h1>
                <div className="searchBox flex items-center shadow-lg bg-gradient-to-r from-green-200 to-blue-200 dark:from-red-500 dark:to-purple-500">
                    <input type="text" className="searchInput text-dark dark:text-white" onKeyDown={handleSearch} ref={refInputSearch} />
                    <button className="searchButton">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" ref={refSearchIcon} onClick={handleSearch}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}
 
export default SearchBar;