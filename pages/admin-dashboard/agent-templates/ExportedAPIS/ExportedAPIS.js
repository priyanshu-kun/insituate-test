import React from "react";
import Card from "./Card";
import useGetExportedAPISData from "./hooks/useSetExportedAPIS";

function ExportedAPIS() {
  const { exportedAPIs, isExportedAPISDataLoading } = useGetExportedAPISData();

  return (
    <div className='custom-grid px-6'>
      {isExportedAPISDataLoading ? "Loading...": exportedAPIs?.api_list?.map(
        ({
          api_id,
          configs: { project_name },
          created_on,
          version_id,
          version_name,
        }) => (
          <Card
            api_id={api_id}
            project_name={project_name}
            created_on={created_on}
            version_id={version_id}
            version_name={version_name}
          />
        )
      )}
    </div>
  );
}

export default ExportedAPIS;
