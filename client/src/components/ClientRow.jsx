import { useMutation } from '@apollo/client';
import { FaTrash } from  'react-icons/fa';

import { REMOVE_CLIENT } from '../graphql/mutations/ClientMutations';
import { GET_CLIENTS } from '../graphql/queries/ClientQueries';
import { GET_PROJECTS } from '../graphql/queries/ProjectQueries';

export default function ClientRow({ client }) {
  const [removeClient] = useMutation(REMOVE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS } ],
    // update(cache, { data: { removeClient }}) {
    //   const { clients } = cache.readQuery({
    //     query: GET_CLIENTS,
    //   });

    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: { clients: clients.filter(client => client.id !== removeClient.id) },
    //   })
    // }
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger" onClick={removeClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}
