var statusEnabled = true;
var allowed = /(REQAPPROVAL|ACTIVE|WEBONLY|RESTRICTED)/;
var employeeStatus = user.getFirstAttribute("employeeStatus");
if (employeeStatus && !allowed.test(employeeStatus)) {
    statusEnabled = false;
}
statusEnabled;
