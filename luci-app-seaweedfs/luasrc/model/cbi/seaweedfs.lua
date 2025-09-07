local m, s

m = Map("seaweedfs", translate("SeaweedFS"), translate("Configure SeaweedFS service and startup options."))

s = m:section(TypedSection, "seaweedfs", translate("Settings"))
s.anonymous = true

local enabled = s:option(Flag, "enabled", translate("Enable"))
enabled.rmempty = false

local role = s:option(ListValue, "role", translate("Role"))
role:value("server", "server")
role:value("master", "master")
role:value("volume", "volume")
role:value("filer", "filer")
role:value("s3", "s3")
role.rmempty = false

local data_dir = s:option(Value, "data_dir", translate("Data Directory"))
data_dir.placeholder = "/opt/seaweedfs"

local user = s:option(Value, "user", translate("Run as user"))
user.placeholder = "root"

local extra = s:option(Value, "extra_args", translate("Extra Arguments"))
extra.placeholder = "--help"
extra.rmempty = true

return m

