import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPostByUid } from '../api/postData';
import PostCard from '../components/cards/PostCard';

function ShowUserPosts({ uid }) {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const posts = await getPostByUid(uid);
        setUserPosts(posts);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, [uid]);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {userPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

ShowUserPosts.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default ShowUserPosts;
