import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../utils/Colors";
import dashboard from "../../../assets/dashboard.png";
import services from "../../utils/services";
import { useRouter } from "expo-router";

export default function LoginScreen() {

  const router = useRouter()
  const handleSignIn = async () => {
    console.log("gg")

    // await services.storeData('login', true)
    router.replace("/login/loginPage")
  }
  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <Image source={dashboard} style={styles.bgImage} />
      <View
        style={{
          backgroundColor: Colors.PAPER,
          width: "100%",
          height: "100%",
          padding: 20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          marginTop: -30,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            textAlign: "center",
            color: Colors.PRIMARY,
          }}
        >
          Design Expert
        </Text>
        <Text
          style={{
            fontSize: 14,
            textAlign: "center",
            color: Colors.SUBTITLE,
            marginTop: 20,
          }}
        >
          One Place Destination to Design, Manage and Handle your Interior
          Design Projects!{" "}
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={{ textAlign: "center", color: Colors.WHITE }}>
            Login/SignUp
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bgImage: {
    width: 200,
    height: 400,
    marginTop: 30,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: Colors.BLACK,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    paddingHorizontal: 5,
    borderRadius: 99,
    marginTop: 50,
  },
});
