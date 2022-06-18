import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Header, Notes, AddNote } from "./components";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider {...{ client }}>
        <Header />
        <AddNote />
        <Notes />
      </ApolloProvider>
    </>
  );
}

export default App;
