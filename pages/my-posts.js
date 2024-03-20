import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getPostByUid } from '../api/postData';
import PostCard from '../components/cards/PostCard';

function ShowMyPosts() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  const getAllMyPosts = () => {
    getPostByUid(user.uid)
      .then(setPosts)
      .catch((error) => console.error('Error fetching posts:', error));
  };

  useEffect(() => {
    getAllMyPosts();
  }, []);

  return (
    <>
      <div className="text-center my-4">

        <Link href="/post/new" passHref>
          <Button className="post-card-button" variant="secondary">CREATE POST</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {posts && posts.map((post) => (
            <PostCard key={post.id} post={post} onUpdate={getAllMyPosts} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ShowMyPosts;
