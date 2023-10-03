import React from "react";
import GitHubRepos from "./components/GitHubRepos";
import DisplayUserInfo from "./components/DisplayUserInfo";
import Logo from "@/core/components/common/Logo/Logo";

const Dashboard: React.FC = () => {
  return (
    <div>
      <Logo />
      <DisplayUserInfo />
      <GitHubRepos />
    </div>
  );
};

export default Dashboard;
