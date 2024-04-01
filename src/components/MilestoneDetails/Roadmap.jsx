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
    <ScrollView>
      <ProjectInfo projectData={projectData} />

      <View style={{ marginTop: -50, margin: 20 }}>
        <TaskPieChart projectData={projectData} projectStats={projectStats} />
      </View>
      <ScrollView horizontal contentContainerStyle={{ padding: 5 }} style={{}}>
        <View style={styles.statContainer}>
          <Text style={styles.heading}>Client Estimated Total</Text>
          <Text style={styles.value}>
            {projectStats?.total_amount_quoted?.toLocaleString("en-US") || 0}
          </Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.heading}>Estimated Profit margin</Text>
          <Text style={styles.value}>
            {projectStats?.total_amount_quoted?.toLocaleString("en-US") || 0}
          </Text>
        </View>

        <View style={styles.statContainer}>
          <Text style={styles.heading}>Profit Percentage</Text>
          <Text style={styles.value}>
            {profitPercent?.toLocaleString("en-US") || 0}
          </Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.heading}>Material Supplier</Text>
          <Text style={styles.value}>
            {calculatedStats?.materialCost?.toLocaleString("en-US")}
          </Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.heading}>Subcontractor</Text>
          <Text style={styles.value}>
            {calculatedStats?.subContractorCost.toLocaleString("en-US")}
          </Text>
        </View>
      </ScrollView>
      <ScrollView>
        <ShowMilestoneList />
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  statContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: Colors.PAPER,
    padding: 20,
    paddingHorizontal: 1,
    paddingBottom: 8,
    elevation: 1,
    marginRight: 10,
    borderRadius: 10,
  },
  heading: {
    fontFamily: "outfit",
    fontWeight: "bold",
    fontSize: 14,
    color: Colors.PRIMARY,
    paddingHorizontal: 10,
    // maxWidth: "75%",
    marginBottom: 10,
    textAlign: "center",
  },
  value: {
    fontFamily: "outfit",
    fontWeight: "bold",
    fontSize: 14,
    color: Colors.PRIMARY,
    marginBottom: 10,
  },
});
