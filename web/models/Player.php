<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "player".
 *
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string $photo
 * @property int $age
 * @property string $team
 * @property string $subscribers
 * @property string $token_id
 * @property int $tokens_issued
 * @property int $token_price
 * @property string $token_name
 * @property string $token_ticker
 * @property int $is_price_grow
 */
class Player extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'player';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['age', 'tokens_issued', 'token_price', 'is_price_grow'], 'integer'],
            [['first_name', 'last_name', 'photo', 'team', 'subscribers', 'token_id', 'token_name', 'token_ticker'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'first_name' => Yii::t('app', 'First Name'),
            'last_name' => Yii::t('app', 'Last Name'),
            'photo' => Yii::t('app', 'Photo'),
            'age' => Yii::t('app', 'Age'),
            'team' => Yii::t('app', 'Team'),
            'subscribers' => Yii::t('app', 'Subscribers'),
            'token_id' => Yii::t('app', 'Token ID'),
            'tokens_issued' => Yii::t('app', 'Tokens Issued'),
            'token_price' => Yii::t('app', 'Token Price'),
            'token_name' => Yii::t('app', 'Token Name'),
            'token_ticker' => Yii::t('app', 'Token Ticker'),
            'is_price_grow' => Yii::t('app', 'Is Price Grow'),
        ];
    }

    public static function getPlayers($limit = 50)
    {
        $result = self::find()
            ->limit($limit)
            ->asArray()
            ->all();
        return $result;
    }

    public static function getPlayer($id)
    {
        return self::findOne($id)->toArray();
    }

    public static function create($firstName, $lastName, $photo, $age, $team)
    {
        $model = new self();
        $model->first_name = $firstName;
        $model->last_name = $lastName;
        $model->photo = $photo;
        $model->age = $age;
        $model->team = $team;
        $model->save();

        return $model;
    }
}
