import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getPostById } from '../../api/postData';
import CommentCard from '../../components/cards/CommentCard';
import { getPostComments } from '../../api/commentData';
import PostCommentForm from '../../components/forms/CommentForm';

function PostDetails() {
  const [postDetails, setPostDetails] = useState({});
  const [commentDetails, setCommentDetails] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const getDetails = () => {
    getPostById(id).then(setPostDetails);
    getPostComments(id).then(setCommentDetails);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      <div className="display-3 mt-5">{postDetails.title}</div>
      <div>{postDetails.content}</div>
      <div>
        <PostCommentForm postId={postDetails.id} key={commentDetails.id} />
      </div>
      <div className="d-flex gap-2 flex-column flex-sm-wrap">
        {commentDetails[0]?.map((comments) => (
          <CommentCard commentObj={comments} key={comments.Id} />
        ))}
      </div>
    </div>
  );
}

export default PostDetails;
