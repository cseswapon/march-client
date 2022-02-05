import { useContext } from "react";
import { AuthProviders } from "../Context/AuthProvider";
const useAuth = () => {
  return useContext(AuthProviders);
};
export default useAuth;
