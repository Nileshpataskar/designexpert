import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { getRequest, postRequest } from "../../utils/fetch";
import {
  Input,
  Switch,
  Select,
  Button,
  Text,
  Box,
  Header,
  Left,
  Body,
  Right,
  Title,
  Spinner,
  Divider,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import AddItem from "./AddItem";
import Colors from "../../utils/Colors";
import { AntDesign } from "@expo/vector-icons";
import { getCurrentDate } from "../../utils/services";

export default function AddInvoiceModal({ isVisible, closeModal, getInvoice }) {
  const [company, setCompany] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState(null);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isGstEnabled, setIsGstEnabled] = useState(false);
  const [invoiceName, setInvoiceName] = useState(null);
  const [poNum, setPoNum] = useState("");
  const [items, setItems] = useState([]);
  const [invNumberParam, setInvNumberParam] = useState(null);
  const [isAddItemModalVisible, setAddItemModalVisible] = useState(false);

  const [date, setDate] = useState(getCurrentDate());
  const [deadline, setDeadline] = useState(getCurrentDate());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [invLoading, setInvLoading] = useState(false);

  useEffect(() => {
    getCompany();
    getClients();
    getInvoiceNumber();
  }, [isVisible]);

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
  }, []);
  useEffect(() => {
    getInvoiceNumber();
  }, [company]);

  useEffect(() => {
    console.log("isGstEnabled", isGstEnabled);
    console.log("invNumberParam", invNumberParam);

    setInvNumberParam(!isGstEnabled ? "1" : "0");
    getInvoiceNumber();
  }, [isGstEnabled, isVisible]);

  const getInvoiceNumber = () => {
    if (company) {
      setInvLoading(true);

      let companyID = company.id;
      console.log("company id", companyID);
      getRequest(`dc/accounting/invnumber/${companyID}/${invNumberParam}`)
        .then((response) => {
          console.log("response in invinvNumberParam ", invNumberParam);
          console.log("response in inv ", response.data);
          setInvoiceNumber(Object.values(response.data)[0]);
          setInvLoading(false);
        })
        .catch((err) => {
          console.log("errresponse", err);
          setInvLoading(false);
        });
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
    if (!invoiceName) {
      ToastAndroid.showWithGravity(
        "Please enter Invoice Name",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    }
    if (!selectedClient) {
      ToastAndroid.showWithGravity(
        "Please Select a client",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    }
    if (items.length === 0) {
      ToastAndroid.showWithGravity(
        "Please Add some Itens",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    }

    const requestData = {
      invoice_number: invoiceNumber,
      finalAmount: finalTotal,
      tax: totalTax,
      name: invoiceName,
      gst_bill: isGstEnabled,
      client: selectedClient,
      date,
      due_date: deadline,
      company: company.id,
      total: finalTotal,
      data: {
        items: items,
      },
    };

    console.log("RequestDataaaaaa", requestData);
    postRequest(`dc/api/invoices/`, requestData)
      .then((res) => {
        console.log("Succesfully saved invoice");
        getInvoice();
        handleReset();
      })
      .catch((err) => {
        console.log("Error in saving invoice", err);
        handleReset();
      });
  };

  const handleReset = () => {
    setCompany(null);
    setInvoiceNumber(null);
    setClients([]);
    setSelectedClient(null);
    setIsGstEnabled(false);
    setInvoiceName(null);
    setPoNum("");
    setItems([]);
    setInvNumberParam(null);
    setAddItemModalVisible(false);
    setInvLoading(false);
    setDeadline(getCurrentDate());
    setDate(getCurrentDate());
    setDatePickerVisibility(false);
    closeModal();
  };
  const handleAddItem = () => {
    setAddItemModalVisible(true);
  };

  const handleToggleSwitch = () => {
    setIsGstEnabled(!isGstEnabled);
  };

  // Calculate finalAmount amount for all items
  const finalTotal = items.reduce(
    (acc, item) =>
      acc +
      item.costperunit * item.quantity +
      item.margin +
      item.tax +
      item.laborCharge,
    0
  );

  // Calculate finalAmount tax for all items
  const totalTax = items.reduce((acc, item) => acc + item.tax, 0);

  // Calculate finalAmount margin for all items
  const totalMargin = items.reduce((acc, item) => acc + item.margin, 0);

  // Calculate final finalAmount (quantity * cost per unit) for all items
  const totalAmount = items.reduce(
    (acc, item) => acc + item.costperunit * item.quantity,
    0
  );

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
  const handleConfirmDate = (date) => {
    setDate(date.toISOString().split("T")[0]);
    hideDatePicker();
  };
  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={handleReset}
      presentationStyle="pageSheet"
      hardwareAccelerated={true}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 10,
            gap: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <TouchableOpacity onPress={handleReset}>
            <Ionicons
              name="arrow-back-circle"
              size={34}
              color={Colors.PRIMARY}
            />
          </TouchableOpacity>

          <Text style={{ fontWeight: 600, fontSize: 18 }}>Invoice</Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1, paddingBottom: 80 }}>
            <ScrollView style={{ flex: 1, padding: 20 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontFamily: "syne-b",
                    fontSize: 14,
                  }}
                >
                  Invoice No :{" "}
                  {invLoading ? (
                    <>
                      <Spinner color="blue" />
                    </>
                  ) : (
                    <>{invoiceNumber}</>
                  )}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 16 }}>GST:</Text>
                  <Switch
                    size="sm"
                    value={isGstEnabled}
                    onValueChange={handleToggleSwitch}
                  />
                </View>
              </View>
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
                  status="primary"
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
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <TouchableOpacity onPress={showDatePicker}>
                    <View style={styles.textInputContainer}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <FontAwesome
                          name="calendar"
                          size={18}
                          color="black"
                          style={{ marginRight: 8 }}
                        />
                        <Text>Date</Text>
                      </View>
                      <TextInput
                        placeholder="Date"
                        value={deadline}
                        editable={false}
                        style={styles.input}
                      />
                    </View>
                  </TouchableOpacity>

                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmDate}
                    onCancel={hideDatePicker}
                  />
                </Box>
                <Box>
                  <TouchableOpacity onPress={showDatePicker}>
                    <View style={styles.textInputContainer}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <FontAwesome
                          name="calendar"
                          size={18}
                          color="black"
                          style={{ marginRight: 8 }}
                        />
                        <Text>Deadline</Text>
                      </View>
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
                </Box>
              </View>

              {/* po Number */}
              {/* <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Input
                  variant="underlined"
                  size="md"
                  style={{ flex: 1 }}
                  placeholder="PO Number"
                  value={poNum}
                  keyboardType="numeric"
                  onChangeText={setPoNum}
                />
              </View> */}

              {/* Display items as cards */}
              <ScrollView style={styles.cardContainer}>
                {items.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: Colors.PAPER,
                      padding: 15,
                      marginBottom: 10,
                      borderRadius: 8,
                      borderBottomColor: Colors.GRAY,
                      borderBottomWidth: 1,
                    }}
                  >
                    <Text style={styles.cardText}>{`${item.name}`}</Text>
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{ fontSize: 14 }}
                      >{`${item.quantity} ${item.unit} @ ${item.costperunit} / ${item.unit} `}</Text>
                      <Text style={{ fontSize: 14 }}>{`Total: ${
                        item.quantity * item.costperunit
                      } `}</Text>
                    </Box>
                  </View>
                ))}
              </ScrollView>

              <TouchableOpacity
                onPress={handleAddItem}
                style={styles.addButton}
              >
                <Text style={styles.addButtonText}>Add Item</Text>
              </TouchableOpacity>
            </ScrollView>
          </ScrollView>
        </ScrollView>
        <View style={styles.fixedCard}>
          <View style={styles.fixedCardContent}>
            <Text style={styles.fixedCardText}>Total: {totalAmount}</Text>
            <Text style={styles.fixedCardText}>Tax: {totalTax}</Text>
            <Text style={styles.fixedCardText}>Margin: {totalMargin}</Text>
            <Divider style={styles.divider} />
            <Text style={styles.fixedCardText}>Final Total: {finalTotal}</Text>

            {/* Buttons to cancel and save */}

            <View style={{ flexDirection: "row" }}>
              <Button
                onPress={handleReset}
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
        isGstEnabled={isGstEnabled}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  fixedCard: {
    backgroundColor: Colors.PAPER,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 4,
    borderTopColor: Colors.BACKGROUND,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "black",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  fixedCardContent: {
    flex: 1,
  },

  fixedCardText: {
    fontSize: 16,
    marginBottom: 8,
    color: Colors.TEXT_PRIMARY,
    fontFamily: "Roboto", // Change font family if needed
  },

  divider: {
    height: 1,
    backgroundColor: Colors.GRAY,
    alignSelf: "stretch",
    marginBottom: 5,
  },

  addButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 8,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    marginVertical: 20,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
  cardContainer: {
    marginTop: 10,
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
