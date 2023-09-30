import { createContext, useReducer } from "react";

export const AppointmentContext = createContext();

export const appointmentReducer = (state, action) => {
  switch (action.type) {
    case "SET_APPOINTMENT":
      return {
        appointment: action.payload,
      };
    case "CREATE_APPOINTMENT":
      return {
        appointment: [action.payload, ...state.appointment],
      };
    case "DELETE_APPOINTMENT":
      return {
        appointment: state.appointment.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const AppointmentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appointmentReducer, {
    appointment: null,
  });
  return (
    <AppointmentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppointmentContext.Provider>
  );
};
