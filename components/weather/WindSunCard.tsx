import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface IWindSunCard {
  windSpeed: number;
  windDeg: number;
  sunrise: number;
  sunset: number;
}

const WindSunCard = ({ windSpeed, windDeg, sunrise, sunset }: IWindSunCard) => {
  const formatTime = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const getWindDirection = (deg: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(deg / 45) % 8];
  };

  return (
    <LinearGradient
      colors={[colors.card.primary, colors.card.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.card}
    >
      <View style={styles.row}>
        <View style={styles.item}>
          <Image
            source={require("@/assets/images/wind.png")}
            style={styles.iconImage}
            resizeMode="contain"
          />{" "}
          <Text style={styles.label}>Wind Speed</Text>
          <Text style={styles.value}>{(windSpeed * 3.6).toFixed(1)} km/h</Text>
        </View>
        <View style={styles.item}>
          <Image
            source={require("@/assets/images/sunrise.png")}
            style={styles.iconImage}
            resizeMode="contain"
          />
          <Text style={styles.label}>Sunrise</Text>
          <Text style={styles.value}>{formatTime(sunrise)}</Text>
        </View>
        <View style={styles.item}>
          <Image
            source={require("@/assets/images/sunset.png")}
            style={styles.iconImage}
            resizeMode="contain"
          />
          <Text style={styles.label}>Sunset</Text>
          <Text style={styles.value}>{formatTime(sunset)}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default WindSunCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: scale(20),
    padding: scale(16),
    marginVertical: scale(12),
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  item: {
    alignItems: "center",
    flex: 1,
  },
  label: {
    color: colors.white,
    fontSize: FontSize.FONT_14Px,
    fontFamily: typography.bold,
    marginTop: scale(4),
    textAlign: "center",
  },
  value: {
    color: colors.white,
    fontSize: FontSize.FONT_16Px,
    fontFamily: typography.medium,
    marginTop: scale(2),
    textAlign: "center",
  },
  iconImage: {
    width: scale(48),
    height: scale(48),
  },
});
