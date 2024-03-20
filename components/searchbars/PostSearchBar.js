import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';

export default function PostSearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue !== '') router.push(`/searchposts/${searchValue}`);
    setSearchValue('');
  };

  return (
    <Form id="search-bar" className="search-bar" onSubmit={handleSubmit}>
      <FormControl type="text" placeholder="Search Posts" size="med" onChange={handleChange} value={searchValue} />
    </Form>
  );
}
