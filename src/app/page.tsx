import { rootStyles } from './rootStyles';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

export default function RootPage() {
  return (
    <>
      <Box
        component="img"
        sx={rootStyles.logo}
        alt="Next.js logo."
        src="https://nextjs.org/icons/next.svg"
      />
      <List>
        <ListItem>
          <ListItemText>
            Get started by editing{' '}
            <Typography component="code" sx={rootStyles.code}>
              app/page.tsx
            </Typography>
            .
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Save and see your changes instantly.</ListItemText>
        </ListItem>
      </List>

      <Box sx={rootStyles.ctas}>
        <Button
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          variant="contained"
          sx={rootStyles.primaryButton}
          rel="noopener noreferrer"
          startIcon={
            <Box
              component="img"
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
          }
        >
          Deploy now
        </Button>
        <Button
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          variant="outlined"
          color="secondary"
          rel="noopener noreferrer"
          sx={rootStyles.secondaryButton}
        >
          Read our docs
        </Button>
      </Box>
    </>
  );
}
