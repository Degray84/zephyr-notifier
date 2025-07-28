import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { Storage } from "./storage.interface";
import { StorageError, StorageErrorEnum } from "./errors";
import { join } from "path";

const ENCODING: BufferEncoding = "utf-8";
const STORAGE_DIR = join(process.cwd(), "../", "data");

export class FileStorage<
  D extends Record<string, any> = Record<string, any>
> extends Storage<D> {
  private readonly _filePath: string;

  constructor(private readonly _name: string) {
    super();

    this._filePath = join(STORAGE_DIR, `${this._name}.json`);
  }

  private ensureDirExists() {
    if (!existsSync(STORAGE_DIR)) {
      mkdirSync(STORAGE_DIR, { recursive: true });
    }
  }

  async save(data: D) {
    try {
      this.ensureDirExists();
      writeFileSync(this._filePath, JSON.stringify(data, null, 2), ENCODING);
    } catch (error) {
      throw new StorageError(StorageErrorEnum.Save, [this._name]);
    }
  }

  async load(): Promise<D> {
    const filePath = this._filePath;

    try {
      this.ensureDirExists();
      if (!existsSync(filePath)) {
        writeFileSync(this._filePath, JSON.stringify({}), ENCODING);

        return {} as D;
      }

      const data = readFileSync(this._filePath, ENCODING);

      return JSON.parse(data);
    } catch (error) {
      throw new StorageError(StorageErrorEnum.Load, [this._name]);
    }
  }
}
