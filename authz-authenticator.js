AuthenticationFlowError = Java.type("org.keycloak.authentication.AuthenticationFlowError");

function authenticate(context) {

  if (!authenticationSession.getClient()) {
    context.failure(AuthenticationFlowError.CLIENT_NOT_FOUND);
    return;
  }
  var client = authenticationSession.getClient().getClientId();
  LOG.info(script.name + " evalute authorization for user=" + user.username + " client=" + client);
  /*
    Use employeeStatus verification for service-now which allows some disabled
    states to still authenticate.
    Also allow class-dev for testing purposes.
  */
  if (client && (client.contains("service-now") || client.contains("class-dev"))) {
    var allowed = /(REQAPPROVAL|ACTIVE|WEBONLY|RESTRICTED)/;
    var employeeStatus = user.getFirstAttribute("employeeStatus");
    if (employeeStatus && !allowed.test(employeeStatus)) {
      context.failure(AuthenticationFlowError.INVALID_USER);
      return;
    }
  } else {
    /*
      All other clients will authorize if the user account is not disabled or locked
    */
    if (user.getFirstAttribute("nsAccountLock") == "TRUE" || user.getFirstAttribute("loginDisabled") == "TRUE") {
      context.failure(AuthenticationFlowError.INVALID_USER);
      return;
    }
  }

  context.success();
}
