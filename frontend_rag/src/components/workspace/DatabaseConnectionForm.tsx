import React, { useState } from 'react';

type DatabaseConnection = {
  type: string;
  host: string;
  port: string;
  user: string;
  password: string;
  dbName: string;
};

type Props = {
  onSave: (data: DatabaseConnection) => void;
  simulateError?: boolean;
};

const dbTypes = ['PostgreSQL', 'MySQL', 'SQLite'];

const DatabaseConnectionForm: React.FC<Props> = ({ onSave, simulateError }) => {
  const [fields, setFields] = useState<DatabaseConnection>({
    type: dbTypes[0],
    host: '',
    port: '',
    user: '',
    password: '',
    dbName: '',
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [status, setStatus] = useState<string | null>(null);

  const validate = () => {
    const errs: { [k: string]: string } = {};
    if (!fields.host) errs.host = 'Host is required';
    if (!fields.user) errs.user = 'User is required';
    if (!fields.dbName) errs.dbName = 'Database name is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleTest = async () => {
    if (!validate()) return;
    setStatus('testing');
    await new Promise(r => setTimeout(r, 300));
    if (simulateError) {
      setStatus('failed');
    } else {
      setStatus('success');
    }
  };

  return (
    <form>
      <label htmlFor="type">Database Type</label>
      <select id="type" name="type" value={fields.type} onChange={handleChange} aria-label="database type">
        {dbTypes.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <label htmlFor="host">Host</label>
      <input id="host" name="host" value={fields.host} onChange={handleChange} aria-label="host" />
      {errors.host && <span>{errors.host}</span>}
      <label htmlFor="port">Port</label>
      <input id="port" name="port" value={fields.port} onChange={handleChange} aria-label="port" />
      <label htmlFor="user">User</label>
      <input id="user" name="user" value={fields.user} onChange={handleChange} aria-label="user" />
      {errors.user && <span>{errors.user}</span>}
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" value={fields.password} onChange={handleChange} aria-label="password" />
      <label htmlFor="dbName">Database Name</label>
      <input id="dbName" name="dbName" value={fields.dbName} onChange={handleChange} aria-label="database name" />
      {errors.dbName && <span>{errors.dbName}</span>}
      <button type="button" onClick={handleTest}>Test Connection</button>
      {status === 'success' && <div>Connection successful</div>}
      {status === 'failed' && <div>Connection failed</div>}
      <button type="button" onClick={() => { if (validate()) onSave(fields); }}>Save</button>
    </form>
  );
};

export default DatabaseConnectionForm;
