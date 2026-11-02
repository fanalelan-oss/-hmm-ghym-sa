import fs from 'fs';
import path from 'path';
import { DatabaseSchema } from './types';
import initialData from '@/data/initial-db.json';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');
const INITIAL_DB_PATH = path.join(process.cwd(), 'src', 'data', 'initial-db.json');

export function getDb(): DatabaseSchema {
  let db: DatabaseSchema;
  try {
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, 'utf-8');
      db = JSON.parse(raw) as DatabaseSchema;
    } else {
      db = initialData as unknown as DatabaseSchema;
    }
  } catch (e) {
    console.error('Error reading data/db.json, falling back to initial-db.json:', e);
    db = initialData as unknown as DatabaseSchema;
  }

  // Inject env key safely so it works 100% locally and in production without being exposed in git
  if (db?.settings && (!db.settings.aiConfig?.geminiApiKey || db.settings.aiConfig.geminiApiKey === '')) {
    db.settings.aiConfig = {
      ...(db.settings.aiConfig || { provider: 'gemini', autoLearnEnabled: true }),
      geminiApiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '',
    };
  }

  return db;
}

export function saveDb(data: DatabaseSchema): boolean {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const jsonStr = JSON.stringify(data, null, 2);
    fs.writeFileSync(DB_PATH, jsonStr, 'utf-8');

    // Also sync to initial-db.json so next builds always persist latest changes
    try {
      if (fs.existsSync(INITIAL_DB_PATH)) {
        fs.writeFileSync(INITIAL_DB_PATH, jsonStr, 'utf-8');
      }
    } catch (secErr) {
      console.warn('Could not mirror to initial-db.json:', secErr);
    }

    return true;
  } catch (e) {
    console.error('Error writing data/db.json:', e);
    return false;
  }
}
