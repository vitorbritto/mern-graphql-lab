// import { useMutation } from '@apollo/client';
// import { FaTrash } from  'react-icons/fa';

// import { REMOVE_PROJECT } from '../graphql/mutations/ClientMutations';
// import { GET_PROJECTS } from '../graphql/queries/ClientQueries';

export default function ProjectCard({ project }) {
  // const [removeProject] = useMutation(REMOVE_PROJECT, {
  //   variables: { id: project.id },
  //   // refetchQueries: [{ query: GET_PROJECTS }],
  //   update(cache, { data: { removeProject }}) {
  //     const { projects } = cache.readQuery({
  //       query: GET_PROJECTS,
  //     });

  //     cache.writeQuery({
  //       query: GET_PROJECTS,
  //       data: { projects: projects.filter(project => project.id !== removeProject.id) },
  //     })
  //   }
  // });

  return (
    <div className="col-6">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="card-title">{project.name}</h6>
            <a className="btn btn-light btn-sm" href={`/projects/${project.id}`}>View</a>
          </div>
          <p className="small">Status: <strong>{project.status}</strong></p>
        </div>
      </div>
    </div>
  );
}
