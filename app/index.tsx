import React, { useState, useRef } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, Animated, Easing,
} from "react-native";

const App = () => {
  const [coinSide, setCoinSide] = useState("Heads");
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const flipCoin = () => {
    const randomSide = Math.floor(Math.random() * 2);

    // Create a flip animation
    Animated.timing(flipAnimation, {
      toValue: 3,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      // Reset the animation value and set the
      // coin side based on the random result
      flipAnimation.setValue(0);
      if (randomSide === 0) {
        setCoinSide("Heads");
      } else {
        setCoinSide("Tails");
      }
    });
  };

  const rotateY = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"], // Full rotation
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tap the coin!</Text>
      <View style={styles.coinContainer}>
        {coinSide && (
          <TouchableOpacity onPress={flipCoin}>
            <Animated.Image
              source={
                coinSide === "Heads"
                  ? require("@/assets/images/head.png")
                  : require("@/assets/images/tail.png")
              }
              style={[
                styles.coinImage,
                {
                  transform: [{ rotateY }], // Apply the rotation animation
                },
              ]}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e1e1e",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: 1,
  },
  coinContainer: {
    marginBottom: 30,
  },
  coinImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Circle image
  },
});

export default App;
