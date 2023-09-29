import { AppointmentContext } from "../Context/AppointmentContext";
import { useContext } from "react";

// create a hook function
export const useAppointmentContext = () => {
    // return the value of the NotesContext
    const context = useContext(AppointmentContext);

    if (!context) {
        throw Error('useAppointmentContext must be used inside AppointmentContextProvider')
    }

    return context;
}




