import Grid from "@mui/material/Grid2";
import ChartCard from "../Components/ChartCard";
import { Typography } from "@mui/material";
import FunnelChart from "../Components/charts/FunnelChart";
import BarChart from "../Components/charts/BarChart";
import PieChart from "../Components/charts/PieChart";

const APPLICATION_STAGE_DATA = [
  ["YET_TO_START", 8],
  ["OFFER_NEGOTIATION", 13],
  ["RESUME_SCREENING", 14],
  ["TECHNICAL_INTERVIEW_1", 12],
  ["PHONE_SCREENING", 9],
  ["TEST_SCREENING", 16],
  ["HR_MANAGERIAL_INTERVIEW", 10],
  ["TECHNICAL_INTERVIEW_2", 5],
];

//   "depts_time_to_hire":
const TIME_TO_HIRE_DATA = [
  ["MARKETING", 8.980116743333333],
  ["SALES", 114.95695738212383],
  ["FINANCE", 148.4534925671875],
  ["ENGINEERING", 92.4040484719676],
];

// "acceptance_rates":
const OFFER_STATUS_DATA = [
  ["OFFER_ACCEPTED", 6],
  ["OFFERED_DECLINED", 7],
  ["OFFER_PENDING", 13],
];

const APPLICATION_STATUS_DATA = [
  ["waiting_count", 22],
  ["no_action_count", 8],
  ["new_application_count", 1],
];

export default function Dashboard() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid size={12}> Hi admin, Welcome Back</Grid>

        {/* <Grid size={{ md: 6, sm: 12, xs: 12 }}>
          <PieChart chartData={OFFER_STATUS_DATA} />
        </Grid>
        <Grid size={{ md: 6, sm: 12, xs: 12 }}>
          <PieChart chartData={APPLICATION_STATUS_DATA} />
        </Grid>
        <Grid size={{ md: 6, sm: 12, xs: 12 }}>
          <BarChart chartData={TIME_TO_HIRE_DATA} />
        </Grid>
        <Grid size={{ md: 6, sm: 12, xs: 12 }}>
          <FunnelChart chartData={APPLICATION_STAGE_DATA} />
        </Grid> */}

        <Grid size={12}>
          <ChartCard
            textElement={
              <Typography variant="h4">Applications at each stage</Typography>
            }
            chartElement={<FunnelChart chartData={APPLICATION_STAGE_DATA} />}
          />
        </Grid>
        <Grid size={12}>
          <ChartCard
            textElement={<Typography variant="h4">Time to hire</Typography>}
            chartElement={<BarChart chartData={TIME_TO_HIRE_DATA} />}
          />
        </Grid>
        <Grid size={12}>
          <ChartCard
            textElement={<Typography variant="h4">Offers Status</Typography>}
            chartElement={<PieChart chartData={OFFER_STATUS_DATA} />}
          />
        </Grid>
        <Grid size={12}>
          <ChartCard
            textElement={<Typography variant="h4">Application Status</Typography>}
            chartElement={<PieChart chartData={APPLICATION_STATUS_DATA} />}
          />
        </Grid>
      </Grid>
    </>
  );
}
