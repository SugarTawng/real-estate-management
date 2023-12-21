/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

export default function data() {
  const [projectData, setProjectData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/v1/dashboard/profileProject", {
          headers: {
            "Content-Type": "application/json",
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImxvZ2luX25hbWUiOiJzYWRtaW4iLCJkaXNwbGF5X25hbWUiOiJTdWdhciBUYXduZyIsImVtYWlsIjoidGFuZ3ZpZXRkaWVuMDcwN0BnbWFpbC5jb20iLCJ0eXBlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE3MDI1MzYzNjEsImV4cCI6MTcwNDY5NjM2MX0.gXVTJj0_WbItNRSgOxTK6rsn7MNqptQX4GFkL-2AWV0",
          },
        });
        if (response.data) {
          setProjectData(response.data.data.map((data) => ({ ...data })));
        } else {
          // Xử lý khi response không có dữ liệu
          console.error("Empty response data");
          setProjectData([]); // Đảm bảo userData không bao giờ là null
        }
      } catch (error) {
        // Xử lý lỗi trong quá trình gửi request
        console.error("Error fetching data:", error.message);
        setProjectData([]); // Đảm bảo userData không bao giờ là null
      }
    };
    fetchData();
  }, []);

  if (!projectData) {
    <div>loading</div>;
  }

  const avatars = (
    members = [
      [team1, "Default Team 1"],
      [team2, "Default Team 2"],
      [team3, "Default Team 3"],
      [team4, "Default Team 4"],
    ]
  ) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const generateRowData = (item) => ({
    companies: <Company image={item.img || logoXD} name={item.name} />,
    members: (
      <MDBox display="flex" py={1}>
        {avatars(
          item.profiles.map((item) => {
            return Object.values(item);
          })
        )}
      </MDBox>
    ),
    budget: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {item.budget}
      </MDTypography>
    ),
    completion: (
      <MDBox width="8rem" textAlign="left">
        <MDProgress value={item.project_progress} color="info" variant="gradient" label={false} />
      </MDBox>
    ),
  });

  // const apiData = [
  //   {
  //     id: 1,
  //     name: "abcd",
  //     budget: 1000,
  //     project_progress: 20,
  //     img: "https://avatars.githubusercontent.com/u/6?v=4",
  //     profiles: [
  //       {
  //         img: "https://avatars.githubusercontent.com/u/6?v=4",
  //         account_id: 13,
  //       },
  //     ],
  //   },
  // ];
  const generateRowsFromData = (data) => {
    if (!data) {
      return [];
    }
    return data.map(generateRowData);
  };

  const rows = generateRowsFromData(projectData || []);

  return {
    columns: [
      { Header: "companies", accessor: "companies", width: "45%", align: "left" },
      { Header: "members", accessor: "members", width: "10%", align: "left" },
      { Header: "budget", accessor: "budget", align: "center" },
      { Header: "completion", accessor: "completion", align: "center" },
    ],

    rows: rows,
  };
}
