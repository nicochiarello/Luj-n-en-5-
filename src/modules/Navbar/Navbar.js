import React, { useState, useEffect } from "react";
import "./Navbar.css";
import axios from "axios";
import facebook from "./assets/facebook.ico";
import instagram from "./assets/instagram.ico";
import twitter from "./assets/twitter.ico";
import whatsapp from "./assets/whatsapp.ico";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useTransition, animated } from "react-spring";
import { Link } from "react-router-dom";
import white from './assets/white.png'

const NavBar = (props) => {
  const [hour, setHour] = useState("");
  const [weather, setWeather] = useState("");
  const [categories, setCategories] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    axios
      .get("https://lujan-en-5-api.herokuapp.com/api/posts/categories/navbar")
      .then((res) => setCategories(res.data[0].categories));
  },[]);

  const transition = useTransition(isVisible, {
    from: { x: 0, y: 0, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 0, y: 0, opacity: 0 },
  });

  const dateTime = () => {
    const showdate = new Date();
    const day = () => {
      if (showdate.getDay() === 1) {
        return "Lunes";
      }
      if (showdate.getDay() === 2) {
        return "Martes";
      }
      if (showdate.getDay() === 3) {
        return "Miercoles";
      }
      if (showdate.getDay() === 4) {
        return "Jueves";
      }
      if (showdate.getDay() === 5) {
        return "Viernes";
      }
      if (showdate.getDay() === 6) {
        return "Sabado";
      }
      if (showdate.getDay() === 0) {
        return "Domingo";
      }
    };
    const month = () => {
      if (showdate.getMonth() === 0) {
        return "Enero";
      }
      if (showdate.getMonth() === 1) {
        return "Febrero";
      }
      if (showdate.getMonth() === 2) {
        return "Marzo";
      }
      if (showdate.getMonth() === 3) {
        return "Abril";
      }
      if (showdate.getMonth() === 4) {
        return "Mayo";
      }
      if (showdate.getMonth() === 5) {
        return "Junio";
      }
      if (showdate.getMonth() === 6) {
        return "Julio";
      }
      if (showdate.getMonth() === 7) {
        return "Agosto";
      }
      if (showdate.getMonth() === 8) {
        return "Septiembre";
      }
      if (showdate.getMonth() === 9) {
        return "Octubre";
      }
      if (showdate.getMonth() === 10) {
        return "Noviembre";
      }
      if (showdate.getMonth() === 11) {
        return "Diciembre";
      }
    };

    const displayDateInfo =
      day() + ", " + showdate.getDate() + " de " + month();
    return displayDateInfo;
  };

  const gethour = () => {
    const showHour = new Date();
    const hour = () => {
      if (showHour.getHours() < 10) {
        return "0" + showHour.getHours();
      } else {
        return showHour.getHours();
      }
    };
    const minutes = () => {
      if (showHour.getMinutes() < 10) {
        return "0" + showHour.getMinutes();
      } else {
        return showHour.getMinutes();
      }
    };

    const fullHour = hour() + ":" + minutes();
    return fullHour;
  };

  const getWeather = () => {
    axios
      .get("https://lujan-en-5-api.herokuapp.com/api/posts/categories/navbar")
      .then((res) => console.log(res.data[0].categories))
      .then(
        axios
          .get(
            "http://api.weatherunlocked.com/api/current/-33.038528, -68.880208?app_id=793441a0&app_key=c0cd786fccd2f7b2bd7d9de3db7a0f73"
          )
          .then((res) => setWeather(res.data.temp_c))
      );
  };

  getWeather();

  setInterval(() => {
    setHour(gethour());
  }, 1000);
  gethour();

  return (
    <div>
      <div className="navbar">
        <div className="navbar-items">
          <div onClick={() => setIsVisible(!isVisible)} className="menu-icon">
            <i class="bx bx-menu"></i>
          </div>

          <Link to="/" onClick={() => setIsVisible(false)}>
            <div className="title">
              <h1>Luján en 5</h1> <span>’</span>
              <div className="second-line"></div>
            </div>
          </Link>

          <div className="title-mobile">L5’</div>

          <div className="search">
            <Link to="/search">
              <i class="bx bx-search-alt-2"></i>
            </Link>
          </div>
        </div>

        <div className="navbar-info">
          <div className="dia-info">
            <p>{dateTime()}</p>
          </div>
          <div className="hora-clima">
            <p>{hour}</p>

            <p>{weather}°C</p>

            <div onClick={() => props.themeMode()} className="toggle-container">
              <ToggleSwitch />
            </div>
          </div>
        </div>
      </div>
      {transition((style, item) =>
        item ? (
          <animated.div style={style} className="navbar-opened">
            <div className="navbar-categories">
              <div onClick={() => setIsVisible(false)} className="close-btn">
                x
              </div>
              <div className="categories">
                <h3>Secciones</h3>
              </div>
              <div className="categories-items">
                <div className="categories-items-container">
                  <div className="categories-items_items">
                    <Link onClick={() => setIsVisible(false)} to="/">
                      <span>Inicio</span>
                    </Link>
                    <Link
                      onClick={() => setIsVisible(false)}
                      to="/categories/All"
                    >
                      <span>Ultimas Noticias</span>
                    </Link>
                    {categories.map((i) => (
                      <Link
                        onClick={() => setIsVisible(false)}
                        to={`/categories/${i.value}`}
                      >
                        {i.value}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="navbar-social">
              <div className="navbar-social-title">Redes</div>
              <div className="navbar-social-items">
                <div className="social-items">
                  <img src={facebook} alt="" />
                  <h3>Facebook</h3>
                </div>
                <div className="social-items">
                  <img src={instagram} alt="" />
                  <h3>Instagram</h3>
                </div>
                <div className="social-items">
                  <img src={twitter} alt="" />
                  <h3>Twitter</h3>
                </div>
                <div className="social-items">
                  <img src={whatsapp} alt="" />
                  <h3>WhatsApp</h3>
                </div>
              </div>
            </div>
          </animated.div>
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default NavBar;
