import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import Dashboard from './Dashboard';
import Applications from './Applications';
import Positions from './Positions';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';

export default function Home() {
  const [selected, setSelected] = useState<number>(0);
  return (
    <>
      <Grid container sx={{ height: '100vh' }}>
        {/* Sidebar */}
        <Grid
          size={2}
          sx={{
            height: '100vh',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Sidebar setSelected={setSelected} selected={selected} />
        </Grid>

        {/* Main Content */}
        <Grid
          size={10}
          sx={{
            height: '100vh',
            backgroundColor: 'whitesmoke',
            overflow:"scroll"
          }}
        >
          <Grid size={12}>
            <Navbar />
          </Grid>
          <Grid size={12} sx={{ padding: '2rem' }}>
            {selected === 0 && <Dashboard />}
            {selected === 1 && <Applications />}
            {selected === 2 && <Positions />}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
