import { TextField, Grid } from '@mui/material';

export default function UrlForm({ index, data, handleChange }) {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={12} md={5}>
        <TextField
          fullWidth
          label="Long URL"
          value={data.url}
          onChange={(e) => handleChange(index, 'url', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Shortcode (optional)"
          value={data.code}
          onChange={(e) => handleChange(index, 'code', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <TextField
          fullWidth
          label="Validity (min)"
          type="number"
          value={data.minutes}
          onChange={(e) => handleChange(index, 'minutes', e.target.value)}
        />
      </Grid>
    </Grid>
  );
}
