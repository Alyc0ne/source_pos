<script type="text/javascript" src="<?php echo base_url(); ?>extensions/scripts/App/Sales/Sales.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>extensions/scripts/App/Sales/transac-SalesGoods.js"></script>


<div class="col-md-8">
    <div class="card h_detail_pos" id="left_SellGoods">
        <div class="card-body" style="height:100%!important;">
            <div class="col-12" id="Sell-PageLeft" style="height:100%!important;">  
                <div class="row">
                    <input type='text' style='border:none;height:5%;' class='w_15' value='Qty (จำนวนสินค้า) : '>
                    <input type='number' style='height:5%;' class='w_5 text-center m_l10' id='QtyBarcode' name='QtyBarcode' min='1' max='99' value='1'>
                    <input list='Goods' class='w-75 input-icon-barcode' id='GoodsBarcodeSearch' style='height:5%;margin: 0 auto;'>
                    <datalist id='Goods'></datalist>
                </div>

                <div class="row m_t5p">
                    <div class="col">
                        <div class="row el-element-overlay">
                            <div class="card">
                                <div class="el-card-item">
                                    <div class="el-card-avatar el-overlay-1"> <img src="<?php echo base_url(); ?>extensions/images/icon/no-barcode.png" style="width:10%;" alt="user" />
                                        <div class="el-overlay">
                                            <ul class="list-style-none el-info">
                                                <li class="el-item"><a class="btn default btn-outline image-popup-vertical-fit el-link" href="../../assets/images/big/img1.jpg"><i class="mdi mdi-magnify-plus"></i></a></li>
                                                <li class="el-item"><a class="btn default btn-outline el-link" href="javascript:void(0);"><i class="mdi mdi-link"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="el-card-content">
                                        <h4 class="m-b-0">Project title</h4> <span class="text-muted">subtitle of project</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                    2 of 3
                    </div>
                    <div class="col">
                    3 of 3
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="col-md-4">
    <div class="card h_detail_pos" id="Right_SellGoods">
        <div class="card-body" style="height:100%!important;">
            <div class="col-12" id="Sell-PageRight" style="height:100%!important;">  
                <!-- GEN BY TRANSACGRID -->
            </div>
        </div>
    </div>
</div>