import React from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { Fade } from "@mui/material";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

function Index() {
  const detailUserData = {
    title: "John Doe",
    description: "Web Developer",
    info: {
      username: "john_doe",
      email: "john.doe@example.com",
      location: "City, Country",
    },
    social: [{ link: "https://facebook.com/SugarTawng", color: "facebook" }],
    action: {
      route: "/edit-profile",
      tooltip: "Edit Profile",
      tooltip2: "Close Detail",
    },
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Fade in={true}>
        <div>
          <ProfileInfoCard {...detailUserData} />
        </div>
      </Fade>
    </DashboardLayout>
  );
}

export default Index;
