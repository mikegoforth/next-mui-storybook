import { Box } from '@mui/system';
import { rootStyles } from '../rootStyles';

export default function Page() {
  return (
    <Box sx={rootStyles.main}>
      <h1>About</h1>
      <p>This is the about page.</p>
    </Box>
  );
}
