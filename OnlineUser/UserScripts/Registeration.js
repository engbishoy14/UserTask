$(document).ready(function () {
    // Check Null Or Empty
    function isEmptyOrSpaces(str) {
        // || str.match(/^ *$/) !== null
        if (str === null || str === "" || str.length == 0)
            return true;
        return false;
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
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
    function showNotification(colorName, text, placementFrom, placementAlign, animateEnter, animateExit) {
        if (colorName === null || colorName === '') { colorName = 'bg-black'; }
        if (text === null || text === '') { text = 'Turning standard Bootstrap alerts'; }
        if (animateEnter === null || animateEnter === '') { animateEnter = 'animated fadeInDown'; }
        if (animateExit === null || animateExit === '') { animateExit = 'animated fadeOutUp'; }
        var allowDismiss = true;

        $.notify({
            message: text
        },
            {
                type: colorName,
                allow_dismiss: allowDismiss,
                newest_on_top: true,
                timer: 1000,
                placement: {
                    from: placementFrom,
                    align: placementAlign
                },
                animate: {
                    enter: animateEnter,
                    exit: animateExit
                },
                template: '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} ' + (allowDismiss ? "p-r-35" : "") + '" role="alert">' +
                    '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                    '<span data-notify="icon"></span> ' +
                    '<span data-notify="title">{1}</span> ' +
                    '<span data-notify="message">{2}</span>' +
                    '<div class="progress" data-notify="progressbar">' +
                    '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                    '</div>' +
                    '<a href="{3}" target="{4}" data-notify="url"></a>' +
                    '</div>'
            });
    }
    function SplitSpace(Text) {
        var str = Text.split(' ');
        var Resert = "";
        for (var i = 0; i < str.length; i++) {
            if (!isEmptyOrSpaces(str[i])) {
                Resert += str[i] + " ";
            }
        }
        return Resert;
    }
    $('#Save').click(function () {

        var UserName = $('#Name').val();
        var UserEmail = $('#email').val();
        var UserPassword = $('#Password').val();
        var isvalid = true;
        if (isEmptyOrSpaces(UserName)) {
            isvalid = false;
            GetNotificationError("Please Enter Name ");
        }
        else {
            if (validateEmail(UserEmail)) {
            } else {
                isvalid = false;
                GetNotificationError("Please Enter Valid Email ");
            }
        }
        if (isEmptyOrSpaces(UserEmail)) {
            isvalid = false;
            GetNotificationError("Please Enter Email ");
        }
        if (isEmptyOrSpaces(UserPassword)) {
            isvalid = false;
            GetNotificationError("Please Enter Password ");
        }
       

        if (isvalid) {
    
            $.ajax({
                type: "Post",
                url: "/Registeration/Create",
                data: {
                    "UserName": UserName,
                    "UserEmail": UserEmail,
                    "UserPassword": UserPassword,
                },
                datatype: 'application/json',
                traditional: true,
                headers: {
                    '__RequestVerificationToken': $("input[name='__RequestVerificationToken']").val()
                },
                success: function (Data) {
                    if (Data.Found != null) {
                        if (Data.Found) {
                            GetNotificationError(" Email is found ");
                        }
                    }
                    if (Data.created != null) {
                        if (Data.created) {

                            window.location.href = "/Login/Index";
                           // GetNotificationSuccess("Inserted successfull !");
                        }
                       
                    }


                },
                error: function () {
                    GetNotificationError("  failed ");
                }

            });


       
        }
      

    });









});