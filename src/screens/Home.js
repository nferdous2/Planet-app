import { View, FlatList, StyleSheet, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import Text from "../components/text/text";
import PlanetHeader from "../components/PlanetHeader";
import { colors } from "../theme/colors";
import { PLANET_LIST } from "../data/planet-list";
import { spacing } from "../theme/spacing";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PlanetItem = ({ item }) => {
  const { name, color } = item;
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Details", { planet: item });
      }}
      style={styles.item}
    >
      <View style={styles.item}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={[styles.circle, { backgroundColor: color }]} />
          <Text preset="h3" style={styles.itemName}>
            {name}
          </Text>
        </View>

        <AntDesign name="right" size={14} color="white" />
      </View>
    </Pressable>
  );
};


export default function Home({ navigation }) {
  const [list,setList] = useState(PLANET_LIST)
  const renderItem = ({ item }) => {
    return <PlanetItem item={item}></PlanetItem>;
  };

const searchFilter = (text) =>{

  const filteredList = PLANET_LIST.filter(item =>{
    const itemName = item.name.toLocaleLowerCase();
    const userTypedText = text.toLocaleLowerCase();
    return itemName.indexOf(userTypedText) >-1;
  })
  setList(filteredList)
  console.log("filteredList",filteredList)
}

  return (
    <View>
      <PlanetHeader></PlanetHeader>
      <TextInput
        placeholder="Type the planet name"
        placeholderTextColor={colors.white}
        autoCorrect={false}
        style={styles.searchInput}
        onChangeText={(text) => searchFilter(text)}
      ></TextInput>
      <FlatList
        contentContainerStyle={styles.list}
        data={list}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing[5],
    justifyContent: "space-between",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 30,
  },
  list: {
    padding: spacing[4],
  },
  itemName: {
    color: "white",
    marginLeft: spacing[5],
    textTransform: "uppercase",
  },
  separator: {
    borderWidth: 0.5,
    borderBottomColor: colors.white,
  },
  searchInput: {
    padding: spacing[4],
    color: colors.white,
    borderBottomColor: colors.white,
    borderBottomWidth: 0.5,
    margin: spacing[5],
  },
});
