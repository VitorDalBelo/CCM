import { ActivityIndicator, Modal, View, StyleSheet } from "react-native"

type LoadingModalProps = {
    show: boolean
}
export default function LoadingModal({show}:LoadingModalProps){
    return(
        <Modal
        transparent
        visible={show}
        animationType="fade"
        >
            <View style={styles.backdrop}>
                <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
        </Modal>
    )

}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ scale: 1.5 }] 
      }
})