import React from 'react';
import {
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Share
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Clipboard from 'expo-clipboard';

import { 
    ModalContainer, 
    Container, 
    Header,
    LinkArea,
    Title,
    LongUrl,
    ShortLinkArea,
    ShortLinkUrl

} from './styles';

const ModalLink = ({ onClose, data }) => {

    function copyLink() {
        Clipboard.setString(`${data.link}`);
        alert('link copiado');
    }

    async function handleShare() {
        try {
            const result = await Share.share({
                message: `O link ${data.long_url} foi encurtado para ${data.link} \n usando o app PerviousLink`
            });

            if(result.action === Share.sharedAction) {
                if(result.activityType) {
                    console.log('ActivityType');
                } else {
                    console.log('Compartilhado');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Modal Fechado');
            }

        } catch(error) {
            console.log(error.message);
        }
    }

    return (
        <ModalContainer>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={{flex: 1}}></View>
            </TouchableWithoutFeedback>
            <Container>
                <Header>
                    <TouchableOpacity
                        onPress={onClose}
                    >
                        <Feather 
                            name="x"
                            size={30}
                            color="#212743"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleShare}
                    >
                        <Feather 
                            name="share"
                            size={30}
                            color="#212743"
                        />
                    </TouchableOpacity>
                </Header>
                <LinkArea>
                    <Title>link encurtado</Title>
                    <LongUrl 
                        numberOfLines={1} 
                    >
                        {data.long_url}
                    </LongUrl>

                    <ShortLinkArea
                        activeOpacity={1}
                        onPress={copyLink}
                    >
                        <ShortLinkUrl 
                            numberOfLines={1}
                        >
                            {data.link}
                        </ShortLinkUrl>
                        <TouchableOpacity
                            onPress={copyLink}
                        >
                            <Feather
                                name="copy"
                                size={25}
                                color="#FFF"
                            />
                        </TouchableOpacity>
                    </ShortLinkArea>
                </LinkArea>
            </Container>
        </ModalContainer>
    )
}

export default ModalLink;