import { useState } from 'react';
import cn from 'classnames';

import './App.css';

const numberOfRows = 6;
const numberOfColumns = 6;

const generateGrid = () =>
  Array.from({ length: numberOfRows }, () =>
    Array.from({ length: numberOfColumns }, () => 0)
  );

function App() {
  const [grid] = useState(generateGrid);

  return (
    <>
      {grid.map((row, rowIndex) => {
        return (
          <div className="row">
            {row.map((_, columnIndex) => {
              return (
                <div
                  className={cn('cell flex', {
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
