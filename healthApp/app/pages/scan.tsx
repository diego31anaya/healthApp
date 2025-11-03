import { View, Text, StyleSheet, Pressable, AppState} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useFocusEffect, useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';

const scan = () => {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);

  const isFocused = useIsFocused();

  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
   
    if(!scanned) {
      setScanned(true)
      try {

        const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${data}.json`);
        const json = await response.json();


        if(json.status === 1 && json.product?.product_name) {
          const name = json.product.product_name
          const image = json.product.image_url;
          const brand = json.product.brands || 'Unknown brand';

          // router.push({
          //   pathname: `/product/${data}`,
          //   params: {
          //     name,
          //     brand,
          //     image
          //   }
          // });
        } else {
          setScanned(false)
          console.log("Product not found")
        }
      } catch (error) {
        setScanned(false)
        console.error(error)      
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