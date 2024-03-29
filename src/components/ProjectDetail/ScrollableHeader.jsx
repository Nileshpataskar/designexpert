import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../utils/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Roadmap from "../MilestoneDetails/Roadmap";
import Accounts from "../MilestoneDetails/Accounts";
export default function ScrollableHeader({ projectData, projectStats }) {
  const [activeTab, setActiveTab] = useState("Roadmap");

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Roadmap":
        return (
          <Roadmap projectData={projectData} projectStats={projectStats} />
        );
      case "Accounts":
        return <Accounts />;
      case "Project Files":
        return <Text>Project Files content goes here</Text>;
      case "Settings":
        return <Text>Settings content goes here</Text>;
      default:
        return null;
    }
  };
  return (
    <View>
      <ScrollView
        horizontal
        scrollEnabled
        style={{
          backgroundColor: Colors.PAPER,
          marginHorizontal: 5,
          margin: 10,
          borderRadius: 15,
          paddingHorizontal: 25,
          padding: 10,
          display: "flex",
          flexDirection: "row",
          elevation: 2,
          gap: 16,
          paddingHorizontal: 5,
        }}
      >
        <TouchableOpacity
          style={[
            styles.category,
            activeTab === "Roadmap" && styles.categoryActive,
          ]}
          onPress={() => handleTabPress("Roadmap")}
        >
          <FontAwesome name="road" size={18} color="black" />
          <Text
            style={[
              styles.categoryText,
              activeTab === "Roadmap" && styles.categoryTextActive,
            ]}
          >
            Roadmap
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.category,
            activeTab === "Accounts" && styles.categoryActive,
          ]}
          onPress={() => handleTabPress("Accounts")}
        >
          <FontAwesome5 name="money-check" size={18} color="black" />
          <Text
            style={[
              styles.categoryText,
              activeTab === "Accounts" && styles.categoryTextActive,
            ]}
          >
            Accounts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.category,
            activeTab === "Project Files" && styles.categoryActive,
          ]}
          onPress={() => handleTabPress("Project Files")}
        >
          <Entypo name="image" size={18} color="black" />
          <Text
            style={[
              styles.categoryText,
              activeTab === "Project Files" && styles.categoryTextActive,
            ]}
          >
            Project Files
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.category,
            activeTab === "Settings" && styles.categoryActive,
          ]}
          onPress={() => handleTabPress("Settings")}
        >
          <Ionicons name="settings" size={18} color="black" />
          <Text
            style={[
              styles.categoryText,
              activeTab === "Settings" && styles.categoryTextActive,
            ]}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={{ padding: 10 }}>{renderContent()}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  category: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 13,
    paddingBottom: 8,
  },
  categoryActive: {
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: Colors.BLACK,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.BLACK,
  },
  categoryTextActive: {
    fontWeight: "bold",
  },
});
