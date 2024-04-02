import { View, Text, TouchableOpacity, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { handleLogout } from ".";

export default function Profile() {
  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <Link
        href={{
          pathname: "addProjectModal",
        }}
      >
        click
      </Link>

      <Button title="Logout" onPress={handleLogout}></Button>
    </SafeAreaView>
  );
}
