import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid } from "react-native";
import Colors from "../../utils/Colors";
import { patchRequest } from "../../utils/fetch";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Settings({ projectData, settings }) {
  const { projectId } = useLocalSearchParams();
  const router = useRouter();
  const handleDeactive = () => {
    patchRequest(`dc/api/projects/${projectId}/`, {
      active: false,
      client_dashboard_access: false,
      share_milestones_with_client: false,
    })
      .then((response) => {
        console.log("Suuceful deactivate", response.data);
        ToastAndroid.showWithGravity(
          "Successfully Deleted!",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        router.push("/");
      })
      .catch((error) => {
        console.log("Error whhile deactivate", error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Deactivate Project</Text>
        <Text style={styles.description}>
          The project will be deactivated. This action is irreversible and
          cannot be undone.
        </Text>
        <View style={styles.divider} />
        <Text style={styles.body}>Project Name: {projectData?.name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleDeactive()}
        style={[styles.deactivateButton]}
      >
        <Text style={styles.buttonText}>Deactivate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  card: {
    backgroundColor: "#F8F8F8",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: "#999",
    marginVertical: 8,
  },
  body: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 4,
  },
  deactivateButton: {
    backgroundColor: Colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
