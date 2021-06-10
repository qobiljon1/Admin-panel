const url = "http://213.230.99.101:2027/api/admin";
let editId = null;

    // ========================= Data Table ======================= //

const tutorTable = $('#tutor_table').DataTable({
    ajax: {
        url: `${url}/tutors`,
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        dataSrc: ""
    },
    columns : [
        {
            title: "Id",
            data: "id"
        },
        {
            title: "Fullname",
            data: "fullname"
        },
        {
            title: "Username",
            data: "username"
        },
        {
            title: "Address",
            data: "address"
        },
        {
            title: "Edit",
            data: "id",
            render: (id) => {
                return (
                    `<button type="button" class="btn btn-success" onclick = "editTutor(${id})">Edit</button>`
                )
            }
        },
        {
            title: "Delete",
            data: "id",
            render: (id) => {
                return (
                    `<button type="button" class="btn btn-danger" onclick = "deleteTutor(${id})">Delete</button>`
                )
            }
        },
    ]
})
tutorTable.ajax.reload()

// =========================open Modal ======================= //

const openModal = () => {
    $('#exampleModal').modal('show')
    
}

// =========================Close Modal ======================= //

const closeModal = () => {
    $('#exampleInputfullName').val("")
    $('#exampleInputuserName').val("")
    $('#exampleInputaddres').val("")
    $('#exampleInputpassword').val("")
    $('#exampleModal').modal('hide')
}

    // =========================open Toast ======================= //

const openToast = (color, text) => {
    $(".toast").toast("show")
    closeModal()
    $(".toast").css({
        position: 'absolute',
        top: "5%",
        right: "3%"
    })
    $(".toast-header").css({
        backgroundColor: color,
        color: "white"
    })
    $(".toast-body").html(text)
    $(".toast-body").css({
        color: "black",
        fontSize: "18px",
        fontWeight: "500"
    })
    setTimeout(() => {
        $(".toast").toast("hide")
    }, 2000);
}

    // ========================= Save Tutor ======================= //

const saveTutor = () => {
    address = $('#exampleInputaddres').val()
    fullname = $('#exampleInputfullName').val()
    password = $('#exampleInputpassword').val()
    username = $('#exampleInputuserName').val()

    if (editId == null) {
        tutor = {
            address,
            fullname,
            password,
            username
        }
        console.log(fullname, address);
        $.ajax({
            url: "http://213.230.99.101:2027/api/admin/tutor/save",
            method: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(tutor),
            success: function (res) {
                openToast("darkgreen", "Ma'lumot Qo'shildi")
                tutorTable.ajax.reload()
            },
            error: function (err) {
                openToast("red", "Ma'lumot qo'shilmadi")

            }
        })
    }
    else {
        tutor = {
            address,
            fullname,
            password,
            username
        }
        $.ajax({
            url: `http://213.230.99.101:2027/api/admin/tutor/edit/${editId}`,
            method: 'put',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(tutor),
            success: function (res) {
                openToast("darkgreen", "Ma'lumot o'zgartirildi")
                editId = null;
                $('.hiddenPassword').css({
                    display: 'block'
                })
                tutorTable.ajax.reload()
            },
            error: function (res) {
                openToast("darkred", "Ma'lumot o'zgartirilmadi")
            }
        })
    }
}

    // ========================= Edit Tutor ======================= //

const editTutor = (id) => {
    openModal()
    $.ajax({
        url: `${url}/tutor/${id}`,
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        dataSrc: "",
        success: function (res) {
            $('#exampleInputfullName').val(res.fullname)
            $('#exampleInputuserName').val(res.username)
            $('#exampleInputaddres').val(res.address)
            $('.hiddenPassword').css({
                display: 'none'
            })
        },
        error: function (res) {
            console.log(res);
        }
    })
    editId = id;
}

    // ========================= Delete Tutor ======================= //

const deleteTutor = (id) => {
    $.ajax({
        url: `${url}/tutor/delete/${id}`,
        method: 'delete',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (res) {
            openToast("darkgreen", "Ma'lumot o'chirildi")
            tutorTable.ajax.reload()
        },
        error: function (err) {
            openToast("darkred", "Ma'lumot o'chirilmadi")
        }

    })
}