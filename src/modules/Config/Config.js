import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import swal from "sweetalert";

const Config = () => {
  const [posts, setPosts] = useState([]);
  const [categoryManager, setCategoryManager] = useState(false);
  const [inputValues, setInputValues] = useState([]);
  const [defaultOption, setDefaultOption] = useState([]);
  const [options, setOptions] = useState([]);
  const [dayPhrase, setDayPhrase] = useState("")
  const [dayPhraseUpdated, SetDayPhraseUpdated] = useState("")

  useEffect(() => {
    axios
      .get("https://lujan-en-5-api.herokuapp.com/api/posts/")
      .then((res) => {
        setPosts(res.data);
      })
      .then(() => axios.get("https://lujan-en-5-api.herokuapp.com/api/posts/category/select"))
      .then(() =>
        axios
          .get("https://lujan-en-5-api.herokuapp.com/api/posts/categories/navbar")
          .then((res) => setOptions(res.data[0].categories))
      )
      .then(() =>
        axios
          .get("https://lujan-en-5-api.herokuapp.com/api/posts/phrase")
          .then((res) => setDayPhrase(res.data[0].phrase))
      );
  }, []);

  const defaultValueSelect = () => {
    const aux = [];
    axios
      .get("https://lujan-en-5-api.herokuapp.com/api/posts/category/select")
      .then((res) => res.data[0].categories.map((i) => aux.push(i)));
    const defaultSelect = [
      { value: "Política", label: "Política" },
      { value: "hola", label: "hola" },
    ];

    console.log(aux);
    return aux;
  };

  defaultValueSelect();

  const getDayPhrase = () => {
    const phrase = {}
    axios
      .get("https://lujan-en-5-api.herokuapp.com/api/posts/phrase")
      .then((res) => phrase.now = res.data);

      return phrase
  }

  getDayPhrase()

  const handleSelect = (i) => {
    if (i.main === true) {
      return "bg-blue-600 w-6 h-6 rounded-full border-2 border-gray-300";
    } else {
      return "bg-white w-6 h-6 rounded-full border-2 border-gray-300";
    }
  };

  const arrowSelect = () => {
    if (categoryManager === false) {
      return (
        <i class="bx bxs-right-arrow mr-4 text-2xl bg-gray-200 rounded-full px-2 py-1 "></i>
      );
    } else {
      return (
        <i class="bx bxs-down-arrow mr-4 text-2xl bg-gray-200 rounded-full px-2 py-1"></i>
      );
    }
  };

  const inputValueHandler = (i) => {
    const categories = i;

    console.log(categories);
    axios.put("https://lujan-en-5-api.herokuapp.com/api/posts/category/select", {
      categories,
    });
  };

  const inputValuesHandler = (e) => {
    const categories = e;
    axios.put("https://lujan-en-5-api.herokuapp.com/api/posts/category/select", categories);
  };

  const handleMain = (i) => {
    axios
      .patch(`https://lujan-en-5-api.herokuapp.com/api/posts/${i._id}`)
      .then(() =>
        axios
          .get("https://lujan-en-5-api.herokuapp.com/api/posts/")
          .then((res) => {
            setPosts(res.data);
          })
      );
      
  };

  const NavbarCategoriesHandler = (e) => {
    const categories = e;
    console.log(categories);
    axios.put("https://lujan-en-5-api.herokuapp.com/api/posts/categories/navbar", {
      categories,
    });
  };

  const getNavbarDefaultValues = () => {
    const values = [];
    axios
      .get("https://lujan-en-5-api.herokuapp.com/api/posts/categories/navbar")
      .then((res) => res.data[0].categories.map((i) => values.push(i)));

    return values;
  };

  const dayPhraseHandler = (e) => {
  
    SetDayPhraseUpdated(e)
  }

  const formHandler = (e) => {
    e.preventDefault()
    axios
      .put("https://lujan-en-5-api.herokuapp.com/api/posts/phrase", {
        phrase: dayPhraseUpdated,
      })
      .then(() =>
        swal({
          title: "Frase actualizada",
          button: "aceptar",
          icon: "success",
        })
      );
  }

  return (
    <div className=" px-16">
      <div>
        <div className=" mt-28 sm:mt-0 flex flex-col w-full">
          <div
            onClick={() => setCategoryManager(!categoryManager)}
            className="flex bg-gray-300 w-full py-3 justify-between mt-5"
          >
            <p className="text-2xl font-bold pl-2">
              Elija la nota de portada
            </p>
            {arrowSelect()}
          </div>
          {categoryManager
            ? posts.map((i) => (
                <div onClick={() => handleMain(i)}>
                  <div className="bg-gray-300 py-6 w-full ">
                    <div className="flex justify-between  px-6">
                      <p>{i.title}</p>
                      <div className={handleSelect(i)}></div>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
        <div className=" w-full  px-2 bg-gray-300 py-5 flex items-center mt-5">
          <p>Seleccione las categorias a mostrar en la página inicial:</p>
        </div>
        <Select
          closeMenuOnSelect={false}
          isMulti
          options={options}
          onChange={(e) => inputValueHandler(e)}
          defaultValue={defaultValueSelect()}
        />
        <div className="w-full px-2 bg-gray-300 py-5 flex items-center mt-5">
          <p>Seleccione las categorias a mostrar en el menú de navegación:</p>
        </div>
        <CreatableSelect
          isMulti
          defaultValue={getNavbarDefaultValues()}
          onChange={(e) => NavbarCategoriesHandler(e)}
        />
        <form className="mt-5" onSubmit={(e) => formHandler(e)}>
          <span className="text-2xl font-bold mt-5">Frase del día:</span> <br />
          <input
            class=" bg-gray-300 w-full text-black  mr-3 py-1 px-2 "
            type="text"
            placeholder={dayPhrase}
            onChange={(e) => dayPhraseHandler(e.target.value)}
          />
          <button
            class="flex-shrink-0 mt-2 bg-green-500 hover:bg-green-700  text-white py-1 px-2 rounded"
            type="submit"
          >
            Actualizar frase
          </button>
        </form>
      </div>
    </div>
  );
};

export default Config;
