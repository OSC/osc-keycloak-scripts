AuthenticationFlowError = Java.type("org.keycloak.authentication.AuthenticationFlowError");

function authenticate(context) {

  if (!authenticationSession.getClient()) {
    context.failure(AuthenticationFlowError.CLIENT_NOT_FOUND);
    return;
  }
  var client = authenticationSession.getClient().getClientId();
  LOG.info(script.name + " evalute authorization for user=" + user.username + " client=" + client);
  /*
    Use employeeStatus verification for *support.oh-tech.org which allows some disabled
    states to still authenticate.
    Also allow class-dev for testing purposes.
  */
  if (client && (client.contains("support.oh-tech.org") || client.contains("class-dev"))) {
    var allowed = /(REQAPPROVAL|ACTIVE|WEBONLY|RESTRICTED)/;
    var employeeStatus = user.getFirstAttribute("employeeStatus");
    if (employeeStatus && !allowed.test(employeeStatus)) {
      context.failure(AuthenticationFlowError.USER_DISABLED);
      return;
    }
  } else {
    /*
      All other clients will authorize if the user account is not disabled or locked
    */
    if (user.getFirstAttribute("nsAccountLock") == "TRUE") {
      context.failure(AuthenticationFlowError.CREDENTIAL_SETUP_REQUIRED);
      return;
    } else if (user.getFirstAttribute("loginDisabled") == "TRUE") {
      context.failure(AuthenticationFlowError.USER_DISABLED);
      return;
    }
  }

  context.success();
}
