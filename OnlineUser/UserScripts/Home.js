$(document).ready(function () {
    $(document).on('keypress',
        '.mobile-phone-number',
        function isNumber(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
            return true;
        });
   

    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY',
        clearButton: true,
        weekStart: 0,
        time: false

    });

    $('.dataTable').DataTable({
        destroy: true,
        responsive: true,
        "columnDefs": [
            {
                "targets": [2],
                "orderable": false,
                "searchable": false
            }, {
                "targets": [3],
                "orderable": false,
                "searchable": false
            }, {
                "targets": [4],
                "orderable": false,
                "searchable": false
            },]
    });

    // Check Null Or Empty
    function isEmptyOrSpaces(str) {
        // || str.match(/^ *$/) !== null
        if (str === null || str === "" || str.length == 0)
            return true;
        return false;
    }

    // Notification Error
    function GetNotificationError(Text) {
        var placementFrom = "bottom";
        var placementAlign = "left";
        var animateEnter = "animated rotateIn";
        var animateExit = "animated rotateOut";
        var colorName = "alert-danger";
        showNotification(colorName, Text, placementFrom, placementAlign, animateEnter, animateExit);
    };

    // Notification Success
    function GetNotificationSuccess(Text) {
        var placementFrom = "bottom";
        var placementAlign = "right";
        var animateEnter = "animated rotateInDownRight";
        var animateExit = "animated rotateOutDownRight";
        var colorName = "alert-success";
        showNotification(colorName, Text, placementFrom, placementAlign, animateEnter, animateExit);
    };

     



    $(document).on('click',
        '#CloseAddUser',
        function () {
            $('#AddTitle').val("");
            $('#AddDate').val("");
             

        });

      
    // ---------------------------------------------------
    $('#Add').click(function () {
        // validation 
        var isValid = true;
        var Title = $('#AddTitle').val(); 
        var Date = $('#AddDate').val(); 


        if (isEmptyOrSpaces(Title)) {
            GetNotificationError("Please Enter Title");
            isValid = false;
        }
        if (isEmptyOrSpaces(Date)) {
            GetNotificationError("Please Enter Date");
            isValid = false;
        }  
        if (isValid) {

            var Object = {
                Title: Title,
                Date: Date
            }


            $.ajax({
                type: "Post",
                url: "/Home/CreateNewUser",
                data: JSON.stringify(Object),
                datatype: 'json',
                contentType: 'application/json; charset=utf-8',
                traditional: true,
                headers: {
                    '__RequestVerificationToken': $("input[name='__RequestVerificationToken']").val()
                },
                success: function (Data) {
                    if (Data.add != null) {
                        if (Data.add) {
                            $('#AddTitle').val(""); 
                            $('#AddDate').val(""); 

                            updateShowView();
                            GetNotificationSuccess(" Inserted Successfull !");
                        } else {
                            GetNotificationError(" Please try Again .!");
                        }
                    }
                },
                error: function () {
                    GetNotificationError(" Dynamic save failed. ");

                }
            });
        }

    });

    //----------------------------------------------------
    // DivShowUser
    // Update Show View
    function updateShowView() {
        $.ajax({
            url: '/Home/UpdateShowView',
            data: null,
            cache: false,
            type: "POST",
            dataType: "html",
            success: function (data) {
                $('#DivShowUser').html(data);
                $('.dataTable').DataTable({
                    destroy: true,
                    responsive: true,
                    "columnDefs": [
                        {
                            "targets": [2],
                            "orderable": false,
                            "searchable": false
                        }, {
                            "targets": [3],
                            "orderable": false,
                            "searchable": false
                        }, {
                            "targets": [4],
                            "orderable": false,
                            "searchable": false
                        }, ]
                });
            }
        });
    }


    $(document).on('click', '#EditUser', function () {
        var userId = $(this).val();
        if (!isEmptyOrSpaces(userId)) {
            $.ajax({
                url: '/Home/UpdateEditView ',
                data: { "userId": userId },
                cache: false,
                type: "POST",
                dataType: "html",
                success: function (data) {
                    $('#DivEditUser').html(data);
                    $('.bootstrap-select').selectpicker();
                    $('.datetimepicker').bootstrapMaterialDatePicker({
                        format: 'DD/MM/YYYY',
                        clearButton: true,
                        weekStart: 0,
                        time: false

                    });
                }
            });
        } else {
            GetNotificationError(" Please try Again .!");
        }
    });


    $(document).on('click', '#EditSave', function () {
        var userId = $(this).val();
        if (!isEmptyOrSpaces(userId)) {
            // validation 
            var isValid = true;
            var Title = $('#EditUserName').val(); 
            var Date = $('#EditTrainingDate').val(); 

            if (isEmptyOrSpaces(Title)) {
                GetNotificationError("Please Enter Title");
                isValid = false;
            }
            if (isEmptyOrSpaces(Date)) {
                GetNotificationError("Please Enter Date");
                isValid = false;
            } 

            if (isValid) {

                var Object = { 
                    Title: Title, 
                    Date: Date,
                    ID:userId
                }


                $.ajax({
                    type: "Post",
                    url: "/Home/EditUser",
                    data: JSON.stringify(Object),
                    datatype: 'json',
                    contentType: 'application/json; charset=utf-8',
                    traditional: true,
                    headers: {
                        '__RequestVerificationToken': $("input[name='__RequestVerificationToken']").val()
                    },
                    success: function (Data) {
                        if (Data.Update != null) {
                            if (Data.Update) {
                                updateShowView();
                                $('#EditClose').click();
                                swal( " Update Successful ", null, "success");
                            } else {
                                GetNotificationError(" Please try Again .!");
                            }
                        }
                    },
                    error: function () {
                        GetNotificationError(" Dynamic Save failed. ");

                    }
                });
            }

        } else {
            GetNotificationError(" Please try Again .!");
        }
    });
     

    //---------------------------------------------------
    // 
    $(document).on('click', '#DeleteUser', function () {
        var userId = $(this).val();


        if (!isEmptyOrSpaces(userId)) {
            
            swal({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel !",
                closeOnConfirm: false,
                closeOnCancel: false
            },
                function (isConfirm) {
                    if (isConfirm) {

                            $.ajax({
                    type: "Post",
                    url: "/Home/DeleteUser?userId=" + userId,
                    data: null,
                    datatype: 'json',
                    contentType: 'application/json; charset=utf-8',
                    traditional: true,
                    headers: {
                        '__RequestVerificationToken': $("input[name='__RequestVerificationToken']").val()
                    },
                    success: function (Data) {
                        if (Data.Deleted != null) {
                            if (Data.Deleted) {
                                updateShowView();
                                swal(" Deleted Successful !", null, "success");
                            } else {
                                GetNotificationError(" Please try Again .!");
                            }
                        }
                    }
                });

                    } else {
                        swal("Cancelled", "Your imaginary file is safe :)", "error");
                    }
                });

             
          
        } else {
            GetNotificationError(" Please try Again .!");
        }
    });
     



    $(document).on('click', '.ActiveUser', function () {
        var Butn = $(this); 
        var userID = $(this).val();
       
        if (  !isEmptyOrSpaces(userID)) {
            $.ajax({
                type: "Post",
                url: "/Home/ActivationUser",
                data: { "UserId": userID},
                //datatype: 'json',
                datatype: 'application/json',
                //contentType: 'application/json; charset=utf-8',
                traditional: true,
                headers: {
                    '__RequestVerificationToken': $("input[name='__RequestVerificationToken']").val()
                },
                success: function (Data) {
                    if (Data.Activtion != null) {
                        if (Data.Activtion) {
                           
                            updateShowView(); 
                                swal(" Mark Done", null, "success");
                              
                        } else {
                            GetNotificationError(" Please try Again .!");
                        }
                    }
                }
            });
        }

    });
     

});