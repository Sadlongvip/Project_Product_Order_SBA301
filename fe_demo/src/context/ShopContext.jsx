import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { reduceShop } from "../reduce/Reduced";
import { getItemByShopId } from "../service/ItemService";
import { getShopByAccountId } from "../service/ShopService";
import { useAccount } from "../hooks/useAccount";
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
        status: "",
        account: ""
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
    const [listItem, setListItem] = useState([]);
    const account = useAccount();

    async function fetchData() {
        if (account?.id) {
            try {
                const dataShop = await getShopByAccountId(account.id);
                if (dataShop && dataShop.id) {
                    dispatch({ type: "SET_SHOP", payload: dataShop });

                    try {
                        const dataItem = await getItemByShopId(dataShop.id);
                        setListItem(dataItem);
                    } catch (error) {
                        console.error("Error fetching items:", error);
                        setListItem([]);
                    }
                } else {
                    dispatch({ type: "SET_SHOP", payload: initState.data });
                    setListItem([]);
                }
            } catch (error) {
                console.error("Error fetching shop:", error);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [account?.id]);

    return <ShopContext.Provider value={{ state, dispatch, listItem, fetchData }}>{children}</ShopContext.Provider>
}

export function useShop() {
    const ctx = useContext(ShopContext);
    if (!ctx) {
        throw new Error("ShopContext must be used within ShopProvider")
    }
    return ctx;
}