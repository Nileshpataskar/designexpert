import { Button } from "native-base";
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  // Button,
  StyleSheet,
  Dimensions,
} from "react-native";
import Colors from "../utils/Colors";

export default function CustomModal({ isVisible, closeModal }) {
  const [projectName, setProjectName] = useState("");
  const [client, setClient] = useState("");
  const [deadline, setDeadline] = useState("");
  const [amount, setAmount] = useState("");

  const handleSave = () => {
    // Perform save operation here
    console.log("Project Name:", projectName);
    console.log("Client:", client);
    console.log("Deadline:", deadline);
    console.log("Amount:", amount);
    closeModal(); // Close modal after saving
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={closeModal}
      presentationStyle="pageSheet" // Set the presentation style to pageSheet
      statusBarTranslucent={true} // Ensure the status bar is translucent
      hardwareAccelerated={true} // Enable hardware acceleration for smoother animations
      style={styles.modalContainer} // Add custom styles for half-screen appearance
    >
      <View style={styles.container}>
        <Text style={styles.title}>Add Project</Text>

        <TextInput
          style={styles.input}
          placeholder="Project Name"
          value={projectName}
          onChangeText={(text) => setProjectName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Client"
          value={client}
          onChangeText={(text) => setClient(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Deadline"
          value={deadline}
          onChangeText={(text) => setDeadline(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />

        <View style={styles.buttonContainer}>
          <Button
            size="sm"
            colorScheme="secondary"
            onPress={closeModal}
            variant="outline"
          >
            Close
          </Button>
          <Button size="md" colorScheme={Colors.PRIMARY} onPress={handleSave}>
            Save
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff", // Background color
    borderRadius: 10, // Rounded corners
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5, // Rounded corners
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("window").height / 4, // Adjust the marginTop to position the modal in the center of the screen
    marginBottom: Dimensions.get("window").height / 4, // Adjust the marginBottom to position the modal in the center of the screen
  },
});
