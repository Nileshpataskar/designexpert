import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getRequest } from "../../utils/fetch";
import Colors from "../../utils/Colors";
import { useRouter } from "expo-router";
import {
  getProgressBarWidth,
  getStatusColor,
  styles,
} from "./ProjectInfo";
import { dateFormatter } from "../../utils/Styling";

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

  return (
    <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Projects
      </Text>
      <View style={{}}>
        {projects?.map((project, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 15,
              elevation: 2,
              backgroundColor: Colors.PAPER,
              padding: 20,

              borderRadius: 10,
            }}
            onPress={() => {
              handleProjectClicked(project);
            }}
          >
            <View style={{ width: "100%" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 1,maxWidth:'70%' }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginBottom: 5,
                    }}
                  >
                    {project?.name}
                  </Text>

                  <Text style={{ fontSize: 14, color: "gray" }}>
                    {project?.client_name} 
                    {"  "}
                    {dateFormatter(project?.deadline)}
                  </Text>
                </View>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {project?.amount_quoted}
                  </Text>
                  
                </View>
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
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
