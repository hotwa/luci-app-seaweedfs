module("luci.controller.seaweedfs", package.seeall)

function index()
    if not nixio.fs.access("/etc/config/seaweedfs") then
        return
    end
    entry({"admin", "services", "seaweedfs"}, cbi("seaweedfs"), _("SeaweedFS"), 60).acl_depends = { "luci-app-seaweedfs" }
end

