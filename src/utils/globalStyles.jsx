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
  hoveringButton: {},
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  clickableSubInput: {
    flex: 1,
    borderRadius: 6,
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
  },
  clickableInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderColor: Colors.GRAY,
    borderRadius: 6,
  },
});
