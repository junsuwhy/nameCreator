dataset=datastr.split(";");

var whytable=function(){
	$('document').ready(function(){

		//初始
		//初始 要執行的放這裡
		showWhytb();
		//初始結束
		
		//按下按鈕
		$('#time-enter').click(function(){
			//按下按鈕執行的動作放這裡
			month=$('#time-month').val();
			if(month==''){
				showWhytb();
			}else{
				if(month>0||month<12){

					tfrom='2013-'+month+'-01';
					tto='2013-'+(parseInt(month)+1)+'-01';
				}
				showWhytb('month',[tfrom,tto]);
			}
		});//按下按鈕結束


	});
}


//秀表格的函式  
var showWhytb=function(filtype,filue){



	$table=$('#whytable');
	$table.html('');
	
	total=0;

	for (var i = 0; i < dataset.length; i++) {
		$tr=$('<tr>').attr('id','whytb_'+i);
		
		datarow=dataset[i].split(',');


		//trigger是否的話就不輸出
		trigger=false;
		if(i==0)trigger=true;
		if(typeof(filtype)=='undefined')trigger=true;

		if(filtype=="month"){
			tfrom=(new Date(filue[0])).getTime();
			tto=(new Date(filue[1])).getTime();
			tnow=(new Date(datarow[0])).getTime();
			if(tnow>=tfrom&&tnow<tto)trigger=true;
			console.log(tfrom+' '+tnow+' '+tto);
		}

		for (var j = 0; j < datarow.length; j++) {

			
			switch(j){
				case 0:
					//日期
				break;
				case 1:
					//時間
				break;
				case 2:
					//帳戶
				break;
				case 3:
					//金額
				break;
				case 4:
					//幣種
				break;
				case 5:
					//沒用到
				break;
				case 6:
					//沒用到
				break;
				case 7:
					//大分類
				break;
				case 8:
					//小分類
				break;
				case 9:
					//沒用到
				break;
				case 10:
					//位置，會放Transfer Out或Transfer In
				break;
				case 11:
					//專案
				break;
				case 12:
					//備註
				break;


			}

			if(j!=1&&j!=5&&j!=6&&j!=9&&trigger==true)
			$tr.append('<td>'+datarow[j]+'</td>');
		};
		if(i%2==0){
			$tr.css('background-color','#99ffee');
		}else{
			$tr.css('background-color','#eeffaa')
		}

		if(i>0&&trigger==true&&datarow[4]=='TWD')total+=parseInt(datarow[3]);
		$table.append($tr);
	};

	//表格秀完
	$table.append('<div>總金額：'+total+'</div>');



}



//用google chart秀表格的函式
var ggtable=function(){
	google.load('visualization', '1', {packages:['table']});
	google.setOnLoadCallback(drawTable);
	function drawTable() {
		var data = new google.visualization.DataTable();
			
		for (var i = 0; i < dataset[0].split(',').length; i++) {
			data.addColumn('string',dataset[0].split(',')[i]);

			};

		//data.addRows([dataset[1].split(',')]);
		
		for (var i = 1; i < dataset.length; i++) {
			data.addRows([dataset[i].split(',')]);
			console.log('the '+i+'item finish importing.')
		};
		

	var table = new google.visualization.Table(document.getElementById('table_div'));
	table.draw(data, {showRowNumber: true});

	}


}

whytable();
