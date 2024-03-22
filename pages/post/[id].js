/* eslint-disable react/jsx-curly-brace-presence */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getPostById } from '../../api/postData';
import CommentCard from '../../components/cards/CommentCard';
import { getPostComments } from '../../api/commentData';
import PostCommentForm from '../../components/forms/CommentForm';
import formatDate from '../../utils/formatDate';
import { getPostReactions } from '../../api/reactionData';
import AddReactionForm from '../../components/forms/AddReactionForm';

function PostDetails() {
  const [postDetails, setPostDetails] = useState({});
  const [commentDetails, setCommentDetails] = useState([]);
  const [reactionDetails, setReactionDetails] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const getDetails = () => {
    getPostById(id).then(setPostDetails);
    getPostComments(id).then(setCommentDetails);
    getPostReactions(id).then(setReactionDetails);
  };

  useEffect(() => {
    getDetails();
  }, []);

  const formattedDate = postDetails?.publicationDate ? formatDate(postDetails.publicationDate) : '';
  // console.log(reactionDetails);
  // console.log(reactionDetails[3]);

  return (
    <div className="d-flex justify-content-center flex-column content-box">
      <div className="mt-3 mb-3 mx-3">
        <div className="display-5 fw-bold">
          {postDetails.title}
        </div>
        <hr className="w-25" />
        <div className="text-secondary mb-1 fs-6 mx-2">
          posted by: {postDetails.user?.firstName} {postDetails.user?.lastName} | {formattedDate}
        </div>
      </div>
      <div className="top-right">
        <AddReactionForm reaction={reactionDetails[3]} postId={postDetails.id} />
      </div>
      <div className="d-flex flex-column gap-3">
        <div className="p-4 text-end">
          <div className="text-start">
            <div style={{ maxWidth: '900px' }}>
              <p>{postDetails.content}</p>
            </div>
          </div>
          <div>
            <img src={postDetails.image} className="expansive" alt={postDetails.content} height={'auto'} style={{ maxHeight: '500px' }} />
          </div>
        </div>
      </div>
      <div className="mt-5 d-flex justify-content-center">
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
