export class Board {
  tiles: Object[];
  shotsFired: number = 0;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
