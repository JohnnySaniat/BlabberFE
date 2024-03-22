import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import getUserDetails from '../../api/userData';
import { postComment, updateComment } from '../../api/commentData';

const initialState = {
  postId: -1,
  authorId: -1,
  content: '',
  createdOn: '',
};

function PostCommentForm({ postId, obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const [userObj, setUserObj] = useState(null);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!user) return;

    getUserDetails(user.uid)
      .then(setUserObj)
      .catch((error) => console.error('Error fetching user details:', error));

    if (obj) {
      setFormInput(obj);
    } else {
      setFormInput(initialState);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formInput,
      postId,
      authorId: userObj.id,
      createdOn: new Date().toISOString(),
    };
    console.warn(payload);
    if (obj && obj.id) {
      updateComment(postId, payload, obj.id)
        .then(() => {
          console.log('comment updated successfully');
          router.push(`/post/${postId}`);
        })
        .catch((error) => console.error('Error updating post:', error));
    } else {
      postComment(postId, payload)
        .then(() => {
          console.log('comment created successfully');
          router.push(`/post/${postId}`);
          window.location.reload();
        })
        .catch((error) => console.error('Error creating post:', error));
    }
  };

  return (
    <>
      <Button variant="dark" className="mt-3 mb-3" onClick={handleShow}>
        Leave a comment
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit} className="p-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-black">Leave a comment</Form.Label>
            <Form.Control type="text" name="content" value={formInput.content} onChange={handleChange} placeholder="Leave a comment" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form>
      </Modal>
    </>
  );
}

PostCommentForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
  }),
  postId: PropTypes.number,
};

PostCommentForm.defaultProps = {
  obj: null,
  postId: null,
};

export default PostCommentForm;
