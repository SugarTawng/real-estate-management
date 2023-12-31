import React from "react";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard/index";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ProjectCards from "examples/Cards/ProjectCards/DefaultProjectCard";

const Index2 = () => {
  const projectData = {
    image: "đường dẫn/tới/hình_ảnh.jpg",
    label: "Web Development",
    title: "Project Title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    action: {
      type: "internal", // hoặc 'external' nếu là liên kết ngoại tuyến
      route: "/project-details",
      color: "primary",
      label: "View Details",
    },
    authors: [
      { image: "đường dẫn/tới/author1.jpg", name: "Author 1" },
      { image: "đường dẫn/tới/author2.jpg", name: "Author 2" },
    ],
  };

  const userData = {
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
    },
  };

  return (
    <DashboardLayout>
      <h1>User Profile lllllll</h1>
      <ProfileInfoCard {...userData} />
      <h1>Project Profile lllllll</h1>
      <ProjectCards {...projectData} />
    </DashboardLayout>
  );
};

export default Index2;
