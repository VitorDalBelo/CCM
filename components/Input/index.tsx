import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Animated, TextInput, TouchableOpacity, View ,StyleSheet} from "react-native";

type InputType = {
    label:string,
    value:any,
    passwordType?:boolean,
    onChangeText?: ((text: string) => void) | undefined
}

export default function Input({label,value,passwordType , onChangeText}:InputType){
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const topPosition = useRef(new Animated.Value(0)).current;
    const paddingLeft = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if(value)setIsFocused(true);
        Animated.timing(paddingLeft, {
            toValue: isFocused ? 1 : 0,
            duration: 300,
            useNativeDriver: false
        }).start();
        Animated.timing(topPosition, {
            toValue: isFocused ? 1 : 0,
            duration: 300,
            useNativeDriver: false
        }).start();
    }, [isFocused]);
    const animatedTopPosition = topPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [35,0 ]
      });
    const animatedPaddingLeft = paddingLeft.interpolate({
        inputRange: [0, 1],
        outputRange: [10,0]
      });
    return(
        <View style={styles.inputContainer}>
        <Animated.Text style={[styles.title, { paddingLeft:animatedPaddingLeft, top:animatedTopPosition}]}>
          {label}
        </Animated.Text>

        
        <View style={styles.input}>
           <TextInput
              style={styles.textoInput}
              value={value}
              secureTextEntry={passwordType?!passwordVisible:undefined}
              onChangeText={onChangeText}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              maxLength={40}
           />
           {passwordType?
           <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.visibleIcon}>
              <MaterialIcons style={{zIndex:10}} name={passwordVisible ? 'visibility' : 'visibility-off'} size={24} color="white" />
           </TouchableOpacity>
           :<></>}
        </View>
      </View>

    )
} 

const styles = StyleSheet.create({
    inputContainer:{
      width:"80%",
      justifyContent:"center",
      alignItems:"center",
      position:"relative"
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
      fontFamily:"Baloo 2",
      color:"#A0A0A0",
      width:"80%",
      position:"absolute",
      top:35,
      paddingLeft:0
    },
  
    visibleIcon: {
       position: 'absolute',
       right: 0,
       height: '100%',
       width: '15%',
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#ccc',
    },
    input: {
       height: 40,
       paddingHorizontal: 10,
       justifyContent: 'center',
       borderWidth: 1,
       borderColor: '#ccc',
       borderRadius: 5,
       marginTop: 25,
       width:"80%"
    },
    textoInput: {
       fontSize: 16,
       fontFamily: 'RubikRegular',
    },
    buttonContainer: {
       height: 140,
       justifyContent: 'center',
    },
  
  });