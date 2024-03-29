import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getRequest } from "../../../utils/fetch";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../utils/Colors";
import TaskPieChart from "../../../components/ProjectDetail/TaskPieChart";
import ProjectInfo from "../../../components/ProjectDetail/ProjectInfo";
import ScrollableHeader from "../../../components/ProjectDetail/ScrollableHeader";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ProjectDetails() {
  const { projectId } = useLocalSearchParams();
  const [projectData, setProjectData] = useState([]);
  const [clients, setClients] = useState([]);
  const [projectStats, setProjectStats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProjectData();
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
 
  const getClients = () => {
    getRequest(`dc/api/clients/`)
      .then((response) => {
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
    <SafeAreaView>
      <View>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
          style={{ paddingLeft: 10 }}
        >
          <Ionicons name="arrow-back-circle" size={34} color={Colors.PRIMARY} />
        </TouchableOpacity>

        <View>
          <ScrollableHeader
            projectData={projectData}
            projectStats={projectStats}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
