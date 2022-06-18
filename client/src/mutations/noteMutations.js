import { gql } from "@apollo/client";

const ADD_NOTE = gql`
  mutation addNote($title: String!, $content: String!) {
    addNote(title: $title, content: $content) {
      id
      title
      content
    }
  }
`;
const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!) {
    deleteNote(id: $id) {
      id
      title
      content
    }
  }
`;

export { DELETE_NOTE, ADD_NOTE };
