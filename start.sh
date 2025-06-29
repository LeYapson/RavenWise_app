#!/bin/bash

# RavenWise Mobile App - Script de démarrage rapide

echo "🚀 Démarrage de RavenWise Mobile App"
echo "======================================"

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Aller dans le répertoire du projet
cd "$(dirname "$0")"

echo "📦 Vérification des dépendances..."

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "🔧 Installation des dépendances..."
    npm install
fi

echo "🔄 Démarrage du serveur Expo..."

# Démarrer Expo
npx expo start

echo "✅ Application démarrée avec succès !"
echo ""
echo "📱 Pour tester l'application :"
echo "   - Scannez le QR code avec Expo Go (mobile)"
echo "   - Appuyez sur 'w' pour ouvrir dans le navigateur"
echo "   - Appuyez sur 'a' pour Android"
echo "   - Appuyez sur 'i' pour iOS"
echo ""
echo "🛠 Commandes utiles :"
echo "   - Appuyez sur 'r' pour recharger"
echo "   - Appuyez sur 'j' pour ouvrir le debugger"
echo "   - Appuyez sur 'm' pour le menu"
echo "   - Ctrl+C pour arrêter"
