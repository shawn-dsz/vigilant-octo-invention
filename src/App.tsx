import { useReducer } from 'react';
import cn from 'classnames';

import './App.css';
import reducer, { generateGrid } from './reducer';

function App() {
  const [grid, dispatch] = useReducer(reducer, generateGrid());
  const nextGeneration = () => dispatch({ type: 'NEXT_GENERATION' });
  const toggleCell = (row: number, column: number) =>
    dispatch({ type: 'TOGGLE_CELL', payload: { row, column } });
  const reset = () => dispatch({ type: 'RESET' });

  return (
    <div className="game">
      <div className="grid">
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
      </div>
      <div className="btn-container">
        <button className="btn" onClick={nextGeneration}>
          Next generation
        </button>
        <button className="btn" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
