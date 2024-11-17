AuthenticationFlowError = Java.type("org.keycloak.authentication.AuthenticationFlowError");

function authenticate(context) {

  LOG.info(script.name + " --> trace auth for: " + user.username);

  const allowed = /(REQAPPROVAL|ACTIVE|WEBONLY|RESTRICTED)/;
  if (user.getAttribute("employeeStatus") && allowed.test(user.getAttribute("employeeStatus"))) {
      context.success();
  } else {
      context.failure(AuthenticationFlowError.INVALID_USER);
      return;
  }

  context.success();
}
