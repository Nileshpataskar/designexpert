import { View, Text, Button } from "react-native";
import React from "react";
import { handleLogout } from ".";

export default function History() {
  return (
    <View style={{marginTop:30}}>
      <Text>Invoice</Text>
      <Button title="Logout" onPress={handleLogout}>
        
      </Button>
    </View>
  );
}
