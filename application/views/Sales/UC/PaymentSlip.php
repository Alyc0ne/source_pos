<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Payment Slip</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Mali&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo base_url(); ?>extensions/css/content/Sales/pos/PaymentSlip.css">
    <link rel="stylesheet" href="<?php echo base_url(); ?>extensions/css/content/site.css">
</head>
<body>
    <div class="h_ps">
        <p><h3 class="text-center" style='border:soild 1px black;'>Siriluk Shop</h3></p>
        <p>TAX ID : 01525669966</p>
        <?php echo "<p>Invoice No : <span>".$Invoice['InvoiceNo']."</span> / <span>".date('d-m-Y H:i:s', strtotime($Invoice['CreatedDate']))."</span></p>"; ?>
        <p>Customer : ทดสอบ (รอทำระบบ Login)</p>
    </div>
    <div class="b_ps">
        <?php
            foreach ($InvoiceItem as $_InvoiceItem) {
                echo "<div class='row'><div class='col-12'>".$_InvoiceItem['GoodsNo']." : ".$_InvoiceItem['GoodsName']."</div></div>";
                echo "<div class='row text-right'><div class='col-3'>".number_format((float)$_InvoiceItem['GoodsQty'], 2, '.', ',')."</div><div class='col-1'> x </div><div class='col-4 text-left'>".number_format((float)$_InvoiceItem['GoodsPrice'], 2, '.', ',')."</div><div class='col-4'>".number_format((float)$_InvoiceItem['TotalAmnt'], 2, '.', ',')."</div></div>";
            }
        ?>
    </div>
    <div class="f_ps">
        <?php
            echo "<div class='row'><div class='col-2'></div><div class='col-4'>Sub Total</div><div class='col-6 text-right'>".number_format((float)$Invoice['TotalAmnt'], 2, '.', ',')."</div></div>";
            echo "<div class='row'><div class='col-2'></div><div class='col-4'>Total Discount</div><div class='col-6 text-right'>".number_format((float)$Invoice['DiscountAmnt'], 2, '.', ',')."</div></div>";
            echo "<div class='row'><div class='col-2'></div><div class='col-4'>TOTAL</div><div class='col-6 text-right'>".number_format((float)$Invoice['NetAmnt'], 2, '.', ',')."</div></div>";
            echo "<div class='row'><div class='col-4'>เงินสด/เงินทอน</div><div class='col-4 text-right'>".number_format((float)$Invoice['TotalPayAmnt'], 2, '.', ',')."</div><div class='col-4 text-right'>".number_format((float)$Invoice['ChangeAmnt'], 2, '.', ',')."</div></div>";
            echo "<div class='row'><div class='col-12 text-center' style='border:solid 1px black;'>ขอบคุณที่มาใช้บริการ ค่ะ/ครับ</div></div>"
        ?>
    </div>
</body>
</html>