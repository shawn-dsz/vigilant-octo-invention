import { Action, Grid } from './types';
import produce from 'immer';

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
    let rows = (x + row + grid.length) % grid.length;
    let cols = (y + column + grid.length) % grid.length;

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
      return produce(grid, (nextGrid) => {
        nextGrid[row][column] = grid[row][column] ? 0 : 1;
      });
    }
    case 'RESET':
      return generateGrid(grid.length);

    case 'NEXT_GENERATION': {
      const nextGrid = produce(grid, (nextGrid) => {
        for (let row = 0; row < grid.length; row++) {
          for (let column = 0; column < grid.length; column++) {
            let neighbours = getNeighbours({ row, column, grid });

            if (neighbours < 2 || neighbours > 3) {
              nextGrid[row][column] = 0;
            }

            if (neighbours === 3) {
              nextGrid[row][column] = 1;
            }
          }
        }
      });
      return nextGrid;
    }
    default:
      throw new Error(`Unhandled action`);
  }
};

export default reducer;
