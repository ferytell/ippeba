import * as React from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useAtom } from "jotai";
import { notificationAtom } from "../../store/atoms";

function MuiTableComponent({
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  isAdmin = false,
  isLoading = false,
  enableSelection = false,
  onSelectionChange,
}) {
  const [isAdding, setIsAdding] = React.useState(false);
  const [addFormData, setAddFormData] = React.useState({});
  const [editingId, setEditingId] = React.useState(null);
  const [editFormData, setEditFormData] = React.useState({});
  const [selected, setSelected] = React.useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState(null);
  const [notification, setNotification] = useAtom(notificationAtom);

  // Handle selection change
  const handleSelect = (id) => {
    const newSelected = selected.includes(id)
      ? selected.filter((itemId) => itemId !== id)
      : [...selected, id];
    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selected.length === data.length) {
      setSelected([]);
      onSelectionChange?.([]);
    } else {
      const allIds = data.map((item) => item.ID);
      setSelected(allIds);
      onSelectionChange?.(allIds);
    }
  };

  const handleAddInputChange = (key, value) => {
    setAddFormData({ ...addFormData, [key]: value });
  };

  const handleEditInputChange = (key, value) => {
    setEditFormData({ ...editFormData, [key]: value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAdd(addFormData);
      setAddFormData({});
      setIsAdding(false);
      setNotification({
        open: true,
        message: "Item added successfully",
        severity: "success",
      });
    } catch (error) {
      setNotification({
        open: true,
        message: "Failed to add item",
        severity: "error",
      });
    }
  };

  const handleEditSubmit = async (e, ID) => {
    e.preventDefault();
    try {
      await onEdit(ID, editFormData);
      setEditingId(null);
      setEditFormData({});
      setNotification({
        open: true,
        message: "Item updated successfully",
        severity: "success",
      });
    } catch (error) {
      setNotification({
        open: true,
        message: "Failed to update item",
        severity: "error",
      });
    }
  };

  const startEditing = (item) => {
    setEditingId(item.ID);
    setEditFormData({ ...item });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (itemToDelete && onDelete) {
      try {
        await onDelete(itemToDelete.ID);
        setNotification({
          open: true,
          message: "Item deleted successfully",
          severity: "success",
        });
      } catch (error) {
        setNotification({
          open: true,
          message: "Failed to delete item",
          severity: "error",
        });
      }
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  // Render cell content based on editing state
  const renderCellContent = (item, column) => {
    if (editingId === item.ID && isAdmin) {
      if (column.type === "dropdown") {
        return (
          <FormControl fullWidth size="small">
            <Select
              value={editFormData[column.key] || ""}
              onChange={(e) =>
                handleEditInputChange(column.key, e.target.value)
              }
              displayEmpty
            >
              <MenuItem value="">
                <em>Select {column.label}</em>
              </MenuItem>
              {column.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      } else if (column.type === "date") {
        return (
          <TextField
            type="date"
            size="small"
            fullWidth
            value={editFormData[column.key] || ""}
            onChange={(e) => handleEditInputChange(column.key, e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        );
      } else {
        return (
          <TextField
            type={column.type || "text"}
            size="small"
            fullWidth
            value={editFormData[column.key] || ""}
            onChange={(e) => handleEditInputChange(column.key, e.target.value)}
            placeholder={column.label}
          />
        );
      }
    }

    // Display mode
    if (column.format) {
      return column.format(item[column.key]);
    }

    return item[column.key];
  };

  // Render add form cell
  const renderAddFormCell = (column, index) => {
    if (index === 0) {
      return (
        <Typography variant="body2" color="text.secondary">
          Auto-generated
        </Typography>
      );
    }

    if (column.type === "dropdown") {
      return (
        <FormControl fullWidth size="small">
          <Select
            value={addFormData[column.key] || ""}
            onChange={(e) => handleAddInputChange(column.key, e.target.value)}
            displayEmpty
          >
            <MenuItem value="">
              <em>Select {column.label}</em>
            </MenuItem>
            {column.options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    } else if (column.type === "date") {
      return (
        <TextField
          type="date"
          size="small"
          fullWidth
          value={addFormData[column.key] || ""}
          onChange={(e) => handleAddInputChange(column.key, e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      );
    } else {
      return (
        <TextField
          type={column.type || "text"}
          size="small"
          fullWidth
          value={addFormData[column.key] || ""}
          onChange={(e) => handleAddInputChange(column.key, e.target.value)}
          placeholder={column.label}
        />
      );
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 600, position: "relative" }}
      >
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Loading data...</Typography>
          </Box>
        )}

        <MuiTable stickyHeader>
          <TableHead>
            <TableRow>
              {enableSelection && (
                <TableCell padding="checkbox">
                  <input
                    type="checkbox"
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAll}
                    style={{ cursor: "pointer" }}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "primary.light",
                    color: "white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              {isAdmin && (
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "primary.light",
                    color: "white",
                  }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length === 0 && !isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length +
                    (isAdmin ? 1 : 0) +
                    (enableSelection ? 1 : 0)
                  }
                  align="center"
                >
                  <Typography variant="body1" color="text.secondary" py={3}>
                    No data available
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow
                  key={item.ID}
                  hover
                  selected={selected.includes(item.ID)}
                  sx={{
                    "&:hover": { backgroundColor: "action.hover" },
                    "&.Mui-selected": { backgroundColor: "action.selected" },
                  }}
                >
                  {enableSelection && (
                    <TableCell padding="checkbox">
                      <input
                        type="checkbox"
                        checked={selected.includes(item.ID)}
                        onChange={() => handleSelect(item.ID)}
                        style={{ cursor: "pointer" }}
                      />
                    </TableCell>
                  )}

                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {renderCellContent(item, column)}
                    </TableCell>
                  ))}

                  {isAdmin && (
                    <TableCell>
                      {editingId === item.ID ? (
                        <>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={(e) => handleEditSubmit(e, item.ID)}
                            sx={{ mr: 1 }}
                          >
                            <SaveIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={cancelEditing}
                          >
                            <CancelIcon fontSize="small" />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => startEditing(item)}
                            sx={{ mr: 1 }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          {onDelete && (
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteClick(item)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          )}
                        </>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}

            {isAdmin && isAdding && (
              <TableRow>
                {enableSelection && <TableCell></TableCell>}
                {columns.map((column, index) => (
                  <TableCell key={column.key}>
                    {renderAddFormCell(column, index)}
                  </TableCell>
                ))}
                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={handleAddSubmit}
                    sx={{ mr: 1 }}
                  >
                    <SaveIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => setIsAdding(false)}
                  >
                    <CancelIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>

      {isAdmin && !isAdding && !isLoading && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsAdding(true)}
          sx={{ mt: 2 }}
        >
          Add New
        </Button>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
          {itemToDelete && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              ID: {itemToDelete.ID} - {itemToDelete.name || "No name"}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MuiTableComponent;
