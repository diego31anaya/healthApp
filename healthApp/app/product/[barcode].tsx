import { View, Text, Pressable, StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView, SafeAreaProvider, SafeAreaInsetsContext, useSafeAreaInsets,
} from 'react-native-safe-area-context';

const ProductPage = () => {
  const { name } = useLocalSearchParams<{ name?: string }>();

  const router = useRouter();
 
  return (
    <SafeAreaView style={[{ flex: 1 }, { backgroundColor: 'white '}]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>
            {"<"} Back
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
    
  )
}

export default ProductPage

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20, // leaves room for notch/status bar
    paddingBottom: 12,
  },
  backText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgb(102,178,255)',
  }
})