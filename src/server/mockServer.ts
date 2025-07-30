import express from 'express';
import { resolve } from 'path';

export function createMockServer(htmlPath: string) {
  const app = express();
  app.get('/', (req, res) => {
    res.sendFile(resolve(htmlPath));
  });
  return app;
}
