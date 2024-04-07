import React, { useState } from "react";
import {
  View,
  Modal,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import Colors from "../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { postRequestMultipart } from "../../utils/fetch";

export default function AddCompanyModal({ isVisible, closeModal }) {
  const placeholder = `https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png`;
  const [image, setImage] = useState(placeholder);
  const [previewImage, setPreviewImage] = useState(placeholder);

  const [firmName, setFirmName] = useState("");
  const [gst, setGst] = useState("");
  const [address, setAddress] = useState("");
  const [prefix, setPrefix] = useState("");

  const [nameError, setNameError] = useState("");
  const [gstError, setGstError] = useState("");

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
      setImage(result.assets[0].base64);
    }
  };

  const handleSave = () => {
    // Validate Firm Name
    if (!firmName.trim()) {
      setNameError("Please enter Firm Name");
      return;
    } else {
      setNameError("");
    }

    // Validate GST
    if (gst.length !== 15) {
      setGstError("GST should be 15 characters long");
      return;
    } else {
      setGstError("");
    }

    console.log("Image:", image);
    console.log("Firm Name:", firmName);
    console.log("GST No.:", gst);
    console.log("Firm Prefix:", prefix);
    console.log("Address:", address);

    const formData = new FormData();

    formData.append("name", firmName);
    formData.append("gst", gst);
    formData.append("invoice_prefix", prefix);
    formData.append("address", address);
    if (image && typeof image !== "string") {
      formData.append("logo", image);
    } else if (typeof image === "string") {
      formData.append("logo_url", image);
    }
    console.log("Form Data:", formData);
    postRequestMultipart(`dc/api/company/`, formData)
      .then((res) => {
        console.log("Suucesfully created ");
      })
      .catch((err) => {
        console.log("error");
      })
      .finally(() => {
        handleReset();
      });
  };

  const handleReset = () => {
    setFirmName("");
    setPrefix("");
    setAddress("");
    setGst("");
    setImage(placeholder);
    closeModal();
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={closeModal}
      presentationStyle="pageSheet"
      hardwareAccelerated={true}
    >
      <View>
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
          <TouchableOpacity onPress={closeModal}>
            <Ionicons
              name="arrow-back-circle"
              size={34}
              color={Colors.PRIMARY}
            />
          </TouchableOpacity>
          <Text style={{ fontWeight: "600", fontSize: 18 }}>Company</Text>
        </View>

        <View style={{ paddingBottom: 0, padding: 20 }}>
          <TouchableOpacity onPress={onImagePick}>
            <Image
              source={{ uri: previewImage }}
              style={{
                width: 130,
                height: 130,
                backgroundColor: Colors.GRAY,
                borderRadius: 15,
                marginBottom: 10,
              }}
            />
          </TouchableOpacity>
          <View style={styles.textInputContainer}>
            <Entypo name="pencil" size={24} color={Colors.GRAY} />
            <TextInput
              style={styles.input}
              placeholder="Firm Name"
              value={firmName}
              onChangeText={(text) => setFirmName(text)}
            />
          </View>
          {nameError ? <Text style={styles.error}>{nameError}</Text> : null}
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
          {gstError ? <Text style={styles.error}>{gstError}</Text> : null}
          <View style={styles.textInputContainer}>
            <FontAwesome5 name="autoprefixer" size={24} color={Colors.GRAY} />
            <TextInput
              style={styles.input}
              placeholder="Firm Prefix"
              maxLength={5} 
              value={prefix}
              onChangeText={(text) => setPrefix(text)}
            />
          </View>
          <View style={styles.textInputContainer}>
            <FontAwesome name="address-card-o" size={24} color={Colors.GRAY} />
            <TextInput
              style={styles.input}
              placeholder="Address"
              numberOfLines={3}
              value={address}
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
