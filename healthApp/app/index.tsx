import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from '@react-native-picker/picker';


type Questions = {
  key: string,
  prompt: string,
  required?: boolean,
  placeholder?: string,
}

const QUESTIONS: Questions[] = [
  {
    key: "name", prompt: "What is your name?", required: true, placeholder: "David"
  },
  {
    key: "age", prompt: "How old are you?", required: true, placeholder: "18"
  },
  {
    key: "email", prompt: "What is your email?", placeholder: "name@example.com"
  },
];

export default function Index() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  const [phase, setPhase] = useState<"landing" | "questions">("landing");

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const q = useMemo(() => QUESTIONS[step], [step]);
  const questionsCount = QUESTIONS.length;

  useEffect(() => {
    const checkOnboard = async () => {
      try {
        const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
        if(hasOnboarded === "true") {
          //just for now to test on board page
          //await AsyncStorage.setItem("hasOnboarded", "false");
          router.replace("/pages/scan")
        }

      } finally {
        setChecking(false);
      }
    }
    checkOnboard();
  }, [])

  if (checking) {
    return (<View/>)
  }

  const onChangeValue = (text: string) => {
    setAnswers(prev => ({...prev, [q.key]:text }));
  }

  const goNext = async () => {
    if(step + 1 >= questionsCount) {
      await AsyncStorage.setItem("hasOnboarded", "true");
      router.replace("/pages/scan")
    } else {
      setStep(step + 1)
    }
  }

  const goBack = () => {
    if(step != 0) {
      setStep(step - 1)
    } else {
      setPhase("landing")
    }
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <StatusBar style="dark"/>
      {phase === "landing" ? (
      <>
        <View style={styles.header}>
          <Text style={styles.title}>EasyHealth</Text>
        </View>

        <View style={styles.subHeader}>
          <Text style={styles.subTitle}>Make Health Easy</Text>
        </View>

        <View style={styles.footer}>
          <Pressable style={styles.getStartedButton} onPress={() => setPhase("questions")}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </Pressable>

          <Pressable style={styles.loginButton}>
            <Text style={styles.loginText}>Log in</Text>
          </Pressable>
        </View>
      </>
      ) : (
      <>
        <View style={{ paddingTop: 60 }}>

        <View style={styles.progressBars}>
              {Array.from({ length: questionsCount }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.bar,
                    i <= step ? styles.barActive : styles.barInactive
                  ]}
                />
              ))}
            </View>
          <Text style={styles.prompt}>{q.prompt}</Text>
        
          {q.key === "age" ? (
            
              <Picker
                selectedValue={answers[q.key] ?? "18"}
                onValueChange={(value) => onChangeValue(String(value))}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                {Array.from({ length: 99 }, (_, i) => (
                  <Picker.Item
                  key={i + 1}
                  label={`${i + 1}`}
                  color="rgb(102,178,255)"
                  />
                ))}
              </Picker>
            ) : (
              <TextInput
                style={styles.input}
                placeholder={q.placeholder}
                placeholderTextColor="#9aa0a6"
                value={answers[q.key] ?? ""}
                onChangeText={onChangeValue}
              />
                )}

        </View>
        
        <View style={styles.footer}>
          <View style={styles.row}>
            <Pressable
              onPress={goBack}
              style={styles.secondaryBtn}
              
            >
              <Text style={styles.secondaryText}>Back</Text>
            </Pressable>

            <Pressable
              onPress={goNext}
              style={styles.secondaryBtn}
            >
              <Text style={styles.secondaryText}>{step + 1 === questionsCount ? "Finish" : "Next"}</Text>
            </Pressable>

          </View>
        </View>

      </>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  },
  header: {
    alignItems: 'center',
    paddingTop: 24
  },
  title: {
    fontSize: 24,
    fontWeight: "700"
  },
  subHeader: {
    alignItems: 'center',
    paddingTop: 12
  },
  subTitle: {
    fontSize: 16,
    color: '#555'
  },
  footer: {
    paddingBottom: 16,
    gap: 12,
  },
  getStartedButton: {
    backgroundColor: 'rgb(102,178,255)',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center'
  },
  getStartedText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  loginButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  loginText: {
    color: 'rgb(102,178,255)',
    fontSize: 16,
    fontWeight: '600',
  },

  progress: { textAlign: "center", color: "#777", marginBottom: 6 },
  prompt: { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 14 },
  input: {
    borderWidth: 1, borderColor: "#ddd", borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 16,
  },

  row: { flexDirection: "row", gap: 12 },
  secondaryBtn: { 
    flex: 1, 
    paddingVertical: 14, 
    borderRadius: 12, 
    alignItems: "center", 
    borderWidth: 1, 
    borderColor: "#ddd" },
  secondaryText: { 
    color: "#111", 
    fontSize: 16, 
    fontWeight: "600" },

    progressBars: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
      marginBottom: 12,
    },
    bar: {
      width: 28,          // short dash
      height: 6,
      borderRadius: 3,
    },
    barActive: { backgroundColor: 'rgb(102,178,255)' },
    barInactive: { backgroundColor: '#e6eef6' },
    
    picker: {
      width: "100%",
      height: 180, // gives it scroll-wheel height
    },
    
    pickerItem: {
      color: "rgb(102,178,255)",
      fontSize: 18,
      fontWeight: "600",
    },
});

