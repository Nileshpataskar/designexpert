import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import PieChart from "react-native-pie-chart";
import Colors from "../../utils/Colors";

export default function TaskPieChart({ projectData, projectStats }) {
  const widthAndHeight = 100;
  const totalTasks = projectStats.total_tasks || 0;
  const tasksCompleted = projectStats.tasks_completed || 0;
  const tasksPending = projectStats.tasks_pending || 0;

  // Calculate the percentage of completed and pending tasks
  let completedPercentage = 0;
  let pendingPercentage = 0;

  if (totalTasks !== 0) {
    completedPercentage = (tasksCompleted / totalTasks) * 100;
    pendingPercentage = (tasksPending / totalTasks) * 100;
  }

  // Define colors for completed and pending tasks
  const sliceColor = [Colors.SUCCESS, Colors.PURPLE];

  // If both completed and pending tasks are 0, display all tasks as pending
  if (tasksCompleted === 0 && tasksPending === 0) {
    pendingPercentage = 100;
    sliceColor.push(Colors.PURPLE);
  } else {
    // Otherwise, define colors for completed and pending tasks
    if (tasksCompleted > 0) sliceColor.push(Colors.SUCCESS);
    if (tasksPending > 0) sliceColor.push(Colors.PURPLE);
  }

  // Define data series for the pie chart
  let value = [completedPercentage, pendingPercentage];

  // Adjust sliceColor length to match the length of value
  sliceColor.length = value.length;

  // Ensure sliceColor has at least one color
  if (sliceColor.length === 0) {
    sliceColor.push(Colors.GRAY); // Default color
  }
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", gap: 0 }}>
        <Text style={{ fontSize: 20, fontFamily: "metro" }}>
          Tasks
        </Text>
        
        <View style={{ display: "flex", flexDirection: "row",alignItems:'center',justifyContent:'space-between',gap:20 }}>
          <View>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={value}
              sliceColor={sliceColor}
              coverRadius={0.75}
              coverFill={"#FFF"}
            />
          </View>
          <View>
            <Text>Total Task:{projectStats.total_tasks}</Text>
            <Text>Task Completed:{projectStats.tasks_completed}</Text>
            <Text>Task Pending:{projectStats.tasks_pending}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PAPER,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    display: "flex",
    alignItems: "flex-start",
    // marginTop: -50,
    // margin: 20,
    elevation: 2,
  },
});
