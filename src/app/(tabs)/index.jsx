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
import Header from "../../components/Header";
import Colors from "../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import ProjectList from "../../components/ProjectList";
export const handleLogout = () => {
  services.storeData("login", "false");
  router.push("/login");
};
export default function Home() {
  const router = useRouter();
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("api", process.env.API_URL);

    checkUserAuth();
    getProjects();
  }, []);

  const checkUserAuth = async () => {
    const result = await services.getData("login");
    const auth_key = await services.getData("token");
    console.log("token in login", auth_key);
    if (result !== "true") {
      router.replace("/login");
    }

    console.log("Result", result);
  };

  const getProjects = () => {
    setLoading(true);
    getRequest(`dc/api/projects/`)
      .then((res) => {
        console.log("project", res.data);
        setProjects(res?.data);
      })
      .catch((err) => {
        console.log("error in project ", err);
      })
      .finally(setLoading(false));
  };

  return (
    <View style={{ marginTop: 40 }}>
      <View style={{ padding: 20, backgroundColor: Colors.PRIMARY }}>
        <Header />
      </View>
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
        <View style={{ paddingRight: 5, paddingLeft: 5 }}>
          <ProjectList projects={projects} />
        </View>
      </ScrollView>

      {/* <Link href={'/addProjectModal'} style={styles.adBtnContainer}>
        <Ionicons name="add-circle" size={54} color={Colors.PRIMARY} />

      </Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  adBtnContainer: {
    display: "flex",
    flexDirection: "row-reverse",
  },
});
