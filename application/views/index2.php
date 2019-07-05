<!DOCTYPE html>
<html lang="en">
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
<body ng-app="myApp">

    <div ng-controller="HomeController">
        <form name='loginForm'>
            <p>Username:<br>
                <input class="form-control" type="text" name="username" ng-model="username" required>
                <span class="alert alert-danger" ng-show="loginForm.first_name.$dirty && loginForm.first_name.$invalid">
                    <span ng-show="loginForm.first_name.$error.required">First Name is required.</span>
                </span>
            </p>
            <p>
            <input type="submit" class="btn btn-sm btn-success" ng-click="Login_init()" ng-disabled="loginForm.username.$dirty && loginForm.username.$invalid">    
            </p>
        </form>
    </div>

</body>
</html>
