// URI base de la API REST
var uri = 'http://127.0.0.1:8000';

function editBoleta(id) {
    $.ajax({
        type: "GET",
        url: uri + "/api/boletas/edit/"+ id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            $('#id_edit').val(data.id)
            $('#evento_edit').val(data.evento)
            $('#disponible_edit').val(data.disponible)
        },
        failure: function (data) {
            swal(data.responseText);
        },
        error: function (data) {
            swal(data.responseText);
        }
    });
}

function deleteBoleta(id) {
    $.ajax({
        type: "delete",
        url: uri + "/api/boletas/delete/" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            swal("Buen Trabajo!", data, "success")
            .then((value) => {
                location.reload();
            });
        },
        failure: function (data) {
            swal(data.responseText);
        },
        error: function (data) {
            swal(data.responseText);
        }
    });
}

$(document).ready(function () {
    // Obtener todos los compradores registrados
    $.ajax({
        type: "GET",
        url: uri + "/api/boletas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#boletas > tbody').empty();
            $.each(data, function (i, item) {
                var rows =
                    "<tr>" +
                    "<th scope='row'>" + item.id + "</th>" +
                    "<td>" + item.evento + "</td>" +
                    "<td>" + item.disponible + "</td>" +
                    "<td>" +
                    "<div class='btn-group' role='group' aria-label='Basic outlined'>" +
                    "<button type='button' class='btn btn-outline-primary btnEditar'  data-bs-toggle='modal' data-bs-target='#modalEditBoleta' onclick='editBoleta("+item.id+")'>Editar</button>" +
                    "<button type='button' class='btn btn-outline-primary' onclick='deleteBoleta("+item.id+")' >Eliminar</button>" +
                    "</div>" +
                    "</td>" +
                    "</tr>";
                $('#boletas > tbody').append(rows);
            });
            // console.log(data);
        },
        failure: function (data) {
            swal(data.responseText);
        },
        error: function (data) {
            swal(data.responseText);
        }
    });

    // Nuevo reistro de comprador
    $("form[name=FormNuevoBoleta]").submit(function (event) {
        event.preventDefault();

        var evento = $('#evento').val();
        var disponible = $('#disponible').val();
        $.ajax({
            url: uri + "/api/boletas/save",
            type: "Post",
            data: JSON.stringify({
                evento: evento,
                disponible: disponible,
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                swal("Buen Trabajo!", "Registro agregado exitosamente!", "success")
                    .then((value) => {
                        location.reload();
                    });
            },
            failure: function (data) {
                // alert(data.responseText);
                swal("Algo anda mal!", data.responseText, "warning")
            },
            error: function (data) {
                swal("Algo ha fallado!", data.responseText, "error")
            }
        });
    });

    $("form[name=FormEditBoleta]").submit(function (event) {
        event.preventDefault();

        var idBoleta = $('#id_edit').val();
        var evento_edit = $('#evento_edit').val();
        var disponible_edit = $('#disponible_edit').val();
        $.ajax({
            url: uri + "/api/boletas/update/"+idBoleta,
            type: "PUT",
            data: JSON.stringify({
                evento: evento_edit,
                disponible: disponible_edit
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                swal("Buen Trabajo!", data, "success")
                    .then((value) => {
                        location.reload();
                    });
            },
            failure: function (data) {
                // alert(data.responseText);
                swal("Algo anda mal!", data.responseText, "warning")
            },
            error: function (data) {
                swal("Algo ha fallado!", data.responseText, "error")
            }
        });
    });
});