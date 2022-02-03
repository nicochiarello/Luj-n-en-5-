import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ItemsCategory.css";
import Date from "../News/Date";

const ItemsCategory = (props) => {
  const [items, setItems] = useState(props.items);

  const cutTitles = (text) => {
    let limit = ""
    var reswidth = window.innerWidth
    if(reswidth < 480){
      limit = 75
      if(text.length < limit){
        return text
      }else{

        return text.substr(0,limit) + "..."
      }
    }else{
      return text
    }

  }

  return (
    <div className="items-cat-grid">
      {items.slice(0, 4).map((i) => (
        <Link to={`/noticias/${i._id}`} className="items-cat">
          <div className="items-cat-img">
            <img src={i.photo} alt="" />
       
          </div>
          <div className="items-cat-info">
            <p className="data">
              <Date date={i.date} creator={i.creator}></Date>
            </p>
            <p>{cutTitles(i.title)}</p>

            <span>{i.copete}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ItemsCategory;
