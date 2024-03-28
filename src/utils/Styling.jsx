import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const customStyle = StyleSheet.create({
    backgroundColor: {
        backgroundColor: Colors.PAPER,
    },
    paper: {
        backgroundColor: "#FFF",
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 8,
        paddingHorizontal: 17,
        fontSize: 14,
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 20,
        marginRight: 20,
        width: "80%",
    },

    container: {
        flex: 1,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        // height: '200px'
    },
    loginText: {
        textAlign: "center",
        marginTop: 10,
        color: "blue", // You can change the color as needed
    },
    button: {
        marginTop: 20,
        width: "80%", // Adjust the width as needed
        height: 50, // Adjust the height as needed
        backgroundColor: "#161834", // Change the background color
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    buttonText: {
        color: "#fff", // Change the text color
        fontSize: 16,
        fontWeight: "bold",
    },
    logo: {
        fontSize: 28,
        fontStyle: "normal",
    },
    getCenter: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        // backgroundColor: "pink",
        alignItems: "center",
        marginVertical: 10,
    },
    //airbnb
    //
    seperatorView: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        marginVertical: 30,
    },
    seperator: {
        // fontFamily: "mon-sb",
        color: Colors.grey,
        fontSize: 16,
    },
    btnOutline: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingHorizontal: 10,
    },
    btnOutlineText: {
        color: "#000",
        fontSize: 16,
        // fontFamily: "mon-sb",
    },
});

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FDFFFF",
    },
    inputField: {
        height: 44,
        borderWidth: 1,
        borderColor: "#ABABAB",
        color: Colors.PRIMARY,
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#fff",
    },
    btn: {
        backgroundColor: Colors.PRIMARY,
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: "#fff",
        fontSize: 16,
    },
    btnIcon: {
        position: "absolute",
        left: 16,
    },
    footer: {
        position: "absolute",
        height: 100,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopColor: Colors.grey,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
});

export const dateFormatter =(PassDate)=>{
   
        const date = new Date(PassDate)
        const day = String(date.getDate()).padStart(2, '0')
        const month = date.toLocaleString('default', { month: 'short' })
        const year = String(date.getFullYear()).slice(-2)
        return `${day}-${month}-${year}`
    }
