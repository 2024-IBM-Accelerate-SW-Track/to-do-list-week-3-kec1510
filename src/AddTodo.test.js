import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




// test('test that App component renders Task', () => {
//   render(<App />);
//   const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
//   const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
//   const element = screen.getByRole('button', {name: /Add/i});
//   const dueDate = "05/30/2023";
//   fireEvent.change(inputTask, { target: { value: "History Test"}});
//   fireEvent.change(inputDate, { target: { value: dueDate}});
//   fireEvent.click(element);
//   const check = screen.getByText(/History Test/i);
//   const checkDate = screen.getByText(new RegExp(dueDate, "i"));
//   expect(check).toBeInTheDocument();
//   expect(checkDate).toBeInTheDocument();
// });

  
 test('test that App component doesn\'t render duplicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "06/24/2024";
  const secondDueDate = "06/23/2024";

  fireEvent.change(inputTask, { target: { value: "Math Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  fireEvent.change(inputTask, { target: { value: "Math Test"}});
  fireEvent.change(inputDate, { target: { value: secondDueDate}});
  fireEvent.click(element);

  let renderedTasks = screen.getAllByTestId('grid');
  expect(renderedTasks.length).toBe(1);

 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const taskDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "06/24/2024";

  fireEvent.change(taskDate, { target: { value: dueDate}});
  fireEvent.click(element);

  const newTasks = screen.queryAllByTestId('grid');
  expect(newTasks.length).toBe(0);

 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const taskText = screen.getByRole('textbox', {name: /Add New Item/i})
  const element = screen.getByRole('button', {name: /Add/i});

  fireEvent.change(taskText, { target: { value: 'Math Test'}});
  fireEvent.click(element);

  const check = screen.queryByTestId(/Math Test/i);
  expect(check).not.toBeInTheDocument();

 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const submitButton = screen.getByRole('button', {name: /Add/i});
  const dueDate = "06/24/2024";

  fireEvent.change(inputTask, { target: { value: "Math Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(submitButton);

  const checkBox = screen.getByRole('checkbox');
  fireEvent.click(checkBox);

  const check = screen.queryByTestId(/Math Test/i);
  const checkDate = screen.queryByText(new RegExp(dueDate, "i"));
  expect(check).not.toBeInTheDocument();
  expect(checkDate).not.toBeInTheDocument();

 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const submitButton = screen.getByRole('button', {name: /Add/i});
  const dueDate = "06/24/2024";

  fireEvent.change(inputTask, { target: { value: "Math Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(submitButton);

  const overdueDate = '06/23/2024';

  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: overdueDate}});
  fireEvent.click(submitButton);

  const taskCheck = screen.getByTestId(/Math Test/i).style.background;
  const overdueCheck = screen.getByTestId(/History Test/i).style.background;

  expect(taskCheck).not.toBe(overdueCheck);

 });
