import React, { useContext, useState } from "react";
import { Access } from "../../Access";
import {token} from '../../Access'
import axios from "axios";
import { Link } from "react-router-dom";

const Auth = () => {
  const { logged, setLogged } = useContext(Access);
  const {tokenValue, setTokenValue} = useContext(token)
  const [data, setData] = useState([]);

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
        <div className="w-full flex flex-col justify-center items-center mt-4">
          <p className="block h-14 w-2/4 text-center text-2xl font-bold bg-green-600 p-2 rounded-full">
            Usuario identificado
          </p>
          <Link
            className="mt-11 bg-blue-500 text-white font-bold text-xl p-10 rounded-full"
            to="/user/creator"
          >
            Pagina del creador
          </Link>
        </div>
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
        }
      });
      
  };

  return (
    <div>
      {login()}

      {logged ? (
        ""
      ) : (
        <div className="w-screen  h-96 flex justify-center items-center ">
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
              className="block text-gray-800 text-lg font-bold mb-2"
              htmlFor="Contraseña"
            >
              Contraseña
            </label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="contraseña"
              placeholder="**************"
            />
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
