import { createContext, useReducer } from "react";

export const SuppliesContext = createContext();

export const suppliesReducer = (state, action) => {
  switch (action.type) {
    case "SET_STOCKS":
      return {
        supplies: action.payload,
      };
    case "CREATE_STOCKS":
      return {
        supplies: [action.payload, ...state.supplies],
      };
    case "DELETE_STOCKS":
      return {
        supplies: state.supplies.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const SuppliesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(suppliesReducer, {
    supplies: [],
  });
  return (
    <SuppliesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SuppliesContext.Provider>
  );
};
