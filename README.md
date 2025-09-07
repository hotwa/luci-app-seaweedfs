SeaweedFS for OpenWrt (LuCI + binary)

Overview
- Packages:
  - `seaweedfs`: builds the `weed` binary from source (Go) for the target arch.
  - `luci-app-seaweedfs`: LuCI UI + service scripts; depends on `seaweedfs`.
- Service: procd init at `/etc/init.d/seaweedfs`, UCI config at `/etc/config/seaweedfs`.

Build Integration
- SeaweedFS version: set by `PKG_VERSION` in `seaweedfs/Makefile` (currently 3.97).
- Build flags (OpenWrt SDK + Go):
  - `CGO_ENABLED=0` (static, simpler runtime)
  - `-tags netgo` (pure Go net)
  - `-ldflags "-s -w -extldflags -static"` (smaller, static link)

Usage
- Enable and start:
  uci set seaweedfs.default.enabled=1
  uci commit seaweedfs
  /etc/init.d/seaweedfs start

Config keys in `/etc/config/seaweedfs`:
- enabled: 0/1
- role: server|master|volume|filer|s3
- data_dir: data path (default /opt/seaweedfs)
- extra_args: additional args passed to weed
- user: run as user (default root)

License
- MIT (add if publishing).

CI Builds (.apk/.ipk)
- On every push/PR, GitHub Actions builds with OpenWrt SDK for two targets by default:
  - `x86/64` (packages for x86_64)
  - `aarch64/generic` (packages for arm64)
- Artifacts: Actions run → Artifacts → download built `.apk`/`.ipk`.
- Tags (e.g., `v0.1.0`) publish a GitHub Release with artifacts.
- Add/remove targets in `.github/workflows/build-apk.yml` matrix.

Local SDK Build (for testing)
- Download matching OpenWrt SDK (target + subtarget).
- Copy both package dirs into `package/` and run:
  ./scripts/feeds update -a && ./scripts/feeds install -a
  make defconfig
  make package/seaweedfs/{clean,compile} V=s
  make package/luci-app-seaweedfs/{clean,compile} V=s
- Install on device:
  - `apk add --allow-untrusted /tmp/seaweedfs_*.apk /tmp/luci-app-seaweedfs_*.apk` (apk-based)
  - or `opkg install /tmp/*.ipk` (opkg-based)

Notes
- This repository builds SeaweedFS from source per-arch inside the OpenWrt SDK.
- For more architectures, add them to the CI matrix and use the corresponding SDK target/subtarget.
