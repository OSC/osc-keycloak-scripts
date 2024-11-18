AuthenticationFlowError = Java.type("org.keycloak.authentication.AuthenticationFlowError");

function authenticate(context) {

  LOG.info(script.name + " --> trace auth for: " + user.username);

  if (user.getFirstAttribute("nsAccountLock") == "TRUE" || user.getFirstAttribute("loginDisabled") == "TRUE") {
      context.failure(AuthenticationFlowError.INVALID_USER);
      return;
  }

  context.success();
}
