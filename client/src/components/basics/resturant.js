import React, { useState } from "react";
import "./style.css";
import Menu from "./menueapi.js";
import Menucard from "./menuCard";
import Navbar from "./Navbar";


const unqList = [
  ...new Set(
    Menu.map((curelement) => {
      return curelement.category;
    })
  ),];

const Resturant = () => {

  const [MenuData, setMenuData] = useState(Menu);
  const [MenuList, setMenuList] = useState(unqList);
 




  const filterItem = (category) => {
    if (category === "All") {
      setMenuData(Menu);
      return;
    }
    const uplist = Menu.filter((curelement) => {
      return curelement.category === category;
    });
    setMenuData(uplist);
  };

  return (
    <>
      <Navbar
        filterItem={filterItem}
        MenuData={MenuData}
        setMenuData={setMenuData}
        MenuList={MenuList}
      />
      <Menucard MenuData={MenuData}  />
    </>
  );
};
export default Resturant;
