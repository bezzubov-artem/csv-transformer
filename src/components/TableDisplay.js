const TableDisplay = ({ data }) => (
  <table className="table-auto w-full mt-2">
    <thead>
      <tr>
        {Object.keys(data[0]).map((key) => (
          <th key={key} className="px-4 py-2">
            {key}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
          {Object.values(row).map((value, i) => (
            <td key={i} className="border px-4 py-2">
              {value}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default TableDisplay;
