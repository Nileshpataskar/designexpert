import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { getRequest } from "../../utils/fetch";
import Colors from "../../utils/Colors";
import { Box, Button } from "native-base";
import AddMilestoneModal from "../../app/modals/AddMilestoneModal";
export default function ShowMilestoneList() {
  const { projectId } = useLocalSearchParams();
  const [milestoneData, setMilestoneData] = useState([]);

  useEffect(() => {
    getMilestones();
  }, []);

  const getMilestones = () => {
    getRequest(`dc/api/milestones/?project__id=${projectId}`)
      .then((response) => {
        setMilestoneData(response.data);
      })
      .catch((err) => {
        console.log("error while file Milestone file");
      });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    console.log("hi");
    setIsModalVisible(!isModalVisible); // Toggle modal visibility
  };
  return (
    <ScrollView>
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
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Milestones</Text>
        <Button
          size={"sm"}
          variant={"solid"}
          colorScheme={"coolGray"}
          onPress={toggleModal}
        >
          Add Milestone
        </Button>
      </Box>
      <ScrollView style={{ maxHeight: 300 }}>
        {milestoneData?.map((data, index) => (
          <View
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
          >
            <ScrollView style={{ width: "100%" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 1, maxWidth: "70%" }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginBottom: 5,
                    }}
                  >
                    Milestone Name: {data?.name}
                  </Text>

                  <Text style={{ fontSize: 14, color: "gray" }}>
                    Deadline: {data?.deadline}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        ))}
      </ScrollView>
      <AddMilestoneModal
        isVisible={isModalVisible}
        closeModal={toggleModal}
        getMilestones={getMilestones}
      />
    </ScrollView>
  );
}
