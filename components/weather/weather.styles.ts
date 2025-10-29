import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import { StyleSheet } from "react-native";

export const createStyles = () => {
  return StyleSheet.create({
    card: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: scale(18),
    },
    dailyLabel: {
      color: colors.label,
      fontSize: FontSize.FONT_15Px,
      fontFamily: typography.bold,
      lineHeight: scale(14),
    },
    dailyValue: {
      fontSize: FontSize.FONT_18Px,
      color: colors.gray,
      fontFamily: typography.medium,
    },
    iconImage: {},
  });
};
