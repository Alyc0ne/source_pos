<script type="text/javascript" src="<?php echo base_url(); ?>extensions/scripts/App/Sales/Sales.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>extensions/scripts/App/Sales/transac-SalesGoods.js"></script>


<div class="col-md-8">
    <div class="card h_detail_pos box_shadow" id="left_SellGoods">
        <div class="card-body" style="height:100%!important;">
            <div class="col-12" id="Sell-PageLeft" style="height:100%!important;">  
                <div class="row">
                    <input type='text' style='border:none;height:5%;' class='w_15' value='Qty (จำนวนสินค้า) : '>
                    <input type='number' style='height:5%;' class='w_5 text-center m_l10' id='QtyBarcode' name='QtyBarcode' min='1' max='99' value='1'>
                    <input list='Goods' class='w-75 input-icon-barcode' id='GoodsBarcodeSearch' style='height:5%;margin: 0 auto;'>
                    <datalist id='Goods'></datalist>
                </div>
                <div class="row m_t5">
                    <div class="col-md-6 col-lg-4 col-xlg-3">
                        <div class="card pointer" onclick="javascript:ShowModalNoGoodsBarcode();">
                            <div class="box bg-cyan text-center">
                                <h1 class="font-light text-white"><i class="m-r-10 mdi mdi-barcode-scan"></i></h1>
                                <h6 class="text-white">สินค้าไม่มีบาร์โค้ด</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="col-md-4">
    <div class="card h_detail_pos box_shadow" id="Right_SellGoods">
        <div class="card-body p_a0" style="height:100%!important;">
            <div class="col-12" id="Sell-PageRight" style="height:100%!important;">  
                <!-- GEN BY TRANSACGRID -->
            </div>
        </div>
    </div>
</div>