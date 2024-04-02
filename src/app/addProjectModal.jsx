import { View, Text, TextInput } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles } from "../utils/globalStyles";

export default function addProjectModal() {
  return (
    <View style={{ padding: 20 }}>
      <View style={globalStyles.textContainer}>
        <MaterialCommunityIcons name="rename-box" size={24} color="black" />
        <TextInput
          placeholder="Project Name"
          // style={globalStyles.textfield}
        ></TextInput>
      </View>
    </View>
  );
}
