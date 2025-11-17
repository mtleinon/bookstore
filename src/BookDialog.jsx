import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function BookDialog({ open, onClose, onSave, book }) {
  const [editedBook, setEditedBook] = useState(book || {
    title: '', author: '', year: '', isbn: '', price: ''
  });

  useEffect(() => {
    setEditedBook(book || { title: '', author: '', year: '', isbn: '', price: '' });
  }, [book]);

  const inputChanged = (event) => {
    setEditedBook({ ...editedBook, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    onSave(editedBook);
    setEditedBook({title:"", author:"", year:"", isbn:"", price:""});
    onClose();
  }

  return(
    <Dialog open={open}>
      <DialogTitle>{book ? 'Edit Book' : 'Add Book'}</DialogTitle>
      <DialogContent>
        <TextField
          name="title"
          value={editedBook.title}
          onChange={inputChanged}
          margin="dense"
          label="Title"
          fullWidth
        />
        <TextField
          name="author"
          value={editedBook.author}
          onChange={inputChanged}
          margin="dense"
          label="Author"
          fullWidth
        />
        <TextField
          name="year"
          value={editedBook.year}
          onChange={inputChanged}
          margin="dense"
          label="Year"
          fullWidth
        />
        <TextField
          name="isbn"
          value={editedBook.isbn}
          onChange={inputChanged}
          margin="dense"
          label="Isbn"
          fullWidth
        />
        <TextField
          name="price"
          value={editedBook.price}
          onChange={inputChanged}
          margin="dense"
          label="Price"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>    
  );
}

export default BookDialog;