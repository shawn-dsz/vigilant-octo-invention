import { useReducer } from 'react';
import cn from 'classnames';

import './App.css';
import reducer, { generateGrid } from './reducer';

function App() {
  const [grid, dispatch] = useReducer(reducer,  generateGrid());

  const toggleCell = (row: number, column: number) =>
    dispatch({ type: 'TOGGLE_CELL', payload: { row, column } });

  return (
    <>
      {grid.map((rows: number[], rowIndex: number) => {
        return (
          <div className="row" key={rowIndex}>
            {rows.map((_, columnIndex: number) => {
              return (
                <div
                  onClick={() => toggleCell(rowIndex, columnIndex)}
                  className={cn('cell', {
                    alive: grid[rowIndex][columnIndex] === 1,
                  })}
                  key={`${rowIndex}-${columnIndex}`}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default App;
