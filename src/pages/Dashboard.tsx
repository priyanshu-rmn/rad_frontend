import Grid from "@mui/material/Grid2";
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
import TimeSeriesChart from "../Components/charts/TimeSeries";

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
  application_per_job_posting: {
    "Agricultural engineer": {
      "2024-01-28": 3,
      "2024-02-11": 7,
      "2024-07-29": 4,
      "2024-08-27": 9,
    },
    "Colour technologist": {
      "2024-02-24": 2,
      "2024-04-19": 5,
      "2024-05-16": 1,
      "2024-10-13": 8,
    },
    "Community pharmacist": {
      "2024-01-08": 4,
      "2024-05-12": 9,
      "2024-05-19": 6,
      "2024-05-20": 8,
      "2024-11-27": 3,
    },
    Dentist: {
      "2024-01-02": 6,
      "2024-02-25": 5,
      "2024-07-03": 2,
      "2024-07-12": 7,
      "2024-11-23": 4,
    },
    "Education officer, environmental": {
      "2024-06-01": 6,
      "2024-08-07": 3,
      "2024-08-30": 7,
    },
    "Engineer, broadcasting (operations)": {
      "2024-01-04": 2,
      "2024-01-06": 9,
      "2024-07-10": 5,
    },
    "Engineer, petroleum": {
      "2024-02-09": 4,
      "2024-02-26": 8,
      "2024-02-28": 6,
      "2024-05-07": 9,
      "2024-05-16": 3,
      "2024-05-18": 7,
      "2024-05-29": 2,
      "2024-07-10": 1,
      "2024-07-20": 8,
      "2024-07-28": 4,
      "2024-11-10": 9,
    },
    "Forensic scientist": {
      "2024-01-07": 3,
      "2024-04-21": 5,
      "2024-10-19": 2,
    },
    "Geographical information systems officer": {
      "2024-04-19": 7,
      "2024-11-11": 1,
    },
    "Geologist, engineering": {
      "2024-02-08": 6,
      "2024-05-09": 8,
      "2024-09-20": 3,
    },
    "Hospital pharmacist": {
      "2024-04-04": 9,
      "2024-04-25": 5,
      "2024-08-26": 2,
      "2024-09-07": 7,
    },
    "Journalist, broadcasting": {
      "2024-01-22": 8,
      "2024-02-09": 6,
    },
    "Journalist, newspaper": {
      "2024-01-27": 4,
      "2024-07-19": 2,
      "2024-08-18": 9,
      "2024-10-04": 7,
    },
    "Landscape architect": {
      "2024-03-15": 3,
      "2024-04-19": 5,
      "2024-04-20": 7,
      "2024-07-18": 2,
      "2024-09-28": 9,
    },
    "Librarian, academic": {
      "2024-01-16": 5,
      "2024-02-17": 3,
      "2024-03-22": 6,
      "2024-04-29": 8,
      "2024-05-23": 4,
      "2024-10-12": 2,
      "2024-10-23": 7,
      "2024-10-26": 1,
    },
    "Management consultant": {
      "2024-03-17": 5,
      "2024-04-05": 6,
      "2024-05-16": 2,
      "2024-08-04": 9,
    },
    "Patent attorney": {
      "2024-05-02": 8,
      "2024-09-02": 5,
      "2024-10-27": 7,
    },
    Printmaker: {
      "2024-02-09": 2,
      "2024-08-10": 4,
      "2024-09-03": 6,
      "2024-09-04": 8,
    },
    "Psychiatric nurse": {
      "2024-03-01": 5,
      "2024-05-07": 3,
      "2024-10-04": 9,
    },
    "Systems developer": {
      "2024-02-15": 7,
      "2024-06-22": 4,
      "2024-07-25": 8,
      "2024-10-03": 6,
      "2024-11-19": 3,
    },
    "Tax inspector": {
      "2024-05-21": 3,
      "2024-05-22": 6,
      "2024-06-09": 7,
      "2024-06-21": 9,
      "2024-06-27": 8,
      "2024-08-28": 2,
      "2024-09-05": 4,
      "2024-10-26": 1,
      "2024-10-27": 5,
    },
    "Water quality scientist": {
      "2024-01-28": 7,
      "2024-02-13": 3,
      "2024-03-13": 9,
      "2024-11-07": 2,
      "2024-11-08": 8,
    },
  },
};
// Function to convert object to array of 2-value pairs
export const convertToArray = (obj: any) => {
  console.log(obj);
  return Object.entries(obj).map(([key, value]) => [key, value]);
};
export type dataType = {
  all_positions: { [key: string]: string };
  all_departments: string[];
  candidate_stage_counts: { [key: string]: number };
  depts_time_to_hire: { [key: string]: number };
  offer_status: { [key: string]: number };
  application_status_count: { [key: string]: number };
  application_per_job_posting: { [key: string]: { [key: string]: number } };
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
    application_per_job_posting: {},
  }); // State to store fetched data
  const [error, setError] = useState<string | null>(null); // State to store any error
  const [loading, setLoading] = useState(true); // State to indicate loading

  const [formData, setFormData] = useState<formDataType>({
    positions: [],
    departments: [],
    dateRange: [null, null],
  });

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
            <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
              <PieChart
                title="Offers Status"
                chartData={convertToArray(data.offer_status)}
              />
            </Grid>
            <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
              <PieChart
                title="Application Status"
                chartData={convertToArray(data.application_status_count)}
              />
            </Grid>
            <Grid size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
              <BarChart chartData={convertToArray(data.depts_time_to_hire)} />
            </Grid>
            <Grid size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
              <FunnelChart
                chartData={convertToArray(data.candidate_stage_counts)}
              />
            </Grid>
            <Grid size={{ md: 12, sm: 12, xs: 12 }}>
              <TimeSeriesChart chartData={data.application_per_job_posting} />
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
