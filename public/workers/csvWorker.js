/* eslint-disable no-restricted-globals */
self.onmessage = function (event) {
  const file = event.data;
  const reader = new FileReaderSync(); // Blocking operation. But it's ok because it's a web worker.
  let fileData = reader.readAsText(file);
  fileData = decodeURIComponent(encodeURI(fileData)); // Proper handling of non ASCII characters.
  const data = parseCSV(fileData); // parseCSV is a function you would need to implement to parse CSV data
  self.postMessage(data);
};

function parseCSV(data) {
  const lines = data.trim().split("\n");
  const headers = lines[0].split(",");
  const parsedData = lines.slice(1).map((line) => {
    // Extract the first column (Name) and remove the quotes
    const name = line.slice(1, line.indexOf('",')).trim();
    // Split the rest of the line by commas
    const rest = line.slice(line.indexOf('",') + 2).split(",");
    // Combine the Name with the rest of the values
    const values = [name].concat(rest);
    const row = {};
    headers.forEach((header, i) => {
      let value = values[i];
      // Normalize the Credit Limit field
      if (header === "Credit Limit") {
        value = parseFloat(value);
      }
      // Normalize the Birthday field
      else if (header === "Birthday") {
        const dateParts = value.split("/");
        value = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
      }
      row[header] = value;
    });
    return row;
  });
  return parsedData;
}
