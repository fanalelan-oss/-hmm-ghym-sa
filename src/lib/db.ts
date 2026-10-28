import fs from 'fs';
import path from 'path';
import { DatabaseSchema } from './types';
import initialData from '@/data/initial-db.json';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

export function getDb(): DatabaseSchema {
  try {
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(raw) as DatabaseSchema;
    }
  } catch (e) {
    console.error('Error reading data/db.json, falling back to initial-db.json:', e);
  }
  return initialData as unknown as DatabaseSchema;
}

export function saveDb(data: DatabaseSchema): boolean {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error('Error writing data/db.json:', e);
    return false;
  }
}
