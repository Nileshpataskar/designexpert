import { View, Text, StyleSheet } from "react-native";
import React from "react";
import PieChart from "react-native-pie-chart";
import Colors from "../../utils/Colors";

export default function TaskPieChart({ projectStats }) {
  const totalTasks = projectStats.total_tasks || 0;
  const tasksCompleted = projectStats.tasks_completed || 0;
  const tasksPending = projectStats.tasks_pending || 0;

  // Calculate the percentage of completed and pending tasks
  const completedPercentage =
    totalTasks !== 0 ? (tasksCompleted / totalTasks) * 100 : 0;
  const pendingPercentage =
    totalTasks !== 0 ? (tasksPending / totalTasks) * 100 : 0;

  // Define colors for completed and pending tasks
  const sliceColor = [Colors.SUCCESS, Colors.INFO];

  // Define data series for the pie chart
  const value = [completedPercentage, pendingPercentage];

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <PieChart
          widthAndHeight={100}
          series={value}
          sliceColor={sliceColor}
          coverRadius={0.0002}
          coverFill={"#FFF"}
        />

        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Total Tasks: {totalTasks}</Text>
          <Text style={styles.statsText}>
            Tasks Completed: {tasksCompleted}
          </Text>
          <Text style={styles.statsText}>Tasks Pending: {tasksPending}</Text>
        </View>
      </View>
      <View style={styles.labelsContainer}>
        <View style={styles.labelItem}>
          <View
            style={[styles.labelColor, { backgroundColor: Colors.SUCCESS }]}
          />
          <Text style={styles.labelText}>Completed</Text>
        </View>
        <View style={styles.labelItem}>
          <View style={[styles.labelColor, { backgroundColor: Colors.INFO }]} />
          <Text style={styles.labelText}>Pending</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PAPER,
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
    elevation: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelsContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  labelItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  labelColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  labelText: {
    fontSize: 14,
    color: Colors.PRIMARY,
  },
  statsContainer: {
    marginLeft: 40,
    marginTop: 10,
  },
  statsText: {
    fontSize: 14,
    color: Colors.PRIMARY,
  },
});
