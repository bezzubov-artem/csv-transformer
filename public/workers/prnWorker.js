/* eslint-disable no-restricted-globals */
self.onmessage = function (event) {
  const file = event.data;
  const reader = new FileReaderSync(); // Blocking operation. But it's ok because it's a web worker.
  let fileData = reader.readAsText(file);
  fileData = decodeURIComponent(encodeURI(fileData)); // Proper handling of non ASCII characters.
  const data = parsePRN(fileData); // parsePRN is a function you would need to implement to parse PRN data
  self.postMessage(data);
};

function parsePRN(data) {
  const lines = data.trim().split("\n");
  const parsedData = lines.slice(1).map((line) => {
    // excluding header
    const name = line.slice(0, 16).trim(); // taking characters 0-15 for 'Name'
    const address = line.slice(16, 38).trim(); // taking characters 16-37 for 'Address'
    const postcode = line.slice(38, 47).trim(); // taking characters 38-46 for 'Postcode'
    const phone = line.slice(47, 61).trim(); // taking characters 47-60 for 'Phone'
    const creditLimit =
      parseFloat(line.slice(61, 73).trim().replace(/\s+/g, "")) / 100; // taking characters 61-72 for 'Credit Limit' and parsing as float
    const birthday = line.slice(73).trim(); // taking any characters after index 73 for 'Birthday'

    // Year-Month-Day format for 'Birthday'
    const formattedBirthday = `${birthday.slice(0, 4)}-${birthday.slice(
      4,
      6
    )}-${birthday.slice(6)}`;

    // Construct each object
    return {
      Name: name,
      Address: address,
      Postcode: postcode,
      Phone: phone,
      "Credit Limit": creditLimit,
      Birthday: formattedBirthday,
    };
  });
  return parsedData;
}
