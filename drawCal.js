function DrawCalender(monthNO,year)
{
        var No_of_days = new Array(31,0,31,30,31,30,31,31,30,31,30,31);
        var Name_of_month = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
        var Day = new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
        var Day2 = new Array("Sunday","Monday","Tueday","Wednesday","Thursday","Friday","Satarday");
        var date = new Date(Name_of_month[monthNO]+" 01,"+year);
        var firstDay = date.getDay();
        //for styling todays date(local variables)
        var today = new Date();
        var yr = today.getFullYear();
        var mn = today.getMonth();
        var dy = today.getDate();

        //calculate days of feberuary
        if(monthNO == 1 && year%4 == 0)
        {
          No_of_days[1] = 29;
        }
        else
        {
          No_of_days[1] = 28;
        }
       
        var section = document.getElementById("hyd");
        section.innerHTML = "";
        var div = document.createElement('DIV');
        div.id = "wrapper";
        section.appendChild(div);
        //paragrph
        var p = document.createElement('p');
        p.align = "center";
        p.innerHTML= Name_of_month[monthNO]+"\t"+year;
        div.appendChild(p);
       
       //table
       var table = document.createElement('table');
       div.appendChild(table);
     
       var tr = new Array();
       tr[0] = document.createElement('tr');
       table.appendChild(tr[0]);
       var th =  new Array();
       var td = new Array();
       

       for(i=0;i<Day.length;i++)
       {
         th[i] = document.createElement('th');
         tr[0].appendChild(th[i]);
         th[i].innerHTML = Day[i];
       }
       th[0].id = "sun";
          
        var  h=1;
        
               //5 Rows in a months
               for(j=1;j<=6;j++)
               {
                    tr[j] = document.createElement('tr');
                    table.appendChild(tr[j]);
                       //Columns in each Row
                        for(k=0;k<7;k++)
                        {
                              if(h <= No_of_days[monthNO])
                                {
                                  td[k] = document.createElement('td');
                                 td[k].addEventListener('click',fin4(year,Name_of_month[monthNO],h,Day2[firstDay]),false);
                                  function fin4(year,mn,h,day)
                                  {
                                    return function()
                                    {
                                      info(year,mn,h,day);
                                    }
                                  }
                                  tr[j].appendChild(td[k]);
                                  if(k==0)
                                  {
                                    td[k].id = "sunday";
                                  }
                                    if(k == firstDay)
                                     {
                                      if(yr == year && mn == monthNO && dy == h)
                                      {
                                        td[k].id = "today";
                                      }
                                      
                                      td[k].innerHTML = h
                                      h++;
                                      firstDay++;
                                     }
                                } else { break;}
                                                   
                           
                        }
                        firstDay = k;
                        if(firstDay == 7){firstDay = 0}
                        if(h>No_of_days[monthNO]){break;}
                 
                }
            //update values;
            //1. update month no and year no for forward process
            if(monthNO == 11)
            {
              updateNextMonth = 0;
              if(year == 9999)
              {
                updateNextYear = 1000;
              }
              else
              {
                updateNextYear = year+1;
              }
            }
            else
            {
              updateNextMonth = monthNO+1;
              updateNextYear = year;
            }
            //2. update month no and year no for backward process
            if(monthNO == 0)
            {
              updatePrevMonth = 11;
              if(year == 1000)
              {
                updatePrevYear = 9999;
              }
              else
              {
                updatePrevYear = year-1;
              }
            }
            else
            {
              updatePrevMonth = monthNO-1;
              updatePrevYear = year;
            }
            

    
}
function info(return_year,return_month,return_day,day)
{
  var ret = document.getElementById("return");
  ret.innerHTML = "";
  var label2 = new Array();
  for(let i =0;i<5;i++)
  {
    label2[i] = document.createElement('label');
    label2[i].id = "retLabel";
    ret.appendChild(label2[i]);
    
  }
   label2[0].innerHTML = "Selected Date:<br/>";
  label2[1].innerHTML = return_year+"<br/>";
  label2[2].innerHTML = return_month+"<br/>";
  label2[3].innerHTML = return_day+"<br/>";
  label2[4].innerHTML = day;
}
//CODE STARTS FROM HERE

var today = new Date();
var year = today.getFullYear();
var month = today.getMonth();

var next = document.getElementById("next");
var prev = document.getElementById("prev");
var updateNextMonth = 0;
var updatePrevMonth = 0;
var updateNextYear = 0;
var updatePrevYear = 0;
DrawCalender(month,year);
next.addEventListener('click',function fin1(){ DrawCalender(updateNextMonth,updateNextYear);});
prev.addEventListener('click',function fin2(){ DrawCalender(updatePrevMonth,updatePrevYear);});
//go to date
var jump = document.getElementById("jump");
jump.addEventListener('click',
function fin3()
{
  var label = document.getElementById("mes");
  var inputYear =parseInt( document.getElementById("inputYear").value);
  var inputMonth =parseInt(document.getElementById("inputMonth").value);
  if(inputYear && inputMonth)
  {
    if(inputYear>=1000 && inputYear<=9999)
    {
      label.innerHTML = "";
      DrawCalender(inputMonth-1,inputYear);
    }
    else
    {
      label.innerHTML = "Please Validate Inputs.";
    }
  }
  else
  {
    label.innerHTML = "Please Validate Inputs.";
  }
   
});
//print todays date
var returntdy = document.getElementById("returntdy");
var todays_date = document.createElement('label');
todays_date.id = "retLabel";
returntdy.appendChild(todays_date);
todays_date.innerHTML = today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear();

//module for returning home after initiating "jump to date"
 var home = document.getElementById("home");
 home.addEventListener('click',function fin5(){ DrawCalender(month,year); });



