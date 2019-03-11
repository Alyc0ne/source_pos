<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>
<link href="<?php echo base_url(); ?>extensions/content/Default/select2.min.css" rel="stylesheet" />

<div class="body-content" data-pagetype="new">
    <div class="tab-content body-content-tab">
        <div class="tab-pane fade in active" id="tabSales">
            <div class="box-menu-list">
                <a href="<?php echo base_url(); ?>Goods/Goods">
                    <div class="box-menu">
                        <div class="box-menu-image"><img src="<?php echo base_url(); ?>extensions/Content/Default/Images/icon-menu/icon-menu-goods.png" width=" 64" height="64" /></div>
                        <div class="box-menu-title">Goods (สินค้า)</div>
                    </div>
                </a>
                <div class="list-manage">
                    <a onclick="ShowModalGoods();" title="New"><div class="box-manage-new"></div></a>
                    <a href="<?php echo base_url(); ?>Goods/Goods" title="List"><div class="box-manage-search"></div></a>
                </div>
            </div>

            <div class="box-menu-list">
                <a href="@Url.Content("~/Sales/Quotation/List")">
                    <div class="box-menu">
                        <div class="box-menu-image"><img src="<?php echo base_url(); ?>extensions/Content/Default/Images/icon-menu/icon-menu-unit.png" width=" 64" height="64" /></div>
                        <div class="box-menu-title">Unit (หน่วยนับ)</div>
                    </div>
                </a>
                <div class="list-manage">
                    <a onclick="ShowModalUnit();" title="New"><div class="box-manage-new"></div></a>
                    <a href="@Url.Content("~/Sales/Quotation/List")" title="List"><div class="box-manage-search"></div></a>
                </div>
            </div>
        </div>
    </div>  
</div>  

<div class="modal fade" id="ModalNewGoods" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">New Goods (เพิ่มสินค้า)</h4>
        </div>
        <div class="modal-body">
          <?php

            echo "<div id='frmGoods'>";
                echo "<div class='frm-default'>";
                    echo "<div class='frm-group'>";
                        echo "<label class='frm-label require'>รหัสสินค้า</label>";
                        echo "<div class='frm-content'>";
                            echo "<input type='text' class='input-l' id='GoodsNo' name='GoodsNo' data-maxlength='10' value='' disabled>";
                        echo "</div>";
                    echo "</div>";
                    
                    echo "<div class='frm-group'>";
                        echo "<label class='frm-label require'>Barcode</label>";
                        echo "<div class='frm-content'>";
                            echo "<input type='text' class='input-l' id='GoodsBarcode' name='GoodsBarcode' data-maxlength='10' value=''>";
                        echo "</div>";
                    echo "</div>";

                    echo "<div class='frm-group'>";
                        echo "<label class='frm-label require'>ชื่อสินค้า</label>";
                        echo "<div class='frm-content'>";
                            echo "<input type='text' class='input-l' id='GoodsName' name='GoodsName' data-maxlength='250' value=''>";
                        echo "</div>";
                    echo "</div>";

                    echo "<div class='frm-group'>";
                        echo "<label class='frm-label require'>จำนวนสินค้า</label>";
                        echo "<div class='frm-content'>";
                            echo "<input type='text' class='input-l _number' id='GoodsQty' name='GoodsQty' data-maxlength='100' value='1'>";
                        echo "</div>";
                    echo "</div>";

                    echo "<div class='frm-group'>";
                        echo "<label class='frm-label require'>ราคาสินค้า</label>";
                        echo "<div class='frm-content'>";
                            echo "<input type='text' class='input-l _number' id='GoodsPrice' name='GoodsPrice' data-maxlength='100' value=''>";
                        echo "</div>";
                    echo "</div>";

                    echo "<div class='frm-group'>";
                        echo "<label class='frm-label'>ต้นทุนสินค้า</label>";
                        echo "<div class='frm-content'>";
                            echo "<input type='text' class='input-l _number' id='GoodsCost' name='GoodsCost' data-maxlength='100' value=''>";
                        echo "</div>";
                    echo "</div>";

                    echo "<div class='frm-group'>";
                    echo "<label class='frm-label'>หน่วยนับ : </label>";
                        echo "<div class='frm-content'>";
                            echo "<select class='js-example-basic-single' name='state' id='GoodsUnit'>";
                            echo "</select>";
                        echo "</div>";
                    echo "</div>";

                    echo "<input type='hidden' id='GoodsUnitID' name='GoodsUnitID'>";            

                echo "</div>";
            echo "</div>";
      
          ?>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" id="btn-Save">Save</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
</div>


<div class="modal fade" id="ModalNewUnit" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header" style='background-color:#DCDCDC;'>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title" style='color:black;'>New Unit (เพิ่มหน่วยนับ)</h4>
        </div>
        <div class="modal-body">
          <?php

            echo "<div id='frmUnit'>";
                echo "<div class='frm-default'>";
                    echo "<div class='frm-group'>";
                        echo "<label class='frm-label require'>รหัสหน่วยนับ</label>";
                        echo "<div class='frm-content'>";
                             echo "<input type='text' class='input-l' id='UnitNo' name='UnitNo' data-maxlength='10' value='' disabled>";
                        echo "</div>";
                    echo "</div>";
                    
                    echo "<div class='frm-group'>";
                        echo "<label class='frm-label require'>ชื่อหน่วยนับ</label>";
                        echo "<div class='frm-content'>";
                            echo "<input type='text' class='input-l' id='UnitName' name='UnitName' data-maxlength='250' value=''>";
                        echo "</div>";
                    echo "</div>";

                    echo "<div class='frm-group'>";
                        echo "<label class='frm-label require'>จำนวนหน่วยนับ</label>";
                        echo "<div class='frm-content'>";
                            echo "<input type='text' class='input-l _number' id='UnitQty' name='UnitQty' data-maxlength='100' value='1'>";
                        echo "</div>";
                    echo "</div>";
                echo "</div>";
            echo "</div>";
      
          ?>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" id="btn-SaveUnit">Save</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>

<script>
    

    //Goods
    function ShowModalGoods() {
        openloading(true);
        if(checkDataTable('Unit')){
            $("#GoodsNo").val(GenRunningNumber("Goods"));
            GetDataJson('Unit','#GoodsUnit');
            $("#ModalNewGoods").modal();
            setTimeout(function(){
                $("#GoodsBarcode").focus();
                openloading(false);
            },700);
        }
    }


    //Unit
    function ShowModalUnit() {
        openloading(true);
        $.ajax({
            type: 'POST',
            url: "<?php echo base_url(); ?>Base/BaseController/GenRunningNumber",
            data: {"System" : "Unit"},
            datatype: "json",
            traditional: true,
            success: function (e) {
                openloading(false);
                $("#UnitNo").val(e);
                $("#ModalNewUnit").modal();
                setTimeout(function(){
                    $("#UnitName").focus();
                },700);
            },
            error: function (e) {
                //openloading(false);
            }
        });
    }
    $("#btn-SaveUnit").click(function (e){
        if (bindValidate("#frmUnit")){
            openloading(true);
            $.ajax({
                type: 'POST',
                url: "<?php echo base_url(); ?>Setting/Unit/BindSave",
                data: {
                    "unit_no" : $("#UnitNo").val(),
                    "unit_name" : $("#UnitName").val(),
                    "unit_qty" : $("#UnitQty").val()
                },
                datatype: "json",
                traditional: true,
                success: function (e) {
                    openloading(false);
                    PostMsgSuccess(" บันทึกข้อมูลสำเร็จ");
                    $("#ModalNewUnit").modal('toggle');
                    clearModal("#ModalNewUnit");
                },
                error: function (e) {
                    //openloading(false);
                }
            });
        }
    });

</script> 
