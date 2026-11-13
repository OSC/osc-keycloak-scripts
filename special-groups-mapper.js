ArrayList = Java.type("java.util.ArrayList");

var groupNames = new ArrayList();
if (user.getFirstAttribute("nsAccountLock") != "TRUE" && user.getFirstAttribute("loginDisabled") != "TRUE") {
    groupNames.add("enabled-users");
    var groups = user.getGroupsStream().toArray();
    for (var i = 0; i < groups.length; i++) {
        groupNames.add(groups[i].getName());
    }
}
groupNames;
