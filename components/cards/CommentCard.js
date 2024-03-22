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
    <Card key={commentObj.id} border="dark" style={{ width: '18rem' }}>
      <div className="d-flex justify-content-between mx-4 mb-1 mt-2">
        <h5>{commentObj.author}</h5>
        <h5>{commentObj.createdOn}</h5>
      </div>
      <Card.Body>
        <Card.Text>
          {commentObj.content}
        </Card.Text>
      </Card.Body>
      <Button variant="danger" className="w-30 m-auto mb-1 mt-1" onClick={removeComment}>Delete</Button>
    </Card>
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
