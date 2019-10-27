<?php

namespace app\controllers;

use app\models\Player;
use Yii;
use yii\web\Controller;
use yii\web\Response;

class TheplatController extends Controller
{
    private $errorText = 'Some error';
    private $currentVkId = null;
    /** @var ParaUser */
    private $currentUser = null;
    private $tokenKey = 'loveBotApp';

    public function beforeAction($action)
    {
        Yii::$app->controller->enableCsrfValidation = false;
        Yii::$app->response->format = Response::FORMAT_JSON;
        header('Access-Control-Allow-Origin: *');

        /*$url = Yii::$app->request->post('url');
        if (!$url) {
            $url = Yii::$app->request->get('url');
        }

        if ($this->isCorrectWebSign($url)) {
            $data = $this->getWebData($url);

            $vkUserId = $data['vk_user_id'];
            $this->currentVkId = $vkUserId;
            $this->currentUser = ParaUser::getOrCreateUser($vkUserId, null, null, null);

        } else {
            $this->errorText = 'Incorrect signature';
            $action->actionMethod = 'actionError';
        }*/

        return parent::beforeAction($action);
    }

    public function actionIssueToken()
    {
        $price = Yii::$app->request->post('price');
        $count = Yii::$app->request->post('count');
        $name = Yii::$app->request->post('name');

        // node /var/www/r.testeron.pro/web/waves/create-token.js -c=100 -n="Mytoken here"
        $out = [];
        $err = 'nothing';
        exec('cd /var/www/r.testeron.pro/web/waves/ && /usr/bin/node create-token.js -c=100 -n="Mytoken here" 2>&1', $out, $err);

        return [
            'result' => 'ok',
            'text' => $out,
            'err' => $err,
        ];
    }

    public function actionCreatePlayer()
    {
        $firstName = Yii::$app->request->post('first_name');
        $lastName = Yii::$app->request->post('last_name');
        $age = Yii::$app->request->post('age');
        $team = Yii::$app->request->post('team');
        $photo = Yii::$app->request->post('photo');

        return [
            'result' => Player::create($firstName, $lastName, $photo, $age, $team),
        ];
    }

    public function actionGetPlayer()
    {
        $id = Yii::$app->request->post('id');

        return [
            'result' => Player::getPlayer($id),
        ];
    }

    public function actionGetPlayers()
    {
        return [
            'result' => Player::getPlayers()
        ];
    }

    private function errorResult($text)
    {
        return [
            'result' => 'error',
            'text' => $text,
        ];
    }

    private function okResult($text = '', $data = [])
    {
        return [
            'result' => 'ok',
            'text' => $text,
            'data' => $data,
        ];
    }

    /*private function isCorrectWebSign($url)
    {
        if (empty($url)) {
            return false;
        }

        $client_secret = Yii::$app->params[$this->tokenKey]; //Защищённый ключ из настроек вашего приложения
        $query_params = [];
        parse_str(parse_url($url, PHP_URL_QUERY), $query_params); // Получаем query-параметры из URL

        $sign_params = [];
        foreach ($query_params as $name => $value) {
            if (strpos($name, 'vk_') !== 0) { // Получаем только vk параметры из query
                continue;
            }

            $sign_params[$name] = $value;
        }

        ksort($sign_params); // Сортируем массив по ключам
        $sign_params_query = http_build_query($sign_params); // Формируем строку вида "param_name1=value&param_name2=value"
        $sign = rtrim(strtr(base64_encode(hash_hmac('sha256', $sign_params_query, $client_secret, true)), '+/', '-_'), '='); // Получаем хеш-код от строки, используя защищеный ключ приложения. Генерация на основе метода HMAC.

        $status = $sign === $query_params['sign']; // Сравниваем полученную подпись со значением параметра 'sign'

        return $status;
    }

    private function getWebData($url)
    {
        $query_params = [];
        parse_str(parse_url($url, PHP_URL_QUERY), $query_params);

        return $query_params;
    }*/

    public function actionError()
    {
        return ['error' => $this->errorText,];
    }
}
