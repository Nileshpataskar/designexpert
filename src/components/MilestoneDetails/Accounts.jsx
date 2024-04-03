import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Box, Text, VStack, HStack, Heading, Divider } from "native-base";
import { getRequest } from "../../utils/fetch";
import { useLocalSearchParams } from "expo-router";
import Colors from "../../utils/Colors";

export default function Accounts() {
  const { projectId } = useLocalSearchParams();
  const [accountStats, setAccountStats] = useState();

  useEffect(() => {
    console.log("projectId", projectId);
    getAccountStats();
  }, []);

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
            <Box
              bg={Colors.PAPER}
              p="3"
              borderRadius="md"
              width="45%"
            >
              <Text style={styles.label}>Client Due</Text>
              <Text style={styles.value}>
                {accountStats?.total_invoice_due?.toLocaleString("en-US") || 0}
              </Text>
            </Box>
            <Box
              bg={Colors.PAPER}
              p="3"
              borderRadius="md"
              width="45%"
            >
              <Text style={styles.label}>Vendor Due</Text>
              <Text style={styles.value}>
                {accountStats?.total_bills_due?.toLocaleString("en-US") || 0}
              </Text>
            </Box>
          </Box>
        </HStack>
      </VStack>
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
