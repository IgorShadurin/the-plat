<?php

use yii\db\Migration;

/**
 * Class m191027_101157_img
 */
class m191027_101157_img extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $players = [
            [
                'photo' => 'http://r.testeron.pro/img/1.jpg',
                'first_name' => 'Pierre-Emerick',
                'last_name' => 'Aubameyang',
                'age' => '30',
                'team' => 'Arsenal',
                'subscribers' => '9000000',
            ],
            [
                'photo' => 'http://r.testeron.pro/img/2.jpg',
                'first_name' => 'Thibaut',
                'last_name' => 'Courtois',
                'age' => '27',
                'team' => 'Real Madrid',
                'subscribers' => '6000000',
            ],
            [
                'photo' => 'http://r.testeron.pro/img/3.jpg',
                'first_name' => 'Eden',
                'last_name' => 'Hazard',
                'age' => '28',
                'team' => 'Real Madrid',
                'subscribers' => '28000000',
            ],
            [
                'photo' => 'http://r.testeron.pro/img/4.jpg',
                'first_name' => 'Tanguy',
                'last_name' => 'Ndombélé',
                'age' => '22',
                'team' => 'Tottenham',
                'subscribers' => '377000',
            ],
            [
                'photo' => 'http://r.testeron.pro/img/5.jpg',
                'first_name' => 'Philippe',
                'last_name' => 'Coutinho',
                'age' => '27',
                'team' => 'Bavaria Munich',
                'subscribers' => '21200000',
            ],
            [
                'photo' => 'http://r.testeron.pro/img/6.jpg',
                'first_name' => 'Gabriel',
                'last_name' => 'Barbosa',
                'age' => '23',
                'team' => 'Clube de Regatas do Flamengo',
                'subscribers' => '4100000',
            ],
            [
                'photo' => 'http://r.testeron.pro/img/7.jpg',
                'first_name' => 'Saúl',
                'last_name' => 'Ñíguez',
                'age' => '24',
                'team' => 'Atletico Madrid',
                'subscribers' => '1100000',
            ],
            [
                'photo' => 'http://r.testeron.pro/img/8.jpg',
                'first_name' => 'Ricardo',
                'last_name' => 'Pereira',
                'age' => '26',
                'team' => 'Leicester City',
                'subscribers' => '200000',
            ],
            [
                'photo' => 'http://r.testeron.pro/img/9.jpg',
                'first_name' => 'Declan',
                'last_name' => 'Rice',
                'age' => '20',
                'team' => 'West Ham United',
                'subscribers' => '198000',
            ],
            [
                'photo' => 'http://r.testeron.pro/img/10.jpg',
                'first_name' => 'Jorginho',
                'last_name' => '',
                'age' => '25',
                'team' => 'Chelsea',
                'subscribers' => '1000000',
            ],

        ];
        foreach ($players as $player) {
            $this->insert('player', [
                'first_name' => $player['first_name'],
                'last_name' => $player['last_name'],
                'photo' => $player['photo'],
                'age' => $player['age'],
                'team' => $player['team'],
                'subscribers' => $player['subscribers'],
            ]);
        }
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m191027_101157_img cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m191027_101157_img cannot be reverted.\n";

        return false;
    }
    */
}
