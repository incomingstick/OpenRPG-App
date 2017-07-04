const roll = remote.getGlobal('roll');

$('.collapse').on('shown.bs.collapse', function() {
    $(this).parent().find(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
}).on('hidden.bs.collapse', function() {
    $(this).parent().find(".fa-minus").removeClass("fa-minus").addClass("fa-plus");
});

$(document).ready(function(){
    $('#calc-display').keypress(function(e){
      if(e.keyCode==13)
      $('#calc-eval').click();
    });
});

function die_eval(exp) {
    var parser = new roll.ExpressionTree();

    parser.set_expression(exp);

    return parser.parse_expression();
}