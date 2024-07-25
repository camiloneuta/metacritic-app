import React from "react";
import { useEffect, useState } from "react";

import { FlatList, View, ActivityIndicator } from "react-native";
import { getLatestGames } from "../.lib/metacritic";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AnimatedGameCard } from "./GameCard";
import { Logo } from "./logo";

export function Main() {
  const [games, setGames] = useState([]);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    getLatestGames().then((games) => {
      setGames(games);
    });
  }, []);
  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View style={{ marginBottom: 30, alignItems: "center", marginTop: 15 }}>
        <Logo />
      </View>
      {games.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          data={games}
          keyExtractor={(game) => game.slug}
          renderItem={({ item, index }) => <AnimatedGameCard game={item} />}
        ></FlatList>
      )}
    </View>
  );
}
