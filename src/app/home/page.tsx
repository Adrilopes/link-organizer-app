import { useState, useCallback } from 'react';
import { View, Image, TouchableOpacity, FlatList, Modal, Text, Linking, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router'; 

import { styles } from "../../styles/styles-home"
import { colors } from "@/constants/colors";
import { categories } from '@/utils/categories';
import { linkStorage, LinkStorage  } from '@/storage/link-storage';

import { Link } from "@/components/link";
import { Option } from '@/components/option';
import { Categories } from "@/components/categories";
import { supabase } from '@/lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [link, setLink] = useState<LinkStorage>({} as LinkStorage);
  const [links, setLinks] = useState<LinkStorage[]>([]);
  const [category, setCategory] = useState(categories[0].name);

  async function getLinks() {
    try {
      const response = await linkStorage.get();
      
      const filtered = response.filter((link) => link.category === category);


      setLinks(filtered)
      
    } catch (error) {
      Alert.alert("Erro", "Não foi possível listar os links");
    }
  }

  function handleDetails(selectedLink: LinkStorage) {
    setShowModal(true);
    setLink(selectedLink);
  }

  async function linkRemove() {
    try {
      await linkStorage.remove(link.id);
      getLinks();
      setShowModal(false);
      
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir o link");
    }

  }

  function handleRemove() {
      Alert.alert(
        "Excluir", "Deseja realmente excluir este link?",[
          { style: "cancel", text: "Não" },
          { text: "Sim", onPress: linkRemove}
        ])
    } 

    

  async function handleOpen() {
    try {
      await Linking.openURL(link.url);
      setShowModal(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível abrir o link");
    }
  }

  const { setAuth } = useAuth();

  async function handleSignout() {
    const{ error } = await supabase.auth.signOut();
    setAuth(null);

    if (error) {
      Alert.alert("Error", "Não foi possível deslogar");
      return;
  }
}

  useFocusEffect(
    useCallback(() => {
      getLinks();
    }, [category])
  );

    return (
        <View style={styles.container}> 
          <TouchableOpacity onPress={handleSignout}>
            <Text style={styles.signOut}>Deslogar</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Image source={require("@/assets/logo.png")} style={styles.logo} />
                       
            <TouchableOpacity onPress={() => router.navigate("/add/page")}>
              <MaterialIcons name="add" size={32} color={colors.green[300]} />
            </TouchableOpacity>
          </View> 

          <Categories onChange={setCategory} selected={category}/>

          <FlatList
           data={links}
           keyExtractor={(item) => item.id}
           renderItem={({ item }) => (
            <Link 
            name={item.name}
            url={item.url}
            onDetails={() => handleDetails(item)}
            />
           )}
           style={styles.links}
           contentContainerStyle={styles.linksContent}
           showsVerticalScrollIndicator={false}
           />          

           <Modal transparent visible={showModal} animationType='slide'>
            <View style={styles.modal}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalCategory}>{link.category}</Text>
                  <TouchableOpacity onPress={() => setShowModal(false)}>
                    <MaterialIcons 
                    name="close" 
                    size={20} 
                    color={colors.gray[400]} 
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.modalLinkName}>
                  {link.name}
                </Text>

                <Text style={styles.modalUrl}>
                  {link.url}
                </Text>
                
                <View style={styles.modalFooter}>
                  <Option name="Excluir" icon="delete" variant="secondary" onPress={handleRemove}/>
                  <Option name="Abrir" icon="language" onPress={handleOpen} />
                </View>


              </View>  
            </View>
           </Modal>
        </View>
    )
}

