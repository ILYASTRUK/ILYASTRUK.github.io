var arr = [], game_field, index_i,index_j;	

function swap (arr,i1,j1,i2,j2)
    {
        buf=arr[i1][j1];
        arr[i1][j1]=arr[i2][j2];
        arr[i2][j2]=buf;
    } 

window.onload = function() {
    game_field = document.getElementById("game_field");
        new_Game();				
            document.getElementById("reset").onclick = new_Game;
}


function cellClick(event){		
    var event = event || window.event,		
        el = event.srcElement || event.target;
        i = el.id.charAt(0),
        j = el.id.charAt(2);
    if((i == index_i && Math.abs(j - index_j) == 1) || (j == index_j && Math.abs(i - index_i) == 1)){
        document.getElementById(index_i + " " + index_j).innerHTML = el.innerHTML;
        el.innerHTML = "";
        index_i = i;
        index_j = j;
        var q = true;
        for(i = 0; i<4; ++i)
            for(j = 0; j<4; ++j)
                if(i + j != 6 && document.getElementById(i + " " + j).innerHTML != i*4 + j + 1){
                    q = false;
                    break;
            }
        if(q) alertNew('success', 'Вы прошли игру!', 'Интеллект+1', 'Продолжить');
        }
        
    }

function new_Game() 
    {
                         for(i = 0; i<4; ++i){  
                            arr[i] = [];
                            for(j = 0; j<4; ++j){
                                if(i + j != 6)
                                    arr[i][j] = i*4 + j + 1;
                                else
                                    arr[i][j] = " ";
                            }
                        }

                        index_i=3;
                        index_j=3;
                        for(i=0;i<1000;i++)
                            switch (Math.round(3*Math.random()))
                                {
                                    case 0: if(index_i !=0) swap(arr,index_i,index_j,--index_i,index_j); break;
                                    case 1: if(index_j !=3) swap(arr,index_i,index_j,index_i,++index_j); break;
                                    case 2: if(index_i !=3) swap(arr,index_i,index_j,++index_i,index_j); break;
                                    case 3: if(index_j !=0) swap(arr,index_i,index_j,index_i,--index_j); break;
                                }

                                var table = document.createElement("table"); //Cоздаём таблицу	
                                var    tbody = document.createElement("tbody");
                                    table.appendChild(tbody);
                                for(i = 0; i< 4; ++i){
                                var row = document.createElement("tr"); //Добавляем в неё строки
                                        for(j = 0; j<4; ++j){
                                            var cell = document.createElement("td");//Cоздаём ячейки
                                            cell.id = i + " " + j;
                                            cell.onclick = cellClick;
                                            cell.innerHTML = arr[i][j];
                                            row.appendChild(cell);
                                        }
                                    tbody.appendChild(row);		
                                }
                                if(game_field.childNodes.length == 1) 
                                game_field.removeChild(game_field.firstChild); 
                                game_field.appendChild(table);
                                ClearСlock();
                                
    } 

    var base = 60; 
    var clocktimer,dateObj,dh,dm,ds,ms; 
    var readout=''; 
    var h=1,m=1,tm=1,s=0,ts=0,ms=0,init=0; 
    
    //функция для очистки поля
    function ClearСlock() { 
     clearTimeout(clocktimer); 
     h=1;m=1;tm=1;s=0;ts=0;ms=0; 
     init=0;
     readout='00:00:00.00'; 
     document.MyClock.stopwatch.value=readout;  
    } 

    //функция для старта секундомера
    function StartTIME() { 
     var cdateObj = new Date(); 
     var t = (cdateObj.getTime() - dateObj.getTime())-(s*1000); 
     if (t>999) { s++; } 
     if (s>=(m*base)) { 
         ts=0; 
         m++; 
     } else { 
         ts=parseInt((ms/100)+s); 
         if(ts>=base) { ts=ts-((m-1)*base); } 
     } 
     if (m>(h*base)) { 
         tm=1; 
         h++; 
     } else { 
         tm=parseInt((ms/100)+m); 
         if(tm>=base) { tm=tm-((h-1)*base); } 
     } 
     ms = Math.round(t/10); 
     if (ms>99) {ms=0;} 
     if (ms==0) {ms='00';} 
     if (ms>0&&ms<=9) { ms = '0'+ms; } 
     if (ts>0) { ds = ts; if (ts<10) { ds = '0'+ts; }} else { ds = '00'; } 
     dm=tm-1; 
     if (dm>0) { if (dm<10) { dm = '0'+dm; }} else { dm = '00'; } 
     dh=h-1; 
     if (dh>0) { if (dh<10) { dh = '0'+dh; }} else { dh = '00'; } 
     readout = dh + ':' + dm + ':' + ds + '.' + ms; 
     document.MyClock.stopwatch.value = readout; 
     clocktimer = setTimeout("StartTIME()",1); 
    } 
    
    //Функция запуска и остановки
    function StartStop() { 
     if (init==0){ 
         ClearСlock();
         dateObj = new Date(); 
         StartTIME(); 
         init=1; 
     } else { 
         clearTimeout(clocktimer);
         init=0;
     } 
    } 

    function alertNew(type,title,text,caption)
    {
        return swal(
            {
                title: title,
                text: text,
                type: type,
                confirmButtonText: caption
            }
        );
    }