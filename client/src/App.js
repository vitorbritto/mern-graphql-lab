import { BrowserRouter as Router, Route, Routes } from  'react-router-dom';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache
} from  '@apollo/client';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';

const CACHE = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: CACHE,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container mt-3">
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/projects/:id' element={<Project />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;