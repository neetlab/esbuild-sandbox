(() => {
  // src/app.ts
  var data = (id, name) => Object.freeze({id, name});
  var BaseRepository = class {
    constructor(name) {
      this.name = name;
    }
  };
  var RepositoryImpl = class extends BaseRepository {
    constructor() {
      super(...arguments);
      this._store = new Map();
    }
    get(id) {
      return this._store.get(id);
    }
    getOrThrow(id) {
      if (!this._store.has(id)) {
        throw new Error(`No record found with id ${id}`);
      }
      return this._store.get(id);
    }
    create(data2) {
      this._store.set(data2.id, data2);
      return data2;
    }
  };
  var assert = (condition) => {
    if (!condition)
      throw new Error();
    return;
  };
  (() => {
    const repo = new RepositoryImpl("data");
    assert(repo.name === "data");
    repo.create(data("123123", "john"));
    assert(repo.get("123123")?.name === "john");
  })();
})();
