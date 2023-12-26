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
import Icon from "@mui/material/Icon";
import axios from "axios";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const CustomTimelineItem = ({ item, key, lastItem }) => (
  <TimelineItem
    key={key}
    color={(item.color = "success")}
    icon={(item.icon = "receipt")}
    title={"Paid at: " + item.high_area_id ? item.high_area_id : item.land_area_id}
    dateTime={item.created_at}
    lastItem={lastItem}
  />
);

CustomTimelineItem.propTypes = {
  item: PropTypes.shape({
    color: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    high_area_id: PropTypes.string.isRequired,
    land_area_id: PropTypes.string.isRequired,
    dateTime: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
  key: PropTypes.number.isRequired,
  lastItem: PropTypes.bool.isRequired,
};

function OrdersOverview() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/v1/dashboard/process", {
          headers: {
            "Content-Type": "application/json",
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImxvZ2luX25hbWUiOiJzYWRtaW4iLCJkaXNwbGF5X25hbWUiOiJTdWdhciBUYXduZyIsImVtYWlsIjoidGFuZ3ZpZXRkaWVuMDcwN0BnbWFpbC5jb20iLCJ0eXBlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE3MDI1MzYzNjEsImV4cCI6MTcwNDY5NjM2MX0.gXVTJj0_WbItNRSgOxTK6rsn7MNqptQX4GFkL-2AWV0",
          },
        });
        if (response.data) {
          console.log("response process data: ", response.data.data);
          setData(response.data.data);
          console.log("data: ", data);
        } else {
          console.error("Empty response data");
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error.message);
        setData([]);
      }
    };
    fetchData();
  }, []);

  console.log("data2: ", data);

  const apiDataa = [
    {
      title: "$2400, Design changes",
      dateTime: "22 DEC 7:20 PM",
    },
    // ... (các phần tử còn lại)
  ];

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Orders overview
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              24%
            </MDTypography>{" "}
            this month
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        {data.map((item, index) => (
          <CustomTimelineItem key={index} item={item} lastItem={index === data.length - 1} />
        ))}
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
