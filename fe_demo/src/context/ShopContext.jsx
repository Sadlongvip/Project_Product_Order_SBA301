import { createContext, useContext, useReducer } from "react";
import { reduceShop } from "../reduce/Reduced";

/*
    private Long id;
    private String name;
    private String address;
    private String phone;
    private String email;
    private String logo;
    private String banner;
    private String description;
    private String status;
 */
const initState = {
    data: {
        name: "",
        address: "",
        phone: "",
        email: "",
        logo: "",
        banner: "",
        description: "",
        status: ""
    },
    errors: {
        name: "",
        address: "",
        phone: "",
        email: "",
        logo: "",
        banner: "",
        description: "",
        status: ""
    },
    touched: {
        name: false,
        address: false,
        phone: false,
        email: false,
        logo: false,
        banner: false,
        description: false,
        status: false
    }
}

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
    const [state, dispatch] = useReducer(reduceShop, initState)

    return <ShopContext.Provider value={{ state, dispatch }}>{children}</ShopContext.Provider>
}

export function useShopContext(){
    const ctx = useContext(ShopContext);
    if(!ctx){
        throw new Error("ShopContext must be used within ShopProvider")
    }
    return ctx;
}