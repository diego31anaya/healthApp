import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'


const history = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(false)

  const snapPoints = ['40%']

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index)
    setIsOpen(true)
  }, [])
  
  return (
    <View style={[{ flex: 1 }, { backgroundColor: 'white '}]}>
        <View style={styles.header}>
            <Pressable onPress={() => handleSnapPress(1)}>
                <Text style={styles.favoritesText}>
                    Favorites
                </Text>
            </Pressable>

            <Pressable>
                <AntDesign name="info-circle" size={22} color='rgb(102,178,255)'/>
            </Pressable>
        </View>

        <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => setIsOpen(false)}
        index={-1}
        >
            <BottomSheetView>
              <Text>Hello</Text>
            </BottomSheetView>
        </BottomSheet>
    </View>
  )
}

export default history

const styles = StyleSheet.create({
    header: {
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