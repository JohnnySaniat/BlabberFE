import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPostById } from '../../../api/postData';
import PostForm from '../../../components/forms/PostForm';

function EditPost() {
  const [editPost, setEditPost] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getPostById(id).then(setEditPost);
  }, [id]);

  return (
    <PostForm obj={editPost} />
  );
}

export default EditPost;
