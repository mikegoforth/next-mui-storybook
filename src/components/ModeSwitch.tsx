'use client';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useColorScheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

type Mode = 'system' | 'light' | 'dark';

const modes: { value: Mode; label: string; icon: React.ReactElement }[] = [
  { value: 'system', label: 'System', icon: <SettingsBrightnessIcon /> },
  { value: 'light', label: 'Light', icon: <LightModeIcon /> },
  { value: 'dark', label: 'Dark', icon: <DarkModeIcon /> },
];

export default function ModeSwitch() {
  const { mode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  // `mode` is undefined until the color scheme is resolved on the client.
  if (!mode) {
    return null;
  }

  const current = modes.find((option) => option.value === mode) ?? modes[0];
  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title="Change theme">
        <IconButton
          color="inherit"
          id="mode-switch-button"
          aria-controls={open ? 'mode-switch-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          {current.icon}
        </IconButton>
      </Tooltip>
      <Menu
        id="mode-switch-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        slotProps={{ list: { 'aria-labelledby': 'mode-switch-button' } }}
      >
        {modes.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === mode}
            onClick={() => {
              setMode(option.value);
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>{option.icon}</ListItemIcon>
            <ListItemText>{option.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
