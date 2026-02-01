import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axiosWithConfig, { setAxiosConfig } from "@/utils/apis/axiosWithConfig";

interface Context {
  id: string;
  token: string;
  changeToken: (id?: string, token?: string) => void;
}

interface Props {
  children: ReactNode;
}

const contextValue = {
  id: "",
  token: "",
  changeToken: () => {},
};

const TokenContext = createContext<Context>(contextValue);

export function TokenProvider({ children }: Readonly<Props>) {
  const [token, setToken] = useState(localStorage.getItem("token") ?? "");
  const [id, setId] = useState(localStorage.getItem("id") ?? "");

  useEffect(() => {
    setAxiosConfig(token);
  }, [token]);

  axiosWithConfig.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        changeToken("");
      }

      return Promise.reject(error);
    }
  );

  const changeToken = useCallback(
    (id?: string, token?: string) => {
      const newToken = token ?? "";
      const newId = id ?? "";
      setToken(newToken);
      setId(newId);
      if (token) {
        localStorage.setItem("token", newToken);
        localStorage.setItem("id", newId);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
      }
    },
    [id, token]
  );

  const tokenContextValue = useMemo(
    () => ({
      token,
      changeToken,
      id,
    }),
    [id, token, changeToken]
  );

  return (
    <TokenContext.Provider value={tokenContextValue}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  const context = useContext(TokenContext);

  if (context === undefined) {
    throw new Error("ERROR, useToken must be used within TokenContext");
  }

  return context;
}
