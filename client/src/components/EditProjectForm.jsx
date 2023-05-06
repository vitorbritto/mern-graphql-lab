import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { GET_PROJECT } from '../graphql/queries/ProjectQueries';
import { UPDATE_PROJECT } from '../graphql/mutations/ProjectMutations';

export default function EditProjectForm({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState('');

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [ { query: GET_PROJECT, variables: { id:  project.id } } ],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !status) {
      return alert("Please fill in all fiedls");
    }

    updateProject(name, description, status);
  };
  return (
    <div className="mt-5">
      <h3>Update project Details</h3>
      <form>
        <div className="form-group mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Description</label>
          <textarea
            id="description"
            className="form-control"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="NOT_STARTED">Not Started</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>

          <button type="submit" className="btn btn-success w-100 mt-3 mb-5" onClick={onSubmit}>Update Project</button>
        </div>
      </form>
    </div>
  );
}
