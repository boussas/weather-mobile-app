import assets from "@/assets";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import React from "react";
import { Image, Pressable, Text, StyleSheet, View } from "react-native";

interface IForeCast {
  temp: number;
  date: string;
  cloud: number;
  description?: string;
}

const ForeCastCard = ({ temp, cloud, date }: IForeCast) => {
  const { foggyCloud, sunnyCloud, rainyCloud } = assets;

  const getIcon = (cloudCoverage: number) => {
    switch (true) {
      case cloudCoverage <= 10:
        return sunnyCloud;
      case cloudCoverage > 10 && cloudCoverage <= 50:
        return sunnyCloud;
      case cloudCoverage > 50 && cloudCoverage < 90:
        return foggyCloud;
      case cloudCoverage >= 90:
        return rainyCloud;
      default:
        return sunnyCloud;
    }
  };

  return (
    <Pressable style={styles.card}>
      <Text style={styles.day}>{date}</Text>

      <View style={styles.cloudContainer}>
        <Image
          source={getIcon(cloud)}
          resizeMode="contain"
          style={styles.iconCloud}
        />
      </View>

      <Text style={styles.temp}>{temp}°</Text>
    </Pressable>
  );
};

export default ForeCastCard;

const styles = StyleSheet.create({
  card: {
    width: scale(50),
    paddingVertical: scale(12),
    marginRight: scale(4),
    backgroundColor: "rgba(255,255,255,0.1)",  
    borderRadius: scale(16),
    alignItems: "center",
    justifyContent: "flex-start",
    display: "flex",
  },
  day: {
    fontSize: FontSize.FONT_16Px,
    fontFamily: typography.bold,
    color: "#fff",
    marginBottom: scale(6),
    textAlign: "center",
  },
  cloudContainer: {
    height: scale(50),
    width: scale(50),
    marginBottom: scale(6),
    alignItems: "center",
    justifyContent: "center",
  },
  iconCloud: {
    height: "70%",
    width: "70%",
  },
  temp: {
    fontSize: FontSize.FONT_18Px,
    fontFamily: typography.bold,
    color: "#fff",
    marginBottom: scale(4),
    textAlign: "center",
  },
  description: {
    fontSize: FontSize.FONT_14Px,
    fontFamily: typography.medium,
    color: "#fff",
    textAlign: "center",
  },
});
