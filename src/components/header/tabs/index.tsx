import React from "react";
import { Tab, Tabs, Box } from "@mui/material";
import { useCurrentCollection } from "../../../contexts/MainContext";

export const TabsBar: React.FC = () => {
  const { currentCollection, setCurrentCollection } = useCurrentCollection();

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={currentCollection}
        onChange={(currentTarget, target) => {
          setCurrentCollection(target);
        }}
        textColor="inherit"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab
          value="javascript"
          label="Javascript"
          style={{ color: "#98a19d" }}
        />
        <Tab value="react" label="React" style={{ color: "#98a19d" }} />
        <Tab
          value="typescript"
          label="Typescript"
          style={{ color: "#98a19d" }}
        />
        <Tab value="htmlcss" label="HTML/CSS" style={{ color: "#98a19d" }} />
      </Tabs>
    </Box>
  );
};
