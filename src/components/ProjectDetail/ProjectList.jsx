import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getRequest } from "../../utils/fetch";
import Colors from "../../utils/Colors";
import { useRouter } from "expo-router";
import { getProgressBarWidth, getStatusColor, styles } from "./ProjectInfo";
import { dateFormatter } from "../../utils/Styling";
import { SafeAreaView } from "react-native-safe-area-context";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Box, Button } from "native-base";
import AddProjectModal from "../../app/addProjectModal";
import AddCompanyModal from "../../app/modals/AddCompanyModal";

export const styles2 = StyleSheet.create({
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
    padding: 13,
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

export default function ProjectList({ projects, getProjects }) {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCompanyModalVisible, setIsCompanyModalVisible] = useState(false);
  const [company, setCompany] = useState(null);

  
  useEffect(() => {
    console.log("ppp")
    getCompany();
  }, []);

  const getCompany = () => {
    getRequest("dc/api/company/")
      .then((res) => {
        console.log("Company successfully loaded", res.data);
        setCompany(res.data);
      })
      .catch((err) => {
        console.log("Company failed");
      });
  };

  const toggleModal = () => {
    console.log("hi");
    if (company.length > 0) {
      setIsModalVisible(!isModalVisible); // Toggle modal visibility
    } else {
      ToastAndroid.showWithGravity(
        "Please Enter Firm Details Before Proceeding!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );

      router.replace("/(tabs)/profile/");
    }
  };
  const toggleCompanyModal = () => {
    console.log("hi");
    setIsCompanyModalVisible(!isCompanyModalVisible); // Toggle modal visibility
  };
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
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Projects</Text>

          <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
            <Button
              size={"sm"}
              variant={"solid"}
              colorScheme={"coolGray"}
              onPress={toggleModal}
            >
              Add Project
            </Button>
          </View>
        </Box>

        {projects?.length > 0 ? (
          projects?.map((project, index) => (
            <TouchableOpacity
              key={index}
              style={styles2.projectCard}
              onPress={() => handleProjectClicked(project)}
            >
              <View style={styles2.projectInfo}>
                <View
                  style={{
                    backgroundColor: Colors.SUCCESS,
                    width: 60,
                    height: 50,
                    marginRight: 15,
                    borderRadius: 4,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: Colors.WHITE }}>
                    {dateFormatter(project?.deadline).day}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: Colors.WHITE }}>
                      {dateFormatter(project?.deadline).month} -
                    </Text>
                    <Text style={{ color: Colors.WHITE }}>
                      {dateFormatter(project?.deadline).year}
                    </Text>
                  </View>
                </View>
                <View style={styles2.projectDetails}>
                  <Text style={styles2.projectName}>{project?.name}</Text>
                  <Text style={styles2.projectClient}>
                    {project?.client_name}
                  </Text>
                  <Text>{project?.amount_quoted}</Text>
                </View>
                <View style={styles2.amountQuoted}>
                  <SimpleLineIcons
                    name="options-vertical"
                    size={20}
                    color="black"
                  />
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
            </TouchableOpacity>
          ))
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                marginVertical: 70,
                fontSize: 20,
                fontWeight: "bold",
                color: Colors.PRIMARY,
              }}
            >
              No Projects Yet!!!
            </Text>
          </View>
        )}
      </View>

      <AddProjectModal
        isVisible={isModalVisible}
        closeModal={toggleModal}
        getProjects={getProjects}
      />
      <AddCompanyModal
        isVisible={isCompanyModalVisible}
        closeModal={toggleCompanyModal}
      />
    </SafeAreaView>
  );
}
