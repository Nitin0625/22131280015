import { Paper, Typography } from '@mui/material';

export default function UrlResultCard({ code, expiresAt }) {
  return (
    <Paper sx={{ p: 2, mt: 1 }}>
      <Typography>
        Short URL: <a href={`/${code}`} target="_blank" rel="noreferrer">
          http://localhost:3000/{code}
        </a>
      </Typography>
      <Typography variant="body2">
        Expires At: {new Date(expiresAt).toLocaleString()}
      </Typography>
    </Paper>
  );
}
