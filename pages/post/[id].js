import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getPostById } from '../../api/postData';
import CommentCard from '../../components/cards/CommentCard';
import getPostComments from '../../api/commentData';

function PostDetails() {
  const [postDetails, setPostDetails] = useState({});
  const [commentDetails, setCommentDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getPostDetails = () => {
    getPostById(id).then(setPostDetails);
  };
  const getCommentDetails = () => {
    getPostComments(id).then(setCommentDetails);
  };

  useEffect(() => {
    getPostDetails();
    getCommentDetails();
  }, []);

  console.log(commentDetails);
  return (
    <div>
      <div className="display-3 mt-5">{postDetails.title}</div>
      <div>{postDetails.content}</div>
      <div>
        {commentDetails.comments?.map((comments) => (
          <CommentCard commentObj={comments} key={comments.Id} />
        ))}
      </div>
    </div>
  );
}

export default PostDetails;
