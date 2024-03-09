import { ResponseData } from "@/api/auth";
import { ResponseJson, User } from "@/types";
import { AppAxios } from "@/utility/AppAxios";
import * as React from "react";

interface AuthContext {
  user: User | null;
  isLoading: boolean;
}

const initialState: AuthContext = {
  user: null,
  isLoading: true,
};
const AppContext = React.createContext(initialState);

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const getCurrentUser = async () => {
    if (!isLoading) {
      setIsLoading(true);
    }

    try {
      const res = await AppAxios.post<ResponseJson<ResponseData>>(
        "/auth/getuser"
      );
      setUser(res.data.data.user);
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getCurrentUser();
  }, []);

  const value = {
    user,
    isLoading,
  };

  return (
    <AppContext.Provider value={value}>
      {isLoading ? null : children}
    </AppContext.Provider>
  );
};

export const useSession = () => {
  const { user, isLoading } = React.useContext(AppContext);
  return { user, isLoading };
};

export default AuthContext;
