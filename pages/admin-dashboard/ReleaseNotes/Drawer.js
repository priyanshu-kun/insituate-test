import React from 'react'

function Drawer({ drawer, drawerRef }) {
  return (
    <div ref={drawerRef} className={`h-screen ${drawer ? 'w-1/4' : 'w-0'} transition-all duration-200 fixed top-0 right-0 bg-gray-100`}>
        Read your content...
    </div>
  )
}

export default Drawer