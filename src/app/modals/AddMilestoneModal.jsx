import { Button, HStack, Icon, Input, Select } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from "@expo/vector-icons";
import { getRequest, postRequest } from "../../utils/fetch";
import { useLocalSearchParams } from "expo-router";
import { getCurrentDate } from "../../utils/services";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../../utils/globalStyles";
import Colors from "../../utils/Colors";

export default function AddMilestoneModal({
  isVisible,
  closeModal,
  getMilestones,
}) {
  const { projectId } = useLocalSearchParams();

  const [milestoneName, setMilestoneName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [estimatedAmount, setEstimatedAmount] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Created");

  useEffect(() => {
    console.log("project ID", projectId);
    console.log("gggggg");
  }, []);

  const getMilestone = () => {
    getRequest(`dc/api/projects/${projectIdValue}`)
      .then((response) => {
        console.log("results in project for edit:", response.data);
        setMilestoneName(response.data.name);
        setDeadline(response.data.deadline);
        setEstimatedAmount(response.data.estimatedAmount);
        setDescription(response.data.description);
        setStatus(response.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSave = () => {
    console.log("Project Name:", milestoneName);
    console.log("Deadline:", deadline);
    console.log("estimatedAmount:", estimatedAmount);
    console.log("stataus:", status);

    console.log("project id");
    const requestFunction = postRequest;
    const endpoint = "dc/api/milestones/";

    const requestData = {
      name: milestoneName || "",
      description: description || "",
      amount_quoted: estimatedAmount || 0,
      deadline: deadline || getCurrentDate(),
      status: status,
      project: projectId,
    };

    requestFunction(endpoint, requestData)
      .then((res) => {
        console.log("milestone created", res.data);
        getMilestones();
      })
      .catch((err) => {
        console.log("error", err);
      });

    handleReset();
  };

  const handleReset = () => {
    // Reset all states
    setMilestoneName("");
    setDeadline("");
    setEstimatedAmount("");
    setStatus("New");

    closeModal();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDeadline(date.toISOString().split("T")[0]);
    hideDatePicker();
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={closeModal}
      presentationStyle="pageSheet"
      // statusBarTranslucent={true}
      hardwareAccelerated={true}
      style={styles.modalContainer}
    >
      <ScrollView style={styles.container}>
        <View
          style={{
            gap: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingBottom: 20,
          }}
        >
          <TouchableOpacity onPress={handleReset}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>

          <Text style={{ fontWeight: 600, fontSize: 18 }}>Add Milestone</Text>
        </View>

        <View style={styles.textInputContainer}>
          <AntDesign name="file1" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            variant="underlined"
            placeholder="Milestone Name"
            value={milestoneName}
            onChangeText={(text) => setMilestoneName(text)}
          />
        </View>

        <TouchableOpacity onPress={showDatePicker}>
          <View style={styles.textInputContainer}>
            <FontAwesome
              name="calendar"
              size={24}
              color="black"
              style={styles.icon}
            />
            <TextInput
              placeholder="Deadline"
              value={deadline}
              editable={false}
              style={styles.input}
            />
          </View>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <View style={styles.textInputContainer}>
          <Icon name="dollar" type="FontAwesome" style={styles.icon} />
          <TextInput
            variant="underlined"
            placeholder="Clients Budget"
            value={estimatedAmount}
            onChangeText={(text) => setEstimatedAmount(text)}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        <View style={styles.textInputContainer}>
          <Icon name="dollar" type="FontAwesome" style={styles.icon} />
          <TextInput
            variant="underlined"
            placeholder="Description"
            value={description}
            style={styles.input}
            numberOfLines={3}
            onChangeText={(text) => setDescription(text)}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            height: 40,
          }}
        >
          <View style={{ flex: 1 }}>
            <Select
              placeholder="Select status"
              value={status}
              onValueChange={(itemValue) => setStatus(itemValue)}
              status="primary"
            >
              <Select.Item
                style={{ fontWeight: "bold" }}
                label="Created"
                value="Created"
              />
              <Select.Item
                style={{ fontWeight: "bold" }}
                label="In Progress"
                value="In Progress"
              />
              <Select.Item
                style={{ fontWeight: "bold" }}
                label="Invoice Generated"
                value="Invoice Generated"
              />
              <Select.Item
                style={{ fontWeight: "bold" }}
                label="Completed"
                value="Completed"
              />
            </Select>
          </View>
        </View>

        <HStack space={3}>
          <TouchableOpacity
            size="sm"
            colorScheme="secondary"
            onPress={handleReset}
            variant="outline"
            style={{
              borderWidth: 1,
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            size="sm"
            colorScheme="primary"
            onPress={handleSave}
            variant="solid"
            style={globalStyles.saveButton}
          >
            <Text style={{ color: "white" }}>Save</Text>
          </TouchableOpacity>
        </HStack>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
    fontSize: 20,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("window").height / 4,
    marginBottom: Dimensions.get("window").height / 4,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
});
