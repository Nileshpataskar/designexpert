import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const globalStyles = StyleSheet.create({
  textfield: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ABABAB",
    color: Colors.PRIMARY,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  textContainer: {
    padding: 10,
    height: 44,

    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    borderRadius: 8,
    borderColor: Colors.GRAY,

    backgroundColor: "#fff",
  },
  hoveringButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    zIndex: 100,
  },
});
