import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { Storage } from './storage.interface';
import { StorageError, StorageErrorEnum } from './errors';
import { join } from 'path';
import { LogMethod } from '../decorators/logger';

const ENCODING: BufferEncoding = 'utf-8';
const STORAGE_DIR = join(process.cwd(), '../', 'data');

export class FileStorage<D extends Record<string, any> = Record<string, any>>
  implements Storage<D>
{
  private readonly _filePath: string;

  constructor(private readonly _name: string) {
    this._filePath = join(STORAGE_DIR, `${this._name}.json`);
  }

  private ensureDirExists() {
    if (!existsSync(STORAGE_DIR)) {
      mkdirSync(STORAGE_DIR, { recursive: true });
    }
  }

  @LogMethod()
  async save(data: D) {
    try {
      this.ensureDirExists();
      writeFileSync(this._filePath, JSON.stringify(data, null, 2), ENCODING);
    } catch (cause) {
      throw new StorageError(StorageErrorEnum.Save, {
        cause,
        parts: [this._name],
      });
    }
  }

  @LogMethod()
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
    } catch (cause) {
      throw new StorageError(StorageErrorEnum.Load, {
        cause,
        parts: [this._name],
      });
    }
  }
}
