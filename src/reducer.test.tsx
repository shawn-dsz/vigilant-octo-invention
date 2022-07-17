import reducer, { generateGrid, getNeighbours } from './reducer';

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

test('should calculate neighbours', () => {
  expect(
    getNeighbours({
      row: 1,
      column: 2,
      grid: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ],
    })
  ).toEqual(2);
});

test('should reset grid', () => {
  expect(
    reducer(
      [
        [0, 0, 0],
        [0, 0, 1],
        [0, 0, 1],
      ],
      {
        type: 'RESET',
      }
    )
  ).toEqual([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
});

test('A Cell with fewer than two live neighbours dies of under-population.', () => {
  expect(
    reducer(
      [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ],
      {
        type: 'NEXT_GENERATION',
      }
    )
  ).toEqual([
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ]);
});

test('A Cell with more than 3 live neighbours dies of overcrowding.', () => {
  console.log(
    JSON.stringify(
      reducer(
        [
          [0, 0, 0, 0, 0, 0],
          [0, 0, 1, 0, 0, 0],
          [0, 1, 1, 1, 0, 0],
          [0, 0, 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
        ],
        {
          type: 'NEXT_GENERATION',
        }
      )
    )
  );
  expect(
    reducer(
      [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ],
      {
        type: 'NEXT_GENERATION',
      }
    )
  ).toEqual([
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ]);
});
