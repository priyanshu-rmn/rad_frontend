import Grid from "@mui/material/Grid2";
import ChartCard from "../Components/ChartCard";
import { Typography } from "@mui/material";
import FunnelChart from "../Components/charts.js/FunnelChart";
import BarChart from "../Components/charts.js/BarChart";

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

export default function Dashboard() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid size={12}> Hi admin, Welcome Back</Grid>
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
      </Grid>
    </>
  );
}
