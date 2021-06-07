import React, { useState } from 'react';

import {
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Modal,
    Alert,
    ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

import StatusBarPage from '../../components/StatusBarPage';
import Menu from '../../components/Menu';
import ModalLink from '../../components/ModalLink';

import api from '../../service/api';
import { getLinksSave, saveLink} from '../../utils/storeLinks';

import { 
    ContainerLogo, 
    Logo,
    ContainerContent,
    Title,
    SubTitle,
    ContainerInput,
    BoxIcon,
    Input,
    ButtonLink,
    ButtonLinkText
} from './styles';

const Home = () => {

    const [url, setUrl] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});

    async function handleShortLink() {
        setLoading(true);
        try {
            const response = await api.post('/shorten',
            {
                "long_url": `${url}`
            })
            setData(response.data);
            setModalVisible(true);

            saveLink('perviouslinks', response.data);

            Keyboard.dismiss();
            setLoading(false);
            setUrl('');

        } catch(error) {
            Alert.alert(
                `Algo deu errado`, 
                'Verifique se o link está correto e se você tem conexão com a internet'
            );
            Keyboard.dismiss();
            setUrl('');
            setLoading(false);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss()}>
            <LinearGradient
                colors={['#1DDBB9', '#132742']}
                style={{flex: 1, justifyContent: 'center'}}
            >
                <StatusBarPage
                    barStyle="light-content"
                    backgroundColor="#1DDBB9"
                />
                <Menu />
                <KeyboardAvoidingView
                    behavior={ Platform.OS === 'ios' ? 'padding' : 'position' }
                    enabled
                >
                    <ContainerLogo>
                        <Logo 
                            source={require('../../assets/Logo.png')} 
                            resizeMode="contain"
                        />
                    </ContainerLogo>
                    <ContainerContent>
                        <Title>PerviousLink</Title>
                        <SubTitle>Cole seu link para encurtar</SubTitle>
                        <ContainerInput>
                            <BoxIcon>
                                <Feather name="link" size={22} color="#FFF" />
                            </BoxIcon>
                            <Input 
                                placeholder="Cole seu link aqui"
                                placeholderTextColor="#FFF"
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="url"
                                value={url}
                                onChangeText={ text => setUrl(text) }
                            />
                        </ContainerInput>
                        <ButtonLink onPress={ handleShortLink }>
                            { loading ? (
                                <ActivityIndicator color="#121313" size={24} />
                            ) : (
                                <ButtonLinkText>
                                    Gerar Link
                                </ButtonLinkText>
                            )}
                        </ButtonLink>
                    </ContainerContent>
                </KeyboardAvoidingView>
                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="slide"
                >
                    <ModalLink onClose={ () => setModalVisible(false) } data={data} />
                </Modal>
            </LinearGradient>
        </TouchableWithoutFeedback>
    )
}

export default Home;