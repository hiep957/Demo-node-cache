import React, { useContext, useState } from "react";

import { useQuery } from "react-query";
import Toast from "../components/Toast";
// import Toast from "../components/Toast";
import * as ApiClient from "../API/ApiClient";


export type UserFormData = {
    id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  date: string;
  phone: string;
  hometown: String;
  role: string;
};

type ToastMes = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMes) => void;
  isLoggedIn: boolean;
  // stripePromise: Promise<Stripe | null>;
  role: string;
  user: UserFormData;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

// const stripePromise = loadStripe(STRIPE_KEY);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMes | undefined>(undefined);

  const { isError } = useQuery("validateToken", ApiClient.validateToken, {
    retry: false,
  });
  const { data: user } = useQuery("viewInfo", ApiClient.viewInfo);
  
  return (
    <AppContext.Provider
      value={{
        showToast: (ToastMes) => {
          setToast(ToastMes);
        },
        isLoggedIn: !isError,
        //   stripePromise,
        role: user?.role || "",
        user: user || ({} as UserFormData),
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
