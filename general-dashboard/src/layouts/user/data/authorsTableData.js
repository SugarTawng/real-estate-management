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
import Backdrop from "@mui/material/Backdrop";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import InfoIcon from "@mui/icons-material/Info";

// axios
import axios from "axios";

// Images
import team2 from "assets/images/team-2.jpg";

import { apiUrl } from "constants/constants";
import { useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Fade, Modal } from "@mui/material";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Sidenav from "examples/Sidenav";

export default function data() {
  const [userData, setUserData] = useState(null);
  const iconStyle = {
    width: "30px",
    height: "30px",
    marginRight: "10px",
  };
  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const [detailOpen, setDetailOpen] = useState(false);
  const handleDetailClick = () => {
    setDetailOpen(!detailOpen);
  };

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

  const handleEditClick = () => {
    console.log("edit clicked");
  };

  const handleDeleteClick = () => {
    console.log("delte clicked");
  };

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={handleDetailClick}>
        <Modal
          open={detailOpen}
          onClose={handleDetailClick}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <DashboardLayout>
            <DashboardNavbar />
            <Fade in={true}>
              <div>
                <ProfileInfoCard {...detailUserData} />
              </div>
            </Fade>
          </DashboardLayout>
        </Modal>
        <InfoIcon style={iconStyle} />
        Detail Info
      </MenuItem>
      <MenuItem onClick={handleDeleteClick}>
        <Delete style={iconStyle} sx={{ color: "red" }} />
        Delete
      </MenuItem>
    </Menu>
  );

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
      }
    };
    fetchData();
  }, []);

  if (!userData) {
    <div>loading</div>;
  }

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
        <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu}
      </MDTypography>
    ),
  });

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
