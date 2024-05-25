import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

const Search = () => {
  const [searchName, setSearchName] = React.useState("");

  return (
    <View style={styles.container}>
      <View style={styles.filterView}>
        <TextInput
          placeholder="Search"
          style={styles.input}
          value={searchName}
          onChangeText={setSearchName}
        />
        <TouchableOpacity style={{alignItems: "center", justifyContent: "center", marginBottom: 20}} onPress={() => alert("DO STUFF HERE WITH MAP")}>
          <Image
            source={require("../assets/location-icon.png")}
            style={styles.locationIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#e0f4fe",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    top: "20%",
    position: "absolute",
  },
  filterView: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    width: "95%",
    top: "10%",
  },
  input: {
    backgroundColor: "white",
    height: 50,
    borderRadius: 5,
    padding: 10,
    color: "black",
    fontSize: 18,
    marginBottom: 15,
    width: "75%",
  },
  locationIcon: {
    width: 30,
    height: 30,
    marginTop: "2.5%",
    marginLeft: "10%",
  },
});
