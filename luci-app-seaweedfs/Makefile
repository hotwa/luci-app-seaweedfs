include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-seaweedfs
PKG_VERSION:=1.0.0
PKG_RELEASE:=1

LUCI_TITLE:=LuCI support for SeaweedFS
LUCI_PKGARCH:=all

include $(INCLUDE_DIR)/package.mk

define Package/$(PKG_NAME)
  SECTION:=luci
  CATEGORY:=LuCI
  SUBMENU:=3. Applications
  TITLE:=$(LUCI_TITLE)
  DEPENDS:=+luci-base +seaweedfs
endef

define Package/$(PKG_NAME)/description
LuCI app for SeaweedFS. Depends on the source-built 'seaweedfs' package providing /usr/bin/weed.
endef

define Package/$(PKG_NAME)/conffiles
/etc/config/seaweedfs
endef

define Build/Compile
endef

define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/etc/init.d/seaweedfs $(1)/etc/init.d/seaweedfs
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/etc/config/seaweedfs $(1)/etc/config/seaweedfs
	$(INSTALL_DIR) $(1)/etc/uci-defaults
	$(INSTALL_BIN) ./files/etc/uci-defaults/90-seaweedfs-setup $(1)/etc/uci-defaults/90-seaweedfs-setup
	# LuCI views/controllers
	$(INSTALL_DIR) $(1)/usr/lib/lua/luci/controller
	$(INSTALL_DATA) ./luasrc/controller/seaweedfs.lua $(1)/usr/lib/lua/luci/controller/seaweedfs.lua
	$(INSTALL_DIR) $(1)/usr/lib/lua/luci/model/cbi
	$(INSTALL_DATA) ./luasrc/model/cbi/seaweedfs.lua $(1)/usr/lib/lua/luci/model/cbi/seaweedfs.lua
	# i18n (optional)
	$(INSTALL_DIR) $(1)/usr/lib/lua/luci/i18n
	[ -f ./po/zh-cn/seaweedfs.po ] && po2lmo ./po/zh-cn/seaweedfs.po $(1)/usr/lib/lua/luci/i18n/seaweedfs.zh-cn.lmo || true
endef

$(eval $(call BuildPackage,$(PKG_NAME)))
