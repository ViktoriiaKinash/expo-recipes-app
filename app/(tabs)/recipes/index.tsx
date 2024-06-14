import React, { useEffect } from "react";
import { View, StyleSheet, RefreshControl } from "react-native";
import RecipesApi from "@/api/RecipesApi";
import { RecipeType } from "@/api/RecipesApi/types";
import { FlashList } from "@shopify/flash-list";
import Recipe from "@/components/Recipe";
import { Searchbar } from "react-native-paper";

const Recipes = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [recipes, setRecipes] = React.useState<RecipeType[]>([]);
  const [filteredRecipes, setFilteredRecipes] = React.useState<RecipeType[]>(
    []
  );
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [refreshing]);

  const fetchRecipes = async () => {
    const recipes = await RecipesApi.getRecipes();
    setRecipes(recipes);
  };

  const filterRecipes = async () => {
    const filteredRecipes = await RecipesApi.dynamicSearch(searchQuery);
    setFilteredRecipes(filteredRecipes);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.searchbar}
        placeholder="Search"
        onChangeText={(value) => {
          setSearchQuery(value);
          filterRecipes();
        }}
        onClearIconPress={() => {
          setSearchQuery("");
          setFilteredRecipes([]);
        }}
        value={searchQuery}
      />
      <FlashList
        data={filteredRecipes.length > 0 ? filteredRecipes : recipes}
        renderItem={({ item }) => <Recipe {...item} />}
        estimatedItemSize={200}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Recipes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4e0df",
  },
  searchbar: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: "white",
    color: "#A38F85",
  },
});
