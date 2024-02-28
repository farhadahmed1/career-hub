import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
// import { createContext, useState } from "react";

// export const UserContext = createContext({});
const Root = () => {
  // const [user, setUser] = useState({});
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
      {/* <UserContext.Provider value={[user, setUser]}>
       
      </UserContext.Provider> */}
    </div>
  );
};

export default Root;
