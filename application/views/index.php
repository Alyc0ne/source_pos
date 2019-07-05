<!DOCTYPE html>
<html>
<script>var base_url = '<?php echo base_url() ?>';</script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
<script src="<?php echo base_url(); ?>extensions/scripts/App/home.js"></script>
<link rel="stylesheet" href="<?php echo base_url(); ?>extensions/css/content/home.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css?family=Mali&display=swap" rel="stylesheet">
<body ng-app="myApp">

    <div ng-controller="HomeController" id='mydiv'>
        <div class="col margin-t15">
            <form name='loginForm'>
                <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                    <div class="input-group-text"><i class="fas fa-user"></i></div>
                    </div>
                    <input type="text" class="form-control text-center" name="username" id="username" placeholder="Username" ng-model='username' required>
                </div>
                <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                    <div class="input-group-text"><i class="fas fa-lock"></i></div>
                    </div>
                    <input type="password" class="form-control text-center" name="password" id="password" placeholder="Password" ng-model='password'>
                </div>
                <div class="col margin-t15">
                    <input type="submit" class="btn btn-primary btn-lg btn-block" ng-click="login()" ng-disabled="loginForm.username.$dirty && loginForm.username.$invalid" style="width:100%;" value="Login">    
                </div>
            </form>
        </div>
    </div>

</body>
</html>
