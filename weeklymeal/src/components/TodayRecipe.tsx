import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { MenuItem, Recipe } from "../types/RecipeType";
import { RecipeContext } from "../contexts/RecipeContext";
import moment from "moment";

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
      <Text style={styles.title}>Hoy toca: {todaysRecipe.name} </Text>
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
    fontSize: 40,
    fontWeight: "500",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
  },
});
