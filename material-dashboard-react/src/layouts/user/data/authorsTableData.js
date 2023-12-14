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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// axios
import axios from "axios";

// Images
import team2 from "assets/images/team-2.jpg";

import { apiUrl } from "constants/constants";
import { useEffect, useState } from "react";

export default function data() {
  const [userData, setUserData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            "Content-Type": "application/json",
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImxvZ2luX25hbWUiOiJzYWRtaW4iLCJkaXNwbGF5X25hbWUiOiJTdWdhciBUYXduZyIsImVtYWlsIjoidGFuZ3ZpZXRkaWVuMDcwN0BnbWFpbC5jb20iLCJ0eXBlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE3MDI1MzYzNjEsImV4cCI6MTcwNDY5NjM2MX0.gXVTJj0_WbItNRSgOxTK6rsn7MNqptQX4GFkL-2AWV0",
          },
        });
        if (response.data) {
          console.log("response", response.data.data);
          // Thực hiện map trực tiếp và lưu vào biến userData
          setUserData(response.data.data.map((data) => ({ ...data })));
        } else {
          // Xử lý khi response không có dữ liệu
          console.error("Empty response data");
          setUserData([]); // Đảm bảo userData không bao giờ là null
        }
      } catch (error) {
        // Xử lý lỗi trong quá trình gửi request
        console.error("Error fetching data:", error.message);
        setUserData([]); // Đảm bảo userData không bao giờ là null
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, []);

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const generateRowData = (item) => ({
    author: <Author image={item.teamImage || team2} name={item.display_name} email={item.email} />,
    function: <Job title={item.type} description={item.language} />,
    status: (
      <MDBox ml={-1}>
        <MDBadge
          badgeContent={item.badgeContent || "online"}
          color={item.badgeColor || "success"}
          variant="gradient"
          size="sm"
        />
      </MDBox>
    ),
    employed: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {item.updated_at}
      </MDTypography>
    ),
    action: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        Edit
      </MDTypography>
    ),
  });
  console.log("userDataaaa: ", userData);

  const data = [
    {
      authorName: "Alexa Liras",
      authorEmail: "alexa@creative-tim.com",
      jobTitle: "Programator",
      jobDescription: "Developer",
      employedDate: "11/01/19",
    },
    {
      authorName: "Laurent Perrier",
      authorEmail: "laurent@creative-tim.com",
      jobTitle: "Executive",
      jobDescription: "Projects",
      employedDate: "19/09/17",
    },
  ];

  const generateRowsFromData = (data) => {
    if (!data) {
      // Nếu data là null hoặc undefined, trả về một giá trị mặc định hoặc xử lý khác
      return [];
    }
    return data.map(generateRowData);
  };

  const rows = generateRowsFromData(userData || []);

  return {
    columns: [
      { Header: "author", accessor: "author", width: "45%", align: "left" },
      { Header: "function", accessor: "function", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "employed", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: rows,
  };
}
