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
    Radio, Search, Alert, Group, Cell
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Home from './panels/Home';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import ApiService from "./services/ApiService";
import "./App.css";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import Checkbox from "@vkontakte/vkui/dist/components/Checkbox/Checkbox";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'home',
            fetchedUser: null,
            popout: null,
            activeStory: 'feed',
            players: []
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
            .then(players => {
                console.log(players);
                this.setState({players: players.result});
            });

        ApiService.issueToken(112, 100, 'HelloMoto')
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
                        text="Members"
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
                        <PanelHeader>Members</PanelHeader>

                        <Group title="Members">
                            {this.state.players.map(item => {
                                return <Cell
                                    key={item.photo}
                                    description={item.team}
                                    //bottomContent={<Button>Buy</Button>}
                                    bottomContent={<span className="Member-price">15 $</span>}
                                    before={<Avatar
                                        className={"Main-photo"}
                                        src={item.photo}
                                        size={80}/>}
                                    size="l"
                                >
                                    {item.first_name} {item.last_name}
                                </Cell>;
                            })}
                        </Group>

                        {/*<div className="conter">
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
                                <span className="text-white">Already issued <span
                                    className="text-success">0 Token</span></span>
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

                        </div>*/}
                    </Panel>
                </View>

                <View id="discover" activePanel="discover">
                    <Panel id="discover">
                        <PanelHeader>Issue token</PanelHeader>

                        <FormLayout>
                            <FormLayoutGroup top="Price">
                                <Input type="text" defaultValue="0" alignment="center"/>
                            </FormLayoutGroup>
                            <FormLayoutGroup top="Count">
                                <Input type="text" defaultValue="0" alignment="center"/>
                            </FormLayoutGroup>

                            <FormLayoutGroup top="Count">
                                <Checkbox>I Agree with Private Policy</Checkbox>
                            </FormLayoutGroup>


                            <Button size="xl" level="secondary">Issue</Button>
                        </FormLayout>
                    </Panel>
                </View>

            </Epic>

        );
    }
}

export default App;

