export type Grid = number[][];

export type Action =
  | {
      type: 'TOGGLE_CELL';
      payload: {
        row: number;
        column: number;
      };
    }
  | {
      type: 'NEXT_GENERATION';
    }
  | {
      type: 'RESET';
    };
