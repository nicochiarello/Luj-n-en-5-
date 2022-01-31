import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import './categories.css'
const Categories = () => {
  const [data, setData] = useState([""]);
  const [loader, setLoader] = useState(true);
  const { category } = useParams();

  const categoryHandler = () => {
    if(category === 'All'){
      return 'Ultimas noticias'
    }else if (category === "Sociedad_y_Cultura") {
      return "Sociedad y cultura";
    } else{
      return category
    }
  }

  useEffect(() => {
    if (category === "All") {
      axios
        .get("https://lujan-en-5-api.herokuapp.com/api/posts")
        .then((res) => setData(res.data))
        .then(() => setLoader(false));
    } else {
      axios
        .get(`https://lujan-en-5-api.herokuapp.com/api/posts/?category=${category}`)
        .then((res) => setData(res.data))
        .then(() => setLoader(false));
    }
  }, [category]);

  console.log(data);

  return loader ? (
    <div className=" w-screen h-screen pb-52 flex justify-center items-center">
      <BeatLoader />
    </div>
  ) : (
    <div>
      <div className="categories-line-wrapper">
      
        <div>
          <h3>{categoryHandler()}</h3>
        </div>
     
      </div>
      <div className="categories-wrapper">
        {data.map((i) => (
          <Link to={`/noticias/${i._id}`}>
            <div className="category-item">
              <div className="category-item-img">
                <div className="category-img">
                  <img className=" w-1/6 " src={i.photo} alt="" />
                </div>
              </div>

              <div className="categories-item-info">
                <h4>{i.creator}</h4>
                <h3 className="text-2xl">{i.title}</h3>
                <span>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquam totam, accusamus quaerat iure provident repellendus
                  assumenda omnis labore a, numquam officia placeat illum
                  soluta. Eos dolorem atque omnis quasi deleniti vel quaerat est
                  doloribus ut nostrum! Qui tempora minus possimus?
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
