import {useState, useEffect, useCallback, useMemo} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BookDialog from './BookDialog';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './App.css'

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
	const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false); // Open add book dialog  
  const [selectedBook, setSelectedBook] = useState(null);
	
	const editBook = useCallback((data) => {
		setSelectedBook(data);
		setOpen(true);
	}, []);
	
	const deleteBook = useCallback((id) => {
		fetch(`https://bookstore-4c2a6-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
		{
			method: 'DELETE',
		})
		.then(() => fetchItems())
		.catch(err => console.error(err))
	}, []);

	const columnDefs = useMemo(() => [
    { field: 'title', sortable: true, filter: true},
    { field: 'author', sortable: true, filter: true},
    { field: 'year', sortable: true, filter: true, width: 100},
    { field: 'isbn', sortable: true, filter: true, width: 150},
    { field: 'price', sortable: true, filter: true, width: 100},
    {
      headerName: '',
      field: 'id',
      width: 100,
      cellRenderer: params =>
        <>
          <IconButton onClick={() => editBook(params.data)} size="small" color="error">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => deleteBook(params.value)} size="small" color="error">
            <DeleteIcon />
          </IconButton>
        </>
    }
  ], [deleteBook, editBook]);

  const addKeys = (data) => {
		console.log("fetched")
    if (!data) {
      setBooks([]);
      return;
    }
    setBooks(
      Object.entries(data).map(([id, book]) => ({ ...book, id }))
    );
  };

  const fetchItems = () => {
    fetch('https://bookstore-4c2a6-default-rtdb.europe-west1.firebasedatabase.app/books/.json')
    .then(response => response.json())
    .then(data => addKeys(data))
    .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchItems();
  }, [])

 const addBook = (newBook) => {
    fetch('https://bookstore-4c2a6-default-rtdb.europe-west1.firebasedatabase.app/books/.json',
    {
      method: 'POST',
      body: JSON.stringify(newBook)
    })
    .then(() => fetchItems())
    .catch(err => console.error(err))
  }

  const updateBook = (updatedBook) => {
    fetch(`https://bookstore-4c2a6-default-rtdb.europe-west1.firebasedatabase.app/books/${updatedBook.id}.json`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook),
      }
    )
    .then((response) => {
      if (!response.ok) throw new Error('Update failed');
      fetchItems();
    })
    .catch((err) => console.error('Error updating book:', err));
  };

  const saveBook = (book) => {
    setSelectedBook(null);

    if (book.id) {
      updateBook(book);
    }
    else
      addBook(book);
  };

  const closeDialog = () => {
    setOpen(false);
    setSelectedBook(null);
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            Book Store
          </Typography>
        </Toolbar>
      </AppBar>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Add Book
      </Button>
      <BookDialog open={open} onClose={closeDialog} onSave={saveBook} book={selectedBook} />
      <div style={{ height: 500, width: 860 }}>
        <AgGridReact
          rowData={books}
          columnDefs={columnDefs}
        />
      </div>
    </>
  )
}

export default App