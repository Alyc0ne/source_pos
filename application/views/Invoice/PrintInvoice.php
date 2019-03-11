<?php
$message ="<div>
    <table align='center'>
        <tr><td><h1>Reporte de Tipo de Documentos</h1></td></tr>
        <tr><td><h2>Farmaceutica MDC</h2></td></tr>
    </table>
</div>
<div>
    <table style='width:960px; margin:0 auto;'>
        <tr colspan='7'>
            <td><?php echo 'Fecha: '".$time = date('d/m/Y h:i:s A')."; ?></td>
        </tr>
        <tr bgcolor='#CCCCCC' height='30'>
            <td><b>Sr. No.</b></td>
            <td><b>Tipo Documento</b></td>
            <td><b>Cant. Pasos</b></td>
            <td><b>Costo</b></td>
            <td><b>Precio</b></td>
            <td><b>Balance</b></td>
            <td><b>Notifica Cliente</b></td>
        </tr>
    </table>";

echo "<html><head></head><body>" . $message . "<script type='application/javascript'>window.onload=function(){window.print()}</script></body></html>";
?>