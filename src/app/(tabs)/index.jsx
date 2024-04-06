import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import services from "../../utils/services";
import { getRequest } from "../../utils/fetch";
import Header from "../../components/ProjectDetail/Header";
import Colors from "../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import ProjectList from "../../components/ProjectDetail/ProjectList";
import { SafeAreaView } from "react-native-safe-area-context";

export const handleLogout = () => {
  services.storeData("login", "false");
  router.push("/login");
};
export default function Home() {
  const router = useRouter();
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    checkUserAuth();
    getProjects();
  }, []);

  const checkUserAuth = async () => {
    const result = await services.getData("login");
    const auth_key = await services.getData("token");
    if (result !== "true") {
      router.replace("/login");
    }
  };

  const getProjects = () => {
    setLoading(true);
    getRequest(`dc/api/projects/`)
      .then((res) => {
        setProjects(res?.data);
      })
      .catch((err) => {
        console.log("error in project ", err);
      })
      .finally(setLoading(false));
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#f7f5f3" }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              getProjects();
            }}
            refreshing={loading}
          />
        }
      >
        <Header />

        <View style={{ paddingRight: 5, paddingLeft: 5 }}>
          <ProjectList projects={projects} getProjects={getProjects} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  adBtnContainer: {
    display: "flex",
    flexDirection: "row-reverse",
  },
});
