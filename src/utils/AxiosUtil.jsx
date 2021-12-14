import axios from "axios";

const __PIXAURL = `https:///pixabay.com/api/${__PIXAKEY}&min_width=1920`;
const __WEATHERURL = `https://api.openweathermap.org/data/2.5/weather${__WEATHERKEY}&units=metric&lang=es`;
const __WEATHERONECAL = `https://api.openweathermap.org/data/2.5/onecall${__WEATHERKEY}&exclude=current,minutely&units=metric&lang=es`;

export const AxiosUtil = () =>{

    const customAxios = async (url, method) =>{
        try {
            let d = await axios({
                method,
                url
            })
            .then( response => response.data); 
            return d;
        } catch (err) {
            return { error: err, status: 500};
        }
    }

    const getPixa = (url, method = 'get') => {
        url = __PIXAURL + url;
        return customAxios(url, method);
    }

    const getWeather = (url, method = 'get') => {
        url = __WEATHERURL + url;
        return customAxios(url, method);
    }

    const getWeatherOneCall = (url, method = 'get') => {
        url = __WEATHERONECAL + url;
        return customAxios(url, method);
    }

    return {
        getPixa,
        getWeather,
        getWeatherOneCall
    };
}