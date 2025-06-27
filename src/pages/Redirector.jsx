import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { logAction } from '../utils/LoggerMiddleware';

export default function Redirector({ mapping }) {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const entry = mapping[code];
    if (!entry) {
      alert('Invalid or expired URL');
      return navigate('/');
    }

    if (new Date(entry.expiresAt) < new Date()) {
      alert('Link has expired');
      return navigate('/');
    }

    logAction('URL_REDIRECTED', { code, to: entry.originalUrl });
    window.location.href = entry.originalUrl;
  }, [code]);

  return null;
}
