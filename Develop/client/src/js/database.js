import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) =>{
  try{
    console.log('Saving...')
    const jateDb = await openDB('jate',1);
    const transaction = jateDb.transaction('jate','readwrite');
    const safe = transaction.objectStore('jate')
    const request = safe.put({id: 1, value: content})
    const result = await request
    console.log('Content saved!', result)
  } catch(error){
    console.error("An error occurred:", error)
    return false
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log('Retrieving...');
    const jateDb = await openDB('jate', 1);
    const transaction = jateDb.transaction('jate', 'readonly');
    const safe = transaction.objectStore('jate');
    const request = safe.get(1);
    const result = await request;
    console.log('Retrieved all content!', result);
    return result?.value;//if result exists, return the value, otherwise don't return anything...  basically an if statement
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
}
initdb();
