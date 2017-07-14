const roll = remote.getGlobal('roll');

$('.collapse').on('shown.bs.collapse', function() {
    $(this).parent().find(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
}).on('hidden.bs.collapse', function() {
    $(this).parent().find(".fa-minus").removeClass("fa-minus").addClass("fa-plus");
});

$(document).ready(function(){
    $('#calc-display').keypress(function(event){
      if(event.keyCode==13)
      $('#calc-eval').click();
    });
});

function die_eval(exp) {
    var parser = new roll.ExpressionTree();

    parser.set_expression(exp);

    return parser.parse_expression();
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("src", event.target.id);
}

function swapDrop(event) {
  event.preventDefault ();
  var src = document.getElementById(event.dataTransfer.getData ("src"));
  var srcParent = src.parentNode;
  var target = event.currentTarget.firstElementChild;

  event.currentTarget.replaceChild(src, target);
  srcParent.appendChild(target);
}

$(document).ready(function () {
    $("div.editable").dblclick(function (event) {
        event.stopPropagation();
        var curr = $(this);
        var value = $(this).html();
        updateVal(curr, value);
    });
});

function updateVal(curr, value) {
    curr.attr("draggable", false);
    $(curr).html('<input class="editing" type="text" value="' + value + '" />');
    $(".editing").focus();
    $(".editing").keyup(function (event) {
        if (event.keyCode == 13) {
            $(curr).html($(".editing").val().trim());
            curr.attr("draggable", true);
        }
    });

    $(document).click(function () {
        var toTrim = $(".editing");
        if (typeof toTrim.val() != 'undefined') {
            $(curr).html($(".editing").val().trim());
            curr.attr("draggable", true);
            return;
        }
    });
}