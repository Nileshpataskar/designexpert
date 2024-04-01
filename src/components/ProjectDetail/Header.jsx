import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getRequest } from "../../utils/fetch";
import Colors from "../../utils/Colors";

export default function Header() {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    getRequest(`auth/user/`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log("Error in user profile", err);
      });

    getRequest(`dc/api/company/`)
      .then((res) => {
        setCompany(res.data[0]);
      })
      .catch((err) => {
        console.log("Error in user profile", err);
      });
  };
  
  return (
    <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
      <Image
        source={{ uri: company?.logo }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 99,
          marginLeft: 10,
          borderWidth: 3,
          borderColor: "white",
        }}
      />
      <View>
        <View>
          <Text style={{ color: Colors.PRIMARY, fontSize: 16 }}>Welcome</Text>
          <Text
            style={{ color: Colors.PRIMARY, fontSize: 20, fontWeight: "bold" }}
          >
            {user?.first_name} {user?.last_name || user?.email}
          </Text>
        </View>
      </View>
    </View>
  );
}
