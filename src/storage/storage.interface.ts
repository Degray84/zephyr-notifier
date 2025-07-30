export interface Storage<D = string> {
  save(data: D): Promise<void>;
  load(): Promise<D | null>;
}
