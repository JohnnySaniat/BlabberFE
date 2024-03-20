import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getAllPosts } from '../api/postData';
import PostCard from '../components/cards/PostCard';

function ShowAllPosts() {
  const [posts, setPosts] = useState([]);

  const getAllThePosts = () => {
    getAllPosts().then(setPosts);
  };

  useEffect(() => {
    getAllThePosts();
  }, []);

  return (
    <>
      <div className="text-center my-4">
        <Link href="/post/new" passHref>
          <Button className="post-card-button" variant="secondary">CREATE POST</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {posts.map((post) => {
            console.warn(post);
            return <PostCard key={post.id} post={post} onUpdate={getAllPosts} />;
          })}
        </div>
      </div>
    </>
  );
}

export default ShowAllPosts;
