import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getRequest } from "../../utils/fetch";
import Colors from "../../utils/Colors";
import { useRouter } from "expo-router";
import { getProgressBarWidth, getStatusColor, styles } from "./ProjectInfo";
import { dateFormatter } from "../../utils/Styling";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProjectList({ projects }) {
  const router = useRouter();
  useEffect(() => {}, []);

  const handleProjectClicked = (project) => {
    router.push({
      pathname: "/pages/project/projectDetails",
      params: {
        projectId: project.id,
      },
    });
  };

  if (!router) {
    // Return a loading state or null
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles2.container}>
        <Text style={styles2.title}>Projects</Text>
        {projects?.map((project, index) => (
          <TouchableOpacity
            key={index}
            style={styles2.projectCard}
            onPress={() => handleProjectClicked(project)}
          >
            <View style={styles2.projectInfo}>
              <View style={styles2.projectDetails}>
                <Text style={styles2.projectName}>{project?.name}</Text>
                <Text style={styles2.projectClient}>
                  {project?.client_name} | {dateFormatter(project?.deadline)}
                </Text>
              </View>
              <Text style={styles2.amountQuoted}>{project?.amount_quoted}</Text>
            </View>
            <View style={styles.progressBarMainContainer}>
              <View
                style={[
                  styles.progressBarSubContainer,
                  { width: getProgressBarWidth(project.status) },
                  { backgroundColor: getStatusColor(project.status) },
                ]}
              ></View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles2 = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  projectCard: {
    backgroundColor: Colors.PAPER,
    borderRadius: 10,
    marginBottom: 15,
    padding: 20,
    elevation: 2,
  },
  projectInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectDetails: {
    flex: 1,
    maxWidth: "70%",
  },
  projectName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  projectClient: {
    fontSize: 14,
    color: "gray",
  },
  amountQuoted: {
    fontSize: 16,
    fontWeight: "bold",
  },
  progressBarContainer: {
    marginTop: 10,
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  progressBar: {
    height: "100%",
    borderRadius: 5,
  },
});
