import { Action, Grid } from './types';

export const generateGrid = (size = 6): Grid =>
  Array.from({ length: size }, () => Array.from({ length: size }, () => 0));

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, -1],
  [1, 1],
  [-1, 1],
  [1, 0],
  [-1, 0],
];

export const getNeighbours = ({
  row,
  column,
  grid,
}: {
  row: number;
  column: number;
  grid: Grid;
}): number => {
  let neighbours = 0;

  operations.forEach(([x, y]) => {
    let rows = x + row;
    let cols = y + column;

    if (rows >= 0 && rows < grid.length && cols >= 0 && cols < grid.length) {
      neighbours += grid[rows][cols];
    }
  });
  return neighbours;
};

const reducer = (grid: Grid, action: Action | null) => {
  if (action === null) {
    return grid;
  }

  switch (action.type) {
    case 'TOGGLE_CELL': {
      const { row, column } = action.payload;
      const newGrid = [...grid];
      newGrid[row][column] = grid[row][column] ? 0 : 1;
      return newGrid;
    }
    case 'RESET':
      return generateGrid(grid.length);

    case 'NEXT_GENERATION': {
      const newGrid = [...grid];
      for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid.length; column++) {
          const neighbours = getNeighbours({
            row,
            column,
            grid,
          });
          
          if (neighbours < 2) {
            newGrid[row][column] = 0;
          }
        }
      }
      return newGrid;
    }
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

export default reducer;
