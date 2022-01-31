import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import views from "./assets/eye.png";
import love from "./assets/love.png";
import { Access, token } from "../../Access";
import "../../App.css";
import { useContext } from "react";
import { Link } from "react-router-dom";

function CreatorForm() {
  const [posts, setPosts] = useState([]);
  const { logged, setLogged } = useContext(Access);
   const { tokenValue, setTokenValue } = useContext(token);

  useEffect(() => {
    const getAll = () => {
      axios
        .get("https://lujan-en-5-api.herokuapp.com/api/posts")
        .then((res) => setPosts(res.data));
    };

    getAll();
  }, []);

  const deleteFile = async (id) => {
    if(tokenValue === ""){
      setLogged(false)
    }
    const del = await axios.delete(id,{headers: {token: tokenValue}}).then((res) => res.data);
    console.log(del);
    setPosts((posts) => posts.filter((i) => i._id !== del._id));
  };

  return (
    <div className="App mt-36 md:mt-0 w-full  flex flex-col items-center justify-center">
      <span className="info-cat-creator text-2xl font-bold">
        Numero de artículos: {posts.length}
      </span>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-5 px-7 justify-evenly">
        {posts.map((i) => (
          <div className="no-scrollbar flex w-full  border-2 border-gray-300 gap-8 rounded-xl shadow-2xl  h-96 px-10 my-3 overflow-y-scroll ">
            <div className="w-full no-scrollbar overflow-y-scroll py-1">
              <h2 className="info-cat-creator text-sm text-gray-500">
                {ReactHtmlParser(i.category)}
              </h2>
              <h2 className="creator-title text-xl font-bold font-serif  ">
                {ReactHtmlParser(i.title)}
              </h2>
              <img src={i.photo} alt="" />
              <h3 className="copete">{i.copete}</h3>
              <h2 className="creator-description text-xl">
                {ReactHtmlParser(i.description)}
              </h2>

              <h2 className="creator text-xl">{ReactHtmlParser(i.creator)}</h2>
            </div>

            <div className="flex flex-col relative  ">
              <button
                class="bg-red-600 hover:bg-red-800 text-white font-bold my-2 py-2 px-4 rounded"
                onClick={() =>
                  deleteFile(
                    `https://lujan-en-5-api.herokuapp.com/api/posts/${i._id}`
                  )
                }
              >
                <i class="bx bxs-trash-alt"></i>
              </button>
              <Link to={`/user/creator/postcreate/${i._id}`}>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded">
                  <i class="bx bxs-edit-alt"></i>
                </button>
              </Link>

              <div className="absolute bottom-3">
                <div className="flex text-center justify-center px-2 py-2">
                  <img
                    className="img-views h-5 mt-2"
                    src={views}
                    alt=""
                  />
                  <span className="info-cat-creator font-bold text-2xl ml-3 text-gray-700 underline">
                    {i.clicks}
                  </span>
                </div>

                <div className="flex text-center ">
                  <img className=" h-4 mt-2" src={love} alt="" />
                  <span className="info-cat-creator font-bold text-2xl px-5 text-gray-700  text-center">
                    {Math.round(i.ratesPromedy)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to={`/user/creator/postcreate/all`}>
        <div className="bg-blue-500 hover:bg-blue-600 rounded-full text-2xl px-5 py-2 my-2 cursor-pointer right-5 bottom-5 fixed">
          <p className="text-5xl pb-2 font-black  text-white">+</p>
        </div>
      </Link>
      <Link to="/user/creator/config">
        <div className="bg-gray-600 hover:bg-gray-700 rounded-full text-2xl px-3 py-2 my-2 cursor-pointer right-32 bottom-5 fixed">
          <p className="text-4xl py-2 px-2  font-black  text-white">
            <i class="bx bxs-brightness"></i>
          </p>
        </div>
      </Link>
    </div>
  );
}
export default CreatorForm;
