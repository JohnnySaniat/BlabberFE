import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

function CommentCard({ commentObj }) {
  return (
    <Card key={commentObj.id} border="dark" style={{ width: '18rem' }}>
      <Card.Header>@{commentObj.author.firstName}</Card.Header>
      <Card.Footer>{commentObj.createdOn}</Card.Footer>
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
    authorId: PropTypes.string,
    content: PropTypes.string,
    createdOn: PropTypes.number,
    author: PropTypes.string,
  }).isRequired,
};

export default CommentCard;
