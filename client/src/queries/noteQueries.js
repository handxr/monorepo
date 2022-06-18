import { gql } from "@apollo/client";

const GET_NOTES = gql`
  query getNotes {
    notes {
      id
      title
      content
    }
  }
`;

export { GET_NOTES };
