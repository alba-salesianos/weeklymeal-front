import { StyleSheet, TextInput, View, Text, Pressable } from "react-native";
import React from "react";
import { Menu } from "react-native-paper";
import { RecipeContext } from "../contexts/RecipeContext";
import { Recipe } from "../types/RecipeType";

const AddRecipe = () => {
  const { setRecipes } = React.useContext(RecipeContext);

  const addRecipe = () => {
    setRecipes((prevState: Recipe[]) => [...prevState, recipe]);
  };

  const [recipe, setRecipe] = React.useState<Recipe>({
    idRecipe: "",
    name: "",
    description: "",
    label: "",
    ingredients: "",
    steps: "",
  });

  const [typeMenuVisible, setTypeMenuVisible] = React.useState(false);

  const handleTypeSelect = (type: string) => {
    setRecipe((prevState) => ({
      ...prevState,
      type,
    }));
    setTypeMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text>Nombre</Text>
      <TextInput
        style={styles.inputs}
        placeholder="Inserte nombre..."
        value={recipe.name}
        onChangeText={(text) =>
          setRecipe((prevState) => ({ ...prevState, name: text }))
        }
      />
      <Text>Descripción</Text>
      <TextInput
        style={styles.inputs}
        placeholder="Inserte descripción..."
        value={recipe.description}
        onChangeText={(text) =>
          setRecipe((prevState) => ({ ...prevState, description: text }))
        }
      />
      <Text>Tipo</Text>
      <Menu
        visible={typeMenuVisible}
        onDismiss={() => setTypeMenuVisible(false)}
        anchor={
          <Pressable
            style={styles.inputs}
            onPress={() => setTypeMenuVisible(true)}
          >
            <Text>{recipe.label ? recipe.label : "Seleccionar tipo"}</Text>
          </Pressable>
        }
      >
        <Menu.Item
          onPress={() => handleTypeSelect("Proteína")}
          title="Proteína"
        />
        <Menu.Item onPress={() => handleTypeSelect("Fibra")} title="Fibra" />
        <Menu.Item
          onPress={() => handleTypeSelect("Hidratos")}
          title="Hidratos"
        />
      </Menu>

      <Text>Ingredientes</Text>
      <TextInput
        style={styles.inputs}
        placeholder="Inserte indredientes..."
        value={recipe.ingredients}
        onChangeText={(text) =>
          setRecipe((prevState) => ({ ...prevState, ingredients: text }))
        }
      />

      <Text>Pasos</Text>
      <TextInput
        style={styles.inputs}
        placeholder="Inserte pasos..."
        value={recipe.steps}
        onChangeText={(text) =>
          setRecipe((prevState) => ({ ...prevState, steps: text }))
        }
      />

      <Pressable style={styles.button} onPress={addRecipe}>
        <Text>Añadir receta</Text>
      </Pressable>
    </View>
  );
};

export default AddRecipe;

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    margin: 50,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 10,
    backgroundColor: "#f8d7d2",
  },
  inputs: {
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
});
