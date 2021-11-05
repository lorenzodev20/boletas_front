// URI base de la API REST
var uri = 'http://127.0.0.1:8000';

$(document).ready(function () {
    // Obtener todos los compradores registrados
    $.ajax({
        type: "GET",
        url: uri + "/api/reservas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $.each(data, function (i, item) {
                var tempDate = moment(item.created_at).format('DD-MM-YYYY');
                var rows =
                    "<tr>" +
                    "<th scope='row'>" + item.id + "</th>" +
                    "<td>" + item.nombre_evento + "</td>" +
                    "<td>" + item.nombre + " "+ item.apellido+"</td>" +
                    "<td>" + item.cantidad + "</td>" +
                    "<td>" + tempDate + "</td>" +
                    "</tr>";
                $('#reservas > tbody').append(rows);
            });
            console.log(data);
        },
        failure: function (data) {
            swal(data.responseText);
        },
        error: function (data) {
            swal(data.responseText);
        }
    });
});

$('#nuevaReserva').click(function (event) {

    $.ajax({
        type: "GET",
        url: uri + "/api/reservas/datos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            // $('#comprador_id').empty();
            $.each(data.compradores, function (i, item) {
                var options = "<option value='" + item.id + "'>" + item.nombre + " " + item.apellido + "</option>";
                $('#comprador_id').append(options);
            });
            // $('#comprador_id').empty();
            $.each(data.boletas, function (i, boletas) {
                var options_b = "<option value='" + boletas.id + "'>" + boletas.evento + " <i class='bold-option'> -> Boletas Disponibles: " + boletas.disponible + "</i> </option>";
                $('#boleta_id').append(options_b);
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
});

// Nuevo reistro de comprador
$("form[name=FormNuevaReserva]").submit(function (event) {
    event.preventDefault();

    var comprador_id = $('#comprador_id').val();
    var boleta_id = $('#boleta_id').val();
    var cantidad = $('#cantidad').val();
    $.ajax({
        url: uri + "/api/reservas/save",
        type: "Post",
        data: JSON.stringify({
            comprador_id: comprador_id,
            boleta_id: boleta_id,
            cantidad: cantidad
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