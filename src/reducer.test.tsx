import reducer, { generateGrid } from './reducer';

const emptyGrid = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

test('should render empty board', () => {
  expect(reducer(generateGrid(6), null)).toEqual(emptyGrid);
});

test('should toggle cell state', () => {
  expect(
    reducer(emptyGrid, {
      type: 'TOGGLE_CELL',
      payload: {
        row: 1,
        column: 2,
      },
    })
  ).toEqual([
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ]);
});
