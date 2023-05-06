import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_PROJECT } from '../graphql/queries/ProjectQueries';
import Spinner from '../components/Spinner';
import ClientInfo from  '../components/ClientInfo';
import RemoveProjectButton from '../components/RemoveProjectButton';
import EditProjectForm from '../components/EditProjectForm';

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(
    GET_PROJECT, {
      variables: { id } 
    }
  );

  if (loading) return <Spinner/>;
  if (error) return <p>Somenthing went wrong</p>;

  return <>
    { !loading && !error && (
      <div className='mx-auto w-75 card p-5'>
        <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>Back</Link>

        <h1>{data?.project.name}</h1>
        <p>{data?.project.description}</p>

        <h5 className='mt-3'>Projects Status</h5>
        <p className='lead'>{data?.project.status}</p>

        <ClientInfo client={data?.project.client} />
        <EditProjectForm project={data?.project} />
        <hr />
        <RemoveProjectButton projectId={data?.project.id} />
      </div>
    )}
  </>;
};
