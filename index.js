/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var jpdbBaseURL = " http://api.login2explore.com:5577 ";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var studDbName = "Stud-Db";
var studRelationName = "StudData";
var connToken = "90934495|-31949223073958031|90962776";

$("#studid").focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);
}

function getStudIdAsJsonObj() {
    var studid = $("#studid").val();
    var jsonStr = {
        id: studid
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var data = JSON.parse(jsonObj.data).record;
    $("#studname").val(data.name);
    $("#studclass").val(data.class);
    $("#studdb").val(data.dateOfBirth);
    $("#studadd").val(data.address);
    $("#studed").val(data.enrollmentDate);
}

function resetForm() {
    $("#studid").val("");
    $("#studname").val("");
    $("#studclass").val("");
    $("#studdb").val("");
    $("#studadd").val("");
    $("#studid").val("");
    $("#studed").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#studid").focus();
}

function validateData() {
    var studid, studname, studclass, studdb, studadd, studed;
    studid = $("#studid").val();
    studname = $("#studname").val();
    studclass = $("#studclass").val();
    studdb = $("#studdb").val();
    studadd = $("#studadd").val();
    studed = $("#studed").val();
    
    if (studid === "") {
        alert("Student Roll Number is missing");
        $("#studid").focus();
        return "";
    }
    if (studname === "") {
        alert("Student Name is missing");
        $("#studname").focus();
        return "";
    }
    if (studclass === "") {
        alert("Student Class is missing");
        $("#studclass").focus();
        return "";
    }
    if (studdb === "") {
        alert("Student Date of Birth is missing");
        $("#studdb").focus();
        return "";
    }
    if (studadd === "") {
        alert("Student Address is missing");
        $("#studadd").focus();
        return "";
    }
    if (studed === "") {
        alert("Student Enrollment Number is missing");
        $("#studed").focus();
        return "";
    };
    
    var jasonStrObj = {
        id: studid,
        name: studname,
        class: studclass,
        dateOfBirth: studdb,
        address: studadd,
        enrollmentDate: studed
    };
    return JSON.stringify(jasonStrObj);
}

function getStud() {
    var studIdJsonObj = getStudIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, studDbName, studRelationName, studIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#studname").focus();
    } else if (resJsonObj.status === 200) {
        $("#studid").prop("disabled", true);
        fillData(resJsonObj);
        
        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#studname").focus();
    }
}

function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === ""){
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, studDbName, studRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#studid").focus();
}

function changeData() {
    $("#change").prop("disabled", true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, studDbName, studRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#studid").focus();
}



