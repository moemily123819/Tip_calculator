var msglist = ['Had a great time !', 
               'Lousy service !', 
               'The server deserves a good tip !',
               'Disappointed !',
               'Be generous !',
               'Memorable !',
               'Great food, great service !!!',
               'The server works hard !',
               'Never coming back !',
               'Highly recommended !',
               'Five stars !',
               'It was only OK !',
               'It was so-so.',
               'Slow service !'];

msg_change('.sub-msg');
console.log('msg-chg'); 
            
function msg_change(element) {

    var random = Math.floor(Math.random()*msglist.length);

    d3.select(element).append("p")
        .style('text-align', 'center')
        .style('font-size', '14px')
        .style('font-weight', '400') 
        .text(msglist[random]);
    
    
    setInterval(() => {
        
        random = Math.floor(Math.random()*msglist.length);

        var textMsg = d3.select(element).select("p")
        if (!textMsg.empty()) {
          textMsg.remove();
        }

        d3.selectAll(element).append("p")
        .style('text-align', "center")
        .style('font-size', '14px')
        .style('font-weight', '400') 

        .text(msglist[random]);},2000);

     }

    
function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }


function clear_end_results() {

    
   var err_msg = d3.select('.err-msg-1')
       .classed("hidden", true);
   err_msg = d3.select('.err-msg-2')
       .classed("hidden", true);
   err_msg = d3.select('.err-msg-3')
       .classed("hidden", true);
  
   try {  
     var end_results = d3.select('#end_results').selectAll('h5');
     if (!end_results.empty()) {
          end_results.remove();
        }

   }
   catch(err) {
     console.log('no h5');   
   }    
       
}    




// when submit button is clicked, validation of the screen values will take place; if no error, calc tip / total bill amount

var submit = d3.select("#submit");
console.log('sumbit', submit);


submit.on("click", function() {

  // Prevent the page from refreshing
  d3.event.preventDefault();
  console.log('function - submit starts');
    
  clear_end_results();
    
    
  var billAmtElement = d3.select("#billAmt");

  // Get the value property of the input element
  var inputBillAmt = billAmtElement.property("value");
  console.log('Bill Amt', inputBillAmt);  

   
  var tipPercElement = d3.select("#tipPerc");

  var inputTipPerc = tipPercElement.property("value");
  var inputTipPerc = parseInt(inputTipPerc);
  console.log('Tip Perc', inputTipPerc);  
    

  var nbrPeopleElement = d3.select("#nbrPeople");

  var inputNbrPeople = nbrPeopleElement.property("value");
  console.log('Nbr People', inputNbrPeople);  
    
    
  var err = validate_bill(inputBillAmt, inputTipPerc, inputNbrPeople);
    
  if (err == 0) {
      calc_total_bill(inputBillAmt, inputTipPerc,inputNbrPeople);
  }
   
  console.log('location replace');  

  //  location.replace("../");
  d3.event.preventDefault();

})







// reset - remove answers and border, clear bill amounts and reset tip and number of patrons
          
var reset = d3.select("#reset");
console.log('reset', reset);

reset.on("click", function() {
  
   clear_end_results();

   console.log('function - reset starts');
})



// bill amount must be positive with at most 2 dec places; tip % should be positive and nbr of patron must be greater than 1


function validate_bill(bill_amt, tip_perc, nbr_people) {
    
    var err = 0;
    
    console.log('isNumber', isNumber(bill_amt))
    
    if (!isNumber(bill_amt)) {
        err = 1;
        var err_msg = d3
         .select(".err-msg-1")
         .classed("hidden", false);
    }
    
    var temp_bill = +bill_amt;
    console.log('validate', err, temp_bill);

    if (temp_bill < 0) {
        console.log('temp_bill <0');
        err = 1;
        var err_msg = d3
         .select(".err-msg-1")
         .classed("hidden", false);
     }
    
    else {
        
        // if bill amount input has more than 2 decimal places, error
        
        var bill_2_dec = +(temp_bill).toFixed(2);
        
        if (temp_bill != (bill_2_dec)) {
            console.log('temp_bill and bill_2_dec', temp_bill, bill_2_dec);
            err = 1;
            var err_msg = d3
             .select(".err-msg-1")
             .classed("hidden", false);
        }   
    }

    
    var temp_tip = +tip_perc;     
    if (temp_tip < 0) {
        err = 1;
        var err_msg = d3
         .select(".err-msg-2")
         .classed("hidden", false);
     }
 
        
    var temp_people = +nbr_people;     
    if (temp_people <= 0) {
        err = 1;
        var err_msg = d3
         .select(".err-msg-3")
         .classed("hidden", false);
     }
    
    return err;
}    

    


// when without error, calc tip and total bill amount :
    
function calc_total_bill(bill_amt, tip_perc, nbr_people) {

    clear_end_results();
    
    var temp_bill = +bill_amt;
    var temp_bill = +temp_bill.toFixed(2);
    var temp_tip = +tip_perc;
    var temp_people = parseInt(nbr_people);
        
    console.log('temp_bill', temp_bill);
    console.log('temp_people', temp_people);
    console.log('temp_tip', temp_tip);
        
     
    var total_bill = +((Math.round(temp_bill * (100 + temp_tip))/100).toFixed(2));
    console.log('total_bill', total_bill);
    
    var ind_bill_pp = (total_bill).toFixed(2);
    var bill_pp = (temp_bill).toFixed(2);
    var tip_pp = (total_bill - temp_bill).toFixed(2);    
    
    // just in case, don't want div by 0)
    if (temp_people == 0) {
            
        temp_people = 1;
            
    }
        
    if (temp_people != 1) {
           
        ind_bill_pp = (Math.ceil((total_bill / temp_people) * 100) / 100).toFixed(2);
    
        bill_pp = (Math.ceil((temp_bill / temp_people) * 100) / 100).toFixed(2);
    
        tip_pp = (+ind_bill_pp - +bill_pp).toFixed(2);
        grand_total = (parseFloat(ind_bill_pp) * temp_people).toFixed(2);
    }
    
        console.log('ind_bill_pp', ind_bill_pp);
        console.log('bill_pp', bill_pp);
        console.log('tip_pp', tip_pp);
    
    
    if (temp_people == 1) {
        
        var output_tip = 'Tip is $'+tip_pp;
        var output_bill = 'Total Bill is $'+ind_bill_pp;
    }
    else {
        var output_tip = 'Tip per person is $'+tip_pp;
        var output_bill = 'Bill amount per person is $'+ind_bill_pp;
        var output_total = 'Total Bill is $'+grand_total;
    }    
   
        
    var end_results = d3
        .select("#end_results")
        .append("h5")
        .style("margin-left", "15px")
        .style("margin-right", "15px")
        .text(output_tip);

    console.log('output', output_tip, end_results);
        
    var end_results = d3
        .select("#end_results")
        .append("h5")
        .style("margin-left", "15px")
        .style("margin-right", "15px")
        .text(output_bill);
    
    if (temp_people != 1) {
        var end_results = d3
            .select("#end_results")
            .append("h5")
            .style("margin-left", "15px")
            .style("margin-right", "15px")
            .text(output_total);
    
        
    }
}    
    

