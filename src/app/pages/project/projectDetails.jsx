import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getRequest } from "../../../utils/fetch";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../utils/Colors";
import TaskPieChart from "../../../components/ProjectDetail/TaskPieChart";
import ProjectInfo from "../../../components/ProjectDetail/ProjectInfo";
export default function ProjectDetails() {
  const { projectId } = useLocalSearchParams();
  const [projectData, setProjectData] = useState([]);
  const [milestoneData, setMilestoneData] = useState([]);
  const [clients, setClients] = useState([]);
  const [projectStats, setProjectStats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("project", projectId);
    getProjectData();
    getMilestoneData();
    getClients();
    getProjectStats();
  }, [projectId]);

  const getProjectData = async () => {
    getRequest(`dc/api/projects/${projectId}`)
      .then((response) => {
        console.log("results:", response.data);

        setProjectData(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
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
  const getClients = () => {
    getRequest(`dc/api/clients/`)
      .then((response) => {
        // console.log('Clients data:', response.data)

        setClients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getProjectStats = () => {
    if (projectId) {
      getRequest(`dc/projects/${projectId}/statistics`)
        .then((response) => {
          console.log("results:", response.data);
          setProjectStats(response.data);
        })
        .catch((err) => {
          console.log("error in stat ", err);
        });
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
        <TouchableOpacity onPress={()=>{router.back()}}>

      <Ionicons name="arrow-back-circle" size={34} color={Colors.PRIMARY} />
        </TouchableOpacity>
      <ProjectInfo projectData={projectData} />
      <TaskPieChart projectData={projectData} />
    </View>
  );
}
