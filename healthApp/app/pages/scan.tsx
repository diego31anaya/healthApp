import { View, Text, StyleSheet, Pressable, AppState} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useFocusEffect, useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'

import ProductPage from '../product/productPage';

import AsyncStorage from '@react-native-async-storage/async-storage';

const scan = () => {

  const [productData, setProductData] = useState<any | null>(null);

  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);

  const isFocused = useIsFocused();

  const [scanned, setScanned] = useState(false);

  const sheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(false)

  const snapPoints = ['20%']

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index)
    setIsOpen(true)
  }, [])

  const handleSheetClose = () => {
    setIsOpen(false)
    setScanned(false)
  }

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
   
    if(!scanned) {
      
      setScanned(true)
      try {

        const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${data}.json`);
        const json = await response.json();


        if(json.status === 1 && json.product) {
          //get all the informaiton you want from the barcode
          const name = json.product.product_name || 'Unknown product'
          const brand = json.product.brands || 'Unknown brand';
          const image = json.product.image_url || null;

          setProductData({ name, brand, image })
          
          handleSnapPress(1);

        }
      } catch (error) {
        setScanned(false)
        console.error(error);

        setProductData({ error: true })
        handleSnapPress(1);
      }
    }
  }

  
  return (
    <View style={{ flex: 1}}>
      {!isPermissionGranted ? (
        <View style={styles.requestContainer}>
          <Pressable style={styles.requestButton} onPress={requestPermission}>
            <Text style={styles.requestText}>
              Enable Camera Permissions
            </Text>
          </Pressable>
        </View>
      ) :  (
        <CameraView style={{ flex: 1 }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        active={isFocused}
        >

          <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={handleSheetClose}
          index={-1}
          >
              <BottomSheetView>
                {productData ? 
                <ProductPage data={productData} /> : 
                <Text>Loading</Text>}

              </BottomSheetView>
          </BottomSheet>
          
        </CameraView>
      )}
    </View>
  )
}

export default scan

const styles = StyleSheet.create({
  requestContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  requestButton: {
    backgroundColor: 'rgb(102,178,255)',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 24,
  },
  requestText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
})