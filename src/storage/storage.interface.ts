export class Storage<D = string> {
  async save(data: D) {
    throw new Error('Not implemented');
  }

  async load(): Promise<D | null> {
    throw new Error('Not implemented');
  }
}
