import Cookies from "js-cookie";

export const GENERAL_HELPERS = {
  logout() {
    localStorage.clear();
    Cookies.remove("token");
    Cookies.remove("user");
    location.reload();
  },
};
