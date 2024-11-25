var enabled = true;
if (user.getFirstAttribute("nsAccountLock") == "TRUE" || user.getFirstAttribute("loginDisabled") == "TRUE") {
    enabled = false;
}
enabled;
