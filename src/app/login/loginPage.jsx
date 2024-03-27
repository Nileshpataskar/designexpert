
// import { useOAuth } from '@clerk/clerk-expo';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
    ToastAndroid,
} from "react-native";
import { customStyle, defaultStyles } from "../../utils/Styling";

// https://github.com/clerkinc/clerk-expo-starter/blob/main/components/OAuth.tsx
// import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
// import { defaultStyles } from '@/constants/Styles';

const LoginPage = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSignIn = () => {
        // Log the email and password
        console.log("Email:", email);
        console.log("Password:", password);

        // Perform your POST request here
        // Example:
        fetch("https://dev.dezinexpert.com/auth/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    // Display success toast
                    ToastAndroid.showWithGravity(
                        "Successfully logged in!",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                    );
                    return response.json();
                } else {
                    ToastAndroid.showWithGravity(
                        "Failed Login!",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                    );
                }
            })
            .then((data) => {
                console.log("Response from server:", data);
                console.log("key:", data.key);
                // Handle response as needed
                if (data.key) {
                    AsyncStorage.setItem("token", data.key);
                    setEmail(" ");
                    setPassword(" ");
                    router.replace("/");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleRegister = () => {
        router.navigate("/(tabs)/register");
        console.log("reg");
    };
    return (
        <View style={styles.loginContainer}>
            <View style={customStyle.getCenter} className="mt:10">
                <Text style={customStyle.logo}>Design Expert</Text>
            </View>
            <TextInput
                autoCapitalize="none"
                placeholder="Email"
                style={[defaultStyles.inputField, { marginBottom: 30 }]}
                onChangeText={setEmail} // Update email state when text changes
                value={email}
            />
            <TextInput
                autoCapitalize="none"
                placeholder="Password"
                style={[defaultStyles.inputField, { marginBottom: 30 }]}
                onChangeText={setPassword} // Update password state when text changes
                secureTextEntry // Hide password input
                value={password}
            />
            <TouchableOpacity style={defaultStyles.btn} onPress={handleSignIn}>
                <Text style={defaultStyles.btnText}>Sign in</Text>
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

            <View style={{ gap: 20 }}>
                <TouchableOpacity style={customStyle.btnOutline}>
                    <Ionicons
                        name="logo-google"
                        size={24}
                        style={defaultStyles.btnIcon}
                    />
                    <Text style={customStyle.btnOutlineText}>Sign in with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        { display: "flex", justifyContent: "center", alignItems: "center" },
                    ]}
                    onPress={handleRegister}
                >
                    <Text>Not a Registered User? Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 26,
    },
});

export default LoginPage;
