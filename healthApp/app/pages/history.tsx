import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

const history = () => {
  return (
    <View style={[{ flex: 1 }, { backgroundColor: 'white '}]}>
        <View style={styles.topContainer}>
            <Pressable>
                <Text style={styles.favoritesText}>
                    Favorites
                </Text>
            </Pressable>

            <Pressable>
                <AntDesign name="info-circle" size={22} color='rgb(102,178,255)'/>
            </Pressable>
        </View>
    </View>
  )
}

export default history

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50, // leaves room for notch/status bar
        paddingBottom: 12,
      },
      favoritesText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'rgb(102,178,255)',
      }
})