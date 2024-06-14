import RecipesApi from "@/api/RecipesApi";
import { RecipeType } from "@/api/RecipesApi/types";
import Recipe from "@/components/Recipe";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect } from "react";
import { View, StyleSheet, RefreshControl } from "react-native";

const Home = () => {
  const [favRecipes, setFavRecipes] = React.useState<RecipeType[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const fetcFevhRecipes = async () => {
    const recipes = await RecipesApi.getFevRecipes();
    setFavRecipes(recipes);
  };

  useEffect(() => {
    fetcFevhRecipes();
  }, [refreshing]);

  return (
    <>
      <View style={styles.container}>
        <FlashList
          data={favRecipes}
          renderItem={({ item }) => <Recipe {...item} />}
          estimatedItemSize={200}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4e0df",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
