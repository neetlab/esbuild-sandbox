export type Data = { readonly id: string; readonly name: string; }
const data = (id: string, name: string): Data => Object.freeze({ id, name });

export interface IRepository {
  get(id: string): Data | null;
  getOrThrow(id: string): Data | null;
  create(data: Data): Data;
}

export abstract class BaseRepository {
  constructor (public readonly name: string) {};
}

export class RepositoryImpl extends BaseRepository implements IRepository {
  private _store = new Map<string, Data | null>();


  get(id: string): Data | null {
    return this._store.get(id);
  }

  getOrThrow(id: string): Data {
    if (!this._store.has(id)) {
      throw new Error(`No record found with id ${id}`);
    }

    return this._store.get(id);
  }

  create(data: Data): Data {
    this._store.set(data.id, data);
    return data;
  }
}

const assert = (condition: boolean): condition is true => {
  if (!condition) throw new Error();
  return;
};

(() => {
  const repo = new RepositoryImpl('data');

  assert(repo.name === 'data');
  repo.create(data('123123', 'john'));
  assert(repo.get('123123')?.name === 'john');
})();
