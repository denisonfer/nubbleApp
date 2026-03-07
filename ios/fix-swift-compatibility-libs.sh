#!/bin/bash
# Restaura as bibliotecas de compatibilidade Swift no SDK do iOS (workaround Xcode 26+)
# Execute: chmod +x fix-swift-compatibility-libs.sh && ./fix-swift-compatibility-libs.sh
# Será pedida sua senha de administrador (sudo).

set -euo pipefail

TOOLCHAIN="$(xcode-select -p)/Toolchains/XcodeDefault.xctoolchain/usr/lib/swift/iphoneos"
SDK="$(xcrun --sdk iphoneos --show-sdk-path)/usr/lib/swift"

echo "🔧 Restaurando bibliotecas Swift Compatibility no SDK..."
echo "   Toolchain: $TOOLCHAIN"
echo "   SDK:       $SDK"
echo ""

LIBS=(
  libswiftCompatibility50.a
  libswiftCompatibility51.a
  libswiftCompatibility56.a
  libswiftCompatibilityConcurrency.a
  libswiftCompatibilityDynamicReplacements.a
  libswiftCompatibilityPacks.a
)

for LIB in "${LIBS[@]}"; do
  TOOLCHAIN_LIB="$TOOLCHAIN/$LIB"
  SDK_LIB="$SDK/$LIB"
  SDK_TBD="$SDK/${LIB%.a}.tbd"

  if [ -f "$TOOLCHAIN_LIB" ]; then
    if [ ! -f "$SDK_LIB" ] && [ ! -f "$SDK_TBD" ]; then
      echo "⚡ Criando symlink: $LIB"
      sudo ln -sf "$TOOLCHAIN_LIB" "$SDK_LIB"
    else
      echo "✅ Já existe: $LIB"
    fi
  else
    echo "⚠️  Não encontrado no toolchain: $LIB"
  fi
done

echo ""
echo "🧩 Conteúdo final (Compatibility) no SDK:"
ls -la "$SDK" | grep -i compatibility || echo "Nenhuma lib Compatibility."
echo ""
echo "✅ Concluído. Rode o build no Xcode novamente."
