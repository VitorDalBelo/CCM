import Input from "@/components/Input";
import LoadingModal from "@/components/LoadingModal";
import { AuthContext, AuthContextType } from "@/context/Auth/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useRef, useState } from "react";
import { TextInput ,Text,View ,StyleSheet,Image, Pressable, Modal, TouchableOpacity, ActivityIndicator, Animated} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Login(){
  const {handleLogin,loading} = useContext(AuthContext) as AuthContextType;

  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");
    return(
      <SafeAreaView style={{
        position:"relative",height:"100%"
        
        }}>
        <LinearGradient
        colors={['#FFFFFF', '#F8F6FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }} 
        style={{height:"100%"}}
        >
        <Image
          source={require("@/assets/images/tecnico.png")}
          style={{width:"100%",zIndex:0,position:"relative",top:0,left:0}}
          />
        <View style={styles.formContainer}>


          <Input label="Usuário" value={email} onChangeText={setEmail}/>
          <Input label="Senha" value={password} onChangeText={setPassword} passwordType/>


          <Pressable style={styles.btn} onPress={() =>  handleLogin(email,password)} >
                <LinearGradient
                colors={["#73A2FD", "#4676D2"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: 150,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 100,
                  
                }}
                >
                  <Text style={{fontSize: 28,color:"white"}}>Entrar</Text>
                </LinearGradient>
            </Pressable>    

        </View>

        <LoadingModal show={loading}/>
        </LinearGradient>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
      formContainer:{
        zIndex:1,
        width:"100%",
        paddingVertical:"20%",
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"column",
        rowGap:10
      },
      btn:{
        marginTop:10
      }
  });
  