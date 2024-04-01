import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getRequest } from "../../utils/fetch";
import Colors from "../../utils/Colors";

export const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return Colors.SUCCESS;
    case "In Progress":
      return Colors.WARNING;
    case "New":
      return Colors.INFO;
    default:
      return Colors.PRIMARY;
  }
};

export const getProgressBarWidth = (status) => {
  switch (status) {
    case "Completed":
      return "100%";
    case "In Progress":
      return "65%";
    case "New":
      return "30%";
    default:
      return "0%";
  }
};

export default function ProjectInfo({ projectData }) {
  const clientId = projectData.client;
  const [client, setClient] = useState([]);
  useEffect(() => {
    getClient();
  }, [clientId]);
  const getClient = () => {
    getRequest(`dc/api/clients/${clientId}`)
      .then((response) => {
        setClient(response.data);
      })
      .catch((err) => {
        console.log("Error getting client");
      });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>{projectData.name}</Text>
        <Text style={styles.client}>{client.name}</Text>
      </View>
      {projectData.description && (
        <Text style={styles.description}>{projectData.description}</Text>
      )}
      {projectData.budget && (
        <Text style={styles.budget}>Budget: {projectData.budget}</Text>
      )}
      <View style={styles.progressBarMainContainer2}>
        <View
          style={[
            styles.progressBarSubContainer,
            { width: getProgressBarWidth(projectData.status) },
            { backgroundColor: getStatusColor(projectData.status) },
          ]}
        ></View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  progressBarMainContainer2: {
    width: "100%",
    height: 15,
    borderRadius: 99,
    marginTop: 10,
    backgroundColor: "#b7b7b7",
    marginBottom: 40,
  },
  progressBarMainContainer: {
    width: "100%",
    height: 15,
    borderRadius: 99,
    marginTop: 10,
    backgroundColor: "#b7b7b7",
  },
  progressBarSubContainer: {
    width: "40%",
    height: 15,
    borderRadius: 99,
  },
  container: {
    padding: 20,
    backgroundColor: Colors.PRIMARY,
     borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontFamily: "syne-b",
    color: "white",
    fontSize: 20,
    width:'70%',
    marginBottom: 10,
  },
  description: {
    color: Colors.SUBTITLE,
    fontSize: 16,
    width: "60%",
    fontFamily: "syne-m",
    marginBottom: 10,
  },
  budget: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  client: {
    color: "white",
    fontFamily: "syne-m",
    fontSize: 16,
    marginBottom: 10,
  },
});
