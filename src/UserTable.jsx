import React, { useState, useRef, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

function UserTable() {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add');
  const [editedUserIndex, setEditedUserIndex] = useState(null);
  const [nameInput, setNameInput] = useState('');
  const [tableWidth, setTableWidth] = useState('100%');

  const tableRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (tableRef.current) {
        setTableWidth(tableRef.current.offsetWidth);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleOpenDialog = (mode, index) => {
    setDialogMode(mode);
    if (mode === 'edit') {
      setEditedUserIndex(index);
      setNameInput(users[index].name);
    } else {
      setNameInput('');
      setEditedUserIndex(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleNameInputChange = (event) => {
    setNameInput(event.target.value);
  };

  const handleAddUser = () => {
    if (dialogMode === 'add') {
      setUsers([...users, { name: nameInput }]);
    } else {
      const updatedUsers = [...users];
      updatedUsers[editedUserIndex].name = nameInput;
      setUsers(updatedUsers);
    }
    handleCloseDialog();
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh', width: '100%' }}>
      <Container maxWidth="md" sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Box sx={{ marginBottom: 2, textAlign: 'right', width: tableWidth }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenDialog('add')}
            >
              Add User
            </Button>
          </Box>
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ flex: 3 }}>
              <TableContainer
                component={Paper}
                sx={{ border: '1px solid #000', width: '100%' }}
                ref={tableRef}
              >
                <Table sx={{ width: '100%' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: '70%', padding: '16px 8px', borderRight: '1px solid #ccc' }}>Name</TableCell>
                      <TableCell sx={{ width: '30%', padding: '16px 8px', textAlign: 'left', borderLeft: '1px solid #ccc' }}>Actions</TableCell> {/* Changed textAlign to left */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.length === 0 ? (
                      <TableRow sx={{ minHeight: '60px' }}>
                        <TableCell colSpan={2} align="center" sx={{ padding: '16px 8px' }}>
                          <Typography>No data</Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((user, index) => (
                        <TableRow key={index} sx={{ minHeight: '60px' }}>
                          <TableCell sx={{ width: '80%', padding: '16px 8px', borderRight: '1px solid #ccc' }}>{user.name}</TableCell>
                          <TableCell sx={{ width: '20%', padding: '16px 8px', textAlign: 'left', borderLeft: '1px solid #ccc' }}> {/* Changed textAlign to left */}
                            <IconButton onClick={() => handleOpenDialog('edit', index)}>
                              <Edit />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteUser(index)}>
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box sx={{ flex: 1, marginLeft: 2 }}>
              <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{dialogMode === 'add' ? 'Add User' : 'Edit User'}</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    value={nameInput}
                    onChange={handleNameInputChange}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog}>Cancel</Button>
                  <Button onClick={handleAddUser}>
                    {dialogMode === 'add' ? 'Add' : 'Save'}
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default UserTable;