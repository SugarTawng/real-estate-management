import { Backdrop, Modal } from "@mui/material";
import PropTypes from "prop-types";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";

const Index = ({ detailOpen, handleDetailClick, detailUserData }) => {
  return (
    <Modal
      open={detailOpen}
      onClose={handleDetailClick}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 1000,
      }}
    >
      <DashboardLayout>
        <DashboardNavbar />
        <ProfileInfoCard {...detailUserData} />
      </DashboardLayout>
    </Modal>
  );
};

Index.propTypes = {
  detailOpen: PropTypes.bool.isRequired,
  handleDetailClick: PropTypes.func.isRequired,
  detailUserData: PropTypes.object.isRequired,
};

export default Index;
