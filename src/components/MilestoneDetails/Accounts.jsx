import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Box, Text, VStack, HStack, Heading, Divider } from "native-base";
import { getRequest } from "../../utils/fetch";
import { useLocalSearchParams } from "expo-router";
import Colors from "../../utils/Colors";
import AddInvoiceModal from "../../app/modals/AddInvoiceModal";
import { styles2 } from "../ProjectDetail/ProjectList";
import { dateFormatter } from "../../utils/Styling";

export default function Accounts() {
  const { projectId } = useLocalSearchParams();
  const [accountStats, setAccountStats] = useState();
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    console.log("projectId", projectId);
    getAccountStats();
    getInvoice();
  }, []);

  const getInvoice = () => {
    getRequest(`dc/api/invoices/?project=${projectId}`)
      .then((res) => {
        setInvoices(res.data);
      })
      .catch((err) => {
        console.log("Error in invoice", err);
      });
  };
  const getAccountStats = () => {
    getRequest(`dc/projects/${projectId}/accounting-statistics/`)
      .then((res) => {
        setAccountStats(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    console.log("hi");
    setIsModalVisible(!isModalVisible); // Toggle modal visibility
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <VStack space={2} alignItems="center">
        <HStack space={3} width="90%" justifyContent="space-between">
          <StatBox label="Invoice Total" value={accountStats?.invoice_total} />
          <StatBox label="Bill Total" value={accountStats?.bills_total} />
        </HStack>
        <HStack space={3} width="90%" justifyContent="space-between">
          <StatBox label="Profit Margin" value={accountStats?.profit_margin} />
          <StatBox
            label="Petty Expense "
            value={accountStats?.petty_total_in}
          />
        </HStack>

        <HStack>
          <Box
            bg={Colors.PAPER}
            borderRadius="md"
            shadow={1}
            display={"flex"}
            flexDirection={"row"}
            width={"90%"}
            justifyContent="space-between"
          >
            <Box bg={Colors.PAPER} p="3" borderRadius="md" width="45%">
              <Text style={styles.label}>Client Due</Text>
              <Text style={styles.value}>
                {accountStats?.total_invoice_due?.toLocaleString("en-US") || 0}
              </Text>
            </Box>
            <Box bg={Colors.PAPER} p="3" borderRadius="md" width="45%">
              <Text style={styles.label}>Vendor Due</Text>
              <Text style={styles.value}>
                {accountStats?.total_bills_due?.toLocaleString("en-US") || 0}
              </Text>
            </Box>
          </Box>
        </HStack>
        <View
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: Colors.PRIMARY,
              width: 100,
              padding: 10,
              borderRadius: 10,
            }}
            onPress={toggleModal}
          >
            <Text style={{ color: Colors.WHITE }}>Add Invoice</Text>
          </TouchableOpacity>
        </View>
        {invoices?.map((data, index) => (
          <TouchableOpacity
            key={index}
            style={[styles2.projectCard]}
            onPress={() => handleInvoiceClicked(data)}
          >
            <View style={styles2.projectInfo}>
              <View
                style={{
                  backgroundColor: Colors.SUCCESS,
                  width: 60,
                  height: 50,
                  marginRight: 20,
                  borderRadius: 4,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", color: Colors.WHITE }}>
                  {dateFormatter(data?.due_date).day}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: Colors.WHITE }}>
                    {dateFormatter(data?.due_date).month} -
                  </Text>
                  <Text style={{ color: Colors.WHITE }}>
                    {dateFormatter(data?.due_date).year}
                  </Text>
                </View>
              </View>
              <View style={styles2.projectDetails}>
                <Text style={styles2.projectName}>{data?.name}</Text>
                <Text style={styles2.projectClient}>{data?.client_name}</Text>
                <Text style={{ fontWeight: "600" }}>{data?.total}</Text>
              </View>
              <View style={styles2.amountQuoted}>
                <Text style={{ fontWeight: "700" }}>
                  {data?.invoice_number}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </VStack>

      <AddInvoiceModal
        isVisible={isModalVisible}
        closeModal={toggleModal}
        getInvoice={getInvoice}
      />
    </ScrollView>
  );
}

const StatBox = ({ label, value }) => {
  return (
    <Box bg={Colors.PAPER} p="3" borderRadius="md" shadow={1} width="45%">
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value?.toLocaleString("en-US") || 0}</Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.BACKGROUND,
    alignItems: "center",
    paddingVertical: 3,
  },
  label: {
    fontSize: 14,
    color: Colors.PRIMARY,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.PRIMARY,
  },
});
