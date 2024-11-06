import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
    Camera,
    useCameraDevice,
    useCodeScanner,
} from "react-native-vision-camera";

const QRCodeScanner = (props) => {
    const [hasPermission, setHasPermission] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const device = useCameraDevice("front");

    const codeScanner = useCodeScanner({
        codeTypes: ["qr"],
        onCodeScanned: (codes) => {
            // console.log(`onCodeScanned `, codes);
            console.log(`onCodeScanned value`, codes[0].value);
            props.onRead(codes[0].value);
        },
    });

    const onError = (error) => {
        console.log(error.message);
    }

    useEffect(() => {
        // exception case
        setRefresh(!refresh);
    }, [device, hasPermission]);

    useEffect(() => {
        const requestCameraPermission = async () => {
            console.log('REQUESTING PERMISSION');
            const permission = await Camera.requestCameraPermission();
            console.log("Camera.requestCameraPermission ", permission);
            setHasPermission(permission === "granted");
        };

        requestCameraPermission();
    }, []);

    if (device == null || !hasPermission) {
        return (
            <View style={styles.page2}>
                <Text style={{ backgroundColor: "white" }}>
                    Camera não disponível ou sem permissão de acesso
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.page2}>
            <Camera
                codeScanner={codeScanner}
                onError={onError}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
            />
            <View style={styles.backHeader}>
                <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={() => {
                        props.onRead(null);
                    }}
                >
                    <Text style={{ color: "white", fontSize: 14 }}>Voltar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={{
                        paddingVertical: 8,
                        paddingHorizontal: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: "white",
                        alignItems: "center",
                    }}
                    onPress={() => {
                        props.onRead(null);
                    }}
                >
                    <Text style={{ color: "white", fontSize: 14 }}>Fechar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default QRCodeScanner;

const styles = StyleSheet.create({
    page2: {
        flex: 1,
        position: "absolute",
        top: 0,
        width: 0,
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    backHeader: {
        backgroundColor: "#00000090",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        padding: "2%",
        height: "5%",
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "center",
    },
    footer: {
        backgroundColor: "#00000090",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "10%",
        height: "20%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});
