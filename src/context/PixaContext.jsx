import { createContext, useState } from "react";

const PixaContext = createContext();

const PixaProvider = ({children}) => {
    const [pixa, setPixa] = useState([]);

    return(
        <PixaContext.Provider value={[pixa, setPixa]} >{children}</PixaContext.Provider>
    )
}

export {PixaProvider};
export default PixaContext;