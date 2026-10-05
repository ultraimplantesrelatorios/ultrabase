const DB_NAME='ultra-central-v2';
const DB_VERSION=1;
const STORE_IMPORTS='imports';
const STORE_META='meta';

function openDb(){
  return new Promise((resolve,reject)=>{
    const req=indexedDB.open(DB_NAME,DB_VERSION);
    req.onupgradeneeded=()=>{
      const db=req.result;
      if(!db.objectStoreNames.contains(STORE_IMPORTS)) db.createObjectStore(STORE_IMPORTS,{keyPath:'id'});
      if(!db.objectStoreNames.contains(STORE_META)) db.createObjectStore(STORE_META,{keyPath:'key'});
    };
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error);
  });
}

async function tx(store,mode='readonly'){
  const db=await openDb();
  return db.transaction(store,mode).objectStore(store);
}
function request(req){return new Promise((resolve,reject)=>{req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});}

export async function saveImport(record){
  const store=await tx(STORE_IMPORTS,'readwrite');
  return request(store.put(record));
}
export async function getImport(id){const store=await tx(STORE_IMPORTS);return request(store.get(id));}
export async function getImports(){const store=await tx(STORE_IMPORTS);const all=await request(store.getAll());return (all||[]).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));}
export async function deleteImport(id){const store=await tx(STORE_IMPORTS,'readwrite');return request(store.delete(id));}
export async function clearImports(){const store=await tx(STORE_IMPORTS,'readwrite');return request(store.clear());}
export async function setMeta(key,value){const store=await tx(STORE_META,'readwrite');return request(store.put({key,value}));}
export async function getMeta(key){const store=await tx(STORE_META);const r=await request(store.get(key));return r?.value;}

export async function exportBackup(){
  return {version:1,exportedAt:new Date().toISOString(),imports:await getImports(),meta:{theme:await getMeta('theme')}};
}
export async function restoreBackup(payload){
  if(!payload || !Array.isArray(payload.imports)) throw new Error('Backup inválido.');
  await clearImports();
  for(const item of payload.imports) await saveImport(item);
  if(payload.meta?.theme) await setMeta('theme',payload.meta.theme);
}
