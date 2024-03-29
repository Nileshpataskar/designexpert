import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ProjectInfo from "../ProjectDetail/ProjectInfo";
import TaskPieChart from "../ProjectDetail/TaskPieChart";
import { useLocalSearchParams } from "expo-router";
import ShowMilestones from "./ShowMilestones";

export default function Roadmap({ projectData, projectStats }) {
  const { projectId } = useLocalSearchParams();
  const [milestoneData, setMilestoneData] = useState([]);

  useEffect(() => {
    getMilestoneData();
  }, []);

  const getMilestoneData = async () => {
    getRequest(`dc/api/milestones/?project__id=${projectId}`)
      .then((response) => {
        console.log("results:", response.data);

        setMilestoneData(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
  return (
    <View>
      <ProjectInfo projectData={projectData} />

      <View style={{ marginTop: -50, margin: 20 }}>
        <TaskPieChart projectData={projectData} projectStats={projectStats} />
      </View>
      <View>
        {/* <ShowMilestones milestoneData={milestoneData} /> */}
      </View>
    </View>
  );
}
