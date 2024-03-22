import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

function PostReactionCard({ reactionObj }) {
  return (
    <Card key={reactionObj.id} border="dark" style={{ width: '125px' }} className="m-auto mb-3">
      <div className="d-flex flex-column align-items-center mx-4 mb-1 mt-2">
        <h5>{reactionObj.label}</h5>
        <img src={reactionObj.image} alt="Uploaded reaction" width={50} height={50} />
      </div>
    </Card>
  );
}

PostReactionCard.propTypes = {
  reactionObj: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
};

export default PostReactionCard;
