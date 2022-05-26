import {
  AccountBalanceRounded,
  Chat,
  Favorite,
  HomeRounded,
  Settings,
  SummarizeRounded,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import "./App.css";
import BannerName from "./Components/BannerName";
import Header from "./Components/Header";
import MenuContainer from "./Components/MenuContainer";
import SubMenuContainer from "./Components/SubMenuContainer";
import MenuCard from "./Components/MenuCard";
import { MenuItems, Items } from "./Components/Data";
import ItemCard from "./Components/ItemCard";
import DebitCard from "./Components/DebitCard";
import CartItem from "./Components/CartItem";
import { useStateValue } from "./Components/StateProvider";

function App() {
  //Main Dish State
  const [isMainData, setMainData] = useState(
    Items.filter((element) => element.itemId === "buger01")
  );
  const [{ cart }, dispatch] = useStateValue();

  useEffect(() => {
    const menuLi = document.querySelectorAll("#menu li");

    function setMenuActive() {
      menuLi.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    menuLi.forEach((n) => n.addEventListener("click", setMenuActive));

    // MenuCard Active Toggle

    const menuCards = document
      .querySelector(".rowContainer")
      .querySelectorAll(".rowMenuCard");

    function setMenuCardActive() {
      menuCards.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    menuCards.forEach((n) => n.addEventListener("click", setMenuCardActive));
  }, [isMainData, cart]);

  // Set al dish principal
  const setData = (itemId) => {
    setMainData(Items.filter((element) => element.itemId === itemId));
  };

  return (
    <div className="App">
      {/*Header Section */}
      <Header />
      {/*Main Container */}

      <main>
        <div className="mainContainer">
          {/* Banner */}
          <div className="banner">
            <BannerName name={"Sebastián"} discount={"20"} link={"a"} />
            <img
              src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2Fdelivery.png?alt=media&token=69b9823d-96df-452a-bd4e-14d27a4cc337"
              alt=""
              className="deliveryPic"
            />
          </div>

          {/*dishContainer */}
          <div className="dishContainer">
            <div className="menuCard">
              <SubMenuContainer name={"Menu Category"} />
            </div>
            <div className="rowContainer">
              {MenuItems &&
                MenuItems.map((data) => (
                  <div key={data.id} onClick={() => setData(data.itemId)}>
                    <MenuCard
                      imgSrc={data.imgSrc}
                      name={data.name}
                      isActive={data.id === 1 ? true : false}
                    />
                  </div>
                ))}
            </div>
            <div className="dishitemContainer">
              {isMainData &&
                isMainData.map((data) => (
                  <ItemCard
                    key={data.id}
                    itemId={data.id}
                    imgSrc={data.imgSrc}
                    name={data.name}
                    ratings={data.ratings}
                    price={data.price}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="rightMenu">
          <div className="debitCardContainer">
            <div className="debitCard">
              <DebitCard />
            </div>
          </div>
          {!cart ? (
            <div></div>
          ) : (
            <div className="cartCheckOutContainer">
              <div className="cartContainer">
                <SubMenuContainer name={"Carts Items"} />
                <div className="cartItems">
                  {cart &&
                    cart.map((data) => (
                      <CartItem
                        key={data.id}
                        itemId={data.id}
                        name={data.name}
                        imgSrc={data.imgSrc}
                        price={data.price}
                      />
                    ))}
                </div>
              </div>
              <div className="totalSection">
                <h3>Total</h3>
                <p>
                  <span>$ </span>45.0
                </p>
              </div>
              <button className="checkOut">CheckOut</button>
            </div>
          )}
        </div>
      </main>

      {/*Bottom Menu */}
      <div className="buttomMenu">
        <ul id="menu">
          {/* prettier-ignore */}
          <MenuContainer link={'#'} icon = {<HomeRounded />} isHome/>
          {/* prettier-ignore */}
          <MenuContainer link={'#'} icon = {<Chat />} />
          {/* prettier-ignore */}
          <MenuContainer link={'#'} icon = {<AccountBalanceRounded />} />
          {/* prettier-ignore */}
          <MenuContainer link={'#'} icon = {<Favorite />} />
          {/* prettier-ignore */}
          <MenuContainer link={'#'} icon = {<SummarizeRounded />} />
          {/* prettier-ignore */}
          <MenuContainer link={'#'} icon = {<Settings />} />
          <div className="indicator"></div>
        </ul>
      </div>
    </div>
  );
}

export default App;
