import Grid from '@mui/material/Grid2';
import ChartCard from '../Components/ChartCard';
import { Typography } from '@mui/material';
import FunnelChart from '../Components/charts.js/FunnelChart';

export default function Dashboard() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid size={12}> Hi admin, Welcome Back</Grid>
        <Grid size={12}>
          <ChartCard
            textElement={<Typography variant='h4'>TIME TO HIRE</Typography>}
            chartElement={<FunnelChart />}
          />
        </Grid>
      </Grid>
    </>
  );
}
