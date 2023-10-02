import { SuppliesContext } from "../Context/SuppliesContext";
import { useContext } from "react";

// create a hook function
export const useSuppliesContext = () => {
    // return the value of the NotesContext
    const context = useContext(SuppliesContext);

    if (!context) {
        throw Error('useSuppliesContext must be used inside SuppliesContextProvider')
    }

    return context;
}
