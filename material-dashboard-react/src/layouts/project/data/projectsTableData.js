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
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoGithub from "assets/images/small-logos/github.svg";

import axios from "axios";
import { useEffect, useState } from "react";

export default function data() {
  const [projectData, setProjectData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/v1/auth/project", {
          headers: {
            "Content-Type": "application/json",
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImxvZ2luX25hbWUiOiJzYWRtaW4iLCJkaXNwbGF5X25hbWUiOiJTdWdhciBUYXduZyIsImVtYWlsIjoidGFuZ3ZpZXRkaWVuMDcwN0BnbWFpbC5jb20iLCJ0eXBlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE3MDI1MzYzNjEsImV4cCI6MTcwNDY5NjM2MX0.gXVTJj0_WbItNRSgOxTK6rsn7MNqptQX4GFkL-2AWV0",
          },
        });
        if (response.data) {
          console.log("response", response.data.data.data);
          // Thực hiện map trực tiếp và lưu vào biến userData
          setProjectData(response.data.data.data.map((data) => ({ ...data })));
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

  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  const generateRowData = (projectData) => ({
    project: <Project image={projectData.image || logoGithub} name={projectData.name} />,
    budget: (
      <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
        {projectData.budget}
      </MDTypography>
    ),
    status: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {projectData.status}
      </MDTypography>
    ),
    completion: (
      <Progress
        color={projectData.completionColor || "success"}
        value={projectData.project_progress}
      />
    ),
    action: (
      <MDTypography component="a" href="#" color="text">
        <Icon>more_vert</Icon>
      </MDTypography>
    ),
  });

  const generateRowsFromData = (data) => {
    if (!data) {
      return [];
    }
    return data.map(generateRowData);
  };

  const rows = generateRowsFromData(projectData || []);

  return {
    columns: [
      { Header: "project", accessor: "project", width: "30%", align: "left" },
      { Header: "budget", accessor: "budget", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "completion", accessor: "completion", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: rows,
  };
}
