import React from "react";
import { Chart } from "react-google-charts";

const ProjectPieChart = ({ projects }) => {

  // Function to count project statuses
  const countProjectStatus = () => {
    let count = {
      "Completed": 0,
      "On hold": 0,
      "In progress": 0,
    };

    projects.forEach((project) => {
      count[project.project_status]++;
    });

    return count;
  };

  const countProjectStack = () => {
    let count = {
      "Backend": 0,
      "Frontend": 0,
      "Mobile App": 0,
      "Database": 0,
      "Fullstack": 0,
    };

    projects.forEach((project) => {
      count[project.project_stack]++;
    });

    return count;
  };

  const projectStatusCount = countProjectStatus();
  const projectStackCount = countProjectStack();

  const statusData = [
    ["Project Status", "number"],
    ["Completed Project", projectStatusCount["Completed"]],
    ["In progress", projectStatusCount["In progress"]],
    ["On hold", projectStatusCount["On hold"]]
  ];
  const statusOptions = {
    title: "Project status",
    pieHole: 0.4,
    is3D: false,
  };
  const stackData = [
    ["Project stack", "number"],
    ["Backend", projectStackCount["Backend"]],
    ["Frontend", projectStackCount["Frontend"]],
    ["Mobile App", projectStackCount["Mobile App"]],
    ["Database", projectStackCount["Database"]],
    ["Fullstack", projectStackCount["Fullstack"]],
  ];
  const stackOptions = {
    title: "Project stack",
  };
  return (
    <div>
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={statusData}
        options={statusOptions}
      />
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={stackData}
        options={stackOptions}
      />

    </div>
  );
};

export default ProjectPieChart;
