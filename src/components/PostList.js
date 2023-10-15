import React from "react";
import Post from "./Post";

export default function PostList({ posts, getData }) {
  return (
    <>
      {posts.map((post, index) => (
        <Post
          getData={getData}
          posts={posts}
          key={index}
          post={post}
          onClick={getData}
        />
      ))}
    </>
  );
}
