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
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
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
    companies: <Company image={item.companyImage || logoXD} name={item.companyName} />,
    members: (
      <MDBox display="flex" py={1}>
        {avatars(item.teamMembers)}
      </MDBox>
    ),
    budget: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {item.budget}
      </MDTypography>
    ),
    completion: (
      <MDBox width="8rem" textAlign="left">
        <MDProgress value={item.completionValue} color="info" variant="gradient" label={false} />
      </MDBox>
    ),
  });

  const rowData = [
    generateRowData({
      companyName: "Glory Heights",
      budget: "$14,000",
      completionValue: 60,
    }),
    generateRowData({
      companyName: "Bcons City",
      budget: "$3,000",
      completionValue: 10,
    }),
    // Add more entries as needed
  ];

  return {
    columns: [
      { Header: "companies", accessor: "companies", width: "45%", align: "left" },
      { Header: "members", accessor: "members", width: "10%", align: "left" },
      { Header: "budget", accessor: "budget", align: "center" },
      { Header: "completion", accessor: "completion", align: "center" },
    ],

    rows: rowData,
  };
}
