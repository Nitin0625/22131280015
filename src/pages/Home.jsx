import { useState } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import UrlForm from '../component/UrlForm';
import UrlResultCard from '../component/UrlResultCard';
import ErrorSnackbar from '../component/ErrorSnackbar';
import { isValidURL, isValidMinutes, isValidShortCode } from '../utils/validators';
import { generateShortCode } from '../utils/shortCodeGenerator';
import { logAction } from '../utils/LoggerMiddleware';

export default function Home({ shortened, setShortened }) {
  const [urls, setUrls] = useState([{ url: '', code: '', minutes: '' }]);
  const [results, setResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [open, setOpen] = useState(false);

  const showError = (msg) => {
    setErrorMsg(msg);
    setOpen(true);
  };

  const handleChange = (i, field, value) => {
    const updated = [...urls];
    updated[i][field] = value;
    setUrls(updated);
  };

  const handleAdd = () => {
    if (urls.length < 5) setUrls([...urls, { url: '', code: '', minutes: '' }]);
  };

  const handleSubmit = () => {
    const existingCodes = new Set(Object.keys(shortened));
    const newResults = [];
    const newMapping = {};

    for (const { url, code, minutes } of urls) {
      if (!isValidURL(url)) return showError('Invalid URL format');
      if (code && !isValidShortCode(code)) return showError('Invalid shortcode');
      if (minutes && !isValidMinutes(Number(minutes))) return showError('Invalid validity time');

      const finalCode = code || generateShortCode(existingCodes);
      if (shortened[finalCode] || newMapping[finalCode]) return showError(`Shortcode "${finalCode}" already exists`);

      const expiresAt = new Date(Date.now() + (Number(minutes || 30) * 60000));
      const entry = { originalUrl: url, code: finalCode, expiresAt };
      newResults.push(entry);
      newMapping[finalCode] = entry;
      existingCodes.add(finalCode);
      logAction('URL_SHORTENED', entry);
    }

    setShortened(prev => ({ ...prev, ...newMapping }));
    setResults(newResults);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
      <Typography variant="h5" gutterBottom>Shorten Your URLs</Typography>
      {urls.map((item, i) => (
        <UrlForm key={i} index={i} data={item} handleChange={handleChange} />
      ))}
      <Button onClick={handleAdd} disabled={urls.length >= 5}>Add Another</Button>
      <Button variant="contained" sx={{ ml: 2 }} onClick={handleSubmit}>Shorten</Button>

      <div style={{ marginTop: 20 }}>
        {results.map((res, i) => <UrlResultCard key={i} {...res} />)}
      </div>

      <ErrorSnackbar open={open} setOpen={setOpen} message={errorMsg} />
    </Paper>
  );
}
