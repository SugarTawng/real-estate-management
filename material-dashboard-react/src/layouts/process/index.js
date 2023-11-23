/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ReportsPieChart from "examples/Charts/PieChart";

import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/process/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import reportsPieChartData from "layouts/process/data/reportsPieChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="user transaction"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
                {/* <HorizontalBarChart
                  color="info"
                  title="user transaction"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={HorizontalBarChart}
                /> */}
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={4.5}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsPieChart
                  color="light"
                  title="completed tasks (KPI)"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={reportsPieChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsPieChart
                  color="light"
                  title="completed tasks (KPI)"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={reportsPieChartData}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
