import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
export default function HomeLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "syne-r": require("./../../assets/fonts/Syne-Regular.ttf"),
    "syne-b": require("./../../assets/fonts/Syne-Bold.ttf"),
    "syne-sb": require("./../../assets/fonts/Syne-SemiBold.ttf"),
    "syne-m": require("./../../assets/fonts/Syne-Medium.ttf"),
    outfit: require("./../../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./../../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./../../assets/fonts/Outfit-Bold.ttf"),
    metro: require("./../../assets/fonts/Metrophobic-Regular.ttf"),
    "spotify-medium": require("./../../assets/fonts/CircularSpotifyText-Medium.otf"),
    "spotify-bold": require("./../../assets/fonts/CircularSpotifyText-Bold.otf"),
  });

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="addProjectModal"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: " Project",
          headerStyle: {
            backgroundColor: "#fff", // Change header background color
            borderBottomWidth: 1, // Add a bottom border
            borderBottomColor: "#ccc", // Border color
          },
          headerTitleStyle: {
            fontSize: 20, // Change header title font size
            fontWeight: "bold", // Make header title bold
            color: "#333", // Change header title color
          },
          headerTintColor: "#007bff", // Change the color of the back button
          headerBackTitleVisible: false, // Hide the back button title
          // Customize the back button icon
        }}
      ></Stack.Screen>
    </Stack>
  );
}
