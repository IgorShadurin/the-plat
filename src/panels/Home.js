import React, {Component} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Icon24Like from '@vkontakte/icons/dist/24/like';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        let {id, go, fetchedUser, logo, selectFriend} = this.props;
        return (
            <Panel id={id}>
                <PanelHeader>ThePlat</PanelHeader>

                <Group /*title="Нажмите кнопку"*/>


                    <Div>
                        <p>Выберите человека, которого вы любите. Приложение скажет любит он вас или нет.</p>
                        <p>ВНИМАНИЕ! Это можно сделать один раз!</p>
                    </Div>

                    <Div>
                        <Button disabled={this.state.getReasonDisabled} before={<Icon24Like/>} size="xl"
                                level="outline" onClick={() => {

                        }}>
                            ВЫБРАТЬ ЛЮБОВЬ
                        </Button>
                    </Div>

                </Group>

            </Panel>
        );
    }
}

export default Home;
