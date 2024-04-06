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
import Colors from "../utils/Colors";
import { getRequest, postRequest } from "../utils/fetch";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from "@expo/vector-icons";
import { getCurrentDate } from "../utils/services";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../utils/globalStyles";

export default function AddProjectModal({
  isVisible,
  closeModal,
  projectIdValue,
  getProjects,
}) {
  const [projectName, setProjectName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [status, setStatus] = useState("New");

  useEffect(() => {
    getClients();
    if (projectIdValue) {
      getProject();
    }
  }, [projectIdValue]);

  const getProject = () => {
    getRequest(`dc/api/projects/${projectIdValue}`)
      .then((response) => {
        console.log("results in project for edit:", response.data);
        setProjectName(response.data.name);
        setDeadline(response.data.deadline);
        setAmount(response.data.amount);
        setDescription(response.data.description);
        setStatus(response.data.status);
        setSelectedClient(response.data.client);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getClients = () => {
    getRequest(`dc/api/clients/`)
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => {
        console.log("Error in user profile", err);
      });
  };

  const handleSave = () => {
    console.log("Project Name:", projectName);
    console.log("Client:", selectedClient);
    console.log("Deadline:", deadline);
    console.log("Amount:", amount);
    console.log("Status:", status);

    const requestData = {
      name: projectName || "",
      description: description || "",
      amount_quoted: amount || 0,
      client: selectedClient,
      deadline: deadline || getCurrentDate(),
      status: status,
    };

    const endpoint = projectIdValue
      ? `dc/api/projects/${projectIdValue}`
      : "dc/api/projects/";

    postRequest(endpoint, requestData)
      .then((res) => {
        console.log("Project saved/updated:", res.data);
        handleReset();
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const handleReset = () => {
    setProjectName("");
    setDeadline("");
    setAmount("");
    setDescription("");
    setSelectedClient(null);
    setStatus("New");
    getProjects();
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
          <FontAwesome
            name="file-text-o"
            size={24}
            color="black"
            style={styles.icon}
          />
          <TextInput
            placeholder="Project Name"
            value={projectName}
            onChangeText={(text) => setProjectName(text)}
            style={styles.input}
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <View style={{ flex: 1 }}>
            <Select
              placeholder="Select Client"
              value={selectedClient}
              onValueChange={(itemValue) => setSelectedClient(itemValue)}
              style={styles.input}
            >
              {clients.map((client, index) => (
                <Select.Item
                  key={index}
                  label={client.name}
                  value={client.id}
                />
              ))}
            </Select>
          </View>
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
          <FontAwesome
            name="dollar"
            size={24}
            color="black"
            style={styles.icon}
          />
          <TextInput
            placeholder="Client's Budget"
            value={amount}
            onChangeText={(text) => setAmount(text)}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        <View style={styles.textInputContainer}>
          <FontAwesome
            name="info"
            size={24}
            color="black"
            style={styles.icon}
          />
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
            style={styles.input}
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <View style={{ flex: 1 }}>
            <Select
              placeholder="Select Status"
              value={status}
              onValueChange={(itemValue) => setStatus(itemValue)}
              style={styles.input}
            >
              <Select.Item label="New" value="New" />
              <Select.Item label="In Progress" value="In Progress" />
              <Select.Item label="Completed" value="Completed" />
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
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
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
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: Colors.PRIMARY,
  },
  buttonText: {
    color: Colors.WHITE,
    fontFamily: "outfit-bold",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("window").height / 4,
    marginBottom: Dimensions.get("window").height / 4,
  },
});
