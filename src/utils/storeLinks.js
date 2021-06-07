import AsyncStorage from '@react-native-async-storage/async-storage';
import MyLinks from '../pages/MyLinks';

export async function getLinksSave(key) {
    const myLinks = await AsyncStorage.getItem(key);

    let linkSaves = JSON.parse(myLinks) || [];

    return linkSaves;
}

export async function saveLink(key, newLink) {
    let linksStored = await getLinksSave(key);

    const hasLink = linksStored.some(link => link.id === newLink.id);

    if(hasLink) {
        return;
    };

    linksStored.push(newLink);
    await AsyncStorage.setItem(key, JSON.stringify(linksStored));
}

export async function deleteLink(links, id) {
    let myLinks = links.filter( (item) => {
        return (item.id !== id);
    })

    await AsyncStorage.setItem('perviouslinks', JSON.stringify(myLinks));
    return myLinks;
}