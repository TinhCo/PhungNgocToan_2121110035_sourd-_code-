import React from "react";
import Navigators from "./src/navigators";
import { Store } from "./src/Store";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import { CustomFonts } from "./src/contants";

export default () => {
  const [fontsLoaded] = useFonts(CustomFonts);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={Store}>
      <Navigators />
    </Provider>
  );
};
