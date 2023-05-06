import React from 'react'

import Projects from '../components/Projects';
import Clients from '../components/Clients';
import AddClientModal from '../components/Modals/AddClientModal';
import AddProjectModal from '../components/Modals/AddProjectModal';

export default function Home() {
  return (
    <>
      <div className="d-flex justify-content-between">
        <AddClientModal />
        <AddProjectModal />
      </div>
      <Projects />
      <hr />
      <Clients />
    </>
  )
}
