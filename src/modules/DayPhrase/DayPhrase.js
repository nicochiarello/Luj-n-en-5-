import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DayPhrase.css";

const DayPhrase = () => {
  const [phrase, setPhrase] = useState("");
  useEffect(() => {
    axios
      .get("https://lujan-en-5-api.herokuapp.com/api/posts/phrase")
      .then((res) => setPhrase(res.data[0].phrase));
  }, []);
  return (
    <div className="phrase-container">
      <div className="phrase">
        <h4>Frase del dia:</h4>
        <span>{phrase}</span>
      </div>
    </div>
  );
};

export default DayPhrase;
