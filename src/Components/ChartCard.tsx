import Grid from "@mui/material/Grid2";

//   "acceptance_rates": {
//       "accepted": 6,
//       "declined": 7,
//       "total": 13
//   },
//   "waiting_count": 22,
//   "no_action_count": 8,
//   "new_application_count": 1
// }
export default function ChartCard({
  textElement,
  chartElement,
}: {
  textElement: JSX.Element;
  chartElement: JSX.Element;
}) {
  return (
    <>
      <Grid container>
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {textElement}
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>{chartElement}</Grid>
      </Grid>
    </>
  );
}
