import { useQuery } from  '@apollo/client';

import { GET_CLIENTS } from '../graphql/queries/ClientQueries';

import Spinner from './Spinner';
import ClientRow from  './ClientRow';

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner/>;
  if (error) return <p>Somenthing went wrong</p>;

  return <>{!loading && !error && (
    <table className="table table-hover mt-3">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        { data.clients.map(client => (
          <ClientRow key={client.id} client={client}></ClientRow>
        )) }
      </tbody>
    </table>
  )}</>;
};
