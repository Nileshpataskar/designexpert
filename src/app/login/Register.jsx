import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { customStyle, defaultStyles } from "../../utils/Styling";
import Colors from "../../utils/Colors";
import { Link, useRouter } from "expo-router";
import axios from "axios";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [loading, setLoading] = useState(false);
  const handleSignUp = () => {
    if (!email) {
      ToastAndroid.showWithGravity(
        "Please Enter Email",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    }
    if (!password1 || !password2) {
      ToastAndroid.showWithGravity(
        "Please Enter Password",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    }

    const postData = {
      email,
      password1,
      password2,
    };
    setLoading(true);

    axios
      .post(`${process.env.API_URL}auth/registration/`, postData)
      .then((res) => {
        console.log("Registered successfully");

        ToastAndroid.showWithGravity(
          "User Registered Successfully",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );

        setLoading(false);
        router.navigate("/login/loginPage");
      })
      .catch((err) => {
        console.log("Err", err);
        ToastAndroid.showWithGravity(
          "Failed to Sign up check credentials",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        setLoading(false);
      });
    console.log("signu");
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        padding: 26,
      }}
    >
      <View style={{}}>
        <View style={customStyle.getCenter}>
          <Text style={customStyle.logo}>Design Expert</Text>
        </View>
        <View>
          <View style={styles.textInputContainer}>
            <TextInput
              autoCapitalize="none"
              placeholder="Email"
              style={[styles.input]}
              onChangeText={setEmail} // Update email state when text changes
              value={email}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              autoCapitalize="none"
              placeholder="Password "
              style={[styles.input]}
              onChangeText={setPassword1} // Update email state when text changes
              value={password1}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              autoCapitalize="none"
              placeholder="Password Confirm "
              style={[styles.input]}
              onChangeText={setPassword2} // Update email state when text changes
              value={password2}
            />
          </View>

          <TouchableOpacity style={defaultStyles.btn} onPress={handleSignUp}>
            <Text style={defaultStyles.btnText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={customStyle.seperatorView}>
            <View
              style={{
                flex: 1,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text style={customStyle.seperator}>or</Text>
            <View
              style={{
                flex: 1,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>
          <TouchableOpacity
            style={[
              {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
            onPress={() => {
              router.navigate("/login/loginPage");
            }}
          >
            <Text>Already User? Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
  },
});
