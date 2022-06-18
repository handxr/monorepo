import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_NOTE } from "../mutations/noteMutations";
import { GET_NOTES } from "../queries/noteQueries";

export function AddNote() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState(false);

  const [addNote] = useMutation(ADD_NOTE, {
    variables: {
      ...formData,
    },
    refetchQueries: [{ query: GET_NOTES }],
  });

  const { title, content } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setFormData({
      title: "",
      content: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      addNote();
      clearForm();
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <h3 style={{ margin: "10px 0" }}>Create a note</h3>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: 200,
          gap: 10,
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Add a title</label>
        <input type="text" name="title" onChange={handleChange} value={title} />

        <label htmlFor="content">Add a content</label>
        <input
          type="text"
          name="content"
          onChange={handleChange}
          value={content}
        />

        <button type="submit">Create</button>
        {error && <p style={{ color: "red" }}>Please fill in all fields</p>}
      </form>
    </>
  );
}
