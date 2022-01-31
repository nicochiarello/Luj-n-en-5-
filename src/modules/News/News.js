import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import NewsSlider from "../NewsSlider/NewsSlider";
import { BeatLoader } from "react-spinners";
import Date from './Date'
import Slider from "react-slick";
import ItemsCategory from "../ItemsCategory/ItemsCategory";
import DayPhrase from "../DayPhrase/DayPhrase";

const News = () => {
  const [posts, setPosts] = useState([]);
  const [mainPost, setMainPost] = useState([]);
  const [loader, setLoader] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get("https://lujan-en-5-api.herokuapp.com/api/posts")
      .then((res) => setPosts(res.data))
      .then(() => setLoader(false))
      .then(
        axios
          .get("https://lujan-en-5-api.herokuapp.com/api/posts/category/select")
          .then((res) => setCategories(res.data[0].categories))
      );
  }, []);

  const handleViews = (i) => {
    const views = i.clicks + 1;

    axios.put(`https://lujan-en-5-api.herokuapp.com/api/posts/${i._id}`, {
      clicks: views,
    });
  };

  const categoryHandler = (e) => {
    if (e === "All") {
      return "Ultimas noticias";
    } else if (e === "Sociedad_y_Cultura") {
      return "Sociedad y cultura";
    } else {
      return e;
    }
  };

  const items = (i) => {
    const aux = [];

    posts.map((e) => {
      if (e.category === i) {
        aux.push(e);
      }
    
    });
  };

  items();

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    swipeToSlide: true,
    nextArrow: <nextArrow />,
    prevArrow: <prevArrow />,
  };

  return loader ? (
    <div className=" w-screen h-screen pb-52 flex justify-center items-center">
      <BeatLoader />
    </div>
  ) : (
    <div className="content">
      <DayPhrase />
      {posts.map((i) => {
        if (i.main === true) {
          return (
            <Link className="main-card" to={`/noticias/${i._id}`}>
              <div className="photo-card">
                <img src={i.photo} alt="" />
              </div>
              <div className="card-info">
                <h3>{i.title}</h3>
                <span>{i.copete}</span>
                <p>
                  <Date date={i.date} creator={i.creator}></Date>
                </p>
              </div>
            </Link>
          );
        }
      })}

      <Fade>
        <div className="category-line-wrapper">
          <div className="category-text">
            <h3>Últimas Noticias</h3>
          </div>
        </div>
        <div className="simple-card-container">
          {posts.slice(0, 3).map((i, ix) => {
            return (
              <Link
                onClick={() => handleViews(i)}
                className={`items-cat card${ix}`}
                to={`/noticias/${i._id}`}
              >
                <div className="items-cat-img">
                  <img src={i.photo} alt="" />
                </div>
                <div className="items-cat-info">
                  <p className="data">
                    <Date date={i.date} creator={i.creator}></Date>
                    {/* {i.creator} | {i.date} */}
                  </p>
                  <p>{i.title}</p>

                  <span>{i.copete}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </Fade>
      {categories.map((e) => {
        const items = posts.filter(
          (i) => (i.category === e.value) & (i.main === !true)
        );
        return (
          <>
            <div className="category-line-wrapper">
              <div className="category-line"></div>
              <div className="category-text">
                <h3>{categoryHandler(e.value)}</h3>
              </div>
              <div className="category-line"></div>
            </div>
            <div className="grid-container">
              <ItemsCategory items={items} />
            </div>
          </>
        );
      })}
    </div>
  );
};

export default News;
