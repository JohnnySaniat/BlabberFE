import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPostById } from '../../../api/postData';
import PostForm from '../../../components/forms/PostForm';

function EditPost() {
  const [editPost, setEditPost] = useState(null); // Initialize with null
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getPostById(id)
        .then((postData) => {
          setEditPost(postData);
        })
        .catch((error) => {
          console.error('Error fetching post details:', error);
        });
    }
  }, [id]);

  const handleUpdate = () => {
    router.push(`/posts/${id}`);
  };

  return (
    // Pass editPost as obj prop
    <PostForm obj={editPost} onUpdate={handleUpdate} />
  );
}

export default EditPost;
