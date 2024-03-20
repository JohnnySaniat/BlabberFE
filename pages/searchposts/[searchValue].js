/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { searchPosts } from '../../api/postData';
import PostCard from '../../components/cards/PostCard';
import PostSearchBar from '../../components/searchbars/PostSearchBar';

export default function Search() {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const router = useRouter();
  const { searchValue } = router.query;

  const searchAllPosts = () => {
    searchPosts(searchValue)
      .then(setFilteredPosts)
      .catch((error) => console.error('Error searching posts:', error));
  };

  useEffect(() => {
    if (searchValue) {
      searchAllPosts();
    }
  }, [searchValue]);

  return (
    <>
      <div className="text-center my-4">
        <PostSearchBar className="navSearch" />
        <div className="d-flex flex-wrap">
          {filteredPosts.map((post) => <PostCard key={post.id} post={post} onUpdate={searchAllPosts} />)}
        </div>
      </div>
    </>
  );
}
