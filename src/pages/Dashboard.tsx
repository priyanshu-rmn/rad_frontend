import Grid from "@mui/material/Grid2";
import ChartCard from "../Components/ChartCard";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import FunnelChart from "../Components/charts/FunnelChart";
import BarChart from "../Components/charts/BarChart";
import PieChart from "../Components/charts/PieChart";
import { useEffect, useState } from "react";
import { api } from "../utils/axios";
import FilterForm from "../Components/FilterForm";
import { Dayjs } from "dayjs";

const res_data = {
  all_positions: {
    "71": "Patent attorney",
    "87": "Engineer, petroleum",
    "143": "Librarian, academic",
    "255": "Community pharmacist",
    "277": "Systems developer",
    "279": "Education officer, environmental",
    "360": "Dentist",
    "400": "Journalist, newspaper",
    "418": "Tax inspector",
    "433": "Chartered legal executive (England and Wales)",
    "485": "Journalist, broadcasting",
    "535": "Agricultural engineer",
    "542": "Colour technologist",
    "613": "Geologist, engineering",
    "617": "Landscape architect",
    "647": "Management consultant",
    "693": "Geographical information systems officer",
    "707": "Water quality scientist",
    "710": "Hospital pharmacist",
    "799": "Forensic scientist",
    "822": "Printmaker",
    "862": "Psychiatric nurse",
    "964": "Tax inspector",
    "973": "Engineer, broadcasting (operations)",
    "979": "Engineer, petroleum",
  },
  all_departments: [
    "ENGINEERING",
    "MARKETING",
    "SALES",
    "HUMAN_RESOURCES",
    "FINANCE",
  ],
  candidate_stage_counts: {
    RESUME_SCREENING: 92,
    TEST_SCREENING: 78,
    PHONE_SCREENING: 62,
    TECHNICAL_INTERVIEW_1: 53,
    TECHNICAL_INTERVIEW_2: 41,
    HR_MANAGERIAL_INTERVIEW: 23,
    OFFER_NEGOTIATION: 13,
    TOTAL_APPLICATIONS: 100,
  },
  depts_time_to_hire: {
    ENGINEERING: 92.4040484719676,
    MARKETING: 8.980116743333333,
    SALES: 114.95695738212383,
    FINANCE: 148.4534925671875,
  },
  offer_status: {
    OFFER_ACCEPTED: 6,
    OFFER_DECLINED: 7,
    OFFER_PENDING: 5,
  },
  application_status_count: {
    WAITING: 22,
    NO_ACTION: 8,
    NEW_APPLICANTS: 1,
  },
};

export type dataType = {
  all_positions: { [key: string]: string };
  all_departments: string[];
  candidate_stage_counts: { [key: string]: number };
  depts_time_to_hire: { [key: string]: number };
  offer_status: { [key: string]: number };
  application_status_count: { [key: string]: number };
};
export type formDataType = {
  positions: string[];
  departments: string[];
  dateRange: [Dayjs | null, Dayjs | null];
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
  const [error, setError] = useState<string | null>(null); // State to store any error
  const [loading, setLoading] = useState(true); // State to indicate loading

  const [formData, setFormData] = useState<formDataType>({
    positions: [],
    departments: [],
    dateRange: [null, null],
  });

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
        setError(`${err?.response?.detail || err?.code} `); // Set error state
        setLoading(false); // Turn off loading
      });
  };

  useEffect(() => {
    fetchData(); // Call the function
  }, []); // Empty dependency array to run only once

  return (
    <>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Typography variant="h4" sx={{ ml: "2rem" }}>
            Hi admin, Welcome Back
          </Typography>
        </Grid>

        <Grid size={12}>
          <Box sx={{ borderRadius: "15px", backgroundColor: "white" }}>
            <FilterForm
              formData={formData}
              setFormData={setFormData}
              allPositions={res_data.all_positions}
              allDepartments={res_data.all_departments}
              setLoading={setLoading}
              setData={setData}
              setError={setError}
            />
          </Box>
        </Grid>
        {loading && (
          <Box sx={{ margin: "0 auto", textAlign: "center" }}>
            Fetching Data...
          </Box>
        )}
        {error && (
          <Box sx={{ margin: "0 auto", textAlign: "center", color: "red" }}>
            Error: {error}
          </Box>
        )}

        {!(loading || error) && (
          <>
            <Grid size={{ md: 6, sm: 12, xs: 12 }}>
              <PieChart
                title="Offers Status"
                chartData={convertToArray(data.offer_status)}
              />
            </Grid>
            <Grid size={{ md: 6, sm: 12, xs: 12 }}>
              <PieChart
                title="Application Status"
                chartData={convertToArray(data.application_status_count)}
              />
            </Grid>
            <Grid size={{ md: 6, sm: 12, xs: 12 }}>
              <BarChart chartData={convertToArray(data.depts_time_to_hire)} />
            </Grid>
            <Grid size={{ md: 6, sm: 12, xs: 12 }}>
              <FunnelChart
                chartData={convertToArray(data.candidate_stage_counts)}
              />
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
