import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { handleLogout } from ".";
import { getRequest } from "../../utils/fetch";
import { styles2 } from "../../components/ProjectDetail/ProjectList";
import { styles } from "../../components/ProjectDetail/ProjectInfo";
import Colors from "../../utils/Colors";
import { dateFormatter } from "../../utils/Styling";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../utils/globalStyles";
import { Link } from "expo-router";
import AddProjectModal from "../addProjectModal";

export default function History() {
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    getInvoice();
  }, []);
  const getInvoice = () => {
    getRequest("dc/api/invoices/")
      .then((res) => {
        setInvoices(res.data);
      })
      .catch((err) => {
        console.log("Error in invoice", err);
      });
  };

  const handleInvoiceClicked = (data) => {
    console.log("Clicked Invoice", data.id);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    console.log("hi");
    setIsModalVisible(!isModalVisible); // Toggle modal visibility
  };
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={globalStyles.hoveringButton}
        onPress={toggleModal}
      >
        <AntDesign name="pluscircle" size={40} color={Colors.PRIMARY} />
      </TouchableOpacity>
      <ScrollView style={{ margin: 20, marginVertical: 10 }}>
        <Text style={styles2.title}>Invoice</Text>

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
      </ScrollView>

        <AddProjectModal isVisible={isModalVisible} closeModal={toggleModal} />
      
    </SafeAreaView>
  );
}
