import { SectionList, View, Alert, SectionListData } from "react-native"
import { Feather } from '@expo/vector-icons'
import { useState, useEffect } from 'react'
import { styles } from './styles'
import * as Contacts from 'expo-contacts'
import { Input } from "@/app/components/input"
import { theme } from "@/theme"
import { Contact, ContactProps } from "@/app/components/contact"

type SectionListDataProps = {
    title: string
    data: ContactProps // contato ja está tipado
}

export function Home(){
    const [contacts, setContacts] = useState<SectionListDataProps[]>([])



    async function fetchContacts() {
        try {
            const { status } = await Contacts.requestPermissionsAsync()
            if (status === Contacts.PermissionStatus.GRANTED){
                const { data } = await Contacts.getContactsAsync()
                console.log(data)
            }
        } catch(error){
            console.log(error)
            Alert.alert("Contatos", "Não foi possivel carregar os contatos...")        
        }
    } 
    useEffect(() => {
        fetchContacts()
    },[])

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
            <SectionList
                sections={[{title: "R", data: [{id: "1", name: "Heloisa"}] }]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <Contact contact={{
                    name: item.name,
                    image: require("@/assets/avatar.jpeg")
            }} 
            />
        )}
        renderSectionHeader={({ section }) =>
             (<Text style={styles.section}>{section.title}</Text>)}
          contentContainerStyle = {styles.contentList}  
        />
        </View>
    )
}