import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { getRequest, getRequest_image } from "../../utils/fetch";
import Colors from "../../utils/Colors";

export default function ProjectFiles() {
  const { projectId } = useLocalSearchParams();
  const [projectFiles, setProjectFiles] = useState([]);
  const [moodboards, setMoodboards] = useState([]);
  useEffect(() => {
    fetchMoodboards();
    getProjectFiles();
  }, []);

  const fetchMoodboards = () => {
    getRequest("dc/api/moodboard_api/?project=" + Number(projectId))
      .then((response) => {
        console.log("Moodboard++++++++");
        console.log(response.data);
        setMoodboards(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getProjectFiles = async () => {
    getRequest(`dc/api/project_files/?project=${projectId}`)
      .then((response) => {
        console.log("PROJECT FILES: ", response.data);
        setProjectFiles(response.data);
      })
      .catch((err) => {
        console.log("error while file project file");
      });
  };

  return (
    <ScrollView>
      {/* <View>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          Moodboards
        </Text>

        {moodboards.map((moodboard, index) => (
          <TouchableOpacity key={index} style={styles.cardContainer}>
            <Image
              source={{ uri: moodboard.thumbnail }}
              style={styles.thumbnail}
            />
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{moodboard.title}</Text>
              <Text style={styles.description}>{moodboard.description}</Text>
            </View>
            <TouchableOpacity style={styles.downloadButton}>
              <Text style={styles.downloadButtonText}>Download</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View> */}
      <View>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          Files
        </Text>
        <View style={{ flex: 1 }}>
          
          {projectFiles?.map((data, index) => (
            <View
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
                  <View style={{ flex: 1, maxWidth: "70%" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginBottom: 5,
                      }}
                    >
                      {data?.name}
                    </Text>

                    <Text style={{ fontSize: 14, color: "gray" }}>
                      Revisions: {data?.revision}
                    </Text>
                  </View>
                  <TouchableOpacity
                  //   onPress={() => handleDownload(data.file)}
                  >
                    <Text>Download</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          {projectFiles?.map((data, index) => (
            <View
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
                  <View style={{ flex: 1, maxWidth: "70%" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginBottom: 5,
                      }}
                    >
                      {data?.name}
                    </Text>

                    <Text style={{ fontSize: 14, color: "gray" }}>
                      Revisions: {data?.revision}
                    </Text>
                  </View>
                  <TouchableOpacity
                  //   onPress={() => handleDownload(data.file)}
                  >
                    <Text>Download</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          {projectFiles?.map((data, index) => (
            <View
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
                  <View style={{ flex: 1, maxWidth: "70%" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginBottom: 5,
                      }}
                    >
                      {data?.name}
                    </Text>

                    <Text style={{ fontSize: 14, color: "gray" }}>
                      Revisions: {data?.revision}
                    </Text>
                  </View>
                  <TouchableOpacity
                  //   onPress={() => handleDownload(data.file)}
                  >
                    <Text>Download</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          {projectFiles?.map((data, index) => (
            <View
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
                  <View style={{ flex: 1, maxWidth: "70%" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginBottom: 5,
                      }}
                    >
                      {data?.name}
                    </Text>

                    <Text style={{ fontSize: 14, color: "gray" }}>
                      Revisions: {data?.revision}
                    </Text>
                  </View>
                  <TouchableOpacity
                  //   onPress={() => handleDownload(data.file)}
                  >
                    <Text>Download</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          {projectFiles?.map((data, index) => (
            <View
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
                  <View style={{ flex: 1, maxWidth: "70%" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginBottom: 5,
                      }}
                    >
                      {data?.name}
                    </Text>

                    <Text style={{ fontSize: 14, color: "gray" }}>
                      Revisions: {data?.revision}
                    </Text>
                  </View>
                  <TouchableOpacity
                  //   onPress={() => handleDownload(data.file)}
                  >
                    <Text>Download</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          {projectFiles?.map((data, index) => (
            <View
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
                  <View style={{ flex: 1, maxWidth: "70%" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginBottom: 5,
                      }}
                    >
                      {data?.name}
                    </Text>

                    <Text style={{ fontSize: 14, color: "gray" }}>
                      Revisions: {data?.revision}
                    </Text>
                  </View>
                  <TouchableOpacity
                  //   onPress={() => handleDownload(data.file)}
                  >
                    <Text>Download</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          {projectFiles?.map((data, index) => (
            <View
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
                  <View style={{ flex: 1, maxWidth: "70%" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginBottom: 5,
                      }}
                    >
                      {data?.name}
                    </Text>

                    <Text style={{ fontSize: 14, color: "gray" }}>
                      Revisions: {data?.revision}
                    </Text>
                  </View>
                  <TouchableOpacity
                  //   onPress={() => handleDownload(data.file)}
                  >
                    <Text>Download</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          {projectFiles?.map((data, index) => (
            <View
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
                  <View style={{ flex: 1, maxWidth: "70%" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginBottom: 5,
                      }}
                    >
                      {data?.name}
                    </Text>

                    <Text style={{ fontSize: 14, color: "gray" }}>
                      Revisions: {data?.revision}
                    </Text>
                  </View>
                  <TouchableOpacity
                  //   onPress={() => handleDownload(data.file)}
                  >
                    <Text>Download</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    elevation: 2,
    backgroundColor: Colors.PAPER,
    padding: 20,
    borderRadius: 10,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 20,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "gray",
  },
  downloadButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
  },
  downloadButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
