import sql from  'mssql';
 
const conConfig = {
  user: "",
  password: "",
  server: "",
  database: "",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};
 
let pool;
 
export const getConnection = async () => {
  if (pool) return pool;
 
  try {
    pool = await sql.connect(conConfig);
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
};
 
export { sql };