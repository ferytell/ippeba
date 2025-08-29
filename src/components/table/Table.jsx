import { useState } from "react";
import "./Table.css"; // Import styles for the table

function Table({ data, columns, onAdd, onEdit }) {
  const [isAdding, setIsAdding] = useState(false);
  const [addFormData, setAddFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  console.log("Table data:", data);
  console.log("Table columns:", columns);

  // Handle input changes for the add form
  const handleAddInputChange = (e, key) => {
    setAddFormData({ ...addFormData, [key]: e.target.value });
  };

  // Handle input changes for the edit form
  const handleEditInputChange = (e, key) => {
    setEditFormData({ ...editFormData, [key]: e.target.value });
  };

  // Handle form submission for adding new data
  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAdd(addFormData);
    setAddFormData({});
    setIsAdding(false);
  };

  // Handle form submission for editing data
  const handleEditSubmit = (e, id) => {
    e.preventDefault();
    onEdit(id, editFormData);
    setEditingId(null);
    setEditFormData({});
  };

  // Start editing a row
  const startEditing = (item) => {
    setEditingId(item.id);
    setEditFormData({ ...item }); // Pre-fill with row data
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditFormData({});
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                {editingId === item.id ? (
                  // Edit mode for this row
                  <>
                    {columns.map((column) => (
                      <td key={column.key}>
                        <input
                          type="text"
                          value={editFormData[column.key] || ""}
                          onChange={(e) => handleEditInputChange(e, column.key)}
                          placeholder={column.label}
                        />
                      </td>
                    ))}
                    <td>
                      <button onClick={(e) => handleEditSubmit(e, item.id)}>
                        Save
                      </button>
                      <button onClick={cancelEditing}>Cancel</button>
                    </td>
                  </>
                ) : (
                  // View mode for this row
                  <>
                    {columns.map((column) => (
                      <td key={column.key}>{item[column.key]}</td>
                    ))}
                    <td>
                      <button onClick={() => startEditing(item)}>✏️</button>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1}>No data available</td>
            </tr>
          )}
          {isAdding && (
            <tr>
              {columns.map((column) => (
                <td key={column.key}>
                  <input
                    type="text"
                    value={addFormData[column.key] || ""}
                    onChange={(e) => handleAddInputChange(e, column.key)}
                    placeholder={column.label}
                  />
                </td>
              ))}
              <td>
                <button onClick={handleAddSubmit}>Save</button>
                <button onClick={() => setIsAdding(false)}>Cancel</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!isAdding && (
        <button className="add-button" onClick={() => setIsAdding(true)}>
          +
        </button>
      )}
    </div>
  );
}

export default Table;

// import "./Table.css"; // Import styles for the table

// function Table({ data, columns }) {
//   return (
//     <table className="custom-table">
//       <thead>
//         <tr>
//           {columns.map((column) => (
//             <th key={column.key}>{column.label}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.length > 0 ? (
//           data.map((item) => (
//             <tr key={item.id}>
//               {/* Assuming each item has a unique 'id' */}
//               {columns.map((column) => (
//                 <td key={column.key}>{item[column.key]}</td>
//               ))}
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan={columns.length}>No data available</td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   );
// }

// export default Table;
