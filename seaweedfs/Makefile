include $(TOPDIR)/rules.mk

PKG_NAME:=seaweedfs
PKG_VERSION:=3.97
PKG_RELEASE:=1

PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL:=https://github.com/seaweedfs/seaweedfs
PKG_SOURCE_VERSION:=v$(PKG_VERSION)
PKG_MIRROR_HASH:=skip

PKG_LICENSE:=Apache-2.0
PKG_MAINTAINER:=

PKG_BUILD_DEPENDS:=golang/host
PKG_BUILD_PARALLEL:=1
PKG_USE_MIPS16:=0

GO_PKG:=github.com/seaweedfs/seaweedfs
GO_PKG_BUILD_PKG:=github.com/seaweedfs/seaweedfs/weed
GO_PKG_INSTALL_BIN:=weed

# Static build, no cgo, smaller binary
GO_PKG_TAGS:=netgo
GO_PKG_LDFLAGS:=-s -w -extldflags -static
GO_PKG_ENV:=CGO_ENABLED=0 GODEBUG=http2client=0

include $(INCLUDE_DIR)/package.mk
include $(TOPDIR)/feeds/packages/lang/golang/golang-package.mk

define Package/seaweedfs
  SECTION:=net
  CATEGORY:=Network
  TITLE:=SeaweedFS distributed storage (weed)
  URL:=https://github.com/seaweedfs/seaweedfs
  DEPENDS:=$(GO_ARCH_DEPENDS)
endef

define Package/seaweedfs/description
SeaweedFS (weed) built from source for OpenWrt using the Go toolchain.
Statically linked, CGO disabled. Provides /usr/bin/weed.
endef

define Build/Compile
	$(call GoPackage/Build/Compile)
endef

define Package/seaweedfs/install
	$(call GoPackage/Package/Install/Bin,$(1))
endef

$(eval $(call BuildPackage,seaweedfs))
