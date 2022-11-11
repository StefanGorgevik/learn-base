import React, { createContext, useContext, useState } from "react";
import { AlertSettingsProps } from "../types";

export interface ContextProps {
  editing: boolean;
  alert: AlertSettingsProps;
  setEditing: (editing: boolean) => void;
  setAlert: (alert: AlertSettingsProps) => void;
  currentCollection: string;
  setCurrentCollection: (currentCollection: string) => void;
}
export const initAlertData = {
  show: false,
  type: "",
  text: "text",
};

export const MainContext = createContext({
  editing: false,
  alert: initAlertData,
  setEditing: () => {},
  setAlert: () => {},
  currentCollection: "",
  setCurrentCollection: () => {},
} as ContextProps);

export const MainContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertSettingsProps>(initAlertData);
  const [currentCollection, setCurrentCollection] = useState("javascript");

  return (
    <MainContext.Provider
      value={{
        editing,
        alert,
        setEditing,
        setAlert,
        currentCollection,
        setCurrentCollection,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const {
    alert,
    setAlert,
    editing,
    setEditing,
    currentCollection,
    setCurrentCollection,
  } = useContext(MainContext);
  return {
    alert,
    setAlert,
    editing,
    setEditing,
    currentCollection,
    setCurrentCollection,
  };
};

export const useAlert = () => {
  const { alert, setAlert } = useContext(MainContext);
  return {
    alert,
    setAlert,
  };
};

export const useEditing = () => {
  const { editing, setEditing } = useContext(MainContext);
  return {
    editing,
    setEditing,
  };
};

export const useCurrentCollection = () => {
  const { currentCollection, setCurrentCollection } = useContext(MainContext);
  return {
    currentCollection,
    setCurrentCollection,
  };
};
