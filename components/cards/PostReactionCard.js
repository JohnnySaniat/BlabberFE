/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

function PostReactionCard({ reactionObj, width, height }) {
  return (
    <Card key={reactionObj.id} style={{ width: '50px', backgroundColor: 'transparent' }} className="m-auto mb-3">
      <div className="d-flex flex-column align-items-center mx-4 mb-1 mt-2">
        <img src={reactionObj.image} alt="Uploaded reaction" width={width || 50} height={height || 50} />
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
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default PostReactionCard;
