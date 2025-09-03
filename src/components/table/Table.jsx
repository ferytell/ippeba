import { useState } from "react";
import Dropdown from "../dropdown/Dropdown";
import "./Table.css";

function Table({ data, columns, onAdd, onEdit, isAdmin = false }) {
  const [isAdding, setIsAdding] = useState(false);
  const [addFormData, setAddFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleAddInputChange = (e, key) => {
    setAddFormData({ ...addFormData, [key]: e.target.value });
  };

  const handleEditInputChange = (e, key) => {
    setEditFormData({ ...editFormData, [key]: e.target.value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAdd(addFormData); // First column (ID) assumed to be handled by onAdd
    setAddFormData({});
    setIsAdding(false);
  };

  const handleEditSubmit = (e, ID) => {
    e.preventDefault();
    onEdit(ID, editFormData);
    setEditingId(null);
    setEditFormData({});
  };

  const startEditing = (item) => {
    setEditingId(item.ID);
    setEditFormData({ ...item });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditFormData({});
  };

  // Get the key of the first column to make it uneditable
  // const firstColumnKey = columns[0]?.key;

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
            {isAdmin && <th>Actions</th>}{" "}
            {/* Show Actions column only for admins */}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.ID}>
                {editingId === item.ID && isAdmin ? ( // Edit mode only for admins
                  <>
                    {columns.map((column, index) => (
                      <td key={column.key}>
                        {index === 0 ? (
                          <span>{item[column.key]}</span> // Uneditable first column
                        ) : column.type === "dropdown" ? (
                          <Dropdown
                            value={editFormData[column.key] || ""}
                            onChange={(e) =>
                              handleEditInputChange(e, column.key)
                            }
                            options={column.options || []}
                            placeholder={column.label}
                          />
                        ) : (
                          <input
                            type="text"
                            value={editFormData[column.key] || ""}
                            onChange={(e) =>
                              handleEditInputChange(e, column.key)
                            }
                            placeholder={column.label}
                          />
                        )}
                      </td>
                    ))}
                    <td>
                      <button onClick={(e) => handleEditSubmit(e, item.ID)}>
                        Save
                      </button>
                      <button onClick={cancelEditing}>Cancel</button>
                    </td>
                  </>
                ) : (
                  // View mode (for all users)
                  <>
                    {columns.map((column) => (
                      <td key={column.key}>{item[column.key]}</td>
                    ))}
                    {isAdmin && ( // Edit button only for admins
                      <td>
                        <button onClick={() => startEditing(item)}>✏️</button>
                      </td>
                    )}
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (isAdmin ? 1 : 0)}>
                No data available
              </td>
            </tr>
          )}
          {isAdmin &&
            isAdding && ( // Add row only for admins
              <tr>
                {columns.map((column, index) => (
                  <td key={column.key}>
                    {index === 0 ? (
                      <span>Auto-generated</span> // Uneditable first column
                    ) : column.type === "dropdown" ? (
                      <Dropdown
                        value={addFormData[column.key] || ""}
                        onChange={(e) => handleAddInputChange(e, column.key)}
                        options={column.options || []}
                        placeholder={column.label}
                      />
                    ) : (
                      <input
                        type="text"
                        value={addFormData[column.key] || ""}
                        onChange={(e) => handleAddInputChange(e, column.key)}
                        placeholder={column.label}
                      />
                    )}
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
      {isAdmin &&
        !isAdding && ( // Add button only for admins
          <button className="add-button" onClick={() => setIsAdding(true)}>
            +
          </button>
        )}
    </div>
  );
}

export default Table;
