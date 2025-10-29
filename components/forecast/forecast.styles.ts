import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { StyleSheet } from "react-native";
export const createStyles = () => {
  return StyleSheet.create({
    dayContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      columnGap: scale(14),
    },
    iconCloud: {
      height: scale(64),
      width: scale(64),
    },
    cloudContainer: {
      height: scale(60),
      width: scale(60),
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
    },
    degreeContainer: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      borderColor: colors.white,
      borderRadius: scale(30),
    },
    aic: {
      fontSize: FontSize.FONT_30Px,
    },
  });
};
