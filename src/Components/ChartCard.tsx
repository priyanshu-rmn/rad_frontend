import Grid from "@mui/material/Grid2";



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
