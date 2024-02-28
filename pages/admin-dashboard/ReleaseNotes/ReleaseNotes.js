import React, { useEffect, useRef, useState } from "react";
import useSetReleaseNotes from './hooks/useSetReleaseNotes';
import Note from './Note';
import Drawer from './Drawer';
import PrimaryHeading from '../../common-component/primary-heading/PrimaryHeading';

function ReleaseNotes() {

  const {getReleaseNotes, notes, isNotesLoading} = useSetReleaseNotes();
  const [drawer, setDrawer] = useState(false);
  const drawerRef = useRef();

  useEffect(() => {
    getReleaseNotes();
  }, [])
  

  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setDrawer(false);
      }
    }

    if(drawer) {
      document.addEventListener('mousedown', handleClickOutSide)
    }

    return () => document.removeEventListener('mousedown', handleClickOutSide)

  }, [drawer])



  if(isNotesLoading) {
    return <p>Loading...</p>
  }


  return (
    <div className='relative'>
    <div className={`pb-16  ${drawer ? 'w-2/3': 'w-full'} transition-all duration-200`}>
      <div className="mb-12 flex flex-col w-full items-start justify-start">
        <PrimaryHeading headingContent={"Release Notes"} />
        <p className=" text-md text-gray-600">
        Explore the latest advancements and updates with our Release Notes. This section is dedicated to providing detailed insights into new features, improvements, and fixes. Stay informed about the latest developments in our AI template copilots, ensuring you're always ahead in leveraging the most innovative solutions offered by Insituate.        </p>
      </div>
      {/* <div className="mb-12 flex w-full items-center justify-center">
        <button className=" border border-gray-200 rounded-lg text-gray-800 mr-3 text-sm py-2 px-6 transition-all hover:bg-secondary-accent-color">
          New Feature{" "}
          <FontAwesomeIcon
            icon={faArrowUpLong}
            className="ml-1 transform rotate-45"
          />
        </button>
        <button className=" border border-gray-200 rounded-lg text-gray-800 mr-3 text-sm py-2 px-6 transition-all hover:bg-secondary-accent-color">
          Performance Improvement{" "}
          <FontAwesomeIcon
            icon={faArrowUpLong}
            className="ml-1 transform rotate-45"
          />
        </button>
        <button className=" border border-gray-200 rounded-lg text-gray-800 mr-3 text-sm py-2 px-6 transition-all hover:bg-secondary-accent-color">
          Change log{" "}
          <FontAwesomeIcon
            icon={faArrowUpLong}
            className="ml-1 transform rotate-45"
          />
        </button>
      </div> */}
      <div >
        {
          notes?.map((note) => {
            return <Note {...note} setDrawer={setDrawer}  />
          })
        }
      </div>
    </div>
    <>
        <Drawer drawer={drawer} setDrawer={setDrawer} drawerRef={drawerRef} />
    </>
    </div>
  );
}

export default ReleaseNotes;
