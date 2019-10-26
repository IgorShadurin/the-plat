import React, {Component} from 'react';
import connect from '@vkontakte/vk-connect';
import {
    View,
    Panel,
    PanelHeader,
    Button,
    Div,
    Epic,
    FormLayout,
    FormLayoutGroup,
    HeaderButton,
    IS_PLATFORM_ANDROID,
    IS_PLATFORM_IOS,
    ModalPage,
    ModalPageHeader,
    ModalRoot,
    Spinner,
    Tabbar,
    TabbarItem,
    ModalCard,
    Avatar,
    SelectMimicry,
    Radio, Search, Alert
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Home from './panels/Home';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import ApiService from "./services/ApiService";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'home',
            fetchedUser: null,
            popout: null,
            activeStory: 'feed'
        };


        this.isTest = false;
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            // dev code
        } else {
            // production code
            this.isTest = false;
        }
    }

    componentDidMount() {
        connect.subscribe(({detail: {type, data}}) => {
            /*if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }*/
        });

        const schemeAttribute = document.createAttribute('scheme');
        schemeAttribute.value = 'client_dark';
        document.body.attributes.setNamedItem(schemeAttribute);

        ApiService.getPlayers()
            .then(data => {
                console.log(data);
            });
    }


    go = e => {
        //setActivePanel(e.currentTarget.dataset.to);
        this.setState({activePanel: e.currentTarget.dataset.to});
    };

    onStoryChange = (e) => {
        this.setState({activeStory: e.currentTarget.dataset.story})
    };

    render() {
        return (
            <Epic activeStory={this.state.activeStory} tabbar={
                <Tabbar>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'feed'}
                        data-story="feed"
                        text="Players"
                    ><Icon28Newsfeed/>
                    </TabbarItem>

                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'discover'}
                        data-story="discover"
                        text="Issue token"
                    ><Icon28Search/>
                    </TabbarItem>

                </Tabbar>
            }>
                <View id="feed" activePanel="feed">
                    <Panel id="feed">
                        <PanelHeader>Players</PanelHeader>
                    </Panel>
                </View>

                <View id="discover" activePanel="discover">
                    <Panel id="discover">
                        <PanelHeader>Issue token</PanelHeader>
                    </Panel>
                </View>

            </Epic>

        );
    }
}

export default App;

