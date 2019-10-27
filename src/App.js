import React, {Component} from 'react';
import connect from '@vkontakte/vk-connect';
import {
    Avatar,
    Button,
    Cell,
    Epic,
    FormLayout,
    FormLayoutGroup,
    Group,
    HeaderButton,
    IOS,
    Panel,
    PanelHeader,
    platform,
    Tabbar,
    TabbarItem,
    View,
    ScreenSpinner
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import ApiService from "./services/ApiService";
import "./App.css";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import Checkbox from "@vkontakte/vkui/dist/components/Checkbox/Checkbox";

const osname = platform();

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'home',
            fetchedUser: null,
            popout: null,
            activeStory: 'feed',
            players: [],
            memberPanel: 'main',
            tokenPrice: '0',
            tokenCount: '0'
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


    }


    go = e => {
        //setActivePanel(e.currentTarget.dataset.to);
        this.setState({activePanel: e.currentTarget.dataset.to});
    };

    onStoryChange = (e) => {
        this.setState({activeStory: e.currentTarget.dataset.story})
    };

    openMember = (item) => {
        console.log(item);
        this.setState({memberPanel: 'view', currentMember: item});
    };

    issueToken = () => {
        this.setState({popout: <ScreenSpinner/>});

        ApiService.issueToken(this.state.tokenPrice, this.state.tokenCount, 'HelloToken')
            .then(data => {
                console.log(data);
            })
            .then(_ => {
                this.setState({popout: null});
            });
    };

    render() {
        const {currentMember} = this.state;
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
                <View id="feed" activePanel={this.state.memberPanel} >
                    <Panel id="main">
                        <PanelHeader>Members</PanelHeader>

                        <Group title="Members">
                            {this.state.players.map(item => {
                                return <Cell
                                    onClick={_ => {
                                        this.openMember(item);
                                    }}
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
                    </Panel>

                    <Panel id="view">
                        <PanelHeader
                            left={<HeaderButton onClick={() => this.setState({memberPanel: 'main'})}>{osname === IOS ?
                                <Icon28ChevronBack/> : <Icon24Back/>}</HeaderButton>}
                            addon={<HeaderButton
                                onClick={() => this.setState({memberPanel: 'main'})}>Назад</HeaderButton>}
                        >View Member</PanelHeader>

                        {currentMember && <Group title="Members">
                            <Cell

                                key={currentMember.photo}
                                description={currentMember.team}
                                //bottomContent={<Button>Buy</Button>}
                                bottomContent={<span className="Member-price">15 $</span>}
                                before={<Avatar
                                    className={"Main-photo"}
                                    src={currentMember.photo}
                                    size={80}/>}
                                size="l"
                            >
                                {currentMember.first_name} {currentMember.last_name}
                            </Cell>

                        </Group>}
                    </Panel>
                </View>

                <View id="discover" activePanel="discover" popout={this.state.popout}>
                    <Panel id="discover">
                        <PanelHeader>Issue token</PanelHeader>

                        <FormLayout>
                            <FormLayoutGroup top="Price">
                                <Input type="text" placeholder="0" alignment="center" value={this.state.tokenPrice}
                                       onChange={e => {
                                           this.setState({tokenPrice: e.target.value});
                                       }}/>
                            </FormLayoutGroup>
                            <FormLayoutGroup top="Count">
                                <Input type="text" placeholder="0" alignment="center" value={this.state.tokenCount}
                                       onChange={e => {
                                           this.setState({tokenCount: e.target.value});
                                       }}/>
                            </FormLayoutGroup>

                            <FormLayoutGroup top="Count">
                                <Checkbox checked={true}>I Agree with Private Policy</Checkbox>
                            </FormLayoutGroup>


                            <Button size="xl" level="secondary" onClick={this.issueToken}>Issue</Button>
                        </FormLayout>
                    </Panel>
                </View>

            </Epic>

        );
    }
}

export default App;

