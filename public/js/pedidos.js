import { API } from "./api.js"
export class Pedidos {
    constructor() {
        this.api = new API()
    }

    abreModalPedidos() {
        // console.log('Modal pedidos')
    }
    
    rastrearPedidos() {
        console.log('Rastreando pedidos')
    }
    
    editarPedidos() {
        console.log('Editando pedidos')
    }
    
    novedadPedidos() {
        console.log('Novedades')
    }
    
    generarRotulo() {
        console.log('Generar rótulo')
    }
    
    generarRecibo() {
        console.log('Generar recibo')
    }

    consultaCobertura(obj) {
        NProgress.start()
        $.ajax({
            url:  get_base_url()+'/pedidos/verCoberturas',
            type: 'POST',
            data: obj,
            success: function(response) {
                NProgress.done();
                let dataResponse = jQuery.parseJSON(response);
                // console.log(dataResponse.message)
                sessionStorage.setItem('cobertura', JSON.stringify(dataResponse.message));
            } ,
            error: function(){
                NProgress.done();
                alerta('Se presento un error al intentar crear el elemento');
                return;
            }
        });
    }

    traerMunicipio(departamento_id){

        // $("#municipio_id").empty();

        let obj = {codigo: departamento_id}
        let html = ''
        let selected = ''

        NProgress.start()
        $.ajax({
            type: "POST",
            url:  get_base_url()+'/pedidos/lista_municipio',
            data: obj,
            success: function(response)                                                            
            {   
                NProgress.done();

                try{
                    var dataMunicipio = jQuery.parseJSON(response);
                }catch(e){
                    var dataMunicipio = new Object();
                    dataMunicipio.status = false;
                    dataMunicipio.message = 'Se presento un error al intentar crear el elemento';
                }

                // if(!dataMunicipio.status){
                //     alerta(dataMunicipio.message);
                //     return;
                // }

                for(let i=0;i<dataMunicipio.length;i++){
                    if(dataMunicipio[i].id_municipio == municipio_id){
                        selected = 'selected';
                    }
                    html += '<option '+selected+' value="'+dataMunicipio[i].id_municipio+'">'+dataMunicipio[i].nombre+'</option>';
                    selected = '';
                }
                $("#municipio_id").append(html);
            } ,
            error: function(){
                NProgress.done();
                alerta('Se presento un error al intentar crear el elemento');
                return;
            }                                       
        });
    }

    traerDepartamento() {
        // $("#departamento_id").empty();
        let html = ''
        let selected = ''

        NProgress.start()
        $.ajax({
            type: "POST",
            url:  get_base_url()+'/pedidos/lista_departamento',
            data: null,
            success: function(response)                                                            
            {   
                NProgress.done();

                try{
                    var dataDepartamento = jQuery.parseJSON(response);
                }catch(e){
                    var dataDepartamento = new Object();
                    dataDepartamento.status = false;
                    dataDepartamento.message = 'Se presento un error al intentar crear el elemento';
                }

                // if(!dataDepartamento.status){
                //     alerta(dataDepartamento.message);
                //     return;
                // }

                // console.log(dataDepartamento)

                for(let i=0;i<dataDepartamento.length;i++){
                    if(dataDepartamento[i].codigo == departamento_id){
                        selected = 'selected';
                    }
                    html += '<option '+selected+' value="'+dataDepartamento[i].codigo+'">'+dataDepartamento[i].nombre+'</option>';
                    selected = '';
                }
                $("#departamento_id").append(html);
            } ,
            error: function(){
                NProgress.done();
                alerta('Se presento un error al intentar crear el elemento');
                return;
            }                                       
        });


    }

    
    
}