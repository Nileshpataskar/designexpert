import { View, Text } from 'react-native'
import React from 'react'

export default function ShowMilestones({milestoneData}) {
  return (
    <View>
      <View style={{}}>
        {milestoneData?.map((project, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 15,
              elevation: 2,
              backgroundColor: Colors.PAPER,
              padding: 20,

              borderRadius: 10,
            }}
            onPress={() => {
              handleProjectClicked(project);
            }}
          >
            <View style={{ width: "100%" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 1,maxWidth:'70%' }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginBottom: 5,
                    }}
                  >
                    {project?.name}
                  </Text>

                  <Text style={{ fontSize: 14, color: "gray" }}>
                    {project?.client_name} 
                    {"  "}
                    {dateFormatter(project?.deadline)}
                  </Text>
                </View>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {project?.amount_quoted}
                  </Text>
                  
                </View>
              </View>
              <View style={styles.progressBarMainContainer}>
                <View
                  style={[
                    styles.progressBarSubContainer,
                    { width: getProgressBarWidth(project.status) },
                    { backgroundColor: getStatusColor(project.status) },
                  ]}
                ></View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}