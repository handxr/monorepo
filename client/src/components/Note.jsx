import { useMutation } from "@apollo/client";
import { DELETE_NOTE } from "../mutations/noteMutations";
import { GET_NOTES } from "../queries/noteQueries";
export function Note({ note }) {
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: {
      id: note.id,
    },
    refetchQueries: [{ query: GET_NOTES }],
  });
  return (
    <>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <button onClick={deleteNote}>Delete task</button>
    </>
  );
}
