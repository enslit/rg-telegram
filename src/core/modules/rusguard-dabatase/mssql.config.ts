export interface IMSSQLConfig {
  user: string;
  password: string;
  server: string;
  database: string;
}

export default (): IMSSQLConfig => ({
  user: String(process.env.RUSGUARD_DB_USER),
  password: String(process.env.RUSGUARD_DB_PASSWORD),
  server: String(process.env.RUSGUARD_DB_SERVER),
  database: String(process.env.RUSGUARD_DB_DATABASE),
});
