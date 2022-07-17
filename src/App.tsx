import { useReducer } from 'react';
import cn from 'classnames';

import './App.css';

type Grid = number[][];
export const generateGrid = (size = 6): Grid =>
  Array.from({ length: size }, () => Array.from({ length: size }, () => 0));

export const reducer = (grid: Grid, action?: unknown) => {
  return grid;
};

function App() {
  const [grid] = useReducer(reducer, generateGrid());

  return (
    <>
      {grid.map((rows: number[], rowIndex: number) => {
        return (
          <div className="row">
            {rows.map((_, columnIndex: number) => {
              return (
                <div
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
