import crypto from 'crypto';
import fs from 'fs';

function encodeToSHA256(data: crypto.BinaryLike): string {
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  return hash;
}

function createDb(dbName = 'db.json'): void {
  try {
    if (!fs.existsSync(`${dbName}.json`)) {
      fs.writeFileSync(`${dbName}.json`, JSON.stringify([], null, 2));
      console.log(`${`${dbName}.json`} file created successfully`);
    } else {
      console.log(`${`${dbName}.json`} file already exists`);
    }
  } catch (e) {
    console.log(`Error creating ${`${dbName}.json`} file:`, e);
  }
}

function readDb<T>(dbName = 'db.json'): T[] {
  const data = fs.readFileSync(dbName, 'utf-8');
  return JSON.parse(data);
}

function writeDb<T>(obj: T, dbName = 'db.json'): void {
  if (!obj) {
    console.log('Please provide data to save!');
    return;
  }

  try {
    const data = readDb<T>(dbName);
    data.push(obj);
    fs.writeFileSync(dbName, JSON.stringify(data, null, 2));
    console.log('Save successful');
  } catch (e) {
    console.log('Save failed! with the following error:', e);
  }
}

function getCurrentDateTime(): string {
  const date = new Date();
  const dateString = date.toLocaleDateString();
  const timeString = date.toLocaleTimeString();
  return `${dateString} ${timeString}`;
}

function cosineSimilarity(vecA: string | any[], vecB: number[]) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * (vecB[i] ?? 0); // use nullish coalescing operator
    normA += vecA[i] ** 2;
    normB += (vecB[i] ?? 0) ** 2; // use nullish coalescing operator
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

function clearJsonFile(filename: fs.PathOrFileDescriptor): void {
  const emptyData = JSON.stringify([]);
  fs.writeFileSync(filename, emptyData);
}

function getSimilarTextFromDb(inputEmbedding: any, dbName = 'db.json'): string {
  const jsonData = readDb<{
    input: { embedding: any; text: any };
    output: { text: any };
  }>(dbName);

  const result: { interaction: string; similarity: number }[] = [];
  jsonData.forEach((embedding) => {
    const similarity = cosineSimilarity(
      inputEmbedding,
      embedding.input.embedding
    );
    if (similarity > 0.8) {
      result.push({
        interaction: `${embedding.input.text} ${embedding.output.text}`,
        similarity,
      });
    }
  });

  result.sort((a, b) => b.similarity - a.similarity);
  const topThree = result.slice(0, 4);

  return topThree.map((r) => r.interaction).join('');
}

export {
  clearJsonFile,
  cosineSimilarity,
  createDb,
  encodeToSHA256,
  getCurrentDateTime,
  getSimilarTextFromDb,
  readDb,
  writeDb,
};
