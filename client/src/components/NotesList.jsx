import { useQuery } from "@apollo/client";
import { Note } from "./";
import { GET_NOTES } from "../queries/noteQueries";

export function Notes() {
  const { loading, error, data } = useQuery(GET_NOTES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      {!loading &&
        !error &&
        data?.notes?.map((note) => {
          return (
            <div key={note.id} style={{ margin: "20px 0" }}>
              <Note {...{ note }} />
            </div>
          );
        })}
    </>
  );
}
