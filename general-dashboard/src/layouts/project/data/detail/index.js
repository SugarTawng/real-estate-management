import { Backdrop, Fade, Modal } from "@mui/material";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PropTypes from "prop-types";
import React from "react";

const Index = ({ overallInfoOpen, handleDetailClick, projectOverallData }) => {
  return (
    <Modal
      open={overallInfoOpen}
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
            <DefaultProjectCard {...projectOverallData} />
          </div>
        </Fade>
      </DashboardLayout>
    </Modal>
  );
};

Index.propTypes = {
  overallInfoOpen: PropTypes.bool.isRequired,
  handleDetailClick: PropTypes.func.isRequired,
  projectOverallData: PropTypes.object.isRequired,
};

export default Index;
