import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

function CommentCard({ commentObj }) {
  return (
    <Card key={commentObj.id} border="dark" style={{ width: '18rem' }}>
      <div className="d-flex justify-content-between mx-4 mb-1 mt-2">
        <h5>{commentObj.author}</h5>
        <h6>{commentObj.createdOn}</h6>
      </div>
      <Card.Body>
        <Card.Text>
          {commentObj.content}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    createdOn: PropTypes.string,
    author: PropTypes.string,
  }).isRequired,
};

export default CommentCard;
