import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';

import { GET_PROJECTS } from '../graphql/queries/ProjectQueries';
import { REMOVE_PROJECT } from '../graphql/mutations/ProjectMutations';

export default function DeleteProjectButton({ projectId }) {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(REMOVE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_PROJECTS }],
  })

  return (
    <div className="d-flex mt-5">
      <button className="btn btn-danger w-100" onClick={deleteProject}>
        <FaTrash className='icon'/> Delete Project
      </button>
    </div>
  )
}
