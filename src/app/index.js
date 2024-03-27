import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import services from "../utils/services";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    checkUserAuth()
  }, [])
  const checkUserAuth = async () => {

    const result = await services.getData('login')
    if (result !== 'true') {
      router.replace('/login')
    }

    console.log("Result", result)
  }

  return (
    <View style={styles.container}>
      <Text>Hello Nilesh,how are you!</Text>
      <Link href={'/details'} asChild>

        <Button title="Go " />
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
