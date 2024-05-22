import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import moment from "moment";
import { RecipeContext } from "../../contexts/RecipeContext";
import { MenuItem, Recipe } from "../../types/RecipeType";

const TodayRecipe = () => {
  const { currentMenu } = React.useContext(RecipeContext);

  const [todaysRecipe, setTodaysRecipe] = useState<Recipe>({
    idRecipe: "",
    name: "",
    description: "",
    label: "proteína",
    ingredients: "",
    steps: "",
  });

  const currentDate = moment().format("dddd");

  const determineTodayRecipe = () => {
    //return currentDate;
    currentMenu.map((menuItem: MenuItem) => {
      if (menuItem.day === currentDate) {
        console.log("Entras aquí?");
        return setTodaysRecipe(menuItem.recipe);
      }
    });
  };

  React.useEffect(() => {
    return () => {
      determineTodayRecipe();
      console.log(currentDate);
      console.log(todaysRecipe);
    };
  }, [todaysRecipe]);

  return (
    <View>
      <Text style={styles.title}>
        {" "}
        {currentMenu.length > 1
          ? `Hoy toca:  ${todaysRecipe.name}`
          : "No se ha generado menú"}
      </Text>
    </View>
  );
};

export default TodayRecipe;

const styles = StyleSheet.create({
  title: {
    borderRadius: 30,
    margin: 30,
    padding: 20,
    textAlign: "center",
    fontSize: 35,
    fontWeight: "500",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
  },
});
