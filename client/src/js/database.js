import { openDB } from 'idb';

const initdb = async () =>
// new db with 'jate' name, version 1
  openDB('jate', 1, {
    // if db hasn't been created, add schema
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // new obj store with key name of id with auto increments
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  // connect to db and set version
  const contactDb = await openDB('jate', 1);

  // new transaction with db name and priveleges
  const tx = contactDb.transaction('jate', 'readwrite');

  // open obj store
  const store = tx.objectStore('jate');

  // add method and pass in content
  const request = store.add({ content });

  // get and return results
  const result = await request;
  console.log('Data saved', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET data from the database');
  
  // db connection with version 
  const contactDb = await openDB('jate', 1);

  // new transaction with priveleges
  const tx = contactDb.transaction('jate', 'readonly');

  // open obj store
  const store = tx.objectStore('jate');

  // get all data in db 
  const request = store.getAll();

  // get and return results
  const result = await request;
  console.log('result.value', result);
  return result;
};


// Start the db
initdb();
