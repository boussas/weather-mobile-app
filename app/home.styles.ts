import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import { StyleSheet } from "react-native";
export const createStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    background: {
      flex: 1,
    },
    sun: {
      position: "absolute",
      height: scale(620),
      width: "150%",
      top: "5%",
    },
    loader: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      paddingHorizontal: scale(18),
      paddingTop: scale(50),
      flex: 1,
    },
    header: {
      paddingHorizontal: scale(18),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerText: {
      fontSize: FontSize.FONT_15Px,
      color: colors.gray,
      fontFamily: typography.semiBold,
    },
    headerDate: {
      fontSize: FontSize.FONT_15Px,
      color: colors.gray,
      fontFamily: typography.regular,
    },
    hamburger: {
      borderWidth: 1,
      borderColor: colors.white,
      borderRadius: scale(100),
      height: scale(40),
      width: scale(40),
      alignItems: "center",
      justifyContent: "center",
    },
    main: {
      flex: 1,
    },
    tempContainer: {
      alignItems: "center",
    },
    cityText: {
      fontSize: FontSize.FONT_18Px,
      color: colors.gray,
      fontFamily: typography.medium,
      lineHeight: scale(20),
      marginTop: scale(6),
    },
    tempText: {
      color: colors.black,
      fontSize: FontSize.FONT_91Px,
      fontFamily: typography.medium,
      marginVertical: scale(1),
    },
    degree: {
      fontSize: FontSize.FONT_70Px,
    },
    tempInfo: {
      fontSize: FontSize.FONT_14Px,
      color: colors.gray,
      fontFamily: typography.regular,
      marginBottom: scale(28),
    },
    br24: {
      borderRadius: scale(24),
    },
    cardContainer: {
      paddingVertical: scale(12),
      paddingHorizontal: scale(18),
      flexDirection: "row",
      justifyContent: "space-between",
    },
    cardVertical: {
      paddingVertical: scale(18),
      paddingHorizontal: scale(18),
      borderRadius: scale(24),
      flex: 1,
      position: "relative",
      overflow: "hidden",
    },
    dailyLabel: {
      color: colors.label,
      fontSize: FontSize.FONT_12Px,
      fontFamily: typography.regular,
      lineHeight: scale(14),
    },
    searchContainer: {
      flex: 0.6,
      borderTopRightRadius: scale(30),
      borderTopLeftRadius: scale(30),
      backgroundColor: colors.white,
      paddingTop: scale(22),
      zIndex: 99999,
    },
    inputContainer: {
      paddingHorizontal: scale(12),
    },
    searchResult: {
      paddingHorizontal: scale(12),
      paddingVertical: scale(12),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    searchText: {
      fontSize: FontSize.FONT_14Px,
      fontFamily: typography.regular,
    },
    searchTemp: {
      fontFamily: typography.medium,
    },
    searchView: {
      marginHorizontal: scale(12),
      borderRadius: scale(4),
    },
  });
};
