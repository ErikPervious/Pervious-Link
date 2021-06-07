import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Modal } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import StatusBarPage from '../../components/StatusBarPage';
import Menu from '../../components/Menu';
import ListItem from '../../components/ListItem';
import ModalLink from '../../components/ModalLink';

import { getLinksSave, deleteLink } from '../../utils/storeLinks';

import { 
    Container, 
    Title,
    ListLinks,
    ContainerEmpty,
    WarningText,
    CreateLink,
    CreateLinkText
} from './styles';

const MyLinks = ({ navigation }) => {

    const [links, setLinks] = useState([]);
    const [data, setData] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const isFocused = useIsFocused();

    useEffect(() => {

        async function getLinks() {
            const result = await getLinksSave('perviouslinks');
            setLinks(result);
            setLoading(false);
        }
        getLinks();

    }, [isFocused])

    function handleItem(item) {
        setData(item);
        setModalVisible(true);
    }

    async function handleDelete(id) {
        const result = await deleteLink(links, id);
        setLinks(result);
    }

    return (
        <Container>
            <StatusBarPage
                barStyle="light-content"
                backgroundColor="#132742"
            />
            <Menu />
            <Title>Meus Links</Title>



            { loading && (
                <ContainerEmpty>
                    <ActivityIndicator color="#FFF" size={25} />
                </ContainerEmpty>
            )}

            {!loading && links.length === 0 && (
                <ContainerEmpty>
                    <WarningText>Você não tem links encurtados.</WarningText>
                    <CreateLink onPress={() => navigation.navigate('Home')}>
                        <Feather name="link" size={25} color="#FFF" />
                        <CreateLinkText>ENCURTAR LINK</CreateLinkText>
                    </CreateLink>
                </ContainerEmpty>
            )}
            <ListLinks
                data={links}
                keyExtractor={ (item) => String(item.id) }
                renderItem={ ({ item }) => <ListItem data={item} selectedItem={handleItem} deleteItem={handleDelete}/> }
                contentContainerStyle={{ paddinBottom: 20 }}
                showVerticalScrollIndicator={false}
            />
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
            >
                <ModalLink onClose={ () => setModalVisible(false) } data={data} />
            </Modal>
        </Container>
    )
}

export default MyLinks;