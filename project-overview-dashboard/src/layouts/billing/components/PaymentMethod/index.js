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
import axios from "axios";
import { useState } from "react";

function PaymentMethod() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [projectID, setProjectID] = useState("");
  const [totalPaymentTime, setTotalPaymentTime] = useState("");
  const [methodName, setMethodName] = useState("");
  const [percentDiscount, setPercentDiscount] = useState("");
  const [vat, setVat] = useState("");
  const [maintenanceFee, setMaintenanceFee] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const handleSubmit = async () => {
    try {
      const parsedProjectID = parseInt(projectID);
      const parsedTotalPaymentTime = parseInt(totalPaymentTime);
      const parsedPercentDiscount = parseFloat(percentDiscount);
      const parsedVat = parseFloat(vat);
      const parsedMaintenanceFee = parseFloat(maintenanceFee);
      const parsedTotalPrice = parseFloat(totalPrice);

      const data = {
        project_id: parsedProjectID,
        total_of_payment_time: parsedTotalPaymentTime,
        method_name: methodName,
        percent_discount: parsedPercentDiscount,
        vat: parsedVat,
        maintenance_fee: parsedMaintenanceFee,
        total_price: parsedTotalPrice,
      };
      console.log("data: ", data);
      const response = await axios.post("http://localhost:3003/v1/auth/paymentMethod", data, {
        headers: {
          "Content-Type": "application/json",
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImxvZ2luX25hbWUiOiJzYWRtaW4iLCJkaXNwbGF5X25hbWUiOiJTdWdhciBUYXduZyIsImVtYWlsIjoidGFuZ3ZpZXRkaWVuMDcwN0BnbWFpbC5jb20iLCJ0eXBlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE3MDU5MDU0MzAsImV4cCI6MTcwODA2NTQzMH0.Ujsy1dPcX1iyX7gxx1DlSZxGLBHEpM1QRW_Z7jiMTY4",
        },
      });
      if (response) {
        console.log("post response ", response);
      } else {
        console.log("error roi");
      }
    } catch (error) {
      // Xử lý lỗi trong quá trình gửi request
      console.log("Error fetching data:", error);
      // setUserData([]); // Đảm bảo userData không bao giờ là null
    }
  };

  const handleCancel = () => {
    // Đặt giá trị của mỗi state về rỗng (empty string)
    setProjectID("");
    setTotalPaymentTime("");
    setMethodName("");
    setPercentDiscount("");
    setVat("");
    setMaintenanceFee("");
    setTotalPrice("");
  };

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
            <MDTextField
              label="Enter Project id"
              fullWidth
              value={projectID}
              onChange={(e) => setProjectID(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <MDTypography variant="h6">Total of payment time</MDTypography>
            <MDTextField
              label="Enter Total of payment time"
              fullWidth
              value={totalPaymentTime}
              onChange={(e) => setTotalPaymentTime(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <MDTypography variant="h6">Method name</MDTypography>
            <MDTextField
              label="Enter Method name"
              fullWidth
              value={methodName}
              onChange={(e) => setMethodName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <MDTypography variant="h6">Percent discount</MDTypography>
            <MDTextField
              label="Enter Percent discount"
              fullWidth
              value={percentDiscount}
              onChange={(e) => {
                setPercentDiscount(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <MDTypography variant="h6">VAT</MDTypography>
            <MDTextField
              label="Enter VAT"
              fullWidth
              value={vat}
              onChange={(e) => {
                setVat(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <MDTypography variant="h6">Maintenance fee</MDTypography>
            <MDTextField
              label="Enter Maintenance fee"
              fullWidth
              value={maintenanceFee}
              onChange={(e) => {
                setMaintenanceFee(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <MDTypography variant="h6">Total price</MDTypography>
            <MDTextField
              label="Enter Total price"
              fullWidth
              value={totalPrice}
              onChange={(e) => {
                setTotalPrice(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <MDButton variant="contained" color="secondary" fullWidth onClick={handleCancel}>
              Cancel
            </MDButton>
          </Grid>

          <Grid item xs={6}>
            <MDButton variant="contained" color="success" fullWidth onClick={handleSubmit}>
              Submit
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default PaymentMethod;
