import { resolve } from 'path';
import { createMockServer } from './src/server/mockServer';

const PORT = 3000;
const htmlPath = resolve(__dirname, 'mocks', 'index.html');
const app = createMockServer(htmlPath);

app.listen(PORT, () => {
  console.log(`Mock server запущен на http://localhost:${PORT}`);
});
