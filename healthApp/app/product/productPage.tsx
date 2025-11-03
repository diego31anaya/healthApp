import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function ProductPage({ data }: { data : any}){

  if(!data) return null;

  if(data.error) {
    return (
      <View>
        <Text>
          Error: Product not found
        </Text>
      </View>
    )
  }

  const { name, brand, image } = data;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {image && (
          <Image source={{ uri: image }} style={styles.image}/>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.brand}>{brand}</Text>
        </View>

        <View style={styles.safetyContainer}>
          <Text style={styles.safetyText}>Safe</Text>
        </View>


      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: 'rgb(102,178,255)',
  },
  brand: {
    fontSize: 16,
    color: 'gray',
    marginTop: 4,
  },
  safetyContainer: {
    marginTop: 24,
    alignItems: 'flex-start',
    backgroundColor: '#C9F7CA',        // light green interior
    borderColor: '#4CAF50',            // green border
    borderWidth: 2,
    borderRadius: 50,                  // oval shape
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  safetyText: {
    color: '#2E7D32',                 // darker green text
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
})

