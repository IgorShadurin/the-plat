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
import "./App.css";


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

                        <div className="conter">
                            <div className="already_2">
                                <span className="text-white">Price, $</span>
                            </div>
                            <div className="number" align="center">


                                <span className="minus"><span className="text-success">-</span></span>
                                <input className="text" type="text" value="0" size="15"/>
                                <span className="plus"><span className="text-success">+</span></span>
                            </div>
                            <br/>
                                <div className="already_2">
                                    <span className="text-white">Count</span>
                                </div>
                                <div className="number" align="center">
                                    <span className="minus"><span className="text-success">-</span></span>
                                    <input className="text" type="text" value="0" size="15"/>
                                        <span className="plus"><span className="text-success">+</span></span>

                                </div>
                                <div className="already_1">
                                    <span className="text-success">Max <strong>100</strong> Tokens</span>
                                </div>
                                <br/>
                                    <div className="already">
                                        <span className="text-white">Already issued <span className="text-success">0 Token</span></span>
                                    </div>

                                    <div className="already">

                                        <span className="text-white">Token name: <span
                                            className="text-success">/Player_Name/</span></span>
                                    </div>
                                    <div className="already">
                                        <span className="text-white">Ticker: <span className="text-success">/ Based on token name /</span></span>
                                    </div>
                                    <div>
                                        <h1><label>
                                            <span>  <input className="checkbox" type="checkbox" name="val_1"
                                                           id="chbox1"/><span className="text-muted">   I Agree with Private Policy</span></span>
                                        </label></h1></div>
                                    <button type="button" className="btn btn-block login"><strong>ISSUE</strong>
                                    </button>

                        </div>
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

