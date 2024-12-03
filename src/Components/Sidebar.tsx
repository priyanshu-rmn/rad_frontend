import { Tab, Tabs } from "@mui/material";

export default function Sidebar({
  selected,
  setSelected,
}: {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleTabChange = (event: any, newValue: number) => {
    console.log(newValue);
    setSelected(newValue);
  };

  return (
    <Tabs
      value={selected}
      onChange={handleTabChange}
      orientation="vertical"
      variant="scrollable"
    >
      <Tab label="Dashboard" />
      <Tab label="Applications" />
      <Tab label="Positions" />
    </Tabs>
  );
}
