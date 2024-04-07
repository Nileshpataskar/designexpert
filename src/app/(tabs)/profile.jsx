import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { handleLogout } from ".";
import AddCompanyModal from "../modals/AddCompanyModal";
import AddClientModal from "../modals/AddClientModal";
import Colors from "../../utils/Colors";

export default function Profile() {
  const [isCompanyModalVisible, setIsCompanyModalVisible] = useState(false);
  const [isClientModalVisible, setIsClientModalVisible] = useState(false);

  const [company, setCompany] = useState([]);

  useEffect(() => {
    console.log("bayy");
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    getRequest("dc/api/company/")
      .then((res) => {
        console.log("Company successfully loaded", res.data);
        setCompany(res.data);
      })
      .catch((err) => {
        console.log("Company failed");
      });
  };

  const handleToggleClient = () => {
    setIsClientModalVisible(!isClientModalVisible);
  };

  const toggleCompanyModal = () => {
    setIsCompanyModalVisible(!isCompanyModalVisible); // Toggle modal visibility
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {company.length === 0 && ( // Conditionally render the button
        <TouchableOpacity onPress={toggleCompanyModal} style={styles.link}>
          <Text style={styles.linkText}>Add Company</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={handleToggleClient} style={styles.link}>
        <Text style={styles.linkText}>Add Client</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: Colors.PRIMARY,
          padding: 15,
          width: 150,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Logout</Text>
      </TouchableOpacity>

      <AddCompanyModal
        isVisible={isCompanyModalVisible}
        closeModal={toggleCompanyModal}
      />
      <AddClientModal
        isVisible={isClientModalVisible}
        closeModal={handleToggleClient}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  link: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginVertical: 10,
  },
  linkText: {
    fontSize: 18,
    color: "#333",
  },
});
