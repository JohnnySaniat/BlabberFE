import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { deleteComment } from '../../api/commentData';

function CommentCard({ commentObj }) {
  const removeComment = () => {
    if (window.confirm('Remove comment?')) {
      deleteComment(commentObj.postId, commentObj.id).then(window.location.reload());
    }
  };

  return (
    <div className="d-flex justify-content-center mb-4">
      <Card key={commentObj.id} border="dark" className="text-white" style={{ width: '1000px', backgroundColor: '#333' }}>
        <div className="d-flex gap-3 mx-3 mb-1 mt-2">
          <h5>{commentObj.author}</h5>
          <span className="circle" />
          <h5 className="silent">{commentObj.createdOn}</h5>
        </div>
        <hr className="splitter" />
        <p className="text-white mx-3" style={{ backgroundImage: 'none' }}>
          {commentObj.content}
        </p>
        <Button variant="dark" className="w-30 mb-2 mt-1 m-auto" style={{ position: 'relative', left: '450px' }} onClick={removeComment}>Delete</Button>
      </Card>
    </div>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    createdOn: PropTypes.string,
    author: PropTypes.string,
    postId: PropTypes.number,
  }).isRequired,
};

export default CommentCard;
