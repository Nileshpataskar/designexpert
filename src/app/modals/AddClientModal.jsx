import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../utils/Colors";
import { postRequest } from "../../utils/fetch";

export default function AddClientModal({ isVisible, closeModal }) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone_number, setPhone_number] = useState(null);
  const [gst, setGst] = useState(null);
  const [address, setAddress] = useState(null);

  const handleSave = () => {
    const postData = {
      name: name,
      email: email,
      phone_number: phone_number,
      extras: {
        gst: gst,
      },
      address: address,
    };

    postRequest(`dc/api/clients/`, postData)
      .then((res) => {
        console.log("Successfully saved");
        handleClose();
      })
      .catch((err) => {
        console.log("Error in saving client: ", err);
        handleClose();
      });
  };

  const handleClose = () => {
    setName(null);
    setEmail(null);
    setAddress(null);
    setPhone_number(null);
    setGst(null);
    closeModal();
  };
  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={handleClose}
      presentationStyle="pageSheet"
      hardwareAccelerated={true}
    >
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 10,
          gap: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <TouchableOpacity onPress={handleClose}>
          <Ionicons name="arrow-back-circle" size={34} color={Colors.PRIMARY} />
        </TouchableOpacity>
        <Text style={{ fontWeight: "600", fontSize: 18 }}>Client</Text>
      </View>
      <View style={{ padding: 20 }}>
        <View style={styles.textInputContainer}>
          <Entypo name="pencil" size={24} color={Colors.GRAY} />
          <TextInput
            style={styles.input}
            placeholder="Client Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={styles.textInputContainer}>
          <Entypo name="email" size={24} color={Colors.GRAY} />
          <TextInput
            style={styles.input}
            placeholder="Email "
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.textInputContainer}>
          <AntDesign name="phone" size={24} color={Colors.GRAY} />
          <TextInput
            style={styles.input}
            placeholder="Phone Number "
            keyboardType="numeric"
            maxLength={10}
            value={phone_number}
            onChangeText={(text) => setPhone_number(text)}
          />
        </View>

        <View style={styles.textInputContainer}>
          <MaterialIcons
            name="confirmation-number"
            size={24}
            color={Colors.GRAY}
          />
          <TextInput
            maxLength={15}
            style={styles.input}
            placeholder="GST No."
            value={gst}
            onChangeText={(text) => setGst(text)}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Entypo name="address" size={24} color={Colors.GRAY} />

          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            numberOfLines={3}
            onChangeText={(text) => setAddress(text)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "outfit-bold",
              color: Colors.WHITE,
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    padding: 10,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderColor: Colors.GRAY,
    marginVertical: 10,
    borderRadius: 6,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  error: {
    color: Colors.RED,
    fontSize: 12,
    marginTop: 5,
  },
});
