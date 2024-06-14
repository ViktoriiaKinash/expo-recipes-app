import React, { useEffect } from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";

import type { Recipe } from "./types";
import { Text, IconButton } from "react-native-paper";
import { router } from "expo-router";
import RecipesApi from "@/api/RecipesApi";

const SingleDish: React.FC<Recipe> = ({
  id,
  title,
  description,
  ingredients,
  photo,
}) => {
  const ingredientsList = ingredients.split(", ");
  const [favRecipes, setFavRecipes] = React.useState<string[]>([]);

  const fetcFevhRecipes = async () => {
    const recipes = await RecipesApi.getFevRecipes();
    setFavRecipes(Array.from(recipes, (x) => x.id));
  };

  const handleFav = async (id: string) => {
    if (favRecipes.includes(id)) {
      await RecipesApi.removeFromFav(id);
    } else {
      await RecipesApi.addToFav(parseInt(id));
    }
    fetcFevhRecipes();
  };

  useEffect(() => {
    fetcFevhRecipes();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <IconButton
        icon={favRecipes.includes(id) ? "heart" : "heart-outline"}
        iconColor="#940000"
        style={styles.icon}
        size={50}
        onPress={() => handleFav(id)}
      />
      <Pressable
        onPress={() =>
          router.push({ pathname: "/recipes/recipe", params: { id } })
        }
      >
        <Image
          style={styles.photo}
          source={{
            uri: photo,
          }}
        />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.ingredients}>
          {ingredientsList.map((ingredient) => (
            <Text style={styles.ingredient} key={ingredient}>
              {ingredient}
            </Text>
          ))}
        </View>
        <Text>{description}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  photo: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 8,
  },
  ingredient: {
    fontWeight: "bold",
  },
  ingredients: {
    paddingVertical: 8,
  },
  icon: {},
});

export default SingleDish;
