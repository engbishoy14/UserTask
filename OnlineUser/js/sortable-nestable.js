$(function () {
    $('.dd').nestable({
        noDragClass: "dd-nodrag"
    });

    //$('.dd').on('change', function () {
    //    var $this = $(this);
    //    var serializedData = window.JSON.stringify($($this).nestable('serialize'));

    //    $this.parents('div.body').find('textarea').val(serializedData);
    //});


    //$('.btn-link').click(function () {

    //    $(this).append('<li class="dd-item dd3-item"> <div class="dd-handle dd3-handle"></div>  <div class="dd3-content">test append</div> </li>');

    //});


    $('#AddLi').click(function() {
        $(this).parent().parent().parent().append('<li class="dd-item dd3-item"> <div class="dd-handle dd3-handle"></div>  <div class="dd3-content">test append</div> </li>');
        //console.log($(this).parent().parent().parent().append);
    });
   
    $('.btn-link').click(function () {
        $(this).children().append('<li class="dd-item dd3-item"> <div class="dd-handle dd3-handle"></div>  <div class="dd3-content">test append</div> </li>');
        console.log($(this).children());
    });
});