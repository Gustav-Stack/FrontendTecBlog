import React, { useState } from "react";
import ReactQuill from "react-quill";
import { AiOutlineSend } from "react-icons/ai";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ImageResize } from "quill-image-resize-module";
import Quill from "quill";
import "./styles/textEditor.css";

import { useAuth, backend } from "../AuthContext";
Quill.register("modules/imageResize", ImageResize);

const TextEditor = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("<h1>Título</h1><p>Conteúdo do texto</p>");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");

  const handleChange = (value) => setText(value);
  const handleTagChange = (e) => setCurrentTag(e.target.value);
  const { getAuthToken } = useAuth();

  const token = getAuthToken();

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  const sendData = async () => {
    const postData = {
      Title: text.split("<h1>")[1]?.split("</h1>")[0] || "Sem título",
      Message: text,
      Tags: tags
    };

    try {
      await axios.post(`${backend}/`, postData, {
        // Substitua "/api/posts" pela sua rota real
        headers: {
          Authorization: `Bearer ${token}` // Configure o cabeçalho de autorização com o token
        },
        body: postData
      });
      navigate("/");
    } catch (error) {
      console.log("Erro:", error);
    }
  };

  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"]
    ],
    imageResize: {
      displaySize: true
    }
  };

  const quillStyle = {
    minHeight: "300px"
  };

  return (
    <div className="text-editor">
      <div className="text-area">
        <ReactQuill
          value={text}
          onChange={handleChange}
          modules={quillModules}
          placeholder="Insira o título"
          style={quillStyle}
        />
        <div className="tags-container">
          <p>Tags</p>
          <input
            type="text"
            value={currentTag}
            onChange={handleTagChange}
            placeholder="Digite uma tag"
          />
          <button onClick={addTag}>Adicionar Tag</button>
          <div className="selected-tags">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button onClick={() => removeTag(tag)}>x</button>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="send" onClick={sendData}>
        <p>Enviar</p>
        <AiOutlineSend size={25} />
      </div>
    </div>
  );
};

export default TextEditor;
