<?php

use yii\db\Migration;

/**
 * Class m191026_104040_init
 */
class m191026_104040_init extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('player', [
            'id' => $this->primaryKey(),
            'first_name' => $this->string(),
            'last_name' => $this->string(),
            'photo' => $this->string(),
            'age' => $this->integer(),
            'team' => $this->string(),
            'subscribers' => $this->string(),

            'token_id' => $this->string(),
            'tokens_issued' => $this->integer()->unsigned(),
            'token_price' => $this->integer()->unsigned(),
            'token_name' => $this->string(),
            'token_ticker' => $this->string(),
            'is_price_grow' => $this->boolean(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m191026_104040_init cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m191026_104040_init cannot be reverted.\n";

        return false;
    }
    */
}
