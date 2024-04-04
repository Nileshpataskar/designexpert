import { View, Text, Modal, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input, HStack, VStack } from "native-base";

export default function AddItem({
  items,
  setItems,
  setAddItemModalVisible,
  isAddItemModalVisible,
}) {
  const [itemName, setItemName] = useState("");
  const [unit, setUnit] = useState("");
  const [costPerUnit, setCostPerUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [tax, setTax] = useState("");
  const [margin, setMargin] = useState("");
  const [labour, setLabour] = useState("");

  const handleSaveItem = () => {
    const newItem = {
      name: itemName,
      unit,
      costPerUnit,
      quantity,
      tax,
      margin,
      labour,
    };
    setItems([...items, newItem]);
    console.log("New Item:", newItem);

    // Reset input fields
    setItemName("");
    setUnit("");
    setCostPerUnit("");
    setQuantity("");
    setTax("");
    setMargin("");
    setLabour("");

    // Close the popup
    setAddItemModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      visible={isAddItemModalVisible}
      onRequestClose={() => setAddItemModalVisible(false)}
      presentationStyle="pageSheet"
      hardwareAccelerated={true}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {/* Add item form fields */}
            <VStack space={4} alignItems="center">
              <Input
                placeholder="Item Name"
                value={itemName}
                onChangeText={setItemName}
                style={styles.input}
              />
              <Input placeholder="Unit" value={unit} onChangeText={setUnit} />
              <Input
                placeholder="Cost Per Unit"
                value={costPerUnit}
                onChangeText={setCostPerUnit}
              />
              <Input
                placeholder="Quantity"
                value={quantity}
                onChangeText={setQuantity}
              />

              <Input
                placeholder="Tax"
                value={tax}
                onChangeText={setTax}
                style={styles.input}
              />
              <Input
                placeholder="Margin"
                value={margin}
                onChangeText={setMargin}
                style={styles.input}
              />
              <Input
                placeholder="Labour"
                value={labour}
                onChangeText={setLabour}
                style={styles.input}
              />
            </VStack>

            {/* Buttons to save or cancel adding item */}
            <HStack space={4} alignItems="center">
              <Button onPress={handleSaveItem} style={styles.button}>
                <Text>Save Item</Text>
              </Button>
              <Button
                onPress={() => setAddItemModalVisible(false)}
                style={styles.button}
              >
                <Text>Cancel</Text>
              </Button>
            </HStack>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
// Adjusted styles for AddItem component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    padding: 20,
  },
  input: {
    width: "100%", // Full width
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  smallInput: {
    width: "45%", // Adjust width as per your preference
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 15,
  },
});
