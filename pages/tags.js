/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { deleteTag, getTagDetails, getTags } from '../api/tagData';
import TagForm from '../components/forms/TagForm';

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [tObj, setTObj] = useState({});

  const getAlltags = () => {
    getTags().then(setTags);
  };

  const editTag = async (tagId) => {
    const details = await getTagDetails(tagId);
    setEditForm(true);
    setTObj(details);
  };

  const onUpdate = () => {
    getAlltags();
    setEditForm(false);
  };

  const deleteTagCall = (tagId) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      deleteTag(tagId);
    }
  };

  const cancelClick = () => {
    setEditForm(false);
  };

  useEffect(() => {
    getAlltags();
  }, [tags]);

  return (
    <div>
      {editForm ? (
        <>
          <TagForm tagObj={tObj} onUpdate={onUpdate} />
          <p style={{ cursor: 'pointer' }} onClick={cancelClick}>Cancel</p>
        </>
      ) : null }
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Label</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tags && tags.map((tag, index) => (

            <tr key={tag.id}>
              <td>{index + 1}</td>
              <td>{tag.label}</td>
              <td><Button variant="primary" type="click" onClick={() => editTag(tag.id)}>Edit</Button></td>
              <td><Button variant="primary" type="click" onClick={() => deleteTagCall(tag.id)}>Delete</Button></td>
            </tr>

          ))}
        </tbody>
      </Table>

      <TagForm onUpdate={onUpdate} />
    </div>
  );
}
