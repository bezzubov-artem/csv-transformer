import React, { useCallback, useState } from "react";
import FileUploader from "./components/FileUploader";
import DataDisplay from "./components/DataDisplay";
import isEqual from "lodash/isEqual";
import Modal from "./components/Modal";

const App = () => {
  const [csvData, setCsvData] = useState(null);
  const [prnData, setPrnData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleFileUpload = useCallback((event, fileType) => {
    const file = event.target.files[0];
    let worker;

    if (fileType === "csv") {
      worker = new Worker("/workers/csvWorker.js");
      worker.postMessage(file);
      worker.onmessage = function (event) {
        const parsedData = event.data;
        setCsvData(parsedData);
        worker.terminate();
      };
    } else if (fileType === "prn") {
      worker = new Worker("/workers/prnWorker.js");
      worker.postMessage(file);
      worker.onmessage = function (event) {
        const parsedData = event.data;
        setPrnData(parsedData);
        worker.terminate();
      };
    }
  }, []);

  const handleCompare = useCallback(() => {
    isEqual(csvData, prnData)
      ? setModalMessage("The data is identical.")
      : setModalMessage("The data is not identical.");

    setIsModalOpen(true);
  }, [csvData, prnData]);

  return (
    <div className="p-10">
      <h1 className="font-bold text-xl mb-2">Upload a CSV file</h1>
      <FileUploader
        disabled={!!csvData}
        handleFileUpload={handleFileUpload}
        fileType="csv"
      />
      <h1 className="font-bold text-xl mt-8 mb-2">Upload a PRN file</h1>
      <FileUploader
        disabled={!!prnData}
        handleFileUpload={handleFileUpload}
        fileType="prn"
      />
      {csvData && <DataDisplay name="CSV" data={csvData} />}
      {prnData && <DataDisplay name="PRN" data={prnData} />}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-8 rounded"
        onClick={handleCompare}
        disabled={!csvData || !prnData}
      >
        Compare
      </button>
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen} modalMessage={modalMessage} />
      )}
    </div>
  );
};

export default App;
