import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getUserDetails } from '../../api/userData';
import { addReactionToPost, getReactions } from '../../api/reactionData';
import PostReactionCard from '../cards/PostReactionCard';

const initialState = {
  reactionId: -1,
};

function AddReactionForm({ postId, reaction }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const [userObj, setUserObj] = useState(null);
  const router = useRouter();
  const [reactions, setReactions] = useState([]);
  const [rid, setRid] = useState(-1);

  // modal functionality
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!user) return;

    getUserDetails(user.uid)
      .then(setUserObj)
      .catch((error) => console.error('Error fetching user details:', error));

    getReactions().then(setReactions);

    if (reaction) {
      setFormInput(reaction);
    } else {
      setFormInput(initialState);
    }
  }, [reaction]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      reactionId: rid,
      postId,
      userId: userObj.id,
    };
    console.warn(formInput);
    addReactionToPost(postId, payload)
      .then(() => {
        console.log('reaction created successfully');
        router.push(`/post/${postId}`);
        window.location.reload();
      })
      .catch((error) => console.error('Error adding to post:', error));
  };

  return (
    <>
      <Button variant="light" size="sm" className="mt-3 mb-3" onClick={handleShow}>
        React
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit} className="p-3">
          <Form.Group className="mb-3 d-flex row" controlId="formBasicInput">
            <Form.Label className="text-black">Pick a reaction</Form.Label>
            {reactions.map((r) => (
              <Button className="blank" type="submit" onClick={() => setRid(r.id)}>
                <PostReactionCard
                  key={r.id}
                  reactionObj={r}
                />
              </Button>
            ))}
          </Form.Group>
        </Form>
      </Modal>
    </>
  );
}

AddReactionForm.propTypes = {
  reaction: PropTypes.shape({
    postId: PropTypes.number,
    userId: PropTypes.number,
    reactionId: PropTypes.number,
  }),
  postId: PropTypes.number,
  // reactionId: PropTypes.number,
};

AddReactionForm.defaultProps = {
  reaction: null,
  postId: null,
  // reactionId: null,
};

export default AddReactionForm;
