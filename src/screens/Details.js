import React from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Linking,
} from "react-native";
import PlanetHeader from "../components/PlanetHeader";
import Text from "../components/text/text";
import {
  EarthSvg,
  JupiterSvg,
  MarsSvg,
  MercurySvg,
  NeptuneSvg,
  SaturnSvg,
  UranusSvg,
  VenusSvg,
} from "../svg";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { AntDesign } from "@expo/vector-icons";

const PlanetSection = ({ title, value }) => {
  return (
    <View style={styles.planetSection}>
      <Text
        preset="small"
        style={{ textTransform: "uppercase", color: "white" }}
      >
        {title}
      </Text>
      <Text preset="h2">{value}</Text>
    </View>
  );
};

export default function Details({ navigation, route }) {
  const planet = route.params.planet;
  const {
    name,
    description,
    rotationTime,
    revolutionTime,
    radius,
    avgTemp,
    wikiLink,
  } = planet;
  console.log(planet, "PLANET..");

  const renderImage = (name) => {
    switch (name) {
      case "mercury":
        return <MercurySvg></MercurySvg>;
      case "earth":
        return <EarthSvg />;
      case "jupiter":
        return <JupiterSvg />;
      case "neptune":
        return <NeptuneSvg />;
      case "saturn":
        return <SaturnSvg />;
      case "uranus":
        return <UranusSvg />;
      case "venus":
        return <VenusSvg />;
      case "mars":
        return <MarsSvg />;
    }
  };

  const onPressLink = () => {
    Linking.openURL(wikiLink);
  };
  return (
    <SafeAreaView style={styles.container}>
      <PlanetHeader backBtn={true}></PlanetHeader>
      <ScrollView>
        <View style={styles.imageView}>{renderImage(name)}</View>

        <View style={styles.detailsView}>
          <Text preset="h1" style={styles.name}>
            {name}
          </Text>
          <Text style={styles.description}>{description}</Text>
          <Pressable onPress={onPressLink} style={styles.source}>
            <Text>Source:</Text>
            <Text style={styles.wikipedia}>weikipidia</Text>
            <AntDesign name="rightcircle" size={14} color="white" />
          </Pressable>
        </View>

        <PlanetSection title="ROTATION TIME" value={rotationTime} />
        <PlanetSection title="REVOULATION TIME" value={revolutionTime} />
        <PlanetSection title="RADIUS" value={radius} />
        <PlanetSection title="AVERAGE TIME" value={avgTemp} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  imageView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing[8],
  },
  detailsView: {
    marginTop: spacing[10],
    marginHorizontal: spacing[6],
  },
  name: {
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: spacing[8],
  },
  description: {
    marginTop: spacing[5],
    alignItems: "center",
    lineHeight: 25,
  },
  source: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: spacing[5],
  },
  wikipedia: {
    textTransform: "capitalize",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  planetSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[4],
    borderWidth: 1,
    borderColor: colors.grey,
    marginHorizontal: spacing[6],
    marginBottom: spacing[4],
    borderColor: "white",
    marginTop: spacing[5],
  },
});
