import { useQuery } from  '@apollo/client';

import { GET_PROJECTS } from '../graphql/queries/ProjectQueries';

import Spinner from './Spinner';
import ProjectCard from  './ProjectCard';

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner/>;
  if (error) return <p>Somenthing went wrong</p>;

  return (
    <>
      { data?.projects?.length > 0 ? (
        <div className="row mt-3">
          { data.projects.map(project => (
            <ProjectCard key={project.id} project={project}></ProjectCard>
          )) }
        </div>
      ) : (
        <div className="row mt-3">
          <p>No projects</p>
        </div>
      )}
    </>
  )
};
