import React, { useState, useEffect, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import { ContentState, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ClipLoader } from "react-spinners";
import { token } from "../../Access";
import swal from "sweetalert";
const CreateForm = () => {
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postCopete, setPostCopete] = useState("");
  const [done, setDone] = useState(false);
  const [postCategoria, setPostCategoria] = useState("");
  const [postCreator, setPostCreator] = useState("");
  const [postImage, setPostImage] = useState("");
  const [idEdit, setIdEdit] = useState("");
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const { id } = useParams();
  const { tokenValue, setTokenValue } = useContext(token);

  useEffect(() => {
    if (id !== "all") {
      axios
        .get(`https://lujan-en-5-api.herokuapp.com/api/posts/${id}`)
        .then((res) => {
          setPostTitle(res.data.title);
          setConvertedContent(res.data.description);

          setPostCategoria(res.data.category);
          setPostCreator(res.data.creator);
          setIdEdit(res.data._id);
          setPostCopete(res.data.copete);

          setEditorState(
            EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(
                  res.data.description ? res.data.description : ""
                )
              )
            )
          );
        })
        .then(() =>
          axios
            .get("https://lujan-en-5-api.herokuapp.com/api/posts/categories/navbar")
            .then((res) => setOptions(res.data[0].categories))
        );
    } else {
      axios
        .get("https://lujan-en-5-api.herokuapp.com/api/posts/categories/navbar")
        .then((res) => setOptions(res.data[0].categories));
    }
  }, []);

  const formData = new FormData();

  formData.append("title", postTitle);
  formData.append("description", convertedContent);
  formData.append("creator", postCreator);
  formData.append("category", postCategoria);
  formData.append("photo", postImage);
  formData.append("copete", postCopete);

  const put = async () => {
    if (idEdit === "") {
      setIsLoading(true);
      await axios
        .post("https://lujan-en-5-api.herokuapp.com/api/posts", formData, {
          headers: { "Content-Type": "multipart/form-data", token: tokenValue },
        })
        .then((res) => setPosts([...posts, res.data]))
        .then(() => setIsLoading(false))
        .then(() => setDone(true))
        .catch((err) => {
          swal({
            title: `Ha habido un error: ${err}`,
            button: "aceptar",
            icon: "error",
          })
          setIsLoading(false)

        }
        );

      return <Navigate to="/user/creator" />;
    } else {
      setIsLoading(true);
      await axios
        .put(`https://lujan-en-5-api.herokuapp.com/api/posts/${idEdit}`, formData, {
          headers: { "Content-Type": "multipart/form-data", token: tokenValue },
        })
        .then(() => setIsLoading(false))
        .then(() => setDone(true));
    }
  };

  const descartar = () => {
    return <Navigate to="/user/creator" />;
  }

  const titleHandler = (e) => {
    setPostTitle(e);
  };

  const creatorHandler = (e) => {
    setPostCreator(e);
  };
  const categoryHandler = (e) => {
    setPostCategoria(e);
  };
  const copeteHandler = (e) => {
    setPostCopete(e);
  };
  const uploadImage = async (e) => {
    setPostImage(e.target.files[0]);
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const getOptions = () => {
    const aux = [];
    axios
      .get("https://lujan-en-5-api.herokuapp.com/api/posts/categories/navbar")
      .then((res) => aux.push(res.data[0]));
    return console.log(aux);
  };
  getOptions();

  const convertContentToHTML = () => {
    let currentContentAsHTML = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    setConvertedContent(currentContentAsHTML);
  };
  return done ? (
    <Navigate to="/user/creator" />
  ) : (
    <div className="flex w-screen justify-center items-center">
      {isLoading ? (
        <div className="w-screen flex justify-center items-center h-96">
          <ClipLoader size={150} color="#0074D9" />
        </div>
      ) : (
        <div className="flex flex-col w-full mt-5  md:w-9/12 px-6 gap-3 border-l border-r border-gray-200">
          <h2 className="text-center text-3xl font-bold my-7">
            Página del creador
          </h2>

          <form
            action=""
            onChange={(e) => titleHandler(e.target.value)}
            className="flex flex-col w-full justify-center "
          >
            <label htmlFor="">Título</label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" '
              value={postTitle}
              type="text"
              placeholder="Escriba el título de la nota"
            />
          </form>

          <form action="" encType="multipart/form-data">
            <label htmlFor="file">Seleccione su imagen</label>
            <input onChange={uploadImage} type="file" filename="photo" />
          </form>

          <form
            onChange={(e) => copeteHandler(e.target.value)}
            className="flex flex-col w-full justify-center"
          >
            <label htmlFor="">Copete</label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"'
              type="text"
              value={postCopete}
            />
          </form>

          <h3>Cuerpo</h3>

          <div>
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            />
          </div>

          <form
            action=""
            onChange={(e) => categoryHandler(e.target.value)}
            className="flex flex-col w-full justify-center"
          >
            <label htmlFor="">Categoria</label>
            <select
              className=" appearance-none w-full bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name=""
              value={postCategoria}
              id=""
              defaultValue="Política"
            >
              <option value="" selected disabled hidden>
                Seleccione una opción
              </option>
              {options.map((i) => (
                <option value={i.value}>{i.value}</option>
              ))}
            </select>
          </form>

          <form
            action=""
            onChange={(e) => creatorHandler(e.target.value)}
            className="flex flex-col  w-full justify-center"
          >
            <label htmlFor="">Creador</label>

            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none "
              type="text"
              placeholder="Ingrese su nombre"
              value={postCreator}
            />
          </form>

          <div className="flex gap-2">
            <btn
              className="bg-blue-600 text-white hover:bg-blue-800 rounded-lg text-2xl px-10 py-3 my-3 cursor-pointer w-min"
              onClick={() => put()}
            >
              Publicar
            </btn>

          </div>
        </div>
      )}
    </div>
  );
};

export default CreateForm;
