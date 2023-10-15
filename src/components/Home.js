import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/Home.css";
import SearchBar from "./SearchBar";
import PostList from "./PostList";
import { backend } from "../AuthContext.jsx";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noItemsFound, setNoItemsFound] = useState(false);

  async function getData(data) {
    try {
      const response = await axios.get(
        `${backend}${data ? `post/${data}` : ""}`
      );

      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  async function searchItem(event) {
    const searchTerm = event.target.value.toLowerCase();

    setLoading(true);

    if (!searchTerm) {
      getData();
      setLoading(false);
    } else {
      const filteredPosts = posts.filter((post) => {
        if (post && post.Title) {
          const title = post.Title.toLowerCase();

          for (let i = 0; i < searchTerm.length; i++) {
            if (title[i] !== searchTerm[i]) {
              return false;
            }
          }

          return true;
        } else {
          return false;
        }
      });

      setLoading(false);

      if (filteredPosts.length === 0) {
        setPosts([]);

        setNoItemsFound(true);
        setTimeout(() => {
          setNoItemsFound(false);
        }, 2000);
      } else {
        setNoItemsFound(false);
        setPosts(filteredPosts);
      }
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="home">
      <h1>Posts</h1>
      <SearchBar
        searchItem={searchItem}
        noItemsFound={noItemsFound}
        getData={getData}
      />
      {loading ? (
        <p className="message">Loading...</p>
      ) : (
        <PostList posts={posts} getData={getData} />
      )}
    </div>
  );
}
