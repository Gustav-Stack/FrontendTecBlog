import React from "react";

import { BiArrowBack } from "react-icons/bi";
import axios from "axios"; // Importe o Axios

import "./styles/Home.css";
import { backend } from "../AuthContext.jsx";

export default function Post({ getData, posts, post, onClick }) {
  const deletePost = async (postId) => {
    try {
      // Faça uma requisição DELETE para o servidor, passando o ID do post a ser deletado
      await axios.delete(`${backend}/api/delete/${postId}`);
      getData();
    } catch (error) {
      console.error("Erro ao deletar o post:", error);
    }
  };

  return (
    <div className={posts.length === 1 ? "single-post" : "post"}>
      {posts.length === 1 && (
        <div
          onClick={() => {
            const data = null;
            getData(data);
          }}
        >
          <BiArrowBack className="icon" size={25} />
        </div>
      )}
      <div>
        <p className="date">{post.Date}</p>
      </div>
      <div>
        <li onClick={() => onClick(post._id)}>
          <h2>{post.Title}</h2>
          {post.Tags && post.Tags.length > 0 && (
            <div>
              <h3>Tags</h3>
              <ul className="tags">
                {post.Tags.map((tag, tagIndex) => (
                  <li key={tagIndex} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p
            dangerouslySetInnerHTML={{ __html: post.Message }}
            className={posts.length === 1 ? "open-message" : "message"}
          ></p>
          {/* Botão para deletar o post */}
          <button onClick={() => deletePost(post._id)}>Deletar Post</button>
        </li>
      </div>
    </div>
  );
}
