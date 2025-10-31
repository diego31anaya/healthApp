import { Tabs } from "expo-router";
import React from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function PagesLayout() {
    return (
        <Tabs
            screenOptions={{ headerShown: false,
                tabBarStyle: {
                    backgroundColor: 'white',
                    paddingTop: 4
                }
            }}
        >
            <Tabs.Screen
                name="history"
                options={{
                    title: "History",
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons name="history" size={24} color={focused? "rgb(102,178,255)": "black" } />
                    )
                }}
            />
            <Tabs.Screen
                name="scan"
                options={{
                    title: "Scan",
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons name="barcode-scan" size={24} color={focused ? "rgb(102,178,255)" : "black"} />
                    )
                }}
            />
        </Tabs>
    )
}