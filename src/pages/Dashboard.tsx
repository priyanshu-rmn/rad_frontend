import Grid from "@mui/material/Grid2";
import ChartCard from "../Components/ChartCard";
import { Typography } from "@mui/material";
import FunnelChart from "../Components/charts/FunnelChart";
import BarChart from "../Components/charts/BarChart";
import PieChart from "../Components/charts/PieChart";
import { useEffect, useState } from "react";
import { api } from "../utils/axios";

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
type dataType = {
  all_positions: { [key: string]: string };
  all_departments: string[];
  candidate_stage_counts: { [key: string]: number };
  depts_time_to_hire: { [key: string]: number };
  offer_status: { [key: string]: number };
  application_status_count: { [key: string]: number };
};

export default function Dashboard() {
  const [data, setData] = useState<dataType>({
    all_positions: {},
    all_departments: [],
    candidate_stage_counts: {},
    depts_time_to_hire: {},
    offer_status: {},
    application_status_count: {},
  }); // State to store fetched data
  const [error, setError] = useState(null); // State to store any error
  const [loading, setLoading] = useState(true); // State to indicate loading

  // Function to convert object to array of 2-value pairs
  const convertToArray = (obj: any) => {
    console.log(obj);
    return Object.entries(obj).map(([key, value]) => [key, value]);
  };

  const fetchData = () => {
    api
      .get("/dashboard/")
      .then((response) => {
        console.log(response.data);
        setData(response.data); // Set data from response
        setLoading(false); // Turn off loading
      })
      .catch((err) => {
        console.error("Error fetching data:", err); // Log error
        setError(err?.response?.detail); // Set error state
        setLoading(false); // Turn off loading
      });
  };

  useEffect(() => {
    fetchData(); // Call the function
  }, []); // Empty dependency array to run only once

  return (
    <>
      <Grid container spacing={3}>
        <Grid size={12}> Hi admin, Welcome Back</Grid>

        {loading && <p>Loading Data...</p>}
        {error && <p>Error: {error}</p>}

        {!(loading || error) && (
          <>
            <Grid size={{ md: 6, sm: 12, xs: 12 }}>
              <PieChart title="Offers Status" chartData={convertToArray(data.offer_status)} />
            </Grid>
            <Grid size={{ md: 6, sm: 12, xs: 12 }}>
              <PieChart title="Application Status"
                    chartData={convertToArray(data.application_status_count)} />
            </Grid>
            <Grid size={{ md: 6, sm: 12, xs: 12 }}>
              <BarChart chartData={convertToArray(data.depts_time_to_hire)} />
            </Grid>
            <Grid size={{ md: 6, sm: 12, xs: 12 }}>
              <FunnelChart chartData={convertToArray(data.candidate_stage_counts)} />
            </Grid>
            {/* <Grid size={12}>
              <ChartCard
                textElement={
                  <Typography variant="h4">
                    Applications at each stage
                  </Typography>
                }
                chartElement={
                  <FunnelChart
                    chartData={convertToArray(data.candidate_stage_counts)}
                  />
                }
              />
            </Grid>

            <Grid size={12}>
              <ChartCard
                textElement={<Typography variant="h4">Time to hire</Typography>}
                chartElement={
                  <BarChart
                    chartData={convertToArray(data.depts_time_to_hire)}
                  />
                }
              />
            </Grid>
            <Grid size={12}>
              <ChartCard
                textElement={
                  <Typography variant="h4">Offers Status</Typography>
                }
                chartElement={
                  <PieChart
                    title="Offers Status"
                    chartData={convertToArray(data.offer_status)}
                  />
                }
              />
            </Grid>
            <Grid size={12}>
              <ChartCard
                textElement={
                  <Typography variant="h4">Application Status</Typography>
                }
                chartElement={
                  <PieChart
                    title="Application Status"
                    chartData={convertToArray(data.application_status_count)}
                  />
                }
              />
            </Grid> */}
          </>
        )}
      </Grid>
    </>
  );
}
