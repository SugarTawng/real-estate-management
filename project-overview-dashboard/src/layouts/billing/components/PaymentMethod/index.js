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
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDTextField from "components/MDInput";

// Images
import masterCardLogo from "assets/images/logos/mastercard.png";
import visaLogo from "assets/images/logos/visa.png";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function PaymentMethod() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <Card id="delete-account">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Bank Payment Method
        </MDTypography>
        <MDButton variant="gradient" color="dark">
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;add new card
        </MDButton>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MDTypography variant="h6">Project id</MDTypography>
            <MDTextField label="Enter Project id" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <MDTypography variant="h6">Total of payment time</MDTypography>
            <MDTextField label="Enter Total of payment time" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <MDTypography variant="h6">Method name</MDTypography>
            <MDTextField label="Enter Method name" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <MDTypography variant="h6">Percent discount</MDTypography>
            <MDTextField label="Enter Percent discount" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <MDTypography variant="h6">VAT</MDTypography>
            <MDTextField label="Enter VAT" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <MDTypography variant="h6">Maintenance fee</MDTypography>
            <MDTextField label="Enter Maintenance fee" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <MDTypography variant="h6">Total price</MDTypography>
            <MDTextField label="Enter Total price" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <MDButton variant="contained" color="default" fullWidth>
              Cancel
            </MDButton>
          </Grid>

          <Grid item xs={6}>
            <MDButton variant="contained" color="primary" fullWidth>
              Submit
            </MDButton>
          </Grid>
        </Grid>
        {/* <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MDBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
              sx={{
                border: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              }}
            >
              <MDBox component="img" src={masterCardLogo} alt="master card" width="10%" mr={2} />
              <MDTypography variant="h6" fontWeight="medium">
                ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;7852
              </MDTypography>
              <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
                <Tooltip title="Edit Card" placement="top">
                  <Icon sx={{ cursor: "pointer" }} fontSize="small">
                    edit
                  </Icon>
                </Tooltip>
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <MDBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
              sx={{
                border: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              }}
            >
              <MDBox component="img" src={visaLogo} alt="master card" width="10%" mr={2} />
              <MDTypography variant="h6" fontWeight="medium">
                ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;5248
              </MDTypography>
              <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
                <Tooltip title="Edit Card" placement="top">
                  <Icon sx={{ cursor: "pointer" }} fontSize="small">
                    edit
                  </Icon>
                </Tooltip>
              </MDBox>
            </MDBox>
          </Grid>
        </Grid> */}
      </MDBox>
    </Card>
  );
}

export default PaymentMethod;
