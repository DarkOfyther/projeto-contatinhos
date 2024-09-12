import { View } from "react-native"
import { Feather } from '@expo/vector-icons'
import * as Contacts from 'expo-contacts'
import { styles } from './styles'
import { Input } from "@/app/components/input"
import { theme } from "@/theme"
import { useState } from "react"
import { Contact } from "@/app/components/contact"

export function Home(){
    const [name, setName] = useState("")

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Input style={styles.input}>
                    <Feather name="search" size={16} color={theme.colors.gray_300}>
                    </Feather>
                    <Input.Field 
                    placeholder="Pesquisar pelo nome..." onChangeText={setName} value={name}
                    />
                    <Feather name="x" size={16}color={theme.colors.gray_300} 
                    onPress={() => setName("")}>
                    </Feather>
                </Input>
            </View>
            <Contact contact={{
                name: "Pedroso",
                image: require("@/assets/avatar.jpeg")
            }} />
        </View>
    )
}