import React, { useEffect } from "react";
import { Text, View, Image } from "react-native";
import RecipesApi from "@/api/RecipesApi";
import { RecipeType } from "@/api/RecipesApi/types";
import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

const SingleRecipe = () => {
  const params = useLocalSearchParams();
  const { id } = params;
  const [selectedRecipe, setSelectedRecipe] = React.useState<RecipeType>();

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await RecipesApi.getRecipes();
      setSelectedRecipe(recipes.find((recipe) => recipe.id == id));
    };

    fetchRecipes();
  }, [id]);

  const ingredientsList = selectedRecipe?.ingredients.split(", ");

  return (
    <>
      <Image
        style={styles.photo}
        source={{
          uri: selectedRecipe?.photo,
        }}
      />
      <View style={styles.smallContainer}>
        <Text style={styles.title}>{selectedRecipe?.title}</Text>
        <View style={styles.ingredients}>
          {ingredientsList?.map((ingredient) => (
            <Text style={styles.ingredient} key={ingredient}>
              {ingredient}
            </Text>
          ))}
        </View>
        <Text>{selectedRecipe?.description}</Text>
      </View>
    </>
  );
};

export default SingleRecipe;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  smallContainer: {
    paddingHorizontal: 16,
  },
  photo: {
    width: "100%",
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 12,
  },
  ingredient: {
    fontWeight: "bold",
    paddingVertical: 4,
  },
  ingredients: {
    paddingVertical: 12,
  },
});
