import React, { useState } from "react";
import TableDisplay from "./TableDisplay";
const JsonDisplay = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

const DataDisplay = ({ name, data }) => {
  const [viewAsTable, setViewAsTable] = useState(true);

  return (
    <div className="p-6 mt-6 rounded-lg shadow-md bg-white">
      <h2 className="font-semibold text-lg mb-2">{name} Data</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 mb-2 rounded"
        onClick={() => setViewAsTable(!viewAsTable)}
      >
        Switch to {viewAsTable ? "JSON" : "Table"} View
      </button>
      {viewAsTable ? <TableDisplay data={data} /> : <JsonDisplay data={data} />}
    </div>
  );
};

export default DataDisplay;
