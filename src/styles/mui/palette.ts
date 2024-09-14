import { grey } from '@mui/material/colors';

const palette = {
  primary: {
    main: grey[900], // Almost black, for primary actions and text
    dark: grey[700], // Dark gray, for hover states and emphasis
    light: grey[300], // Light gray, for subtle backgrounds or dividers
    contrastText: grey[50], // Very light gray for contrast on primary
  },
  secondary: {
    main: grey[500], // Medium gray, for secondary actions or information
    dark: grey[700], // Dark gray, for hover states and emphasis
    light: grey[300], // Light gray, for subtle backgrounds or dividers
    contrastText: grey[900], // Almost black for contrast on secondary
  },
  background: {
    default: grey[50], // Very light gray background
    paper: '#FFFFFF', // White for surfaces like cards and dialogs
  },
};

export default palette;
