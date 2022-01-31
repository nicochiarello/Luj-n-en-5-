import React, { useState, useEffect } from "react";
import axios from "axios";
import "./search.css";
import { Link } from "react-router-dom";
import Date from "../News/Date";

const Search = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const searchPosts = (e) => {
 
    if (e === "") {
      setItems([])
        
    } else {
    
      axios
        .get(`https://lujan-en-5-api.herokuapp.com/api/posts?title=${e}`)
        .then((res) => setItems(res.data));
    }
    
  };



  console.log(items);

  return (
    <div>
      <form action="" onChange={(e) => searchPosts(e.target.value)}>
        <div className="search-box">
          <input
            className="search-input"
            type="text"
            placeholder="¿Que estas buscando?"
          />
          <div className="search-btn">
            <i class="bx bx-search "></i>
          </div>
        </div>
      </form>
      <div className="search-items">
        {items.map((e) => (
          <Link className="search-content-items" to={`/noticias/${e._id}`}>
            <img src={e.photo} alt="" />
            <div className="search-content-items-info">
              <h3>{e.title}</h3>
              <div>
                <h4>{e.category}</h4>
                <Date date={e.date} creator={e.creator}></Date>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
