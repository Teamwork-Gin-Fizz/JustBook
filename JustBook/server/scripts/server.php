<?php
    
    require_once('db.php');
    $db= DB::getDB();
    
    $action = $_GET['action'];
    
    function createHash(){
        return hash('sha256', uniqid());
    }
    
    if($action == 'login'){
        $inputUser = $_GET['name'];
        $inputPassword = $_GET['password'];
        $data = $db->get('users', array('username', '=', $inputUser));
        if($data->count()){
            $userFromDB = $data->first();
            if($userFromDB->password == $inputPassword){
                $hash = createHash();
                echo  $_GET['callback'] . '(' . "{'answer' : 'correct', 'hash' : ".json_encode($hash)."}" . ')';
                $db->insert('users_session', array(
                    'user_id' => $userFromDB->id,
                    'hash' => $hash
                ));
            }else{
                echo  $_GET['callback'] . '(' . "{'answer' : 'incorrect', 'reason' : 'password'}" . ')';
            }
        }else{
            echo  $_GET['callback'] . '(' . "{'answer' : 'incorrect', 'reason' : 'username'}" . ')';
        }
    }
    
    else if($action == 'register'){
        $inputUser = $_GET['name'];
        $inputPassword = $_GET['password'];
        $inputFirstName = $_GET['firstname'];
        $inputLastName= $_GET['lastname'];
        $inputGender = $_GET['gender'];
        $inputBirthDate = $_GET['birthdate'];
        
        $query = $db->insert('users', array(
                    'username' => $inputUser,
                    'password' => $inputPassword,
                    'first_name' => $inputFirstName,
                    'last_name' => $inputLastName,
                    'sex' => $inputGender,
                    'birth_date' => $inputBirthDate
                ));
        
        if (!$query)
        {
            echo  $_GET['callback'] . '(' . "{'answer' : 'incorrect', 'reason' : 'database'}" . ')';
        }else{
            echo  $_GET['callback'] . '(' . "{'answer' : 'correct'}" . ')';
        }
    }
    
    else if($action == 'chatUsers'){
        $data = $db->query("SELECT * FROM users");
        $result = $data->results();
        $ouputUsers = '';
        foreach($result as $singleUser){
            $ouputUsers .= $singleUser->username;
            $ouputUsers .= ',';
        }
        if($data->count())
        {
            echo  $_GET['callback'] . '(' . "{'answer' : 'correct', 'list' :". json_encode($ouputUsers)."}" . ')';
        }else{
            echo  $_GET['callback'] . '(' . "{'answer' : 'incorrect'}" . ')';
        }
    }
    
    else if($action == 'get'){
        $senderHash = $_GET['hash'];
        $receiver = $_GET['to'];
        $data = $db->get('users_session', array('hash', '=', $senderHash));
        if($data->count()){
            $userFromSessions = $data->first();
            $receiverInfo = $db->get('users', array('username', '=', $receiver));
            $messageQuery = $db->query("SELECT * FROM (SELECT * FROM chat_messages WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?)  order by id desc limit 40) tmp order by tmp.id asc", 
                array($userFromSessions->user_id,$receiverInfo->first()->id,$receiverInfo->first()->id, $userFromSessions->user_id));
            if($messageQuery->count())
            {
                $ouputUsers = '';
                foreach($messageQuery->results() as $singleUser){
                    $what = ($singleUser->sender == $userFromSessions->user_id) ? 'pull-left' : 'pull-right';
                    $ouputUsers .= "<div class='" . $what . "'>";  
                    $ouputUsers .= $singleUser->message;
                    $ouputUsers .= '</div>.//-||/.';
        }
                echo  $_GET['callback'] . '(' . "{'messages' :". json_encode($ouputUsers)."}" . ')';
            }else{
                echo  $_GET['callback'] . '(' . "{'answer' : 'incorrect'}" . ')';
            }
        }  
    }
    
     else if($action == 'add'){
        $senderHash = $_GET['hash'];
        $receiver = $_GET['to'];
        $message = $_GET['message'];
        $data = $db->get('users_session', array('hash', '=', $senderHash));
        if($data->count()){
            $userFromSessions = $data->first();
            $receiverInfo = $db->get('users', array('username', '=', $receiver));
            $db->insert('chat_messages', array(
                'sender' => $userFromSessions->user_id,
                'receiver' => $receiverInfo->first()->id,
                'message' => $message,
                'time' => time()
            ));
        } 
     }