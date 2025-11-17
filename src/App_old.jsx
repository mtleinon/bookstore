import {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './App.css'
import AddBook from './AddBook';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
	const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false); // Open add book dialog	

  const [colDefs, setColDefs] = useState([
    { field: 'title', sortable: true, filter: true},
    { field: 'author', sortable: true, filter: true},
    { field: 'year', sortable: true, filter: true, width: 100},
    { field: 'isbn', sortable: true, filter: true, width: 150},
    { field: 'price', sortable: true, filter: true, width: 100},
		{ 
      headerName: '',
      field: 'id',
      width: 80,
      cellRenderer: params => 
      <IconButton onClick={() => deleteBook(params.value)} size="small" color="error">
        <DeleteIcon />
      </IconButton> 
    }
  ]);

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

  const deleteBook = (id) => {
    fetch(`https://bookstore-4c2a6-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
    {
      method: 'DELETE',
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
			// // Update local state for instant UI feedback
			// setBooks((prevBooks) =>
				// 	prevBooks.map((book) =>
					// 		book.id === updatedBook.id ? updatedBook : book
			// 	)
			// );
			fetchItems();
		})
		.catch((err) => console.error('Error updating book:', err));
	};

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
			<AddBook open={open} onClose={() => setOpen(false)} addBook={addBook} />
			<div style={{ height: 500, width: 840 }}> 
				<AgGridReact 
					rowData={books}
					columnDefs={colDefs}
				/>
			</div>
		</>
  )
}

export default App
