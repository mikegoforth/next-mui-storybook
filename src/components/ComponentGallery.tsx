'use client';
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Fab from '@mui/material/Fab';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SendIcon from '@mui/icons-material/Send';

function Region({
  title,
  imports,
  children,
  sx,
}: {
  title: string;
  imports: string[];
  children: React.ReactNode;
  sx?: React.ComponentProps<typeof Box>['sx'];
}) {
  const id = React.useId();
  return (
    <Box
      component="section"
      aria-labelledby={id}
      sx={[
        {
          bgcolor: 'background.containerLow',
          borderRadius: 1, // theme.shape.borderRadius (16px), the card corner
          p: { xs: 2.5, sm: 3 },
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Box>
        <Typography id={id} variant="h6" component="h3">
          {title}
        </Typography>
        <Box
          component="ul"
          aria-label="Imports"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: 2,
            rowGap: 0.25,
            listStyle: 'none',
            m: 0,
            mt: 0.5,
            p: 0,
          }}
        >
          {imports.map((path) => (
            <Typography
              key={path}
              component="li"
              variant="code"
              sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
            >
              @mui/material/{path}
            </Typography>
          ))}
        </Box>
      </Box>
      {children}
    </Box>
  );
}

function Buttons() {
  return (
    <Region title="Buttons" imports={['Button', 'Fab', 'IconButton']}>
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1.5 }}>
        <Button variant="contained" startIcon={<SendIcon />}>
          Filled
        </Button>
        <Button variant="tonal" startIcon={<AddIcon />}>
          Tonal
        </Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
      </Stack>
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1.5, alignItems: 'center' }}>
        <Fab variant="extended">
          <AddIcon />
          New project
        </Fab>
        <Button variant="contained" color="tertiary" startIcon={<RocketLaunchOutlinedIcon />}>
          Tertiary
        </Button>
        <Tooltip title="Add to favorites">
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Share">
          <IconButton>
            <ShareOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1.5 }}>
        <Button variant="contained" disabled>
          Filled
        </Button>
        <Button variant="tonal" disabled>
          Tonal
        </Button>
        <Button variant="outlined" disabled>
          Outlined
        </Button>
      </Stack>
    </Region>
  );
}

const FILTERS = ['Next.js', 'Material UI', 'Storybook', 'Vitest'];

function Selection() {
  const [selected, setSelected] = React.useState<string[]>(['Next.js', 'Material UI']);
  const toggle = (filter: string) =>
    setSelected((current) =>
      current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter],
    );

  return (
    <Region title="Selection" imports={['Chip', 'Switch', 'Checkbox']}>
      <Stack
        direction="row"
        role="group"
        aria-label="Filters"
        sx={{ flexWrap: 'wrap', gap: 1 }}
      >
        {FILTERS.map((filter) => {
          const isSelected = selected.includes(filter);
          return (
            <Chip
              key={filter}
              label={filter}
              variant={isSelected ? 'filled' : 'outlined'}
              icon={isSelected ? <CheckIcon /> : undefined}
              onClick={() => toggle(filter)}
              aria-pressed={isSelected}
            />
          );
        })}
      </Stack>
      <FormGroup sx={{ gap: 0.5 }}>
        <FormControlLabel control={<Switch defaultChecked />} label="Email updates" />
        <FormControlLabel control={<Switch />} label="Auto-save drafts" />
        <FormControlLabel control={<Switch disabled />} label="Beta features (unavailable)" />
      </FormGroup>
      <FormGroup row>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
        <FormControlLabel control={<Checkbox disabled />} label="Disabled" />
      </FormGroup>
    </Region>
  );
}

function TextFields() {
  const [name, setName] = React.useState('my-app');
  const nameError = !/^[a-z0-9-]+$/.test(name);

  return (
    <Region title="Text fields" imports={['TextField']}>
      <TextField
        label="Project name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        error={nameError}
        helperText={
          nameError
            ? 'Use lowercase letters, numbers and hyphens only.'
            : 'Lowercase letters, numbers and hyphens.'
        }
      />
      <TextField
        label="Description"
        variant="filled"
        placeholder="What are you building?"
        multiline
        minRows={2}
      />
      <TextField label="Region" defaultValue="us-east-1" disabled />
    </Region>
  );
}

function Feedback() {
  return (
    <Region title="Feedback" imports={['Alert', 'LinearProgress']}>
      <Stack sx={{ gap: 1.5 }}>
        <Alert severity="success">Changes saved.</Alert>
        <Alert severity="info">A new version is available.</Alert>
        <Alert severity="warning">Your session expires in 5 minutes.</Alert>
        <Alert severity="error">Couldn&apos;t connect. Check your network and try again.</Alert>
      </Stack>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" id="upload-label">
            Uploading assets
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            64%
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={64} aria-labelledby="upload-label" />
      </Box>
    </Region>
  );
}

/** Live, themed MUI components: every color, shape and font comes from src/theme.ts. */
export default function ComponentGallery() {
  return (
    // Two independent columns (7/5) so each card keeps its natural height.
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { md: 'flex-start' },
        gap: 2,
      }}
    >
      <Stack sx={{ gap: 2, flex: { md: 7 }, minWidth: 0 }}>
        <Buttons />
        <Feedback />
      </Stack>
      <Stack sx={{ gap: 2, flex: { md: 5 }, minWidth: 0 }}>
        <TextFields />
        <Selection />
      </Stack>
    </Box>
  );
}
