import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getRequest } from "../../utils/fetch";
import { Input, Switch, Select, Button, Text, Box } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import AddItem from "./AddItem";
import Colors from "../../utils/Colors";

export default function AddInvoiceModal({ isVisible, closeModal }) {
  const [company, setCompany] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState(null);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [date, setDate] = useState(new Date());
  const [deadline, setDeadline] = useState(new Date());
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [showDeadlinepicker, setShowDeadlinepicker] = useState(false);
  const [isGstEnabled, setIsGstEnabled] = useState(false);
  const [invoiceName, setInvoiceName] = useState("");
  const [items, setItems] = useState([]);
  const invNumberParam = "0";
  const [isAddItemModalVisible, setAddItemModalVisible] = useState(false);

  useEffect(() => {
    getCompany();
    getClients();
  }, []);

  const getCompany = () => {
    getRequest(`dc/api/company/`)
      .then((res) => {
        setCompany(res.data[0]);
      })
      .catch((err) => {
        console.log("Error in company,", err);
      });
  };

  useEffect(() => {
    getInvoiceNumber();
  }, [company]);

  const getInvoiceNumber = () => {
    if (company) {
      let companyID = company.id;
      getRequest(`dc/accounting/invnumber/${companyID}/${invNumberParam}`).then(
        (response) => {
          setInvoiceNumber(Object.values(response.data)[0]);
        }
      );
    }
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
    console.log("Invoice saved!");
    console.log("Name:", invoiceName);
    console.log("Client:", selectedClient);
    console.log("Date:", date);
    console.log("Deadline:", deadline);
    console.log("GST Enabled:", isGstEnabled);
    console.log("Items:", items);
    closeModal();
  };

  const handleAddItem = () => {
    setAddItemModalVisible(true);
  };

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={closeModal}
      presentationStyle="pageSheet"
      hardwareAccelerated={true}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, padding: 20 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontFamily: "syne-b",
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              Invoice No.: {invoiceNumber}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Input
                variant="underlined"
                size="md"
                style={{ flex: 1 }}
                placeholder="Invoice Name"
                value={invoiceName}
                onChangeText={setInvoiceName}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Select
                placeholder="Select client"
                value={selectedClient}
                onValueChange={(itemValue) => setSelectedClient(itemValue)}
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 16 }}>Date:</Text>
              <Text style={{ fontSize: 16 }}>{date.toDateString()}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 16 }}>Deadline:</Text>
              <Text style={{ fontSize: 16 }}>{deadline.toDateString()}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 16 }}>GST:</Text>
              <Switch
                size="sm"
                value={isGstEnabled}
                onValueChange={(value) => setIsGstEnabled(value)}
              />
            </View>

            {/* Button to add item */}

            {/* Display items as cards */}
            <ScrollView style={styles.cardContainer}>
              {items.map((item, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.cardText}>{`Name: ${item.name}`}</Text>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={styles.cardText}
                    >{`Cost Per Unit: ${item.costPerUnit}`}</Text>
                    <Text
                      style={styles.cardText}
                    >{`Quantity: ${item.quantity} ${item.unit}`}</Text>
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.cardText}>{`Tax: ${item.tax}`}</Text>
                    <Text
                      style={styles.cardText}
                    >{`Margin: ${item.margin}`}</Text>
                    <Text
                      style={styles.cardText}
                    >{`Labour: ${item.labour}`}</Text>
                  </Box>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Item</Text>
            </TouchableOpacity>

            {/* Buttons to cancel and save */}
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Button
                onPress={closeModal}
                style={styles.cancelButton}
                size={"sm"}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Button>
              <Button
                onPress={handleSave}
                style={styles.saveButton}
                size={"sm"}
              >
                <Text style={styles.buttonText}>Save</Text>
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView>

      {/* Add Item Modal */}
      <AddItem
        items={items}
        setItems={setItems}
        setAddItemModalVisible={setAddItemModalVisible}
        isAddItemModalVisible={isAddItemModalVisible}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginVertical: 20,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  cardContainer: {
    marginTop: 10,
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cancelButton: {
    backgroundColor: "gray",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
