import App from './App';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, test} from 'vitest';
import '@testing-library/jest-dom/vitest';

// test('renders App component', () => {
// 	render(<App />);
// 	const header = screen.getByText('My Todolist');
// 	expect(header).toBeInTheDocument();
// });

test('add book', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText("Book 3")).toBeInTheDocument();
	const titleCells = document.querySelectorAll('[col-id="title"]');
	console.log(titleCells);
  // console.log(document.body.innerHTML);
  });
});

test("Array has two books", async () => {
  render(<App />);

  // Wait for the first data row to appear
  await screen.findByText("Book 3");

  const titleCells = document.querySelectorAll('[col-id="title"]');
  expect(titleCells[1].textContent).toBe("Book 3");
  expect(titleCells[2].textContent).toBe("Book 11");


	const rows = document.querySelectorAll('.ag-row');
	expect(rows[0]).toHaveTextContent("Book 3");
	expect(rows[1]).toHaveTextContent("Book 11");

	// const cells = screen.getAllByText(/Book/);
	// expect(cells.length).toBe(2);
});

	// expect(
	// 	Array.from(titleCells).some(cell => cell.textContent === "a")
	// ).toBe(true);

	// const row0 = document.querySelector('[row-index="0"]');
	// console.log(row0);
	// const titleCell = row0.querySelector('[data-col-id="title"]');

	// expect(titleCell).toHaveTextContent("React Book");


// test('add todo', () => {
//   render(<App />);

//   const desc = screen.getByPlaceholderText('Description');
//   fireEvent.change(desc, { target: { value: 'Go to coffee' } });
//   const date = screen.getByPlaceholderText('Date');
//   fireEvent.change(date, { target: { value: '29.12.2023' } });
//   const status = screen.getByPlaceholderText('Status');
//   fireEvent.change(status, { target: { value: 'Open' } });

// 	const button = screen.getByText('Add');
//   fireEvent.click(button);

// 	const table = screen.getByRole('table');
//   expect(table).toHaveTextContent('Go to coffee');
// });

// test('clear todos', () => {
//   render(<App />);

//   const desc = screen.getByPlaceholderText('Description');
//   fireEvent.change(desc, { target: { value: 'Jog 2 hours' } });
//   const date = screen.getByPlaceholderText('Date');
//   fireEvent.change(date, { target: { value: '30.11.2025' } });
//   const status = screen.getByPlaceholderText('Status');
//   fireEvent.change(status, { target: { value: 'Waiting' } });

// 	const addButton = screen.getByText('Add');
//   fireEvent.click(addButton);

// 	const table = screen.getByRole('table');
//   expect(table).toHaveTextContent('Jog 2 hours');
	
// 	const clearButton = screen.getByText('Clear');
//   fireEvent.click(clearButton);
	
//   expect(table).not.toHaveTextContent('Jog 2 hours');
// });

