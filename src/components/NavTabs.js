import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Traininglist from './training/Traininglist';
import Customerlist from './customer/Customerlist';
import Statistics from './Statistics';
import Calendar from './Calendar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function NavTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Customers" {...a11yProps(0)} />
          <Tab label="Trainings" {...a11yProps(1)} />
          <Tab label="Calendar" {...a11yProps(2)} />
          <Tab label="Statistics" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Customerlist />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Traininglist />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Calendar />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Statistics />
      </TabPanel>
    </Box>
  );
}

export default NavTabs;