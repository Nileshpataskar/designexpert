import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import ProjectInfo from "../ProjectDetail/ProjectInfo";
import TaskPieChart from "../ProjectDetail/TaskPieChart";
import { useLocalSearchParams } from "expo-router";
import { getRequest } from "../../utils/fetch";
import Colors from "../../utils/Colors";
import ShowMilestoneList from "./ShowMilestoneList";

export default function Roadmap({ projectData, projectStats }) {
  const calculateStats = () => {
    if (projectStats !== null && projectStats?.estimates_by_category) {
      console.log("stats data");
      console.log(projectStats?.estimates_by_category);
      const materialSupplier = projectStats?.estimates_by_category.filter(
        (value) => value?.categorization === "Material Supplier"
      );
      const subContractor = projectStats?.estimates_by_category.filter(
        (value) => value?.categorization === "Sub Contractor"
      );
      let totalSum = 0;
      projectStats?.estimates_by_category.forEach((item) => {
        totalSum += item.total_amount;
      });

      return {
        materialCost: materialSupplier?.[0]?.total_amount || 0,
        subContractorCost: subContractor?.[0]?.total_amount || 0,
        totalCost: totalSum,
      };
    }
  };

  const calculatedStats = calculateStats();
  const profit = projectStats?.total_amount_quoted - calculatedStats?.totalCost;
  const profitPercent = (profit / projectStats?.total_amount_quoted) * 100;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <ProjectInfo projectData={projectData} /> */}
      <View>
        {/* <TaskPieChart projectData={projectData} projectStats={projectStats} /> */}
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statTitle}>Client Estimated </Text>
          <Text style={styles.statValue}>
            {projectStats?.total_amount_quoted?.toLocaleString("en-US") || 0}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statTitle}>Estimated Profit </Text>
          <Text style={styles.statValue}>
            {profit?.toLocaleString("en-US") || 0} ({profitPercent}%)
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statTitle}>Material Supplier</Text>
          <Text style={styles.statValue}>
            {calculatedStats?.materialCost?.toLocaleString("en-US") || 0}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statTitle}>Subcontractor</Text>
          <Text style={styles.statValue}>
            {calculatedStats?.subContractorCost?.toLocaleString("en-US") || 0}
          </Text>
        </View>
      </View>

      <ShowMilestoneList projectId={projectData.id} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.BACKGROUND,
    padding: 10,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statItem: {
    width: "48%",
    backgroundColor: Colors.PAPER,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  statTitle: {
    fontSize: 14,
    marginBottom: 5,
    color: Colors.PRIMARY,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",

    color: Colors.PRIMARY,
  },
});
