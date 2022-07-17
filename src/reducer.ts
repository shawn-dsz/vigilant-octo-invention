type Grid = number[][];
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
    neighbours += grid[rows][cols];
  });
  return neighbours;
};

type Action = {
  type: 'TOGGLE_CELL';
  payload: {
    row: number;
    column: number;
  };
};
const reducer = (grid: Grid, action: Action | null) => {
  if (action === null) {
    return grid;
  }

  switch (action.type) {
    case 'TOGGLE_CELL': {
      console.log('toggle cell', action.payload);
      const { row, column } = action.payload;
      const newGrid = [...grid];
      newGrid[row][column] = grid[row][column] ? 0 : 1;
      return newGrid;
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default reducer;
