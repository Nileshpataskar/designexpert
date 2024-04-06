import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, HStack } from "native-base";
import Colors from "../../utils/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";

// Predefined units
const PredefinedUnits = [
  { label: "Square Feet (sq ft)", value: "sqft" },
  { label: "Square Meters (sq m)", value: "sqm" },
  { label: "Centimeters (cm)", value: "cm" },
  { label: "Meters (m)", value: "m" },
  { label: "Inches (in)", value: "in" },
  { label: "Feet (ft)", value: "ft" },
  { label: "Millimeters (mm)", value: "mm" },
  { label: "Numbers (nos)", value: "nos" },
  { label: "Bags (bg)", value: "bg" },
];

export default function AddItem({
  items,
  setItems,
  setAddItemModalVisible,
  isAddItemModalVisible,
  isGstEnabled,
}) {
  const [itemName, setItemName] = useState("");
  const [unit, setUnit] = useState("");
  const [costperunit, setCostPerUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [tax, setTax] = useState("");
  const [hsnSac, setHsnSac] = useState("");
  const [margin, setMargin] = useState("");
  const [laborCharge, setLabour] = useState("");
  const [isTaxInputVisible, setIsTaxInputVisible] = useState(false);
  const [isMarginInputVisible, setIsMarginInputVisible] = useState(false);
  const [isLabourInputVisible, setIsLabourInputVisible] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const handleSaveItem = () => {
    if (!itemName) {
      ToastAndroid.showWithGravity(
        "Please Enter Item Name",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    }
    if (!unit) {
      ToastAndroid.showWithGravity(
        "Please Enter unit ",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    }
    if (costperunit === "") {
      ToastAndroid.showWithGravity(
        "Please check if you have entered Cost per unit  ",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    }
    if (quantity === "") {
      ToastAndroid.showWithGravity(
        "Please check if you have entered quantity ",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    }

    const newItem = {
      name: itemName,
      unit,
      costperunit,
      quantity,
      tax,
      margin,
      laborCharge,
      hsnSac,
    };
    setItems([...items, newItem]);
    closeModal();
  };

  const closeModal = () => {
    // Reset all state variables
    setItemName("");
    setUnit("");
    setCostPerUnit("");
    setSelectedUnit(null);
    setQuantity("");
    setTax("");
    setMargin("");
    setLabour("");
    setHsnSac("");
    setIsTaxInputVisible(false);
    setIsMarginInputVisible(false);
    setIsLabourInputVisible(false);
    setAddItemModalVisible(false);
  };

  // Calculate finalAmount
  const finalAmount = costperunit * quantity + margin + tax + laborCharge;

  return (
    <Modal
      animationType="slide"
      visible={isAddItemModalVisible}
      onRequestClose={() => setAddItemModalVisible(false)}
      presentationStyle="pageSheet"
      hardwareAccelerated={true}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={closeModal}>
            <Ionicons
              name="arrow-back-circle"
              size={34}
              color={Colors.PRIMARY}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Add Item</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <Text style={styles.header}>Add Item</Text>
            <View style={styles.form}>
              <HStack space={3} alignItems="center">
                <View style={[styles.inputContainer, { flex: 2 }]}>
                  <FontAwesome
                    name="info"
                    size={24}
                    color="black"
                    style={styles.icon}
                  />
                  <TextInput
                    placeholder="Item Name"
                    value={itemName}
                    onChangeText={setItemName}
                    style={styles.input}
                  />
                </View>
                {isGstEnabled && (
                  <View style={styles.inputContainer}>
                    <FontAwesome
                      name="info"
                      size={14}
                      color="black"
                      style={styles.icon}
                    />
                    <TextInput
                      placeholder="HSN/SAC"
                      value={hsnSac}
                      onChangeText={setHsnSac}
                      style={styles.input}
                    />
                  </View>
                )}
              </HStack>
              <HStack space={3} alignItems="center">
                <View
                  style={[styles.inputContainer, { borderWidth: 0, flex: 1.2 }]}
                >
                  <RNPickerSelect
                    placeholder={{
                      label: "Select Unit",
                      value: null,
                    }}
                    items={PredefinedUnits}
                    onValueChange={(value) => {
                      setSelectedUnit(value); // Update selected unit
                      setUnit(value); // Update the unit state as well
                    }}
                    style={{
                      inputIOS: styles.pickerInput,
                      inputAndroid: styles.pickerInput,
                      iconContainer: styles.pickerIconContainer,
                    }}
                    value={selectedUnit} // Set the selected value
                    useNativeAndroidPickerStyle={false} // Needed for custom styles in Android
                    Icon={() => {
                      return <FontAwesome name="angle-down" size={24} />;
                    }}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Cost Per Unit"
                    value={costperunit.toString()}
                    onChangeText={(text) =>
                      setCostPerUnit(parseFloat(text) || 0)
                    }
                    keyboardType="numeric"
                    style={styles.input}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Quantity"
                    value={quantity.toString()}
                    onChangeText={(text) => setQuantity(parseFloat(text) || 0)}
                    style={styles.input}
                    keyboardType="numeric"
                  />
                </View>
              </HStack>
              <TouchableOpacity
                style={[
                  styles.clickableInputContainer,
                  isTaxInputVisible && styles.inputVisible,
                ]}
                onPress={() => setIsTaxInputVisible(!isTaxInputVisible)}
              >
                <Text style={styles.placeholderText}>
                  {isTaxInputVisible ? "Tax" : "+Tax"}
                </Text>
                {isTaxInputVisible && (
                  <TextInput
                    placeholder="Tax"
                    value={tax.toString()}
                    onChangeText={(text) => setTax(parseFloat(text) || 0)}
                    onKeyPress={(e) => {
                      if (e.nativeEvent.key === "Backspace" && tax === 0) {
                        setIsTaxInputVisible(false);
                      }
                    }}
                    keyboardType="numeric"
                    style={styles.clickableSubInput}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.clickableInputContainer,
                  isMarginInputVisible && styles.inputVisible,
                ]}
                onPress={() => setIsMarginInputVisible(!isMarginInputVisible)}
              >
                <Text style={styles.placeholderText}>
                  {isMarginInputVisible ? "Margin" : "+Margin"}
                </Text>
                {isMarginInputVisible && (
                  <TextInput
                    placeholder="Margin"
                    value={margin.toString()}
                    onChangeText={(text) => setMargin(parseFloat(text) || 0)}
                    onKeyPress={(e) => {
                      if (e.nativeEvent.key === "Backspace" && margin === 0) {
                        setIsMarginInputVisible(false);
                      }
                    }}
                    keyboardType="numeric"
                    style={styles.clickableSubInput}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.clickableInputContainer,
                  isLabourInputVisible && styles.inputVisible,
                ]}
                onPress={() => setIsLabourInputVisible(!isLabourInputVisible)}
              >
                <Text style={styles.placeholderText}>
                  {isLabourInputVisible ? "Labour" : "+Labour"}
                </Text>
                {isLabourInputVisible && (
                  <TextInput
                    placeholder="Labour"
                    value={laborCharge.toString()}
                    onChangeText={(text) => setLabour(parseFloat(text) || 0)}
                    onKeyPress={(e) => {
                      if (
                        e.nativeEvent.key === "Backspace" &&
                        laborCharge === 0
                      ) {
                        setIsLabourInputVisible(false);
                      }
                    }}
                    keyboardType="numeric"
                    style={styles.clickableSubInput}
                  />
                )}
              </TouchableOpacity>
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: {finalAmount}</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={closeModal}
                style={[styles.button, styles.cancelButton]}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSaveItem}
                style={[styles.button, styles.saveButton]}
              >
                <Text style={styles.buttonText}>Add Item</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerText: {
    fontWeight: "600",
    fontSize: 18,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 6,
  },
  clickableSubInput: {
    flex: 1,
    borderRadius: 6,
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
  },
  clickableInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderColor: Colors.GRAY,
    borderRadius: 6,
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  subInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: Colors.GRAY,
  },
  placeholderText: {
    color: "#ccc",
    marginLeft: 10,
  },
  totalContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
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
  cancelButton: {
    borderWidth: 1,
  },
  buttonText: {
    color: Colors.WHITE,
    fontFamily: "outfit-bold",
  },

  pickerInput: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 6,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  pickerIconContainer: {
    top: 10,
    right: 12,
  },
});
