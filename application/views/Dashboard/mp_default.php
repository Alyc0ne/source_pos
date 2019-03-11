<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Home Page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js"></script>
    <script type="text/javascript" src="<?php echo base_url(); ?>extensions/scripts/Default/apps.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo base_url(); ?>extensions/content/App/site.css">
    <script>var base_url = '<?php echo base_url() ?>';</script>
</head>
<body>
    <?php
        $this->load->view("Shared/Modal/Goods");
        $this->load->view("Shared/Modal/Unit");
        $this->load->view("Shared/Modal/Confrim");
        $this->load->view("Shared/Modal/Alert");
    ?>
    <div class="wrap">
        <div class="bg-backdrop"></div>
        <div class="loading">
            <div class="bounceball"></div>
            <div class="text">NOW LOADING</div>
        </div>
    </div>

    <div class="row w-100" style='height: 5%;max-height: 5%;'>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark h_5">
            <a class="navbar-brand" href="#">SL </a> 
            <!-- - SHOP -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">

            </div>
        </nav>
    </div>

    <div class="row" style="height:95%;">
        <div class="col-2 col-md-2" id='left-page' style="background-color:#f8f9fa!important;">
            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" style="margin:10px!important;">
                <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
                <a class="nav-link" id="v-pills-sales-tab" data-toggle="pill" href="#" role="tab" aria-controls="v-pills-sales" aria-selected="false">ขายสินค้า (Sell)</a>
                <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">สินค้า (Goods)</a>
                <div class="tab-content" id="v-pills-tabContent">
                    <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                        <ul id="sub-menu" >
                            <li><a onclick="ShowModalGoods();">เพิ่มสินค้า</a></li>
                            <li>รายการสินค้า</li>
                        </ul>
                    </div>
                </div>
                <a class="nav-link" id="v-pills-unit-tab" data-toggle="pill" href="#v-pills-unit" role="tab" aria-controls="v-pills-unit" aria-selected="false">หน่วยนับ (Unit)</a>
                <div class="tab-content" id="v-pills-tabContent">
                    <div class="tab-pane fade" id="v-pills-unit" role="tabpanel" aria-labelledby="v-pills-unit-tab">
                        <ul id="sub-menu" >
                            <li><a onclick="ShowModalUnit();">หน่วยนับสินค้า</a></li>
                            <li>รายการหน่วยนับ</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-10 col-md-10" id='right-page'>
            <div class="tab-content wh100" id="v-pills-tabContent">
                <div class="tab-pane fade show wh100 active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                    <?php $this->load->view("Home/index"); ?>
                </div>
                <div class="tab-pane fade wh100" id="v-pills-sales" role="tabpanel" aria-labelledby="v-pills-sales-tab">
                    <?php $this->load->view("Sales/index"); ?>
                </div>
                <div class="tab-pane fade wh100" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
                <div class="tab-pane fade wh100" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
            </div>


            <?php 
            /*if (isset($_COOKIE['PathLink'])) {
                //if(){
                    //echo "<div class='tab-content' id='v-pills-tabContent'>";
                        //echo "<div class='tab-pane fade' id='v-pills-profile' role='tabpanel' aria-labelledby='v-pills-profile-tab'>";
                        //$this->load->view($path_link);
                        //echo "<h1>Hello</h1>";
                        //echo "</div>";
                    //echo "</div>";
                //}
                
                $this->load->view($_COOKIE['PathLink']);
                $_COOKIE['PathLink'] = "";
            }else {
                echo "KUY123";
            }*/
            ?>
        </div>
    </div>

              
</body>
</html>