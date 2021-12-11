export const WeatherUtils = () => {

    const getIcon = code => {
        var prefix = 'wi wi-owm-';
        var today = new Date();
        
        var time = (today.getHours() > 6 && today.getHours() < 20) ?  "day-" : "night-";
        return prefix + time + code;
    }

    const roundTemp = temp => (Math.round(temp*10)/10)

    const msToKmh = ms => (Math.round((ms*3.6) * 100) / 100)

    const mssToLocalTimeDate = ms => {
        var date = new Date(ms * 1000);
        return date.toLocaleTimeString().substr(0, 5);
    }

    const mssToLocaleDateString = ms =>{
        const days = { "Mon": "Lun", "Tue": "Mar", "Wed": "Mie", "Thu":"Jue",
            "Fri": "Vie", "Sat": "Sáb", "Sun": "Dom"
        }
        const months = { "Jan": "Ene", "Apr": "Abr", "Aug": "Ago", "Dec": "Dic"}

        var date = new Date(ms * 1000);
        var dateArr = date.toDateString().split(" ");
        var mes = (dateArr[1] === "Jan" || dateArr[1] === "Apr" || dateArr[1] === "Aug" || dateArr[1] === "Dec") ? months[dateArr[1]] : dateArr[1];
        return `${days[dateArr[0]]} ${dateArr[2]} ${mes}`;
    }

    const decimalToPercentage = dec => Math.round(dec*100);

    return{
        getIcon,
        roundTemp,
        msToKmh,
        mssToLocalTimeDate,
        mssToLocaleDateString,
        decimalToPercentage
    }
}