import React, { useContext, useState, useEffect } from "react";
import { Access } from "../../Access";
import { token } from "../../Access";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import ver from "./ver.png";


const Auth = () => {
  const { logged, setLogged } = useContext(Access);
  const { tokenValue, setTokenValue } = useContext(token);
  const [data, setData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  




  const login = () => {
    if (logged === false) {
      return (
        <div className="w-full flex justify-center mt-32 md:mt-4">
          <p className="block h-14 md:w-2/4 text-center text-2xl font-bold bg-red-600 p-2 rounded-full">
            Usuario no identificado
          </p>
        </div>
      );
    } else {
      return (
        <Navigate to="/user/creator" />
      );
    }
  };

  const handleForm = (e) => {
    e.preventDefault();

    const auth = {
      user: e.target[0].value,
      password: e.target[1].value,
    };
    axios
      .post("https://lujan-en-5-api.herokuapp.com/api/posts/auth", auth)
      .then((res) => {
        if (res.data.token) {
          setLogged(true);
          setTokenValue(res.data.token);
          return <Navigate to="/user/creator" />;
        }
      })
      .catch(() => {
        setMsg("Usuario o contraseña incorrectos");
      });
  };

  return (
    <div>
      {login()}

      {logged ? (
        ""
      ) : (
        <div
          id="form"
          className="w-screen  h-96 flex flex-col  justify-center items-center "
        >
          <form
            className="flex flex-col w-2/3 md:w-1/3 "
            action=""
            onSubmit={(e) => handleForm(e)}
          >
            <label
              className="block text-gray-800 text-lg font-bold mb-2"
              htmlFor="usuario"
            >
              Usuario
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="usuario"
              placeholder="Usuario"
            />

            <label
              className="block  text-gray-800 text-lg font-bold mb-2"
              htmlFor="Contraseña"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="relative shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="contraseña"
                placeholder="Contraseña"
              />
              <img
                className="absolute hover:opacity-50 top-2 right-2 w-6"
                onClick={() => setShowPassword(!showPassword)}
                src={ver}
                alt=""
              />
            </div>
          <div className="block w-full text-center">
            <h3 className="block">{msg}</h3>
          </div>
            <button
              class="block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-3"
              type="submit"
            >
              Iniciar sesion
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Auth;
